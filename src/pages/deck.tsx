import { useEffect, useState } from 'react';
import { Link, useAsyncValue } from 'react-router-dom';
import { HiMenu, HiPlus, HiTrash } from 'react-icons/hi';
import LoadingWrapper from '../components/LoadingWrapper';
import Sidenav from '../components/Sidenav';
import ShipSearch from '../components/ShipSearch';

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
    const data = useAsyncValue() as {  default: ShipData[]  };
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const [show,setShow] = useState<boolean>(false);
    const [ships,setShips] = useState<ShipData[]>([]);

    useEffect(()=>{
        const load = async () => {
            const data: ShipData[] = [];
            for(let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if(!key || !key.startsWith("ship-")) continue;
                const ship = localStorage.getItem(key);
                if(!ship) continue;
                data.push(JSON.parse(ship));
            }
            setShips(data);
        }
        load();
        return () => {
            setShips([]);
        }
    },[]);

    return (
        <div className='bg-slate-800 flex flex-col text-zinc-400 flex-grow'>
            <header className="bg-slate-900 py-2 flex items-center justify-center sticky top-0 gap-2 z-10">
                <div className='flex w-11/12 md:w-8/12 lg:w-4/12 gap-4 items-center'>
                    <button onClick={()=>setShow(true)}>
                        <HiMenu className="text-3xl"/>
                    </button>
                    <div className="font-bold font-kimberley">
                        Quick Build builder
                    </div>

                    <button onClick={()=>setIsOpen(true)} className="ml-auto flex items-center gap-1 px-4 py-2 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">
                        Add Ship <HiPlus className="text-white text-sm"/>
                    </button>
                </div>
            </header>
            <main className="flex flex-col items-center justify-center">
                { ships.length > 0 ? (
                    <div className="w-5/6 sm:w-4/6 md:w-3/6 lg:w-2/6">
                        <button onClick={async ()=>{ 
                             for(let i = 0; i < localStorage.length; i++) {
                                const key = localStorage.key(i);
                                if(!key || !key.startsWith("ship-")) continue;
                                localStorage.removeItem(key);
                            }
                            setShips([]);
                        }} className="flex items-center justify-center my-2 gap-2 w-full px-2 py-2 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">
                            Clear All <HiTrash className="text-xl"/>
                        </button>
                    </div>
                ) : (
                    <div className="w-5/6 sm:w-4/6 md:w-3/6 lg:w-2/6 text-center flex items-center justify-center my-2 font-bank text-3xl">
                        No ships selected!
                    </div>
                ) }
                <ul className="w-5/6 sm:w-4/6 md:w-3/6 lg:w-2/6">
                    {ships.map((ship,i)=>(
                        <li key={i} role="button" className="w-full py-4 bg-slate-700 rounded-lg shadow-lg px-2 my-2 flex">
                           <Link to={{ pathname: `/full-loadout/${ship.id}`, search: `ship=${i}` }} className="flex justify-start w-full items-center gap-1">
                                <img className="object-cover object-center pointer-events-none" src={ship.faction_icon} alt="faction logo" height="30" width="30" /> 
                                <img className="object-cover object-center pointer-events-none" src={ship.ship_icon} alt="faction logo" height="30" width="30" /> 
                                <span className="font-bank select-none">{ship.title}</span>
                           </Link>
                           <button onClick={()=>{ 
                                    setShips(state=>{ 
                                        localStorage.removeItem(`ship-${decodeURIComponent(ship.id)}`);
                                        return state.filter((_,key)=>key!==i);
                                    }); 
                                    }} className="inline-block px-2 py-2 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-auto">
                                    <HiTrash className="text-xl"/>
                                </button>
                        </li>
                    ))}
                </ul>
            </main>
            <Sidenav show={show} setShow={setShow}/>
            <ShipSearch isOpen={[isOpen,setIsOpen]} data={data.default} onClick={(data)=>{
                setShips((state)=>{
                    localStorage.setItem(`ship-${decodeURIComponent(data.id)}`,JSON.stringify(data));
                    return [...state,data];
                })
            }}/>
        </div>
    );
}