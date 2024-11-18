export const ThreatColor = {
    1: "green",
    2: "yellow",
    3: "orange",
    4: "red",
    5: "purple"
} as const;

export type ThreatValue = keyof typeof ThreatColor