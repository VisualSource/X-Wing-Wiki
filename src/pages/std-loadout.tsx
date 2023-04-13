import { Link, useAsyncValue } from 'react-router-dom';
import LoadingWrapper from "../components/LoadingWrapper";
import Icons, { type IconNames } from '../components/mdx/Icons';
import StringParseIcons from '../components/mdx/StringParseIcons';

export default LoadingWrapper(STDLoadout);

const IconFormat = /\[(?<icon>\w+(\s)*(\w+)*)\]/g;

const DifficultyColor = {
    White: "text-white",
    Red: "text-red-800"
}

type TypeDifficultyColor = keyof typeof DifficultyColor;

function STDLoadout() {
    const data = useAsyncValue() as { ship: Ships.StdShip, pilot: Ships.StdPilot, standardLoadout: Ships.UpgradeItem[] };

    return (
        <div className='flex-1 bg-neutral-100'>
            <main className='flex flex-1 h-full p-4 justify-center'>
                <div data-card="wrapper" className="max-w-3xl flex">
                    <div className="relative flex flex-col flex-shrink">
                        <section className="bg-slate-950 text-white flex px-2 py-2 items-end w-full gap-2">
                            <span className="text-orange-600 font-extrabold text-3xl p-2 font-kimberley">{data.pilot.initiative}</span>
                            <div className='w-full flex flex-col justify-center items-center bg-white text-black divide-y-2'>
                                <h1 className="font-bank font-bold text-xl"> {Array.from({ length: data.pilot?.limited ?? 0 }).map(value => ("*"))}{data.pilot.name}</h1>

                                <div className="font-bank text-sm">{data.pilot?.caption}</div>
                            </div>
                            <div className="p-2">
                                <div className="h-8 w-8">
                                    <img className="w-full h-full object-contain" src="https://infinitearenas.com/xw2/images/artwork/logos/bytown-smugglers.png" alt="Faction icon" />
                                </div>
                            </div>
                        </section>

                        <div>
                            <img className="h-full w-full object-contain" src={data.pilot.artwork} alt="Ship artwork" />
                        </div>

                        <section data-area="stats"></section>

                        <div>
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
                                    const LinkedIcon = action.linked ? Icons[action.linked.type as IconNames] : null
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

                    <div className="flex flex-col flex-grow w-1/2">
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
                                                    {side.charges ? (
                                                        <div className="text-yellow-400">
                                                            <div>{side.charges.value} Charge(s)</div>
                                                            <div>Recover {side.charges.recovers}</div>
                                                        </div>
                                                    ) : null}
                                                    {side.force ? (
                                                        <div>
                                                            <span> {side.force.value} Charges</span>
                                                            <span>Recover {side.force.recovers}</span>
                                                        </div>
                                                    ) : null}
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