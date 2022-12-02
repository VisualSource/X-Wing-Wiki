import Fuse from 'fuse.js'
import { Transition } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { useState, useEffect, useRef } from "react";
import { HiSearch } from 'react-icons/hi';
import { Uppercase } from '../utils/Uppercase';

export interface FormState {
    search: string;
}

interface SearchBarProps {
   readonly data: any[];
}

export const searchConfig = { 
    isCaseSensitive: false, 
    keys: [
        { 
            name: "title",
            weight: 0.7
        },
        {
            name: "tags",
            weight: 0.4
        }
    ] 
}

export default function SearchBar(props: SearchBarProps){
    const fuse = useRef(new Fuse(props.data,searchConfig));
    const navigate = useNavigate();
    const [isFocused,setIsFocused] = useState<boolean>(false);
    const [searchResults,setSearchResults] = useState<string[]>([]);
    const [sujestionsOpen, setSujestionsOpen] = useState<boolean>(false);
    const [searchState, setSearchState] = useState<string>("");
    const [search] = useDebounce(searchState,200);

    useEffect(()=>{
        fuse.current.setCollection(props.data);
    },[props.data]);

    useEffect(()=>{
        if(isFocused && search.length > 0) {
            const result = fuse.current.search(searchState);
            setSearchResults(result.map(value=>value.item.title).slice(0, result.length > 9 ? 9 : result.length));
            if(result.length > 0) setSujestionsOpen(true);
            return;
        }
        setSujestionsOpen(false);
    },[isFocused,search]);

    const onSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();
        setIsFocused(false);
        navigate(`/search?q=${encodeURIComponent(search)}`)
    };
    
    return (
        <form onSubmit={onSubmit} className={`flex justify-center bg-gray-700 h-11 w-full items-center pl-2 group shadow-2xl relative text-zinc-400 ${sujestionsOpen ? "rounded-t" : "rounded"}`}>
            <input type="text" autoComplete='off' value={searchState} onFocus={()=>setIsFocused(true)} onBlur={()=>setIsFocused(false)} onChange={(ev)=>setSearchState(ev.target.value)} className='w-full h-2/3 bg-transparent outline-none text-zinc-400 border-none focus:ring-transparent'/>
            <div className="absolute top-11 left-0 w-full z-10">
                <Transition 
                    show={sujestionsOpen}
                    enter="transition duration-100 ease-out" 
                    enterFrom="transform scale-95 opacity-0" 
                    enterTo="transform scale-100 opacity-100" 
                    leave="transition duration-75 ease-out" 
                    leaveFrom="transform scale-100 opacity-100" 
                    leaveTo="transform scale-95 opacity-0"
                >
                   <div className="bg-gray-700 rounded-b border-t border-slate-800 w-full pb-1 flex flex-col">
                        {searchResults.map((value,i)=>(
                            <Link to={`/search?q=${encodeURIComponent(value)}`} key={i} className="cursor-pointer hover:bg-gray-600 pl-3 py-4 md:py-2">
                                {Uppercase(value)}
                            </Link>
                        ))}
                   </div>
                </Transition>
            </div>
           
            <button tabIndex={-1} type="submit" className="ml-1 pl-3 pr-3 group-hover:bg-gray-600 group-hover:text-zinc-500 h-full rounded-r">
                <HiSearch className="text-2xl text-zinc-400"/>
            </button>
        </form>
    );
}