window.parsePDF = async () => {
     /** @type {Map<string,{ pageNumber: string; role: string; label: string; headers: string[]; content: { type: "columnheader" | "cell", data: string[] }[] }>} */
     const documentData = new Map();
    const wait = (ms)=> new Promise((ok)=>setTimeout(()=>ok(),ms));
    /**
     * @param {HTMLSpanElement} root
     * @return {{ type: "table" | "id", id?: string; el?: HTMLSpanElement }}
     */
    const getInner = (root) => {
        /** @type {HTMLSpanElement} */
        const wrapper = root.firstChild?.firstChild;

        if(!wrapper) {
            return {
                type: "figure"
            }
        }

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
    const viewer = document.getElementById("viewer");
    /** @type {NodeListOf<HTMLDivElement>} */
    const pages = viewer.querySelectorAll(".page");

    for(const [key,page] of pages.entries()) {
        //if(key > 1) continue;
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
    /** @type {{ header: string; upgrades: { name: string; type: string; cost: number; restrictions: string[]; standard: 1 | 0 | "B"; extended: 1|0 }[] }[]} */
    const groups = [];

    const replaceIcons = (value) => value.replaceAll("\u{f204b}","<Talent/>")
    .replaceAll("\u{f204c}","<Sensor/>")
    .replaceAll("\u{f2050}","<Missile/>")
    .replaceAll("\u{f2059}","<Modification/>")
    .replaceAll("\u{f2221}","<Configuration/>")
    .replaceAll("\u{f204f}","<Torpedo/>")
    .replaceAll("\u{f2052}","<Crew/>")
    .replaceAll("\u{f2226}","<Gunner/>")
    .replaceAll("\u{f2056}","<Device/>")
    .replaceAll("\u{f205a}","<Title/>")
    .replaceAll("\u{f204d}","<Cannon/>")
    .replaceAll("\u{f2222}","<ForcePowerU>")
    .replaceAll("\u{f205b}","<Tech/>")
    .replaceAll("\u{f204e}","<Turret/>")
    .replaceAll("\u{f2058}","<Illicit/>")
    .replaceAll("\u{f2054}","<Astromech/>")
    .replaceAll("\u{f2500}","<Shield/>")
    .replaceAll("\u{f2402}","<TacticalRelay/>")
    .replaceAll("\u{f2048}","<Coordinate/>")
    .replaceAll("\u{f2041}","<Lock/>")
    .replaceAll("\u{f2223}","<Reload/>")
    .replaceAll("\u{f2042}","<BarrelRoll/>")
    .replaceAll("\u{f2043}","<Boost/>")
    .replaceAll("\u{f2040}","<Focus/>")
    .replaceAll("\u{f204a}","<Slam/>")
    .replaceAll("\u{f206b}","<RotateArc/>")
    .replaceAll("\u{f222a}","<RearArc/>")
    .replaceAll("\u{f2225}","<Calculate/>")

    const testForTypes = new RegExp(/Title|Configuration|Gunner|Crew|Talent|Astromech|Illicit|Modification|Tech|Cannon|Force Power|Missile|Torpedo|Payload|Tactical Relay|Sensor|Turret/);

    for(const page of documentData.values()) {
        let header = page.headers.at(0);
        if(header === "Upgrade Points Document") {
            header = page.headers.at(1);
        }

        let headerIdx = groups.findIndex(value=>value.header===header);

        if(headerIdx === -1) {
            headerIdx = groups.length;
            groups.push({
                header,
                upgrades: []
            });
        }

        for(const row of page.content) {
            if(row.type === "columnheader" || row.data.length === 0) continue;

            let upgrade = {
                name: "",
                type: "",
                cost: 0,
                restrictions: [],
                standard: 1,
                extended: 1
            }

            let hasName = false;
            let hasType = false;
            let hasCost = false;
            let hasRestrictions = false;
            let hasStd = false;
            let hasExt = false;
            let currentIdx = 0;
            while(currentIdx < row.data.length) {
                const col = row.data.at(currentIdx);

                if(col.length === 0) {
                    currentIdx++;
                    continue;
                }

                if(!hasName) {
                    if(currentIdx !== 0 && testForTypes.test(col)) {
                        hasName = true;
                        continue;
                    }

                    upgrade.name += `${upgrade.name.length === 0 ? "" : " "}${col}`;
                    
                    currentIdx++;
                    continue;
                }

                if(!hasType) {
                    const result = parseInt(col);
                    if(!Number.isNaN(result)) {
                        hasType = true;
                        continue;
                    }

                    upgrade.type += replaceIcons(col);
                    currentIdx++;
                    continue;
                }

                if(!hasCost) {
                    const result = parseInt(col);
                    upgrade.cost = result ?? 0;
                    hasCost = true;
                    currentIdx++;
                    continue;
                }

                if(!hasRestrictions) {
                    if(col === "Yes" || col === "No" || col === "Banned") {
                        hasRestrictions = true;
                        continue;
                    }

                    let res = "";
                    let data = col;

                    while(data !== "Yes" || data !== "No" || data !== "Banned") {
                        if(data.length === 0) {
                            currentIdx++;
                            data = row.data.at(currentIdx);
                            continue;
                        }
                        if(data === "Yes" || data === "No" || data === "Banned") break;
                        
                        res += data;

                        currentIdx++;
                        data = row.data.at(currentIdx)
                    }
                    upgrade.restrictions = replaceIcons(res).split(",");
                    hasRestrictions = true;
                    continue;
                }

                if(!hasStd) {
                    upgrade.standard = col === "Banned" ? "B" : col === "Yes" ? 1 : 0;
                    currentIdx++;
                    hasStd = true;
                    continue;
                }

                if(!hasExt) {
                    upgrade.extended = col === "Banned" ? "B" : col === "Yes" ? 1 : 0;
                    currentIdx++;
                    hasExt = true;
                    continue;
                }

                currentIdx++;
            }


            const owner = groups.at(headerIdx);
            owner.upgrades.push(upgrade);
        }

    }

    console.log(groups);


    for(const group of groups) {
        const a = JSON.stringify(group);
        window.open(`data:application/json,${encodeURIComponent(a)}`);
    }
    
 
    return groups;
}