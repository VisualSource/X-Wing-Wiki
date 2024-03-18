import ParseIcons from "./StringParseIcons";

interface UpgradeCardValuesProps {
  components: { [key: string]: any };
  data: {
    header: string;
    upgrades: {
      name: string;
      type: string;
      cost: number;
      restrictions: string[];
      standard: 1 | 0 | "B";
      extended: 1 | 0;
    }[];
  };
}

export default function UpgradeCardValues({
  components,
  data,
}: UpgradeCardValuesProps) {
  return (
    <section>
      <div>
        <h2>{data.header}</h2>
        <hr />
        <div className="flex flex-col gap-4">
          {data.upgrades.map((upgrade, key) => (
            <div
              key={key}
              className="rounded-md bg-slate-900 px-2 pb-4 shadow-2xl md:px-4"
            >
              <h4 className="font-bold">{upgrade.name}</h4>
              <hr />
              <table>
                <thead>
                  <tr>
                    <th>Upgrade Type(s)</th>
                    <th>Cost</th>
                    <th>Std.</th>
                    <th>Ext.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{ParseIcons(upgrade.type, components)}</td>
                    <td>{upgrade.cost}</td>
                    <td>
                      {upgrade.standard === "B"
                        ? "Ban"
                        : upgrade.standard
                          ? "Yes"
                          : "No"}
                    </td>
                    <td>{upgrade.extended ? "Yes" : "No"}</td>
                  </tr>
                </tbody>
              </table>
              <h5 className="font-bold">Restrictions:</h5>
              <div className="flex flex-wrap gap-2 font-eurostile text-gray-600">
                {upgrade.restrictions.map((rest, i) => (
                  <span key={i}>{ParseIcons(rest, components)}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
