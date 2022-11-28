import { type RouteObject, json, useLoaderData, Link, useNavigate, useLocation, Await, defer } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import { useEffect, Suspense } from 'react';
import SearchBar from '../../components/SearchBar';
import ScrollToTop from '../../components/ScrollToTop'
import ErrorPage from '../error-page';

import "../../icons.css";

const modules = import.meta.glob("/src/docs/*.mdx");

export const articleRoute: RouteObject = {
    path: "article/:id",
    element: <Article/>,
    errorElement: <ErrorPage/>,
    loader: async ({params: { id }}) => {
        const module = modules[`/src/docs/${id}.mdx`];
        if(!module) throw json("Not Found",{ status: 404, statusText: "Not Found" });
        return defer({ data: module() })
    }
};

const components = {
    a: (props: any) => {
       switch (props.title) {
        case "external":
            return <a href={props.href}>{props.children}</a>;
        default:
            return <Link replace={props?.title === "id"} to={props.href}>{props.children}</Link>;
       }
    },
    ImgCenter: (props: { src: string; alt: string; }) => (
        <div className="flex justify-center">
            <img src={props.src} className="rounded" alt={props.alt}/>
        </div>
    ),
    DoubleCenter: (props: { srcA: string; srcB: string; altA: string; altB: string; textA: string; textB: string; }) => (
        <div className='flex gap-4 flex-wrap items-center w-full justify-center'>
            <div className='flex flex-col items-center justify-center'>
                <div className="flex justify-center"> 
                    <img className="rounded" src={props.srcA} alt={props.altA}/>
                </div>
                <p className='text-sm italic'>{props.textA}</p>
            </div>
            <div className='"flex flex-col items-center justify-center'>
                <div className="flex justify-center">
                    <img className="rounded" src={props.srcB} alt={props.altB}/>
                </div>
                <p className='text-sm italic'>{props.textB}</p>
            </div>
        </div>
    ),
    TextCenter: (props: { text: string, children?: any }) => (
        <div className="text-sm italic flex justify-center">
            <span className="w-1/2 text-center">{props?.text ?? props?.children}</span>
        </div>
    ),
    TextImgDec: (props: any)=> (
        <div className='flex gap-2'>
            <p>{props.children}</p>
            <div>
                <div className='flex justify-center'>
                    <img style={{ marginBottom: 0 }} src={props.src} alt={props.alt}/>
                </div>
                <p className='text-sm italic'>{props.text}</p>
            </div>
        </div>
    ),
    ImgText: (props: any) => (
        <div className='flex justify-center w-full'>
            <div className='flex items-center gap-8'>
                <div>
                    <img className="object-cover object-center" alt={props.src} src={props.src}/>
                </div>
                <div>
                    <p className='text-sm italic'>{props.text}</p>
                </div>
            </div>
        </div>
    ),
    OffsetLeft: (props: any) => (
        <div className="ml-8">
            {props.children}
        </div>
    ),
    Header: (props: { title: string; version: string; icon?: any }) => (
        <div data-version={props?.version ?? "1.4.4"}>
            <h1 className="uppercase" style={{ marginBottom: "1rem" }}>{props.title}{ props?.icon && <span className="lowercase"> [{props.icon}]</span>}</h1>
            <hr style={{ margin: "0" }} />
            <p className='text-sm pt-2'>Version: <span className="font-eurostile-demi text-gray-500">{props?.version ?? "1.4.4"}</span></p>
        </div>
    ),
    Straight: () => <i className='font-straight'></i>,
    Boost: () => <i className="font-boost"></i>,
    Lock: () => <i className="font-lock"></i>,
    Forcepower: ()=><i className="font-forcepower"></i>,
    Focus: ()=><i className="font-focus"></i>,
    Title: () => <i className='font-title'></i>,
    Slam: () => <i className='font-slam'></i>,
    Jam: ()=><i className="font-jam"></i>,
    Reload: () => <i className='font-reload'></i>,
    Reinforce: () => <i className="font-reinforce"></i>,
    Cannon: ()=> <i className="font-cannon"></i>,
    Torpedo: ()=><i className="font-torpedo"></i>,
    Missile: ()=><i className="font-missile"></i>,
    FrontArc: ()=><i className="font-frontarc"></i>,
    LeftArc: ()=><i className="font-leftarc"></i>,
    RightArc: ()=><i className="font-rightarc"></i>,
    RearArc: ()=><i className="font-reararc"></i>,
    BullsEyeArc:()=><i className="font-bullseyearc"></i>,
    FullFrontArc: ()=><i className="font-fullfrontarc"></i>,
    FullRearArc: ()=><i className="font-fullreararc"></i>,
    SingleTurretArc: ()=><i className="font-singleturretarc"></i>,
    DoubleTurretArc: ()=><i className="font-doubleturretarc"></i>,
    Rotate: () => <i className="font-rotatearc"></i>,
    Evade: ()=><i className="font-evade"></i>,
    Hit: ()=><i className="font-hit"></i>,
    Crit: ()=><i className="font-crit"></i>,
    BarrelRoll: ()=><i className="font-barrelroll"></i>,
    Calculate: ()=><i className='font-calculate'></i>,
    Charge:()=><i className="font-charge"></i>,
    Shield: ()=><i className="font-shield"></i>,
    Energy: ()=> <i className="font-energy"></i>,
    Cloak: ()=><i className="font-cloak"></i>,
    RotateArc: ()=><i className="font-rotatearc uppercase"></i>,
    LeftBank: ()=><i className='font-bankleft'></i>,
    RightBank: ()=><i className="font-bankright"></i>,
    LeftTurn: ()=><i className="font-turnleft"></i>,
    RightTurn: ()=><i className='font-turnright'></i>,
    KTurn: ()=><i className='font-kturn'></i>,
    TallonRight:()=><i className='font-trollright'></i>,
    TallonLeft: () => <i className='font-trollleft'></i>,
    SegnorLeft: ()=><i className='font-sloopleft'></i>,
    SegnorRight: ()=><i className='font-sloopright'></i>,
    Stationary: ()=><i className='font-stop'></i>,
    RStraight: ()=><i className='font-reversestraight'></i>,
    RBankRight: () =><i className='font-reversebankright'></i>,
    RBankLeft: () =><i className='font-reversebankleft'></i>,
    Device: () => <i className='font-device'></i>,
    Crew: ()=><i className='font-crew'></i>,
    Coordinate: ()=><i className="font-coordinate"></i>,
    Linked: ()=><i className='font-linked'></i>,
    TacticalRelay: ()=><i className='font-tacticalrelay'></i>,
    Astromech: ()=><i className="font-astromech"></i>,
    Configuration: () => <i className='font-config'></i>,
    Gunner: ()=><i className='font-gunner'></i>,
    Illicit: () =><i className="font-illicit"></i>,
    ForcePowerU: () => <i className="font-forcepoweru"></i>,
    Modification: () => <i className='font-modification'></i>,
    Sensor: () => <i className='font-sensor'></i>,
    Talent: ()=><i className='font-talent'></i>,
    Tech: () => <i className='font-tech'></i>,
    Turret: ()=><i className='font-turret'></i>,
    RangeBonusIndicator: ()=><i className='font-rangebonusindicator'></i>,
    Hardpoint: ()=><i className='font-hardpoint'></i>,
    Point: () =><i className='font-point'></i>,
    Cargo: ()=><i className='font-cargo'></i>,
    Command: ()=> <i className='font-command'></i>,
    Team: ()=><i className='font-team'></i>
}

const Loader = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <h3>Loading</h3>
        </div>
    );
}

function Article(){
    const navigate = useNavigate();
    const location = useLocation();
    const { data }= useLoaderData() as any;

    useEffect(()=>{
        if(location.hash.length === 0) return;
        let elem = document.getElementById(location.hash.slice(1));
        if(elem)  window.scrollTo({ top: elem.offsetTop - 100, behavior: "smooth" });
    },[location]);

    return (
        <div className='bg-slate-800 flex-col flex-grow'>
            <header className="bg-slate-900 pt-4 flex flex-col items-center justify-center sticky top-0 gap-2 z-10 pb-4">
                <SearchBar className='w-11/12 md:w-8/12 lg:w-4/12'/>
            </header>
            <main className='flex flex-col justify-center items-center pt-5 pb-5 mx-3 mb-10'>
                <div className='container prose prose-invert md:prose-lg prose-ol:prose-ol:list-alpha prose-ul:prose-ul:list-circle prose-em:text-zinc-500 prose-headings:font-bank prose-em:font-eurostile prose-p:font-eurostile-demi'>
                    <div className='my-5'>
                        <button onClick={()=>navigate(-1)} type="button" className="px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out flex items-center gap-2"><HiArrowLeft/> Back</button>
                    </div>
                    <Suspense fallback={<Loader/>}>
                        <Await resolve={data} children={({ default: Item })=>(
                            <Item components={components}/>
                        )} />
                    </Suspense>
                </div>
            </main>
            <ScrollToTop/>
        </div>
    );
}