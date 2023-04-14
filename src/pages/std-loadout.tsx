import { useAsyncValue } from 'react-router-dom';
import { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import LoadingWrapper from "../components/LoadingWrapper";
import Icons, { type IconNames } from '../components/mdx/Icons';
import StringParseIcons from '../components/mdx/StringParseIcons';

export default LoadingWrapper(STDLoadout);

const IconFormat = /\[(?<icon>\w+(\s)*(\w+)*)\]/g;

const DifficultyColor = {
    White: "text-white",
    Red: "text-red-600"
}

const StatColor = {
    "attack": "text-red-600",
    "agility": "text-green-500",
    "shields": "text-cyan-200",
    "charges": "text-yellow-600",
    "force": "text-purple-200",
    "hull": "text-yellow-400"
}

type TypeDifficultyColor = keyof typeof DifficultyColor;

function STDLoadout() {
    const wrapper = useRef<HTMLDivElement>(null)
    const data = useAsyncValue() as { ship: Ships.StdShip, pilot: Ships.StdPilot, standardLoadout: Ships.UpgradeItem[] };
    console.log(data);
    return (
        <div className='flex-1 bg-neutral-100'>
            <div>
                <button onClick={async () => {
                    if (!wrapper.current) return;
                    await html2pdf(wrapper.current)
                }}>Print</button>
            </div>
            <main className='flex flex-1 h-full p-4 justify-center'>

                <div ref={wrapper} data-card="wrapper" className="max-w-4xl flex">
                    <div className="relative flex flex-col w-3/6 mr-4">
                        <section className="bg-slate-950 text-white flex px-2 py-2 items-end w-full gap-2">
                            <span className="text-orange-600 font-extrabold text-3xl p-2 font-kimberley">{data.pilot.initiative}</span>
                            <div className='w-full flex flex-col justify-center items-center bg-white text-black divide-y-2'>
                                <h1 className="font-bank font-bold text-xl"> {Array.from({ length: data.pilot?.limited ?? 0 }).map(_ => (<Icons.Unique />))}{data.pilot.name}</h1>

                                <div className="font-bank text-sm">{data.pilot?.caption}</div>
                            </div>
                            <div className="p-2">
                                <div className="h-8 w-8">
                                    <img className="w-full h-full object-contain" src="https://infinitearenas.com/xw2/images/artwork/logos/bytown-smugglers.png" alt="Faction icon" />
                                </div>
                            </div>
                        </section>

                        <div data-area="artwork" className="mb-4">
                            <img className="h-full w-full object-contain" src={data.pilot.artwork} alt="Ship artwork" />
                        </div>

                        <section data-area="stats" className='flex flex-wrap gap-2 justify-center'>
                            {data.ship.stats.map((stat, i) => {
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
                                                ) : null}
                                            </span>
                                        </div>
                                        <div className="font-kimberley z-10 flex justify-center items-center bg-gray-800 text-lg h-9 text-center pl-3 px-1 pr-2 rounded-r-md absolute left-9 border-2 border-gray-300">
                                            <span>{stat.type === "shields" && data.standardLoadout.some(item => item.xws === "shieldupgrade") ? stat.value + 1 :
                                                stat.type === "hull" && data.standardLoadout.some(item => item.xws === "hullupgrade") ? stat.value + 1 : stat.value}</span>
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
                                            {data.pilot.charges.recovers === 0 ? null :
                                                data.pilot.charges.recovers === 1 ? (<Icons.Recurring className="text-3xl" />) :
                                                    data.pilot.charges.recovers === 2 ? (<Icons.DoubleRecurring className="text-3xl" />) : null}
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
                                {(data.pilot.shipActions ?? data.ship.actions).map(action => {
                                    const Icon = Icons[action.type.replaceAll(" ", "") as IconNames];
                                    const LinkedIcon = action.linked ? Icons[action.linked.type.replaceAll(" ", "") as IconNames] : null
                                    return (
                                        <div className={`flex gap-4 text-center items-center justify-center ${DifficultyColor[action.difficulty as TypeDifficultyColor]}`}>
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
                                {data.standardLoadout.map(item => item.sides.map(value => value.actions?.map(a => {
                                    const Icon = Icons[a.type.replaceAll(" ", "") as IconNames];
                                    const LinkedIcon = a.linked ? Icons[a.linked.type as IconNames] : null
                                    return (
                                        <div className={`flex gap-4 text-center items-center justify-center ${DifficultyColor[a.difficulty as TypeDifficultyColor]}`}>
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
                                {data.standardLoadout.map(upgrade => (
                                    <li>
                                        <ul className="divide-y-2 space-y-2">
                                            {upgrade.sides.map(side => (
                                                <li>
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
        </div>
    );
}
//     <img src={data.ship.icon} alt="ship icon" />