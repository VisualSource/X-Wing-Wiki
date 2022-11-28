window.parsePDF = async (from = null, to = null) => {
    /**
     * @param {HTMLSpanElement} root
     * @return {{ type: "table" | "id", id?: string; el?: HTMLSpanElement }}
     */
    const getInner = (root) => {
       /** @type {HTMLSpanElement} */
       const wrapper = root.firstChild.firstChild;

        if(wrapper.hasAttribute("role")) {
            return {
                type: wrapper.getAttribute("role"),
                el: wrapper
            }
        }

        return {
            type: "id",
            id: wrapper.getAttribute("aria-owns")
        }
    }

    const wait = (ms)=> new Promise((ok)=>setTimeout(()=>ok(),ms));
    /** @type {Map<string,{ pageNumber: string; role: string; label: string; headers: string[]; content: { type: "columnheader" | "cell", data: string[] }[] }>} */
    const documentData = new Map();

    const viewer = document.getElementById("viewer");
    /** @type {NodeListOf<HTMLDivElement>} */
    const pages = viewer.querySelectorAll(".page");

    for(const [key,page] of pages.entries()) {
        if(from && key < from) continue;
        if(to && to > key) continue; 

        const pageData = {
            pageNumber: page.getAttribute("data-page-number"),
            role: page.getAttribute("role"),
            label: page.getAttribute("aria-label"),
            headers: [],
            content: []
        }

        page.scrollIntoView({ behavior: "auto", block: "start" });
        await wait(2000);
        console.info(key, "PARSING PAGE", pageData);

        /** @type { NodeListOf<HTMLSpanElement>} */
        const groups = page.querySelectorAll(`.canvasWrapper > [role="presentation"] > .structTree > [lang="en-US"] > span > span[role="group"]`);

        for(const group of groups) {
            const inner = getInner(group);
            
            switch (inner.type) {
                case "id": {
                    const markedContent = document.getElementById(inner.id);
                    /** @type {HTMLSpanElement} */
                    const presentation = markedContent.querySelectorAll(`span[role="presentation"]`);

                    for(const content of presentation) {
                        const text = content.innerText.trim();
                        pageData.headers.push(text);
                    }
                    break;
                }
                case "table": {
                    /** @type {NodeListOf<HTMLSpanElement>} */
                    const rows = inner.el.querySelectorAll(`span[role="row"]`);

                    const rowData = [];

                    for(const row of rows) {
                        const colheader = row.querySelectorAll(`span[role="columnheader"] > span`);
                        if(colheader.length !== 0) {
                            const headers = [];

                            for(const header of colheader) {
                                const children = header.querySelectorAll("span");

                                for(const child of children) {
                                    const linkId = child.getAttribute("aria-owns");
                                    const id = document.getElementById(linkId);
                                    const content = id.querySelectorAll(`span[role="presentation"]`);

                                    for(const text of content) headers.push(text.innerText.trim());
                                }
                            }

                            rowData.push({ type: "columnheader", data: headers });
                        } 

                        const cells = row.querySelectorAll(`span[role="cell"] > span`);
                        let cellData = [];

                        for(const cell of cells) {
                            const data = cell.querySelectorAll("span");

                            for(const item of data) {
                                const linkId = item.getAttribute("aria-owns");
                                const content = document.getElementById(linkId);
                                const texts = content.querySelectorAll(`span[role="presentation"]`);
                                for(const text of texts) cellData.push(text.innerText.trim());
                            }

                        }
                        rowData.push({ type: "cell", data: cellData });
                    }

                    pageData.content.push(...rowData);

                    break;
                }
                default:
                    break;
            }
        }

        documentData.set(pageData.pageNumber,pageData);
    }

    console.info(documentData);

    /** @type {{ [key: string]: { ship: string; pilots: { name: string; }[] }[] }} */
    const ships = {};


    for(const [page,pageData] of documentData.entries()) {
        const faction = pageData.headers.at(0);

        if(!ships[faction]) {
            ships[faction] = [];
        }

        let currentShip = null;

        for(const row of pageData.content) {
            if(row.type === "columnheader" || row.data.length === 0) continue;


            // cells with only ship name will not have Std or Ext values aka. Yes,No, or Ban
            if(row.data.some(value=> value==="Yes"|value==="No"|value==="Ban")){
                /** @type {{ keywords: string[]; bar: string[] }} */
                let pilot = {
                    name: "",
                    subtitle: "",
                    cost: 0,
                    loadout: 0,
                    bar: [],
                    std: 1,
                    ext: 1,
                    keywords: []
                }

                let hasName = false;
                let hasSubtitle = false;
                let hasLoadout = false;
                let hasBar = false;
                let hasKeywords = false;
                let hasExt = false;
                let hasCost = false;
                let hasStd = false;

                let currentIdx = 0;
        
                while(currentIdx < row.data.length) {
                    const col = row.data.at(currentIdx);
                    if(col.length === 0) {
                        currentIdx++;
                        continue;
                    }

                    if(!hasName) {
                        pilot.name += col;
                        
                        if(row.data[currentIdx+1].length === 0){
                            hasName = true;
                            currentIdx++;
                            continue;
                        }

                        currentIdx++;
                        continue;
                    }

                    if(!hasSubtitle) {
                        const result = parseInt(col);
                        if(Number.isInteger(result)) {
                            hasSubtitle = true;
                            continue;
                        }

                        if(pilot.subtitle.length !== 0) pilot.subtitle += " ";
                        pilot.subtitle += col;
                        currentIdx++;
                        continue;
                    }

                    if(!hasCost) {
                        const result = parseInt(col);
                        pilot.cost = result;
                        hasCost = true;
                        currentIdx++;
                        continue;
                    }

                    if(!hasLoadout) {
                        const result = parseInt(col);

                        // if nan most likly a loadout ship
                        if(Number.isNaN(result)) {
                            hasLoadout = true;
                            continue;
                        }

                        pilot.loadout = result;
                        hasLoadout = true;

                        currentIdx++;
                        continue;
                    }

                    if(!hasBar) {
                        if(col.match(/[A-Z|a-z|0-9]/)) {
                            hasBar = true;
                            continue;
                        }

                        const replacedValues = col.replaceAll("\u{f204b}","Talent,")
                                    .replaceAll("\u{f204c}","Sensor,")
                                    .replaceAll("\u{f2050}","Missile,")
                                    .replaceAll("\u{f2059}","Modification,")
                                    .replaceAll("\u{f2221}","Configuration,")
                                    .replaceAll("\u{f204f}","Torpedo,")
                                    .replaceAll("\u{f2052}","Crew,")
                                    .replaceAll("\u{f2226}","Gunner,")
                                    .replaceAll("\u{f2056}","Device,")
                                    .replaceAll("\u{f205a}","Title,")
                                    .replaceAll("\u{f204d}","Cannon,")
                                    .replaceAll("\u{f2222}","ForcePowerU,")
                                    .replaceAll("\u{f205b}","Tech,")
                                    .replaceAll("\u{f204e}","Turret,")
                                    .replaceAll("\u{f2058}","Illicit,")
                                    .replaceAll("\u{f2054}","Astromech,")
                                    .replaceAll("\u{f2500}","Shield,")
                                    .replaceAll("\u{f2402}","TacticalRelay,")
                                    .split(",").filter(value=>value.length !== 0);

                        pilot.bar = pilot.bar.concat(replacedValues);
                        currentIdx++;
                        continue;
                    }

                    if(!hasKeywords) {
                        if(col === "Yes" || col === "Ban" || col == "No") {
                            hasKeywords = true;
                            continue;
                        }
                        pilot.keywords = pilot.keywords.concat(...col.split(","));
                        currentIdx++;
                        continue;
                    }

                    if(!hasStd) {
                        pilot.std = col === "Ban" ? "B" : col === "Yes" ? 1 : 0;
                        hasStd = true;
                        currentIdx++;
                        continue;
                    }

                    if(!hasExt) {
                        pilot.ext = col==="Ban" ? "B" : col === "Yes" ? 1 : 0
                        hasExt = true;
                        currentIdx++;
                        continue;
                    }

                    currentIdx++;
                }

                const idx = ships[faction].findIndex(value=>value.ship===currentShip);

                if(idx===-1) {
                    console.error(pilot);
                    continue;
                }

                ships[faction][idx].pilots.push(pilot);

                continue;
            }            

            const ship = row.data.filter(value=>value!=="-").join("").replace("(continued)","").trim();
            currentShip = ship;
            const idx = ships[faction].findIndex(value=>value.ship===ship);
            if(idx === -1) {
                ships[faction].push({
                    ship,
                    pilots: []                    
                })
            }
        }
    }
    console.log(ships);

    for(const [key,faction] of Object.entries(ships)) {
        const a = JSON.stringify(faction);
        window.open(`data:application/json,${encodeURIComponent(a)}`);
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    return documentData;
}