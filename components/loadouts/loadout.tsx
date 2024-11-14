import { View, Text, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";

import { ThreatColor, type ThreatValue } from "./consts";
import { useTheme } from "@/hooks/useTheme";
import type { Loadout } from "@/lib/types";
import { chunk } from "@/lib/arrayChunk";
import { XWingIcon } from "../XwingIcon";

export default function ({ item }: { item: Loadout[0] }) {
    const scheme = useTheme();
    return (
        <PagerView style={{ flex: 1 }} initialPage={0}>
            {chunk(item?.builds ?? [], 3).map((item, i) => (
                <View key={i} style={{ paddingHorizontal: 32 }}>
                    {item.map((sub, b) => (
                        <View key={`${i}_${b}`}>
                            <Text style={{ color: scheme.text }}>{sub.pilots[0].id}</Text>
                            <View>
                                {sub.threat > 5 ? (
                                    <View>
                                        <Text style={{ color: ThreatColor[5] }}>Threat: {sub.threat}</Text>
                                    </View>
                                ) : (
                                    <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                                        {Array.from({ length: sub.threat }).map((_, idx) => (
                                            <View style={[styles.threat_numb, { backgroundColor: ThreatColor[sub.threat as ThreatValue] }]} key={`${sub.pilots[0].xws}_threat_${idx + 1}`} />
                                        ))}
                                        {Array.from({ length: 5 - sub.threat }).map((_, i) => (
                                            <View style={styles.threat_numb_empty} key={`${sub.pilots[0].xws}_tph_${i + 1}`} />
                                        ))}
                                    </View>
                                )}
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                                {Object.entries(sub.pilots[0].upgrades ?? []).flatMap(([key, values]) => values.map((config, idx) => (
                                    <View style={{}} key={`upgrade_${key}_${idx}`}>
                                        <XWingIcon useDef icon={key} />
                                        <Text style={{ color: scheme.text, }}>{config}</Text>
                                    </View>
                                )))}
                            </View>
                        </View>
                    ))}
                </View>
            ))}
        </PagerView>
    )
}

const styles = StyleSheet.create({
    threat_numb: {
        flex: 1,
        borderRadius: 4
    },
    threat_numb_empty: {
        flex: 1,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 4
    }
});