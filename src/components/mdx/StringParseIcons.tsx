import { Fragment } from "react";
export default function StringParseIcons(
  value: string,
  components: { [key: string]: any },
  test: RegExp = /<(?<icon>[\w]+)\/>/g,
) {
  const matches = [...value.matchAll(test)];

  if (matches.length === 0) return value;

  const iconsLen = matches.reduce((last, curr) => last + curr[0].length, 1);
  const len = value.length - iconsLen;

  const elem: any[] = [];
  let lastIdx = 0;
  let id = 0;
  for (const match of matches) {
    const icon = match.groups?.icon as string;
    const iconLen = match[0].length;
    const startIdx = match.index as number;

    const text = value.slice(lastIdx, startIdx);
    elem.push(<Fragment key={id}>{text}</Fragment>);
    id++;

    lastIdx = startIdx + iconLen;

    const foramtted = icon.replaceAll(" ", "");

    const Icon = components[foramtted];

    if (!Icon) throw new TypeError(`Invaild icon name (${foramtted})`);

    elem.push(<Icon key={id} />);
    id++;
  }

  if (lastIdx !== len) {
    const text = value.slice(lastIdx);
    elem.push(<Fragment key={id}>{text}</Fragment>);
  }

  return elem;
}
