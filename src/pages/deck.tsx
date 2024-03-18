import { HiMenu, HiPlus, HiTrash } from "react-icons/hi";
import { Link, useAsyncValue } from "react-router-dom";
import { useState } from "react";

import LoadingWrapper from "../components/LoadingWrapper";
import ShipSearch from "../components/ShipSearch";
import useDeckShips from "../hooks/useDeckShips";
import Sidenav from "../components/Sidenav";

export default LoadingWrapper(Deck);

interface ShipData {
  faction_icon: string;
  ship_icon: string;
  title: string;
  tags: [];
  id: string;
  limited: number;
}

function Deck() {
  const data = useAsyncValue() as { default: ShipData[] };
  const { ships, addShip, removeShip } = useDeckShips();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="flex flex-grow flex-col bg-slate-800 text-zinc-400">
      <header className="sticky top-0 z-10 flex items-center justify-center gap-2 bg-slate-900 py-2">
        <div className="flex w-11/12 items-center gap-4 md:w-8/12 lg:w-4/12">
          <button onClick={() => setShow(true)}>
            <HiMenu className="text-3xl" />
          </button>
          <div className="font-kimberley font-bold">Quick Build builder</div>

          <button
            onClick={() => setIsOpen(true)}
            className="ml-auto flex items-center gap-1 rounded bg-green-500 px-4 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg"
          >
            Add Ship <HiPlus className="text-sm text-white" />
          </button>
        </div>
      </header>
      <main className="flex flex-1 flex-col items-center">
        <div className="container max-w-none flex-1 p-4 md:max-w-3xl">
          <ul className="space-y-2">
            {ships.map((item) => (
              <li
                key={item.ship.id}
                className="flex items-center justify-between rounded-md bg-gray-900 px-2 py-1 shadow"
              >
                <Link
                  aria-label={`View STD Loadout ${item.ship.id}`}
                  to={`/std-loadout/${encodeURIComponent(item.ship.id)}/${item.idx}`}
                  className="flex w-full"
                >
                  <div className="flex w-full items-center gap-2">
                    <div className="h-14 w-14">
                      <img
                        className="h-full w-full object-contain"
                        src={
                          item.ship.faction_icon ??
                          "https://infinitearenas.com/xw2/images/artwork/logos/bytown-smugglers.png"
                        }
                        alt={item.ship.id}
                      />
                    </div>
                    <div className="h-16 w-16">
                      <img
                        className="h-full w-full object-contain"
                        src={item.ship.ship_icon}
                        alt="ship icon"
                      />
                    </div>

                    <div>
                      <span className="rounded-md bg-neutral-400 p-1 text-white">
                        {item.ship.title} (Loadout{" "}
                        {item.ship.id.split("%3").at(3) ?? "Default"})
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removeShip(item.ship.id, item.idx);
                      }}
                      aria-label="Delete Ship"
                      className="rounded-sm bg-gray-700 p-1 text-red-500 shadow-xl hover:bg-gray-800"
                    >
                      <HiTrash className="h-8 w-8" />
                    </button>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Sidenav show={show} setShow={setShow} />
      <ShipSearch
        isOpen={[isOpen, setIsOpen]}
        data={data.default}
        onClick={addShip}
      />
    </div>
  );
}
