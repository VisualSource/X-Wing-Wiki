import { HiChevronDown, HiCheck, HiMenu } from "react-icons/hi";
import { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useAsyncValue } from "react-router-dom";

import LoadingWrapper from "../components/LoadingWrapper";
import SearchBar from "../components/SearchBar";
import { Uppercase } from "../utils/Uppercase";
import Sidenav from "../components/Sidenav";

export type SearchType = "reference" | "loadout";

export default LoadingWrapper(App);

function App() {
  const [Rules, Loadouts] = useAsyncValue() as [
    { default: any[] },
    { default: any[] },
  ];
  const [show, setShow] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<any[]>(
    localStorage.getItem("search_type") === "reference"
      ? Rules.default
      : Loadouts.default,
  );
  const [searchType, setSearchType] = useState<SearchType>(
    (localStorage.getItem("search_type") as SearchType | null) ?? "reference",
  );

  useEffect(() => {
    localStorage.setItem("search_type", searchType);
    if (searchType === "reference") return setSearchData(Rules.default);
    setSearchData(Loadouts.default);
  }, [searchType]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 bg-slate-800 text-zinc-400">
      <div className="absolute right-4 top-4 text-zinc-400">
        <button type="button" onClick={() => setShow(true)}>
          <HiMenu className="text-4xl" />
        </button>
      </div>
      <div className="w-11/12 animate-fade sm:w-2/12">
        <SearchBar data={searchData} />
      </div>
      <div className="flex w-11/12 animate-fade justify-center text-zinc-400 sm:w-2/12">
        <Menu as="div" className="relative z-0 w-2/3">
          <Menu.Button className="z-0 flex w-full flex-grow items-center border-b border-zinc-400 p-2 text-sm">
            Search: {Uppercase(searchType)}{" "}
            <HiChevronDown className="-mr-1 ml-auto h-5 w-5" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute top-12 z-0 w-full rounded-md bg-gray-700">
              <Menu.Item
                as="div"
                className="flex select-none items-center rounded-t-md px-2 py-2 hover:bg-gray-600"
                onClick={() => setSearchType("reference")}
              >
                Reference{" "}
                {searchType === "reference" ? (
                  <HiCheck className="ml-auto" />
                ) : null}
              </Menu.Item>
              <Menu.Item
                as="div"
                className="flex select-none items-center rounded-b-md px-2 py-2 hover:bg-gray-600"
                onClick={() => setSearchType("loadout")}
              >
                Loadouts{" "}
                {searchType === "loadout" ? (
                  <HiCheck className="ml-auto" />
                ) : null}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <Sidenav show={show} setShow={setShow} />
    </div>
  );
}
