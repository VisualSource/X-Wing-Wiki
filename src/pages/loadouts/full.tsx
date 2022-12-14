import { useAsyncValue, useNavigate, useParams, useRoutes, RouteObject } from "react-router-dom";
import { useEffect, useState } from 'react';
import { HiArrowDown } from "react-icons/hi";
import LoadingWrapper from "../../components/LoadingWrapper";

import "../../icons.css";


const MOVMENT_REF: { [key: string]: any } = {
    T: <i className="font-turnleft"/>,
    Y: <i className="font-turnright"/>,
    B: <i className="font-bankleft"/>,
    N: <i className="font-bankright"/>,
    F: <i className="font-straight"/>,
    K: <i className="font-kturn"/>,
    E: <i className="font-trollleft"/>,
    R: <i className="font-trollright" />,
    O: <i className="font-stop"/>,
    L: <i className="font-sloopleft"/>,
    P: <i className="font-sloopright"/>
}

const COLOR: { [key: string]: string } = {
    W: "text-white",
    R: "text-red-700",
    B: "text-blue-700",
    P: "text-purple-700"
}

const PageDail = ({ movements }: { movements: string[] }) => {
    const [dial,setDial] = useState<string[]>(movements);

    return (
       <>
        <div className="flex gap-3 mb-4">
            <button onClick={()=>{
                setDial(state=>{
                    const last = state[dial.length-1];
                    return [last,...state.slice(0,dial.length-1)];
                })
            }} type="button" className="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">
                LEFT
            </button>
            <button onClick={()=>{
                setDial(state=>{
                  
                    return [...state.slice(1),state[0]];
                });
            }} type="button" className="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">
                RIGHT
            </button>
        </div>
        <div className="w-full flex items-center justify-center">
            <HiArrowDown className="text-3xl"/>
        </div>
        <div className="relative h-72 w-72 flex justify-center">
            {dial.map((value,i,a)=>{
                const [len,MOVEMENT,DIFF] = value.split("");
                return (
                     <div key={i} className="flex flex-col text-3xl absolute h-72" style={{ "transform": `rotate(${i *  (360/a.length)}deg)` }}>
                        <span className={COLOR[DIFF]}>{MOVMENT_REF[MOVEMENT] ?? null}</span>
                        <span className="font-kimberley select-none">{len}</span>
                    </div>
                );
            })}
        </div>
       </>
    );
}

const ShipCard = ({data}: any) => {
    return (
        <div className="flex flex-col justify-center mx-2">
            <div className="relative flex flex-col">
                <img className="shadow-md object-contain" src={data.pilots.image} alt={data.pilots.xws}/>
            </div>
        </div>
    );
}

const UpgradeCard = ({data}: any) => {
    const [side,setSide] = useState<boolean>(false);
 
    return (
        <div className="flex flex-col justify-center mx-2 h-full items-center relative">
            {data.sides.length > 1 ? (
                <div className="flex gap-3 justify-self-start absolute top-2 w-1/2 z-20">
                    <button onClick={()=>setSide(!side)} type="button" className="inline-block w-full px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-900 hover:shadow-lg focus:bg-blue-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-900 active:shadow-lg transition duration-150 ease-in-out">
                        Flip
                    </button>
                </div>
            ) : null }
           <div className="rotate-90 sm:rotate-0 w-full flex justify-center items-center h-full">
                <img className="h-full w-full shadow-md object-center object-contain" src={data.sides.length > 1 ? data.sides[side ? 1 : 0].image : data.sides[0].image} alt={data.xws}/>
           </div>
        </div>
    );
}

function FullLoadout(){
    const { id } = useParams<"id">();
    const loadout = useAsyncValue() as { dial: string[]; pilots: { loadout_full: { [key:string]: { xws: string; }[] } };  };
    const navigate = useNavigate();
    const router = useRoutes([
        {
            index: true,
            element: <ShipCard data={loadout}/>
        },
        {
            path: "/dial",
            element: <PageDail movements={loadout.dial}/>
        },
        ...Object.entries(loadout.pilots.loadout_full).map(([key,value])=>{
            return value.map((item,i)=>({ path: `/${key}-${item.xws}-${i}`, element: <UpgradeCard data={item}/> } as RouteObject))}).flat(1)
    ]);
    const [page,setPage] = useState<number>(1);
    const pages = ["dial","",
        ...Object.entries(loadout.pilots.loadout_full).map(([key,value])=>value.map((item,i)=>(`${key}-${item.xws}-${i}`))).flat(1)    
    ];

    useEffect(()=>{
        navigate(`/full-loadout/${id}/${pages[page]}`, { replace: true });
    },[page]);

    return (
        <div className='bg-slate-800 flex flex-col text-zinc-400 flex-grow'>
             <header className="bg-slate-900 pt-4 flex items-center justify-center sticky top-0 gap-2 z-10 pb-4">
                <div className='w-11/12 md:w-8/12 lg:w-4/12 flex'>
                    <button onClick={()=>navigate(-1)} type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Back</button>
                    <div className='flex gap-3 mx-auto'>
                        <button onClick={()=>{
                            setPage((state)=>{
                                if((state - 1) >= 0) state--;
                                return state;
                            });
                        }} type="button" className="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">Prev</button>
                        <button onClick={()=>{
                            setPage((state)=>{
                                if((state + 1) < pages.length)  state++;
                                return state;
                            });
                        }} type="button" className="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">
                            Next
                        </button>
                    </div>
                </div>
            </header>
            <main className='flex flex-col justify-center h-full items-center'>
                {router}
            </main>
        </div>
    );
}

export default LoadingWrapper(FullLoadout);