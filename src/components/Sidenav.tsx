import { Transition } from '@headlessui/react';
import { HiX } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function Sidenav(props: { show: boolean, setShow: (value: boolean)=>void }){
    return (
        <Transition as="aside" className="absolute left-0 top-0 h-screen w-screen z-40 flex" show={props.show}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
          <div className='bg-slate-900 w-2/3 md:w-1/3 relative flex-col'>
              <div className="p-6 flex justify-between w-full">
                  <img className="rounded-2xl h-16 w-16 md:h-24 md:w-24" src="/icons/android-chrome-192x192.png" alt="logo"/>
                  <div className="cursor-pointer" onClick={()=>props.setShow(false)}>
                      <HiX className="text-5xl"/>
                  </div>
              </div>
              <hr className="border-gray-600"/>
              <ul className='font-bank'>
                  <li className='flex'>
                      <Link to="/" className="border-b p-4 border-slate-500 w-full hover:bg-slate-800">Home</Link>
                  </li>
                  <li className='flex'>
                      <Link onClick={()=>props.setShow(false)} to="/search?t=reference" className="border-b p-4 border-slate-500 w-full hover:bg-slate-800">Search: Rules Reference</Link>
                  </li>
                  <li className='flex'>
                      <Link onClick={()=>props.setShow(false)} to="/search?t=loadout" className="border-b p-4 border-slate-500 w-full hover:bg-slate-800">Search: Loadouts</Link>
                  </li>
                  <li className='flex'>
                      <a target="_blank" href="https://www.atomicmassgames.com/s/SWZ_RulesReference_v144.pdf" className="p-4 w-full hover:bg-slate-800">Rules: PDF</a>
                  </li>
                  <li className='flex'>
                      <a target="_blank" href="https://www.atomicmassgames.com/s/SWZ_Errata_16.pdf" className="p-4 w-full hover:bg-slate-800">Errata: PDF</a>
                  </li>
                  <li className='flex'>
                      <a target="_blank" href="https://www.atomicmassgames.com/s/SWZ_Ship_Points_11252022.pdf" className="p-4 w-full hover:bg-slate-800">Ship Points: PDF</a>
                  </li>
                  <li className='flex'>
                      <a target="_blank" href="https://www.atomicmassgames.com/s/SWZ_Upgrade_Points_10282022.pdf" className="p-4 w-full hover:bg-slate-800">Upgrade Points: PDF</a>
                  </li>
                  <li className='flex'>
                      <a target="_blank" href="https://www.atomicmassgames.com/s/SWZ_Scenarios_072022-9lee.pdf" className="p-4 w-full hover:bg-slate-800">Secenarios: PDF</a>
                  </li>
                  <li className='flex'>
                      <a target="_blank" href="https://www.atomicmassgames.com/s/SWZ_BanRestricted_List_142.pdf" className="p-4 w-full hover:bg-slate-800">Ban List: PDF</a>
                  </li>
              </ul>
          </div>
          <div className='w-1/3 md:w-2/3 bg-gray-900 bg-opacity-95'></div>                               
      </Transition>
    );
}