import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { HiX } from "react-icons/hi";

export default function Sidenav(props: {
  show: boolean;
  setShow: (value: boolean) => void;
}) {
  return (
    <Transition
      as="aside"
      className="absolute left-0 top-0 z-40 flex h-screen w-screen"
      show={props.show}
      enter="transition ease-in-out duration-300 transform"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leave="transition ease-in-out duration-300 transform"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
    >
      <div className="relative w-2/3 flex-col bg-slate-900 md:w-1/3 overflow-y-scroll">
        <div className="flex w-full justify-between p-6">
          <img
            className="h-16 w-16 rounded-2xl md:h-24 md:w-24"
            src="/icons/android-chrome-192x192.png"
            alt="logo"
          />
          <div className="cursor-pointer" onClick={() => props.setShow(false)}>
            <HiX className="text-5xl" />
          </div>
        </div>
        <hr className="border-gray-600" />
        <ul className="font-bank">
          <li className="flex">
            <Link
              to="/"
              className="w-full border-b border-slate-500 p-4 hover:bg-slate-800 text-sm"
            >
              Home
            </Link>
          </li>
          <li className="flex">
            <Link
              onClick={() => props.setShow(false)}
              to="/deck"
              className="w-full border-b border-slate-500 p-4 hover:bg-slate-800 text-sm"
            >
              Quick Builder
            </Link>
          </li>
          <li className="flex">
            <Link
              onClick={() => props.setShow(false)}
              to="/search?t=reference"
              className="w-full border-b border-slate-500 p-4 hover:bg-slate-800 text-sm"
            >
              Search: Rules Reference
            </Link>
          </li>
          <li className="flex">
            <Link
              onClick={() => props.setShow(false)}
              to="/search?t=loadout"
              className="w-full border-b border-slate-500 p-4 hover:bg-slate-800 text-sm"
            >
              Search: Loadouts
            </Link>
          </li>
          <li className="flex">
            <a
              target="_blank"
              href="https://cdn.svc.asmodee.net/production-amgcom/uploads/2023/09/SWZ_RulesReference_v1.4.6-1.pdf"
              className="w-full p-4 hover:bg-slate-800 text-sm"
            >
              Rules: PDF
            </a>
          </li>
          <li className="flex">
            <a
              target="_blank"
              href="https://cdn.svc.asmodee.net/production-amgcom/uploads/2023/09/SWZ_Errata_1.8.2_sm.pdf"
              className="w-full p-4 hover:bg-slate-800 text-sm"
            >
              Errata: PDF
            </a>
          </li>
          <li className="flex">
            <a
              target="_blank"
              href="https://cdn.svc.asmodee.net/production-amgcom/uploads/2023/11/SWZ_Rulebook_Web111.pdf"
              className="w-full p-4 hover:bg-slate-800 text-sm"
            >
              Core Rulebook: PDF
            </a>
          </li>

          <li className="flex">
            <a
              target="_blank"
              href="https://cdn.svc.asmodee.net/production-amgcom/uploads/2023/09/Ship_Points_09.08.23_v2.pdf"
              className="w-full p-4 hover:bg-slate-800 text-sm"
            >
              Ship Points: PDF
            </a>
          </li>
          <li className="flex">
            <a
              target="_blank"
              href="https://cdn.svc.asmodee.net/production-amgcom/uploads/2023/09/Upgrade_Points_09.08.23-1.pdf"
              className="w-full p-4 hover:bg-slate-800 text-sm"
            >
              Upgrade Points: PDF
            </a>
          </li>

          <li className="flex">
            <a
              target="_blank"
              href="https://cdn.svc.asmodee.net/production-amgcom/uploads/2023/09/Ship_Points_06.09.23.pdf"
              className="w-full p-4 hover:bg-slate-800 text-sm"
            >
              Legacy Ship Points: PDF
            </a>
          </li>
          <li className="flex">
            <a
              target="_blank"
              href="https://cdn.svc.asmodee.net/production-amgcom/uploads/2023/09/Upgrade_Points_06.09.23.pdf"
              className="w-full p-4 hover:bg-slate-800 text-sm"
            >
              Legacy Upgrade Points: PDF
            </a>
          </li>

          <li className="flex">
            <a
              target="_blank"
              href="https://cdn.svc.asmodee.net/production-amgcom/uploads/2022/10/SWZ_Scenarios_08012022.pdf"
              className="w-full p-4 hover:bg-slate-800 text-sm"
            >
              Secenarios: PDF
            </a>
          </li>
          <li className="flex">
            <a
              target="_blank"
              href="https://cdn.svc.asmodee.net/production-amgcom/uploads/2023/09/SWZ_BanRestricted_List_09.08.23.pdf"
              className="w-full p-4 hover:bg-slate-800 text-sm"
            >
              Ban List: PDF
            </a>
          </li>
        </ul>
      </div>
      <div className="w-1/3 bg-gray-900 bg-opacity-95 md:w-2/3"></div>
    </Transition>
  );
}
