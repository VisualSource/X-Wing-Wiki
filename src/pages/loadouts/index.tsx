import { useNavigate, useAsyncValue } from 'react-router-dom';
import { useState } from 'react';
import LoadingWrapper from '../../components/LoadingWrapper';
import Icons from '../../components/mdx/Icons';
import { Uppercase } from '../../utils/Uppercase';

import "../../icons.css";

interface Loadout {
    default: {
        builds: {
            threat :number,
            pilots: {
                id: string;
                upgrades?: { [key: string]: string[] };
            }[]
        }[];
        ship: string;
    }
}

export default LoadingWrapper(Loadout);

const color: { [key: number]: string } = {
    1: "bg-green-600",
    2: "bg-yellow-400",
    3: "bg-orange-600",
    4: "bg-red-600",
    5: "bg-purple-800"
}

function Loadout() {
    const loadout = useAsyncValue() as Loadout;
    const [offset,setOffset] = useState<{ start: number; end: number }>({ start: 0, end: 3 });
    const navitage = useNavigate();

    return (
        <div className='bg-slate-800 flex flex-col text-zinc-400 flex-grow'>
             <header className="bg-slate-900 pt-4 flex items-center justify-center sticky top-0 gap-2 z-10 pb-4">
                <div className='w-11/12 md:w-8/12 lg:w-4/12 flex'>
                    <button onClick={()=>navitage(-1)} type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Back</button>
                    <div className='flex gap-3 mx-auto'>
                        <button onClick={()=>{
                            const start = offset.start - 3;
                            const end = offset.start;
                            if(start < 0) return; 
                            setOffset({ start,end });
                        }} type="button" className="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">Prev</button>
                        <button onClick={()=>{
                            const start = offset.end;
                            const end = offset.end + 3;
                            if(end > loadout.default.builds.length + 2) return;
                            setOffset({ start,end });
                        }} type="button" className="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">
                            Next
                        </button>
                    </div>
                </div>
            </header>
            <main className='flex justify-center h-full'>
                <div className="container mx-auto flex justify-center">
                    <div role="card" className="flex flex-col items-center w-full sm:w-3/4 md:w-1/3 my-1 md:my-6 rounded-lg bg-slate-900 shadow-2xl">
                        <header className='flex bg-gray-900 w-full justify-center rounded-t-lg items-center'>
                            <h1 className="text-2xl md:text-4xl py-4 font-bank text-center w-full">{loadout.default.ship}</h1>
                        </header>
                       <div className='bg-gray-900 flex flex-col h-full w-11/12 border mb-6 px-4 rounded-lg border-gray-800'>
                            {loadout.default.builds.slice(offset.start,offset.end).map(({ pilots, threat },i,data)=>(
                                <section key={i} className='flex-grow flex justify-center items-center flex-col'>
                                    <h3 className="text-lg md:text-2xl py-4 font-bank">{pilots[0].id}</h3>
                                    <span role="threat" className='flex gap-2 w-1/3'>
                                        {Array.from({ length: threat }).map((_,idx)=>(
                                            <div key={idx} className={`h-2 w-full flex-grow rounded-sm ${color[threat]}`}></div>
                                        ))}
                                        {Array.from({ length: 5 - threat }).map((_,i)=>(
                                             <div key={i} className="h-2 w-full flex-grow rounded-sm border border-gray-800"></div>
                                        ))}
                                    </span>
                                    <div className='text-md md:text-xl gap-1 md:gap-4 w-full grid grid-rows-2 grid-cols-2 mt-4 font-eurostile'>
                                        {Object.entries(pilots[0]?.upgrades ?? []).map(([key,text],i)=>
                                            text.map((upgrade,idx)=>{
                                                const icon = key === "force-power" ? "ForcePowerU": Uppercase(key);
                                                const Icon = (Icons as any)[icon];
                                                if(!Icon) return <span key={`${i}-${idx}`} className='flex gap-2 items-center'>NO ICON: {key}</span>
                                                return (
                                                    <span key={`${i}-${idx}`} className='flex gap-2 items-center'>
                                                        <Icon/>{upgrade}
                                                    </span>
                                                );
                                            }).flat(1)
                                           )}
                                    </div>
                                    { data.length !== i ? <hr className="w-11/12 mt-auto border-gray-800"/> : null }
                                </section>
                            ))}
                       </div>
                    </div>
                </div>
            </main>
        </div>
    );
}