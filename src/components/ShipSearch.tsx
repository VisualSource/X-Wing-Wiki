import Fuse, { type IFuseOptions, type FuseResult } from "fuse.js";
import { useState, useEffect, useRef, Fragment } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Dialog, Transition } from "@headlessui/react";
import { HiSearch, HiX } from "react-icons/hi";
import { useDebounce } from "use-debounce";

interface SearchBarProps {
  onClick: (data: any) => void;
  isOpen: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  data: any[];
}

const searchConfig = {
  isCaseSensitive: false,
  keys: [
    {
      name: "title",
      weight: 0.9,
    },
    {
      name: "tags",
      weight: 0.7,
    },
  ],
} satisfies IFuseOptions<any>;

export default function ShipSearch(props: SearchBarProps) {
  const scrollEl = useRef<HTMLDivElement>(null);
  const fuse = useRef(new Fuse(props.data, searchConfig));
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<FuseResult<any>[]>([]);
  const [searchState, setSearchState] = useState<string>(" ");
  const [search] = useDebounce(searchState, 200);

  const virtualizer = useVirtualizer({
    count: searchResults.length,
    estimateSize: () => 64,
    getScrollElement: () => scrollEl.current,
  });

  useEffect(() => {
    if (isFocused && search.length > 0) {
      const result = fuse.current.search(searchState);
      setSearchResults(result);
      return;
    }
  }, [isFocused, search]);

  return (
    <Transition appear show={props.isOpen[0]} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className="flex h-full flex-col items-center justify-start p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="h-5/6 w-11/12 transform overflow-hidden rounded-2xl bg-slate-900 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="mb-2 flex w-full font-bank text-lg font-medium leading-6 text-zinc-400"
                >
                  <span>Add Ship</span>
                  <button
                    onClick={() => props.isOpen[1](false)}
                    className="ml-auto"
                  >
                    <HiX />
                  </button>
                </Dialog.Title>
                <div className="mt-2">
                  <div className="group relative flex h-11 w-full items-center justify-center rounded bg-gray-700 pl-2 text-zinc-400 shadow-2xl">
                    <input
                      type="text"
                      autoComplete="off"
                      value={searchState}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(true)}
                      onChange={(ev) => setSearchState(ev.target.value)}
                      className="h-2/3 w-full border-none bg-transparent text-zinc-400 outline-none focus:ring-transparent"
                    />
                    <button
                      tabIndex={-1}
                      className="ml-1 h-full rounded-r pl-3 pr-3 group-hover:bg-gray-600 group-hover:text-zinc-500"
                    >
                      <HiSearch className="text-2xl text-zinc-400" />
                    </button>
                  </div>
                </div>
                <div ref={scrollEl} className="mt-2 h-5/6 overflow-y-scroll">
                  <div
                    className="relative flex flex-col gap-1"
                    style={{ height: `${virtualizer.getTotalSize()}px` }}
                  >
                    {virtualizer.getVirtualItems().map((item) => (
                      <button
                        onClick={() => {
                          props.onClick(searchResults[item.index].item);
                          props.isOpen[1](false);
                        }}
                        className="absolute left-0 top-0 my-1 flex h-14 w-full items-center gap-1 rounded-md bg-slate-800 px-2 text-white"
                        key={item.index}
                        style={{
                          transform: `translateY(${item.start}px)`,
                        }}
                      >
                        <img
                          className="pointer-events-none object-cover object-center"
                          src={
                            searchResults[item.index].item.faction_icon ??
                            "https://infinitearenas.com/xw2/images/artwork/logos/bytown-smugglers.png"
                          }
                          alt="faction logo"
                          height="30"
                          width="30"
                        />
                        <img
                          className="pointer-events-none object-cover object-center"
                          src={searchResults[item.index].item.ship_icon}
                          alt="ship icon"
                          height="30"
                          width="30"
                        />
                        <span className="font-eurostile">
                          {searchResults[item.index].item.title} (
                          {searchResults[item.index].item.id
                            .split("%3")
                            .at(3) ?? "Default Loadout"}
                          )
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
