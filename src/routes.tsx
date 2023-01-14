import { type RouteObject, defer } from "react-router-dom";
import { lazy, Suspense } from 'react';
import ErrorPage from "./pages/error-page";
import Loading from './components/Loading';

//https://dev.to/mondal10/react-router-lazy-load-route-components-4df
//https://github.com/guidokessels/xwing-data2/tree/master/data/quick-builds

const LazyComponent = ({ data }: { data: ()=>Promise<any> }) => {
    const Element = lazy(data);
    return (
        <Suspense fallback={<Loading/>}>
            <Element/>
        </Suspense>
    );
}

const search: RouteObject = {
    path: "/search",
    element: <LazyComponent data={()=>import("./pages/search")}/>,
    errorElement: <ErrorPage/>,
    loader: async ({ request }) => {
        const url = new URL(request.url);
        const query = url.searchParams.get("q") ?? "";

        let search = url.searchParams.get("t");
        if(!search || !["loadout","reference"].includes(search)) {
            search = localStorage.getItem("search_type") ?? "reference";
        }

        localStorage.setItem("search_type",search);

        return defer({
            query,
            search,
            data: search === "reference" ? import("./assets/search/rules") : import("./assets/search/loadouts")
        });
    }
}

const article: RouteObject = {
    path: "/article/:id",
    errorElement: <ErrorPage/>,
    element: <LazyComponent data={()=>import("./pages/articles")}/>,
    loader: async ({params: { id }}) => {
        const modules = import.meta.glob("/src/docs/*.mdx");
        const module = modules[`/src/docs/${id}.mdx`];
        if(!module) throw new Error("Not Found");
        return defer({ data: module() })
    }
} 

const loadout: RouteObject = {
    path: "/loadout/:id",
    element: <LazyComponent data={()=>import("./pages/loadouts")}/>,
    errorElement: <ErrorPage/>,
    loader: async ({params: { id }}) => {
        if(!id) throw new Error("Not Found");
        const [faction, ship] = id.split("-");

        return defer({
            data: new Promise(async (ok,rej)=>{
                try {
                    const request = await fetch(`/loadouts/${faction}.json`);

                    if(!request.ok) throw request;

                    const data = await request.json() as any[];

                    const content = data.find(x=>x.xws===ship);

                    if(!content) throw new Error("Not Found");

                    return ok({ default: content });
                } catch (error) {
                    rej(error)
                }
            })
        })
    }
} 

const home: RouteObject = {
    path: "/",
    element: <LazyComponent data={()=>import("./pages/index")}/>,
    errorElement: <ErrorPage/>,
    loader: async()=>{
        return defer({
            data: Promise.all([import("./assets/search/rules"),import("./assets/search/loadouts")])
        });
    }
}

const deck: RouteObject = {
    path: "/deck",
    element: <LazyComponent data={()=>import("./pages/deck")}/>,
    errorElement: <ErrorPage/>,
    loader: async () => {
        return defer({
            data: import("./assets/search/full_loadouts")
        });
    }
}

const fetchloadout = async (id: string[]) => {
    const request = await fetch(`/pilots/${id[0]}.json`);
    if(!request.ok) throw request;
    const data = await request.json();
    const ship = Object.values(data).find((value: any)=>value.xws === id[1]) as { xws: string; pilots: { xws: string;}[] };
    if(!ship) throw new Error(`Failed to find ship ${id[1]}`);
    const pilot = ship.pilots.find((pilot)=>pilot.xws === id[2]);
    if(!pilot) throw new Error(`Failed to fined pilot ${id[2]}`)
    delete (ship as any).pilots;
    (ship as any).pilots = pilot;
    return ship;
}

const fullLoadout: RouteObject = {
    path: "full-loadout/:id/*",
    element: <LazyComponent data={()=>import("./pages/loadouts/full")}/>,
    errorElement: <ErrorPage/>,
    loader: async ({ params }) => {
        const id = params.id?.split(":");
        if(!id) throw new Error("Failed to parse id");
        return defer({
            data: fetchloadout(id),
        })
    }
}

export default [
    loadout,
    home,
    article,
    search,
    deck,
    fullLoadout
] as RouteObject[];
