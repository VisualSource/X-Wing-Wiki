import SearchBar from '../components/SearchBar';
import { useAsyncValue } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { HiChevronDown, HiCheck } from 'react-icons/hi';
import { Fragment, useState, useEffect} from 'react';
import { Uppercase } from '../utils/Uppercase';
import LoadingWrapper from '../components/LoadingWrapper';

export type SearchType = "reference"|"loadout";

export default LoadingWrapper(App);

function App() {
  const [Rules,Loadouts] = useAsyncValue() as [{ default: any[] },{ default: any[] }];

  const [searchData,setSearchData] = useState<any[]>(localStorage.getItem("search_type") === "reference" ? Rules.default : Loadouts.default);
  const [searchType,setSearchType] = useState<SearchType>(localStorage.getItem("search_type") as SearchType|null ?? "reference");

  useEffect(()=>{
    localStorage.setItem("search_type",searchType);
    if(searchType === "reference") return setSearchData(Rules.default);
    setSearchData(Loadouts.default);
  },[searchType]);

  return (
    <div className="bg-slate-800 h-full flex flex-col gap-4 justify-center items-center">
        <div className='w-11/12 sm:w-2/12 animate-fade'>
          <SearchBar data={searchData}/>
        </div>
        <div className='w-11/12 sm:w-2/12 flex justify-center text-zinc-400 animate-fade'>
          <Menu as="div" className="relative w-2/3 z-0">
            <Menu.Button className="p-2 border-b border-zinc-400 w-full flex-grow flex items-center z-0 text-sm">
              Search: {Uppercase(searchType)} <HiChevronDown className="ml-auto -mr-1 h-5 w-5"/>
            </Menu.Button>
           <Transition as={Fragment}   
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95">
            <Menu.Items className="absolute bg-gray-700 rounded-md top-12 w-full z-0">
                  <Menu.Item as="div" className="flex items-center px-2 py-2 select-none hover:bg-gray-600 rounded-t-md" onClick={()=>setSearchType("reference")}>
                    Reference {searchType==="reference" ? <HiCheck className='ml-auto'/> : null}
                  </Menu.Item>
                  <Menu.Item as="div" className="flex items-center px-2 py-2 select-none hover:bg-gray-600 rounded-b-md" onClick={()=>setSearchType("loadout")}>
                    Loadouts {searchType==="loadout" ? <HiCheck className='ml-auto'/> : null}
                  </Menu.Item>
              </Menu.Items>
           </Transition>
          </Menu>
        </div>
    </div>
  )
}
