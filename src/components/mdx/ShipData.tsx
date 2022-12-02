
interface ShipDataProps {
    components: { [key: string]: any; }
    data: {
        ship: string;
        pilots: {
            keywords: string[];
            name: string;
            subtitle: string;
            cost: number;
            loadout: number;
            std: boolean | "B"; 
            ext: boolean; 
            bar: string[]
        }[]
    }[]
}


export default function ShipData({ data, components }: ShipDataProps) {
    return data.map((value,i)=>(
        <section key={i} className="not-prose text-white py-4">
            <h2 className="font-bold text-3xl mb-2 font-bank" id={value.ship.toLowerCase().replaceAll(" ","-")}>{value.ship}</h2>
            <hr className='m-0'/>
            <ul>
                {value.pilots.map((pilot,i)=>(
                    <li key={i} className="my-2 bg-slate-900 shadow-2xl p-2 rounded-md">
                        <h5 className='mb-1 font-bank'>{pilot.name}: <span className='text-sm font-eurostile text-gray-200'>{pilot.subtitle}</span></h5>
                        <div className='prose prose-invert'>
                            <table className='w-full'>
                                <thead>
                                    <tr>
                                        <th>Cost</th>
                                        <th>Loadout Value</th>
                                        <th>Upgrade Bar</th>
                                        <th>Std.</th>
                                        <th>Ext.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{pilot.cost}</td>
                                        <td>{pilot.loadout}</td>
                                        <td>
                                            {pilot.bar.map((icon,i)=>{
                                                const Icon = components[icon];
                                                if(!Icon) throw new TypeError(`Unkown icon (${icon}).`);
                                                return <Icon key={i}/>
                                            })}
                                        </td>
                                        <td>{pilot.std === "B" ? "Ban" : pilot.std ? "Yes" : "No"}</td>
                                        <td>{pilot.ext ? "Yes" : "No"}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='flex flex-wrap gap-2 items-center'>
                                <strong className='ml-2'>Keywords: </strong>
                                {pilot.keywords.map((word,i)=>(
                                    <span key={i} className="font-eurostile-demi text-sm">{word}</span>
                                ))}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    ));
}