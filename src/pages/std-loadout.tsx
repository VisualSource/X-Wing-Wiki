import { useAsyncValue, useNavigate } from 'react-router-dom';
import { useRef, useState, useCallback } from 'react';
import LoadingWrapper from "../components/LoadingWrapper";
import Icons, { type IconNames } from '../components/mdx/Icons';
import StringParseIcons from '../components/mdx/StringParseIcons';
import { HiMenu } from 'react-icons/hi';
import Sidenav from '../components/Sidenav';

import html2canvas from 'html2canvas';

export default LoadingWrapper(STDLoadout);

const IconFormat = /\[(?<icon>\w+(\s)*(\w+)*)\]/g;

const DifficultyColor = {
    White: "text-white",
    Red: "text-red-600",
    Purple: "text-purple-600",
    Blue: "text-blue-400"
}

const StatColor = {
    "attack": "text-red-600",
    "agility": "text-green-500",
    "shields": "text-cyan-200",
    "charges": "text-yellow-600",
    "force": "text-purple-200",
    "hull": "text-yellow-400",
    "energy": "text-pink-500"
}

type TypeDifficultyColor = keyof typeof DifficultyColor;

const Recovers = ({ value }: { value: number }) => {
    switch (value) {
        case 1:
            return (<Icons.Recurring className="text-3xl" />);
        case 2:
            return (<Icons.DoubleRecurring className="text-3xl" />);
        default:
            return null;
    }
}

function STDLoadout() {
    const [showImage, setShowImage] = useState(true);
    const [show, setShow] = useState<boolean>(false);
    const navigate = useNavigate()
    const wrapper = useRef<HTMLDivElement>(null)
    const data = useAsyncValue() as { ship: Ships.StdShip, pilot: Ships.StdPilot, standardLoadout: Ships.UpgradeItem[] };

    const shipStats = useCallback(() => {
        const stats = [...data.ship.stats];

        if (data.standardLoadout.some(item => item.xws === "shieldupgrade")) {
            const stat = stats.find(value => value.type === "shields");
            if (!stat) {
                stats.push({ type: "shields", value: 1 });
            } else {
                stat.value += 1;
            }
        }

        if (data.standardLoadout.some(item => item.xws === "hullupgrade")) {
            const stat = stats.find(value => value.type === "hull");
            if (!stat) {
                stats.push({ type: "hull", value: 1 });
            } else {
                stat.value += 1;
            }
        }

        return stats;
    }, [data]);



    return (
        <div className='flex flex-col flex-1 bg-neutral-100'>
            <header className="bg-slate-900 py-2 flex items-center justify-center sticky top-0 gap-2 z-10 text-white">
                <div className='flex w-11/12 md:w-8/12 lg:w-4/12 gap-4 items-center'>
                    <button onClick={() => setShow(true)}>
                        <HiMenu className="text-3xl" />
                    </button>
                    <div className="font-bold font-kimberley">
                        Quick Build builder
                    </div>

                    <div>
                        <input checked={showImage} onClick={(ev) => setShowImage((ev.target as HTMLInputElement).checked)} type="checkbox" />
                        <label htmlFor="">Hide Image</label>
                    </div>

                    <button onClick={() => navigate("/deck")} className="ml-auto flex items-center gap-1 px-4 py-2 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">
                        Back to builder
                    </button>
                </div>
            </header>
            <main className='flex flex-1 h-full p-4 justify-center mt-4'>
                <div ref={wrapper} data-card="wrapper" className="max-w-4xl flex">
                    <div className="flex flex-col w-3/6 mr-4">
                        <section className="bg-slate-950 flex h-14">
                            <div className="text-orange-600 font-extrabold text-3xl font-kimberley text-center flex justify-center items-center w-10">{data.pilot.initiative}</div>
                            <div className='w-full flex flex-col justify-center items-center bg-white text-black text-center'>
                                <h1 className="font-bank font-bold text-xl"> {Array.from({ length: data.pilot?.limited ?? 0 }).map((_, i) => (<Icons.Unique key={i} />))}{data.pilot.name}</h1>
                                {data.pilot?.caption ? (
                                    <>

                                        <div className="font-bank text-sm">{data.pilot?.caption}</div>
                                    </>
                                ) : null}
                            </div>
                        </section>

                        {showImage ? (
                            <div data-area="artwork">
                                <img className="h-full w-full object-contain" src={data.pilot.artwork} alt="Ship artwork" />
                            </div>
                        ) : null}

                        <section data-area="stats" className='flex flex-wrap gap-6 justify-center mt-4'>
                            {shipStats().map((stat, i) => {
                                const Icon = stat.arc ? Icons[stat.arc.replaceAll(" ", "") as IconNames] : null;

                                return (
                                    <div className={`flex relative items-center mr-4 ${StatColor[stat.type]}`} key={i}>
                                        <div className="flex rounded-3xl h-12 w-12 bg-gray-800 justify-center z-20">
                                            <span>
                                                {Icon ? (
                                                    <Icon className="text-3xl pt-1" />
                                                ) : stat.type === "agility" ? (
                                                    <Icons.Agility className="text-3xl pt-1" />
                                                ) : stat.type === "hull" ? (
                                                    <Icons.Hull className="text-3xl pt-1" />
                                                ) : stat.type === "shields" ? (
                                                    <Icons.Shield className="text-3xl pt-1" />
                                                ) : stat.type === "energy" ? (
                                                    <Icons.Energy className="text-3xl pt-1" />
                                                ) : null}
                                            </span>
                                        </div>
                                        <div className="font-kimberley z-10 flex justify-center items-center bg-gray-800 text-lg h-9 text-center pl-3 px-1 pr-2 rounded-r-md absolute left-9 border-2 border-gray-300">
                                            <span>{stat.value}</span>
                                            {stat.recovers ? (<Recovers value={stat.recovers} />) : null}
                                        </div>
                                    </div>
                                );
                            })}
                            {data.pilot?.charges ? (
                                <div className={`flex relative items-center mr-4 ${StatColor["charges"]}`}>
                                    <div className="flex rounded-3xl h-12 w-12 bg-gray-800 justify-center z-20">
                                        <span>
                                            <Icons.Charge className="text-3xl" />
                                        </span>
                                    </div>
                                    <div className="flex font-kimberley z-10  items-center bg-gray-800 text-lg h-9 pl-3 pr-2 rounded-r-md absolute left-9 border-2 border-gray-300">
                                        <span>{data.pilot.charges.value}</span>
                                        <span className="ml-0.5">
                                            <Recovers value={data.pilot.charges.recovers} />
                                        </span>
                                    </div>
                                </div>
                            ) : null}
                            {data.pilot.force ? (
                                <div className={`flex relative items-center mr-4 ${StatColor["force"]}`}>
                                    <div className="flex rounded-3xl h-12 w-12 bg-gray-800 justify-center z-20">
                                        <span>
                                            <Icons.Forcecharge className="text-3xl" />
                                        </span>
                                    </div>
                                    <div className="flex font-kimberley z-10 items-center bg-gray-800 text-lg h-9 pl-3 pr-2 rounded-r-md absolute left-9 border-2 border-gray-300">
                                        <span>{data.pilot.force.value}</span>
                                        <span className="ml-0.5">
                                            {data.pilot.force.recovers === 0 ? null :
                                                data.pilot.force.recovers === 1 ? (<Icons.Recurring className="text-3xl" />) :
                                                    data.pilot.force.recovers === 2 ? (<Icons.DoubleRecurring className="text-3xl" />) : null}
                                        </span>
                                    </div>
                                </div>
                            ) : null}

                        </section>

                        <div data-area="actions-ability">
                            <section data-area="ability" className="font-eurostile divide-y-2 p-4">
                                {data.pilot?.text ? (<p>{data.pilot?.text}</p>) : null}
                                <p>{StringParseIcons(data.pilot?.ability ?? "", Icons, IconFormat)}</p>
                                {data.pilot?.shipAbility ? (
                                    <p><span className="font-extrabold">{data.pilot?.shipAbility?.name}: </span>{StringParseIcons(data.pilot?.shipAbility?.text ?? "", Icons, IconFormat)}</p>
                                ) : null}
                            </section>
                            <section data-area="actions" className='flex gap-4 bg-gray-700 items-center justify-center text-lg p-2 divide-x-2'>
                                {(data.pilot.shipActions ?? data.ship.actions).map((action, i) => {
                                    const Icon = Icons[action.type.replaceAll(" ", "") as IconNames];
                                    const LinkedIcon = action.linked ? Icons[action.linked.type.replaceAll(" ", "") as IconNames] : null
                                    return (
                                        <div key={i} className={`flex gap-4 text-center items-center justify-center ${DifficultyColor[action.difficulty as TypeDifficultyColor]}`}>
                                            <span className="pb-1 pl-4"><Icon /></span>
                                            {action.linked ? (
                                                <div className={`flex items-center justify-center gap-2 ${DifficultyColor[action.linked.difficulty as TypeDifficultyColor]}`}>
                                                    <span className="text-white pb-1"><Icons.Linked /></span>
                                                    {LinkedIcon ? <span className="pb-1"><LinkedIcon /></span> : null}
                                                </div>
                                            ) : null}
                                        </div>
                                    )
                                }
                                )}
                                {data.standardLoadout.map(item => item.sides.map((value, id) => value.actions?.map((a, i) => {
                                    const Icon = Icons[a.type.replaceAll(" ", "") as IconNames];
                                    const LinkedIcon = a.linked ? Icons[a.linked.type as IconNames] : null
                                    return (
                                        <div key={id + i} className={`flex gap-4 text-center items-center justify-center ${DifficultyColor[a.difficulty as TypeDifficultyColor]}`}>
                                            <span className="pb-1 pl-4"><Icon /></span>
                                            {a.linked ? (
                                                <div className={`flex items-center justify-center gap-2 ${DifficultyColor[a.linked.difficulty as TypeDifficultyColor]}`}>
                                                    <span className="text-white pb-1"><Icons.Linked /></span>
                                                    {LinkedIcon ? <span className="pb-1"><LinkedIcon /></span> : null}
                                                </div>
                                            ) : null}
                                        </div>
                                    )
                                }))).flat(2).filter(Boolean)}
                            </section>
                        </div>
                    </div>

                    <div className="flex flex-col flex-grow w-3/6">
                        <div className="bg-slate-800 w-full font-bank">
                            <h1 className="text-white py-2 px-1 text-center">{data.ship.name}</h1>
                        </div>
                        <section data-area="name">
                            <ul className="divide-y-2 space-y-2 px-2">
                                {data.standardLoadout.map((upgrade, id) => (
                                    <li key={id}>
                                        <ul className="divide-y-2 space-y-2">
                                            {upgrade.sides.map((side, i) => (
                                                <li key={i}>
                                                    <h3 className="font-bold tracking-tight text-center">{side.title}</h3>
                                                    <p>
                                                        {StringParseIcons(side?.ability ?? "", Icons, IconFormat)}
                                                    </p>
                                                    <div className="flex flex-wrap mt-2 gap-2">
                                                        {side.attack ? (
                                                            <div className="text-red-600 bg-gray-800 py-0.5 px-4 rounded-md border-2 border-gray-400">
                                                                <div className='flex items-center justify-center gap-2'>
                                                                    <span>
                                                                        {Icons[side.attack.arc.replaceAll(" ", "") as IconNames]({ className: "text-3xl" })}
                                                                    </span>
                                                                    <span className="font-kimberley text-xl text-center pt-1">{side.attack.value}</span>
                                                                </div>
                                                                <div className='flex items-center justify-center gap-2'>
                                                                    {side.attack.ordnance ? (
                                                                        <span>
                                                                            <Icons.RangeBonusIndicator className="text-lg" />
                                                                        </span>
                                                                    ) : null}
                                                                    <span className="font-kimberley text-white pt-1">{side.attack.minrange}-{side.attack.maxrange}</span>
                                                                </div>
                                                            </div>
                                                        ) : null}
                                                        {side.charges ? (
                                                            <div className={`flex relative items-center mr-4 ${StatColor["charges"]}`}>
                                                                <div className="flex rounded-3xl h-12 w-12 bg-gray-800 justify-center z-20">
                                                                    <span>
                                                                        <Icons.Charge className="text-3xl" />
                                                                    </span>
                                                                </div>
                                                                <div className="flex font-kimberley z-10  items-center bg-gray-800 text-lg h-9 pl-3 pr-2 rounded-r-md absolute left-9 border-2 border-gray-300">
                                                                    <span>{side.charges.value}</span>
                                                                    <span className="ml-0.5">
                                                                        {side.charges.recovers === 0 ? null :
                                                                            side.charges.recovers === 1 ? (<Icons.Recurring className="text-3xl" />) :
                                                                                side.charges.recovers === 2 ? (<Icons.DoubleRecurring className="text-3xl" />) : null}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ) : null}
                                                        {side.force ? (
                                                            <div className={`flex relative items-center mr-4 ${StatColor["force"]}`}>
                                                                <div className="flex rounded-3xl h-12 w-12 bg-gray-800 justify-center z-20">
                                                                    <span>
                                                                        <Icons.Forcecharge className="text-3xl" />
                                                                    </span>
                                                                </div>
                                                                <div className="flex font-kimberley z-10 items-center bg-gray-800 text-lg h-9 pl-3 pr-2 rounded-r-md absolute left-9 border-2 border-gray-300">
                                                                    <span>{side.force.value}</span>
                                                                    <span className="ml-0.5">
                                                                        {side.force.recovers === 0 ? null :
                                                                            side.force.recovers === 1 ? (<Icons.Recurring className="text-3xl" />) :
                                                                                side.force.recovers === 2 ? (<Icons.DoubleRecurring className="text-3xl" />) : null}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </div>
            </main>
            <div className="text-white">
                <Sidenav show={show} setShow={setShow} />
            </div>
        </div>
    );
}
//     <img src={data.ship.icon} alt="ship icon" />