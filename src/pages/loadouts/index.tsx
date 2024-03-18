import { useNavigate, useAsyncValue } from "react-router-dom";
import { useState } from "react";

import LoadingWrapper from "../../components/LoadingWrapper";
import { Uppercase } from "../../utils/Uppercase";
import Icons from "../../components/mdx/Icons";
import "../../icons.css";

interface Loadout {
  default: {
    builds: {
      threat: number;
      pilots: {
        id: string;
        upgrades?: { [key: string]: string[] };
      }[];
    }[];
    ship: string;
  };
}

export default LoadingWrapper(Loadout);

const color: { [key: number]: string } = {
  1: "bg-green-600",
  2: "bg-yellow-400",
  3: "bg-orange-600",
  4: "bg-red-600",
  5: "bg-purple-800",
};

const parseIcon = (icon: string): null | string[] => {
  if (icon.startsWith("command")) {
    const [command, secondary] = icon.split("-");

    if (!secondary) return [(Icons as any)[Uppercase(command)]];

    const image = (Icons as any)[Uppercase(secondary)];

    if (!image) return null;

    return [(Icons as any)[Uppercase(command)], image];
  }

  if (icon === "force-power") return [(Icons as any)["ForcePowerU"]];
  if (icon === "tactical-relay") return [(Icons as any)["TacticalRelay"]];

  const image = (Icons as any)[Uppercase(icon)];

  if (!image) return null;

  return [image];
};

function Loadout() {
  const loadout = useAsyncValue() as Loadout;
  const [offset, setOffset] = useState<{ start: number; end: number }>({
    start: 0,
    end: 3,
  });
  const navitage = useNavigate();

  return (
    <div className="flex flex-grow flex-col bg-slate-800 text-zinc-400">
      <header className="sticky top-0 z-10 flex items-center justify-center gap-2 bg-slate-900 pb-4 pt-4">
        <div className="flex w-11/12 md:w-8/12 lg:w-4/12">
          <button
            onClick={() => navitage(-1)}
            type="button"
            className="inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
          >
            Back
          </button>
          <div className="mx-auto flex gap-3">
            <button
              onClick={() => {
                const start = offset.start - 3;
                const end = offset.start;
                if (start < 0) return;
                setOffset({ start, end });
              }}
              type="button"
              className="inline-block rounded bg-gray-800 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg"
            >
              Prev
            </button>
            <button
              onClick={() => {
                const start = offset.end;
                const end = offset.end + 3;
                if (end > loadout.default.builds.length + 2) return;
                setOffset({ start, end });
              }}
              type="button"
              className="inline-block rounded bg-gray-800 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg"
            >
              Next
            </button>
          </div>
        </div>
      </header>
      <main className="flex h-full justify-center">
        <div className="container mx-auto flex justify-center">
          <div
            role="card"
            className="my-1 flex w-full flex-col items-center rounded-lg bg-slate-900 shadow-2xl sm:w-3/4 md:my-6 md:w-1/3"
          >
            <header className="flex w-full items-center justify-center rounded-t-lg bg-gray-900">
              <h1 className="w-full py-4 text-center font-bank text-2xl md:text-4xl">
                {loadout.default.ship}
              </h1>
            </header>
            <div className="mb-6 flex h-full w-11/12 flex-col rounded-lg border border-gray-800 bg-gray-900 px-4">
              {loadout.default.builds
                .slice(offset.start, offset.end)
                .map(({ pilots, threat }, i, data) => (
                  <section
                    key={i}
                    className="flex flex-grow flex-col items-center justify-center"
                  >
                    <h3 className="py-4 font-bank text-lg md:text-2xl">
                      {pilots[0].id}
                    </h3>
                    <span role="threat" className="flex w-1/3 gap-2">
                      {threat > 5 ? (
                        <span className="w-full text-center font-kimberley text-red-600">
                          Threat {threat}
                        </span>
                      ) : (
                        <>
                          {Array.from({ length: threat }).map((_, idx) => (
                            <div
                              key={idx}
                              className={`h-2 w-full flex-grow rounded-sm ${color[threat]}`}
                            ></div>
                          ))}
                          {Array.from({ length: 5 - threat }).map((_, i) => (
                            <div
                              key={i}
                              className="h-2 w-full flex-grow rounded-sm border border-gray-800"
                            ></div>
                          ))}
                        </>
                      )}
                    </span>
                    <div className="text-md mt-4 grid w-full grid-cols-2 grid-rows-2 gap-1 font-eurostile md:gap-4 md:text-xl">
                      {Object.entries(pilots[0]?.upgrades ?? []).map(
                        ([key, text], i) =>
                          text
                            .map((upgrade, idx) => {
                              const icons = parseIcon(key);
                              if (!icons)
                                return (
                                  <span
                                    key={`${i}-${idx}`}
                                    className="flex items-center gap-2"
                                  >
                                    NO ICON: {key}
                                  </span>
                                );
                              return (
                                <span
                                  key={`${i}-${idx}`}
                                  className="flex items-center gap-2"
                                >
                                  {icons.map((Icon, i) => (
                                    <Icon key={i} />
                                  ))}{" "}
                                  {upgrade}
                                </span>
                              );
                            })
                            .flat(1),
                      )}
                    </div>
                    {data.length !== i ? (
                      <hr className="mt-auto w-11/12 border-gray-800" />
                    ) : null}
                  </section>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
