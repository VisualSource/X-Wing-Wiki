
import { View, Text, StyleSheet } from "react-native";
import { ThreatColor, ThreatValue } from "./consts";
import { XWingIcon } from "../XwingIcon";
import { useTheme } from "@/hooks/useTheme";
import { Loadout } from "@/constants/Loadouts";

export const Card: React.FC<{ builds: Loadout[0]["builds"] }> = ({ builds }) => {
    const scheme = useTheme();
    return (
        <View style={{ paddingHorizontal: 32 }}>
            {builds.map((pilot, i) => (
                <View key={i}>
                    <Text style={{ color: scheme.text }}>{pilot.limited > 0 ? Array.from({ length: pilot.limited }).fill("*").join(" ") : ""}{pilot.name}</Text>
                    <View>
                        {pilot.threat > 5 ? (
                            <View>
                                <Text style={{ color: ThreatColor[5] }}>Threat: {pilot.threat}</Text>
                            </View>
                        ) : (
                            <View style={styles.threat_container}>
                                {Array.from({ length: pilot.threat }).map((_, idx) => (
                                    <View style={[styles.threat_numb, { backgroundColor: ThreatColor[pilot.threat as ThreatValue] }]} key={`threat_level_${idx}`} />
                                ))}
                                {Array.from({ length: 5 - pilot.threat }).map((_, i) => (
                                    <View style={styles.threat_numb_empty} key={`threat_level_${i}_placeholder`} />
                                ))}
                            </View>
                        )}
                    </View>
                    <View style={styles.upgrades_container}>
                        {Object.entries(pilot.upgrades ?? []).flatMap(([key, values]) => values.map((config, idx) => (
                            <View style={{}} key={`upgrade_${key}_${idx}`}>
                                <XWingIcon useDef icon={key} />
                                <Text style={{ color: scheme.text, }}>{config}</Text>
                            </View>
                        )))}
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    threat_container: {
        display: "flex",
        flexDirection: "row",
        gap: 10
    },
    upgrades_container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
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