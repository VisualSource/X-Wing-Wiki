const Icons = {
    "koiogran-turn": "2",
    "force": "h",
    "critical-hit": "c",
    "bulls-eye-arc": "}",
    "double-recurring": "_",
    'recurring': " ",
    "unique": "u",
    "hull": "&",
    "agility": "^",
    "team": "T",
    "command": "V",
    "cargo": "G",
    "point": "Ì",
    "hardpoint": "H",
    "range-bonus-indicator": "?",
    "straight": "8",
    "boost": "b",
    "lock": "l",
    "focus": "f",
    "title": "t",
    "slam": "s",
    "jam": "á",
    "reload": "=",
    "reinforce": "i",
    "cannon": "C",
    "torpedo": "P",
    "missile": "M",
    "front-arc": "{",
    "left-arc": "£",
    "right-arc": "¢",
    "rear-arc": "|",
    "full-front-arc": "~",
    "full-rear-arc": "¡",
    "single-turret-arc": "p",
    "double-turret-arc": "q",
    "rotate": "R",
    "evade": "e",
    "hit": "d",
    "barrel-roll": "r",
    "calculate": "a",
    "charge": "g",
    "shield": "*",
    "energy": "(",
    "cloak": "k",
    "rotate-arc": "R",
    "bank-left": "7",
    "bank-right": "9",
    "left-turn": "4",
    "right-turn": "6",
    "tallon-right": ";",
    "tallon-left": ":",
    "segnor-left": "1",
    "segnor-right": "3",
    "stationary": "5",
    "r-straight": "K",
    "r-bank-right": "L",
    "r-bank-left": "J",
    "device": "B",
    "crew": "W",
    "coordinate": "o",
    "linked": ">",
    "tactical-relay": "Z",
    "astromech": "A",
    "configuration": "n",
    "gunner": "Y",
    "illicit": "I",
    "force-power": "F",
    "modification": "m",
    "sensor": "S",
    "talent": "E",
    "tech": "X",
    "turret": "U"
} as const;

export default Icons;

export type XWing = keyof typeof Icons;