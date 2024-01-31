import { Link, useLoaderData, useAsyncValue } from 'react-router-dom';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { useState, useEffect, useRef } from 'react';
import { HiMenu } from 'react-icons/hi';
import Fuse from 'fuse.js'

import SearchBar, { searchConfig } from '../../components/SearchBar';
import LoadingWrapper from '../../components/LoadingWrapper';
import ScrollToTop from '../../components/ScrollToTop';
import { Uppercase } from '../../utils/Uppercase';
import Sidenav from '../../components/Sidenav';

type Category = "all" | "rules" | "ships" | "points" | "errata" | "upgrades" | "banned-restricted" | "appendix" | "scenarios";

interface SearchState {
    title: string;
    category: string[];
    tags: string[];
    id: string;
    desc?: string;
}

const ReferenceCategory: Category[] = ["all", "rules", "ships", "points", "errata", "upgrades", "appendix", "scenarios", "banned-restricted"];
const LoadoutCategory = ["all", "ship", "pilot", "scum", "rebel", "separatist", "firstorder", "republic", "empire"];

const Search = () => {
    const [show, setShow] = useState<boolean>(false);
    const [searchFilter, setSearchFilter] = useState<string>("all");
    const SearchData = useAsyncValue() as { default: any[] };
    const fuse = useRef(new Fuse<SearchState>(SearchData.default, searchConfig))
    const [searchState, setSearchState] = useState<SearchState[]>(SearchData.default);
    const { query, search } = useLoaderData() as { query: string; search: string; };
    const virtualizer = useWindowVirtualizer({
        count: searchState.length,
        estimateSize: (index) => searchState[index].tags.length > 12 ? 1400 : 700,
    });

    useEffect(() => {
        fuse.current.setCollection(SearchData.default);
    }, [SearchData]);

    useEffect(() => {
        const data = fuse.current.search(query);
        if (searchFilter === "all") return setSearchState(data.map(value => value.item));

        const filter = searchFilter.toUpperCase();
        setSearchState(data.filter(value => value.item.category.some(cat => cat.includes(filter))).map(value => value.item));
    }, [searchFilter, query]);

    return (
        <div className='bg-slate-800 flex flex-col text-zinc-400 flex-grow'>
            <header className="bg-slate-900 pt-4 flex flex-col items-center justify-center sticky top-0 gap-2 z-10">
                <div className='flex w-11/12 md:w-8/12 lg:w-4/12 gap-4 items-center'>
                    <button onClick={() => setShow(true)}>
                        <HiMenu className="text-3xl" />
                    </button>
                    <div className="font-bold font-kimberley">
                        Star Wars: X-Wing Wiki
                    </div>
                </div>
                <div className='w-11/12 md:w-8/12 lg:w-4/12'>
                    <SearchBar data={SearchData.default} />
                </div>
                <div className='chrome-scrollbar font-bank flex font-bold w-11/12 md:w-8/12 lg:w-4/12 items-center gap-2 overflow-hidden text-lg overflow-x-scroll scrollbar-none'>
                    {(search === "reference" ? ReferenceCategory : LoadoutCategory).map(value => (
                        <button onClick={() => setSearchFilter(value)} key={value} className={`pb-1 transition-all ${searchFilter === value ? "text-blue-600 border-b border-blue-600 hover:text-blue-500 hover:border-blue-500" : "hover:text-zinc-300"}`}>
                            {Uppercase(value).replace("-", "\\")}
                        </button>
                    ))}
                </div>
            </header>
            <main className='flex justify-center h-full'>
                <div className='container'>
                    <div style={{ height: `${virtualizer.getTotalSize()}px` }} className="relative w-full flex flex-col items-center">
                        {virtualizer.getVirtualItems().map((row) => (
                            <div data-index={row.index} key={row.key} ref={virtualizer.measureElement} className="prose prose-invert absolute w-full h-max animate-fade" style={{ transform: `translateY(${row.start}px)` }}>
                                <Link to={`/${search === "reference" ? "article" : "loadout"}/${searchState[row.index].id}`} className="no-underline">
                                    <div className='p-2 h-max'>
                                        <h2 className='mb-1 mt-2 font-bank'>{searchState[row.index].title}</h2>
                                        <hr className="not-prose mb-2" />
                                        <div className='flex flex-wrap gap-2'>
                                            {searchState[row.index].category.map((tag, i) => (
                                                <span key={i} className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded">{tag}</span>
                                            ))}
                                            {searchState[row.index].tags.map((tag, i) => (
                                                <span key={i} className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-200 text-gray-700 rounded text-ellipsis max-w-[10rem] overflow-hidden">{tag}</span>
                                            ))}
                                            <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-500 text-white rounded">
                                                {searchState[row.index].title}
                                            </span>
                                        </div>
                                        <p className="text-zinc-400 text-base text-ellipsis font-eurostile">{searchState[row.index]?.desc ?? ""}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <ScrollToTop />
            <Sidenav show={show} setShow={setShow} />
        </div>
    );
}
export default LoadingWrapper(Search);