import Fuse from 'fuse.js'
import { json, Link, useLoaderData, useLocation, type RouteObject } from 'react-router-dom';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { HiMenu, HiX } from 'react-icons/hi';
import ScrollToTop from '../../components/ScrollToTop';
import SearchBar from '../../components/SearchBar';
import SearchList from '../../assets/documents';
import ErrorPage from '../error-page';


type Category = "all" | "rules" | "ships" | "points" | "errata" | "upgrades" | "banned-restricted" | "appendix";

interface SearchResults {
   refIndex: number
   item: {
    title: string;
    category: string[];
    tags: string[];
    id: string;
    desc?: string;
   }
}

const fuse = new Fuse(SearchList,{
    isCaseSensitive: false,
    keys: [
        { 
            name: "title",
            weight: 0.7 
        },
        {
            name: "tags",
            weight: 0.3
        }
    ]
});

export const searchRoute: RouteObject = {
    path: "/search",
    element: <Search/>,
    errorElement: <ErrorPage/>,
    loader: async ({ request }) => {
        const url = new URL(request.url);
        const search = url.searchParams.get("q");

        const data = fuse.search(search ?? "");

        return json({ results: data, query: search },200);
    }
}; 

const useSearchState = () => {
    const loaderData = useLoaderData() as { results: SearchResults[], query: string; };
    const [searchParam,setSearchParam] = useState(loaderData.query);
    const [searchState,setSearchState] = useState(loaderData.results);
    return {
        searchState,
        setSearchParam,
        setSearchState,
        searchParam
    };
}

function Search(){
    const [showSidenav,setShowSidenav] = useState<boolean>(false);
    const { searchParam, searchState, setSearchParam, setSearchState } = useSearchState();
    const [currentState,setCurrentState] = useState(searchState);
    const [category,setCategory] = useState<Category>("all");
    const location = useLocation();

    const virtualizer = useWindowVirtualizer({
        count: currentState.length,
        estimateSize: (index) => currentState[index].item.tags.length > 12 ? 1050 : 400,
    });

    useEffect(()=>{
        const query = new URLSearchParams(location.search);

        if(query.has("q") && searchParam !== query.get("q")) {
            const data = fuse.search(query.get("q") ?? "");
            setSearchParam(query.get("q") ?? "");
            setSearchState(data);
        }
    },[location.search]);

    useEffect(()=>{
        if(category === "all") {
            setCurrentState(searchState);
            return;
        }

        setCurrentState(searchState.filter(value=>value.item.category.includes(category.toUpperCase())))

    },[searchState,category]);

    return (
        <div className='bg-slate-800 flex flex-col text-zinc-400 flex-grow'>
            <header className="bg-slate-900 pt-4 flex flex-col items-center justify-center sticky top-0 gap-2 z-10">
                <div className='flex w-11/12 md:w-8/12 lg:w-4/12 gap-4 items-center'>
                    <button onClick={()=>setShowSidenav(true)}>
                        <HiMenu className="text-3xl"/>
                    </button>
                    
                    <div className="font-bold font-kimberley">
                        Star Wars: X-Wing Wiki
                    </div>
                </div>
                <SearchBar className='w-11/12 md:w-8/12 lg:w-4/12'/>
                <div className='font-bank flex font-bold w-11/12 md:w-8/12 lg:w-4/12 items-center gap-2 overflow-hidden text-lg overflow-x-scroll scrollbar-none'>
                    {(["all","rules","ships","points", "errata","upgrades","appendix","scenarios","banned-restricted"] as Category[]).map(value=>(
                        <button onClick={()=>setCategory(value)} key={value} className={`pb-1 transition-all ${category === value ? "text-blue-600 border-b border-blue-600 hover:text-blue-500 hover:border-blue-500" : "hover:text-zinc-300"}`}>
                            {value.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()).replace("-","\\")}
                        </button>
                    ))}
                </div>
            </header>
            <main className='flex justify-center h-full'>
                <div className='container'>
                    <div style={{ height: virtualizer.getTotalSize() }} className="relative w-full flex flex-col items-center">
                        { virtualizer.getVirtualItems().map((row)=>(
                            <div data-index={row.index} key={row.key} ref={virtualizer.measureElement} className="prose prose-invert absolute w-full h-max" style={{ transform: `translateY(${row.start}px)` }}>
                               <Link to={`/article/${currentState[row.index].item.id}`} className="no-underline">
                                    <div className='p-2 h-max'>
                                        <h2 className='mb-1 mt-2 font-bank'>{currentState[row.index].item.title}</h2>
                                        <hr className="not-prose mb-2"/>
                                        <div className='flex flex-wrap gap-2'>
                                            {currentState[row.index].item.category.map((tag,i)=>(
                                                <span key={i} className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded">{tag}</span>
                                            ))}
                                            {currentState[row.index].item.tags.map((tag,i)=>(
                                                <span key={i} className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-200 text-gray-700 rounded text-ellipsis max-w-[10rem] overflow-hidden">{tag}</span>
                                            ))}
                                            <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-500 text-white rounded">
                                                {currentState[row.index].item.title}
                                            </span>
                                        </div>
                                        <p className="text-zinc-400 text-base text-ellipsis font-eurostile">{currentState[row.index].item?.desc ?? ""}</p>
                                    </div>
                               </Link>
                            </div>
                        )) }
                    </div>
                </div>
            </main>
            <ScrollToTop/>
            <Transition appear={true} as="aside" className="absolute left-0 top-0 h-screen w-screen z-40 flex" show={showSidenav}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
                <div className='bg-slate-900 w-2/3 md:w-1/3 relative flex-col'>
                    <div className="p-6 flex justify-between w-full">
                        <img className="rounded-2xl h-16 w-16 md:h-24 md:w-24" src="/icons/android-chrome-192x192.png" alt="logo"/>
                        <div className="cursor-pointer" onClick={()=>setShowSidenav(false)}>
                            <HiX className="text-5xl"/>
                        </div>
                    </div>
                    <hr className="border-gray-600"/>
                    <ul className='font-bank'>
                        <li className='flex'>
                            <Link to="/" className="border-b p-4 border-slate-500 w-full hover:bg-slate-800">Home</Link>
                        </li>
                        <li className='flex'>
                            <Link to="https://www.atomicmassgames.com/s/SWZ_Ship_Points_11252022.pdf" className="p-4 w-full hover:bg-slate-800">Rules: PDF</Link>
                        </li>
                        <li className='flex'>
                            <Link to="https://www.atomicmassgames.com/s/SWZ_Errata_16.pdf" className="p-4 w-full hover:bg-slate-800">Errata: PDF</Link>
                        </li>
                        <li className='flex'>
                            <Link to="https://www.atomicmassgames.com/s/SWZ_Ship_Points_11252022.pdf" className="p-4 w-full hover:bg-slate-800">Ship Points: PDF</Link>
                        </li>
                        <li className='flex'>
                            <Link to="https://www.atomicmassgames.com/s/SWZ_Upgrade_Points_10282022.pdf" className="p-4 w-full hover:bg-slate-800">Upgrade Points: PDF</Link>
                        </li>
                        <li className='flex'>
                            <Link to="https://www.atomicmassgames.com/s/SWZ_Scenarios_072022-9lee.pdf" className="p-4 w-full hover:bg-slate-800">Secenarios: PDF</Link>
                        </li>
                        <li className='flex'>
                            <Link to="https://www.atomicmassgames.com/s/SWZ_BanRestricted_List_142.pdf" className="p-4 w-full hover:bg-slate-800">Ban List: PDF</Link>
                        </li>
                    </ul>
                </div>
                <div className='w-1/3 md:w-2/3 bg-gray-900 bg-opacity-95'></div>                               
            </Transition>
        </div>
    );
}