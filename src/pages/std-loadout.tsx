import { useAsyncValue, useNavigate } from "react-router-dom";
import { useRef, useState, useMemo } from "react";
import { HiMenu } from "react-icons/hi";
import html2pdf from "html2pdf.js";

import StringParseIcons from "../components/mdx/StringParseIcons";
import Icons, { type IconNames } from "../components/mdx/Icons";
import LoadingWrapper from "../components/LoadingWrapper";
import Sidenav from "../components/Sidenav";

export default LoadingWrapper(STDLoadout);

const IconFormat = /\[(?<icon>\w+(\s)*(\w+)*)\]/g;

const color: { [key: number]: string } = {
  1: "text-green-600",
  2: "text-yellow-400",
  3: "text-orange-600",
  4: "text-red-600",
  5: "text-purple-800",
};

const DifficultyColor = {
  White: "text-white",
  Red: "text-red-600",
  Purple: "text-purple-600",
  Blue: "text-blue-400",
};

const StatColor = {
  attack: "text-red-600",
  agility: "text-green-500",
  shields: "text-cyan-200",
  charges: "text-yellow-600",
  force: "text-purple-200",
  hull: "text-yellow-400",
  energy: "text-pink-500",
};

type TypeDifficultyColor = keyof typeof DifficultyColor;

const Recovers = ({ value }: { value: number }) => {
  switch (value) {
    case 1:
      return <Icons.Recurring />;
    case 2:
      return <Icons.DoubleRecurring />;
    default:
      return null;
  }
};

const Charge: React.FC<{
  type: Ships.ChargeType;
  arc?: string;
  value: number;
  recovers?: number;
}> = ({ type, arc, value, recovers }) => {
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
      <div>{Icon ? <Icon /> : null}</div>
      <div className="mt-0.5">
        <span className="ml-1 font-kimberley">{value}</span>
        {recovers ? <Recovers value={recovers} /> : null}
      </div>
    </div>
  );
};

const Action: React.FC<{ action: Ships.ShipAction }> = ({ action }) => {
  const Icon = Icons[action.type.replaceAll(" ", "") as IconNames];
  const LinkedIcon = action.linked
    ? Icons[action.linked.type.replaceAll(" ", "") as IconNames]
    : null;

  return (
    <div className="flex gap-1">
      <span
        className={DifficultyColor[action.difficulty as TypeDifficultyColor]}
      >
        <Icon />
      </span>
      {action.linked ? (
        <div className="flex gap-1">
          <span>
            <Icons.Linked />
          </span>
          {LinkedIcon ? (
            <span
              className={
                DifficultyColor[action.linked.difficulty as TypeDifficultyColor]
              }
            >
              <LinkedIcon />
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

function STDLoadout() {
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();
  const wrapper = useRef<HTMLDivElement>(null);
  const data = useAsyncValue() as {
    loadoutId: number;
    ship: Ships.StdShip;
    pilot: Ships.StdPilot;
    standardLoadout: Ships.UpgradeItem[];
  };

  const shipStats = useMemo(() => {
    const stats = [...data.ship.stats];

    if (data.standardLoadout.some((item) => item.xws === "shieldupgrade")) {
      const stat = stats.find((value) => value.type === "shields");
      if (!stat) {
        stats.push({ type: "shields", value: 1 });
      } else {
        stat.value += 1;
      }
    }

    if (data.standardLoadout.some((item) => item.xws === "hullupgrade")) {
      const stat = stats.find((value) => value.type === "hull");
      if (!stat) {
        stats.push({ type: "hull", value: 1 });
      } else {
        stat.value += 1;
      }
    }

    return stats;
  }, [data]);

  return (
    <div className="flex flex-1 flex-col bg-neutral-100">
      <header className="sticky top-0 z-10 flex items-center justify-center gap-2 bg-slate-900 py-2 text-white">
        <div className="flex w-11/12 items-center gap-4 md:w-8/12 lg:w-4/12">
          <button onClick={() => setShow(true)}>
            <HiMenu className="text-3xl" />
          </button>
          <div className="font-kimberley font-bold">Quick Build builder</div>
          <button
            onClick={async () => {
              if (!wrapper.current) return;
              html2pdf()
                .from(wrapper.current)
                .set({
                  margin: 4,
                  filename: `${data.ship.xws}-${data.pilot.xws}-${data.loadoutId}.pdf`,
                })
                .save();
            }}
            className="ml-auto flex items-center gap-1 rounded bg-green-500 px-4 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg"
          >
            PDF
          </button>
          <button
            onClick={() => navigate("/deck")}
            className="ml-auto flex items-center gap-1 rounded bg-green-500 px-4 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg"
          >
            Back to builder
          </button>
        </div>
      </header>
      <main className="mt-4 flex h-full flex-1 flex-col items-center justify-center gap-4 p-4">
        <div data-area="artwork" className="w-1/2">
          <img
            className="h-full w-full object-contain"
            src={data.pilot.artwork}
            alt="Ship artwork"
          />
        </div>
        <div
          ref={wrapper}
          data-card="wrapper"
          className="flex h-[800px] w-[800px] gap-2"
        >
          <section>
            <div
              data-stats="title"
              className="flex items-center justify-center gap-4"
            >
              <div className="font-kimberley text-3xl text-orange-600">
                {data.pilot.initiative}
              </div>
              <div className="flex flex-col items-center justify-center">
                <h1 className="flex items-center font-bold">
                  <span className="mr-1 font-bank">
                    {Array.from({ length: data.pilot?.limited ?? 0 }).map(
                      (_, i) => (
                        <Icons.Unique key={i} />
                      ),
                    )}
                  </span>
                  {data.pilot.name}
                </h1>
                {data.pilot?.caption ? (
                  <div className="font-eurostile">{data.pilot?.caption}</div>
                ) : null}
              </div>
            </div>
            <div data-stats="charges" className="flex justify-center gap-4">
              {shipStats.map((stat, i) => (
                <Charge
                  key={i}
                  recovers={stat.recovers}
                  arc={stat.arc}
                  type={stat.type}
                  value={stat.value}
                />
              ))}
              {data.pilot?.charges ? (
                <Charge
                  type="charges"
                  recovers={data.pilot.charges.recovers}
                  value={data.pilot.charges.value}
                />
              ) : null}
              {data.pilot.force ? (
                <Charge
                  type="force"
                  recovers={data.pilot.force.recovers}
                  value={data.pilot.force.value}
                />
              ) : null}
            </div>
            <section data-stats="ability" className="px-2">
              {data.pilot?.text ? (
                <p className="font-eurostile">{data.pilot.text}</p>
              ) : null}
              <p className="font-eurostile">
                {StringParseIcons(data.pilot?.ability ?? "", Icons, IconFormat)}
              </p>
              {data.pilot?.shipAbility ? (
                <p className="py-2">
                  <span className="font-bold">
                    {data.pilot?.shipAbility?.name}:{" "}
                  </span>
                  <span className="font-eurostile">
                    {StringParseIcons(
                      data.pilot?.shipAbility?.text ?? "",
                      Icons,
                      IconFormat,
                    )}
                  </span>
                </p>
              ) : null}
            </section>
            <section
              data-stats="actions"
              className="flex items-center justify-center gap-4 bg-gray-600 p-2"
            >
              {(data.pilot.shipActions ?? data.ship.actions).map(
                (action, i) => (
                  <Action key={i} action={action} />
                ),
              )}
              {data.standardLoadout
                .map((item) =>
                  item.sides.map((value, id) =>
                    value.actions?.map((a, i) => (
                      <Action key={id + 1} action={a} />
                    )),
                  ),
                )
                .flat(2)
                .filter(Boolean)}
            </section>
            <div className="my-2 flex justify-center">
              <h1 className="font-eurostile">{data.ship.name}</h1>
            </div>
            <div className="my-2 flex justify-center">
              <h1 className="font-eurostile">
                Threat:{" "}
                <span
                  className={`${data.pilot.threat > 5 ? color[4] : color[data.pilot.threat]} font-kimberley`}
                >
                  {data.pilot.threat}
                </span>
              </h1>
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
                          {StringParseIcons(
                            side?.ability ?? "",
                            Icons,
                            IconFormat,
                          )}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          {side.attack ? (
                            <div
                              className={`${StatColor["attack"]} flex flex-col items-center`}
                            >
                              <div>
                                <span>
                                  {Icons[
                                    side.attack.arc.replaceAll(
                                      " ",
                                      "",
                                    ) as IconNames
                                  ]({})}
                                </span>
                                <span className="ml-1 mt-0.5 font-kimberley">
                                  {side.attack.value}
                                </span>
                              </div>
                              <div>
                                {side.attack.ordnance ? (
                                  <span>
                                    <Icons.RangeBonusIndicator />
                                  </span>
                                ) : null}
                                <span className="font-kimberley text-black">
                                  {side.attack.minrange}-{side.attack.maxrange}
                                </span>
                              </div>
                            </div>
                          ) : null}
                          {side.charges ? (
                            <Charge
                              type="charges"
                              value={side.charges.value}
                              recovers={side.charges.recovers}
                            />
                          ) : null}
                          {side.force ? (
                            <Charge
                              type="force"
                              value={side.force.value}
                              recovers={side.force.recovers}
                            />
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
