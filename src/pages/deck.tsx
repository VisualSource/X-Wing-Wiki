import { useState } from 'react';
import { Link, useAsyncValue } from 'react-router-dom';
import { HiMenu, HiPlus, HiTrash } from 'react-icons/hi';
import LoadingWrapper from '../components/LoadingWrapper';
import Sidenav from '../components/Sidenav';
import ShipSearch from '../components/ShipSearch';
import useDeckShips from '../hooks/useDeckShips';

export default LoadingWrapper(Deck);

interface ShipData {
    faction_icon: string;
    ship_icon: string;
    title: string;
    tags: [],
    id: string;
    limited: number;
}

function Deck() {
    const data = useAsyncValue() as { default: ShipData[] };
    const { ships, addShip, removeShip } = useDeckShips();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    return (
        <div className='bg-slate-800 flex flex-col text-zinc-400 flex-grow'>
            <header className="bg-slate-900 py-2 flex items-center justify-center sticky top-0 gap-2 z-10">
                <div className='flex w-11/12 md:w-8/12 lg:w-4/12 gap-4 items-center'>
                    <button onClick={() => setShow(true)}>
                        <HiMenu className="text-3xl" />
                    </button>
                    <div className="font-bold font-kimberley">
                        Quick Build builder
                    </div>

                    <button onClick={() => setIsOpen(true)} className="ml-auto flex items-center gap-1 px-4 py-2 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">
                        Add Ship <HiPlus className="text-white text-sm" />
                    </button>
                </div>
            </header>
            <main className="flex flex-col items-center flex-1">
                <div className="container max-w-none md:max-w-3xl p-4 flex-1">
                    <ul className="space-y-2">
                        {ships.map((item) => (
                            <li key={item.ship.id} className="flex items-center justify-between shadow bg-gray-900 rounded-md px-2 py-1">
                                <Link aria-label={`View STD Loadout ${item.ship.id}`} to={`/std-loadout/${encodeURIComponent(item.ship.id)}/${item.idx}`} className='flex w-full'>
                                    <div className="flex gap-2 items-center w-full">
                                        <div className="h-14 w-14">
                                            <img className="h-full w-full object-contain" src={item.ship.faction_icon} alt={item.ship.id} />
                                        </div>
                                        <div className="h-16 w-16">
                                            <img className="h-full w-full object-contain" src={item.ship.ship_icon} alt="ship icon" />
                                        </div>

                                        <div>
                                            <span className="bg-neutral-400 text-white p-1 rounded-md">{item.ship.title}</span>
                                        </div>
                                    </div>
                                    <div className='flex items-center'>
                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            removeShip(item.ship.id, item.idx);
                                        }} aria-label='Delete Ship' className="text-red-500 bg-gray-700 hover:bg-gray-800 p-1 shadow-xl rounded-sm">
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
            <ShipSearch isOpen={[isOpen, setIsOpen]} data={data.default} onClick={addShip} />
        </div>
    );
}