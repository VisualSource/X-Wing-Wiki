import { useAsyncValue, useNavigate } from 'react-router-dom';
import { useRef, useState, useMemo } from 'react';
import { HiMenu } from 'react-icons/hi';
import html2pdf from 'html2pdf.js';

import StringParseIcons from '../components/mdx/StringParseIcons';
import Icons, { type IconNames } from '../components/mdx/Icons';
import LoadingWrapper from "../components/LoadingWrapper";
import Sidenav from '../components/Sidenav';

export default LoadingWrapper(STDLoadout);

const IconFormat = /\[(?<icon>\w+(\s)*(\w+)*)\]/g;

const color: { [key: number]: string } = {
    1: "text-green-600",
    2: "text-yellow-400",
    3: "text-orange-600",
    4: "text-red-600",
    5: "text-purple-800"
}

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
            return (<Icons.Recurring />);
        case 2:
            return (<Icons.DoubleRecurring />);
        default:
            return null;
    }
}

const Charge: React.FC<{ type: Ships.ChargeType; arc?: string; value: number; recovers?: number; }> = ({ type, arc, value, recovers }) => {
    let Icon = null;
    switch (type) {
        case "agility":
            Icon = Icons.Agility;
            break;
        case "charges":
            Icon = Icons.Charge;
            break;
        case "energy":
            Icon = Icons.Energy;
            break;
        case "force":
            Icon = Icons.Forcecharge;
            break;
        case "hull":
            Icon = Icons.Hull;
            break;
        case "shields":
            Icon = Icons.Shield;
            break;
        case "attack":
            Icon = arc ? Icons[arc.replaceAll(" ", "") as IconNames] : null;
        default:
            break;
    }

    return (
        <div className={`flex ${StatColor[type]} text-xl`}>
            <div>
                {Icon ? <Icon /> : null}
            </div>
            <div className="mt-0.5">
                <span className="font-kimberley ml-1">{value}</span>
                {recovers ? (<Recovers value={recovers} />) : null}
            </div>
        </div>
    );
}

const Action: React.FC<{ action: Ships.ShipAction }> = ({ action }) => {
    const Icon = Icons[action.type.replaceAll(" ", "") as IconNames];
    const LinkedIcon = action.linked ? Icons[action.linked.type.replaceAll(" ", "") as IconNames] : null;

    return (
        <div className='flex gap-1'>
            <span className={DifficultyColor[action.difficulty as TypeDifficultyColor]}>
                <Icon />
            </span>
            {action.linked ? (
                <div className='flex gap-1'>
                    <span>
                        <Icons.Linked />
                    </span>
                    {LinkedIcon ? (
                        <span className={DifficultyColor[action.linked.difficulty as TypeDifficultyColor]}>
                            <LinkedIcon />
                        </span>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}

function STDLoadout() {
    const [show, setShow] = useState<boolean>(false);
    const navigate = useNavigate()
    const wrapper = useRef<HTMLDivElement>(null)
    const data = useAsyncValue() as { loadoutId: number, ship: Ships.StdShip, pilot: Ships.StdPilot, standardLoadout: Ships.UpgradeItem[] };

    const shipStats = useMemo(() => {
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
                    <button onClick={async () => {
                        if (!wrapper.current) return;
                        html2pdf().from(wrapper.current).set({
                            margin: 4,
                            filename: `${data.ship.xws}-${data.pilot.xws}-${data.loadoutId}.pdf`
                        }).save();
                    }} className="ml-auto flex items-center gap-1 px-4 py-2 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">
                        PDF
                    </button>
                    <button onClick={() => navigate("/deck")} className="ml-auto flex items-center gap-1 px-4 py-2 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">
                        Back to builder
                    </button>
                </div>
            </header>
            <main className='flex flex-col items-center gap-4 flex-1 h-full p-4 justify-center mt-4'>
                <div data-area="artwork" className="w-1/2">
                    <img className="h-full w-full object-contain" src={data.pilot.artwork} alt="Ship artwork" />
                </div>
                <div ref={wrapper} data-card="wrapper" className="w-[800px] h-[800px] flex gap-2">
                    <section>
                        <div data-stats="title" className="flex items-center gap-4 justify-center">
                            <div className="text-orange-600 font-kimberley text-3xl">{data.pilot.initiative}</div>
                            <div className='flex flex-col items-center justify-center'>
                                <h1 className='font-bold flex items-center'>
                                    <span className='mr-1 font-bank'>{Array.from({ length: data.pilot?.limited ?? 0 }).map((_, i) => (<Icons.Unique key={i} />))}</span>
                                    {data.pilot.name}
                                </h1>
                                {data.pilot?.caption ? (
                                    <div className="font-eurostile">{data.pilot?.caption}</div>
                                ) : null}
                            </div>
                        </div>
                        <div data-stats="charges" className='flex gap-4 justify-center'>
                            {shipStats.map((stat, i) => (
                                <Charge key={i} recovers={stat.recovers} arc={stat.arc} type={stat.type} value={stat.value} />
                            ))}
                            {data.pilot?.charges ? (
                                <Charge type="charges" recovers={data.pilot.charges.recovers} value={data.pilot.charges.value} />
                            ) : null}
                            {data.pilot.force ? (
                                <Charge type="force" recovers={data.pilot.force.recovers} value={data.pilot.force.value} />
                            ) : null}
                        </div>
                        <section data-stats="ability" className="px-2">
                            {data.pilot?.text ? (<p className='font-eurostile'>{data.pilot.text}</p>) : null}
                            <p className="font-eurostile">{StringParseIcons(data.pilot?.ability ?? "", Icons, IconFormat)}</p>
                            {data.pilot?.shipAbility ? (
                                <p className='py-2'>
                                    <span className="font-bold">{data.pilot?.shipAbility?.name}: </span>
                                    <span className="font-eurostile">{StringParseIcons(data.pilot?.shipAbility?.text ?? "", Icons, IconFormat)}</span>
                                </p>
                            ) : null}
                        </section>
                        <section data-stats="actions" className='flex gap-4 justify-center bg-gray-600 p-2 items-center'>
                            {(data.pilot.shipActions ?? data.ship.actions).map((action, i) => (
                                <Action key={i} action={action} />
                            ))}
                            {data.standardLoadout.map(item => item.sides.map((value, id) => value.actions?.map((a, i) => (
                                <Action key={id + 1} action={a} />
                            )))).flat(2).filter(Boolean)}
                        </section>
                        <div className='flex justify-center my-2'>
                            <h1 className="font-eurostile">{data.ship.name}</h1>
                        </div>
                        <div className='flex justify-center my-2'>
                            <h1 className="font-eurostile">Threat: <span className={`${data.pilot.threat > 5 ? color[4] : color[data.pilot.threat]} font-kimberley`}>{data.pilot.threat}</span></h1>
                        </div>


                    </section>
                    <section>
                        <ul>
                            {data.standardLoadout.map((upgrade, id) => (
                                <li key={id}>
                                    <ul>
                                        {upgrade.sides.map((side, i) => (
                                            <li key={i}>
                                                <h3 className="font-bold">{side.title}</h3>
                                                <p className="text-xs">
                                                    {StringParseIcons(side?.ability ?? "", Icons, IconFormat)}
                                                </p>
                                                <div className='flex items-center gap-2 flex-wrap'>
                                                    {side.attack ? (
                                                        <div className={`${StatColor["attack"]} flex flex-col items-center`}>
                                                            <div>
                                                                <span>
                                                                    {Icons[side.attack.arc.replaceAll(" ", "") as IconNames]({})}
                                                                </span>
                                                                <span className="font-kimberley ml-1 mt-0.5">{side.attack.value}</span>
                                                            </div>
                                                            <div>
                                                                {side.attack.ordnance ? (
                                                                    <span>
                                                                        <Icons.RangeBonusIndicator />
                                                                    </span>
                                                                ) : null}
                                                                <span className="text-black font-kimberley">{side.attack.minrange}-{side.attack.maxrange}</span>
                                                            </div>
                                                        </div>
                                                    ) : null}
                                                    {side.charges ? (
                                                        <Charge type="charges" value={side.charges.value} recovers={side.charges.recovers} />
                                                    ) : null}
                                                    {side.force ? (
                                                        <Charge type="force" value={side.force.value} recovers={side.force.recovers} />
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
            </main>
            <div className="text-white">
                <Sidenav show={show} setShow={setShow} />
            </div>
        </div>
    );
}