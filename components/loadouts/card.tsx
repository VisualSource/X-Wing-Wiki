
import { View, Text, StyleSheet } from "react-native";
import { ThreatColor, ThreatValue } from "./consts";
import { XWingIcon } from "../XwingIcon";
import { useTheme } from "@/hooks/useTheme";
import { Loadout } from "@/constants/Loadouts";

export const Card: React.FC<{ builds: Loadout[0]["builds"] }> = ({ builds }) => {
    const len = builds.length - 1;
    const scheme = useTheme();
    return (
        <View style={styles.container}>
            {builds.map((pilot, i) => (
                <View key={i} style={len === i ? styles.card_end : styles.card}>
                    <Text style={{ color: scheme.text, fontSize: 20, textAlign: "center", fontFamily: "BankGthd" }}>{pilot.limited > 0 ? Array.from({ length: pilot.limited }).fill("*").join(" ") + " " : ""}{pilot.name}</Text>
                    <View style={styles.threat_container}>
                        {pilot.threat > 5 ? (
                            <View>
                                <Text style={{ color: ThreatColor[4], fontFamily: "Kimberley", textAlign: "center", fontWeight: "bold", fontSize: 15 }}>Threat: {pilot.threat}</Text>
                            </View>
                        ) : (
                            <View style={styles.threat_numb_container}>
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
                            <View style={styles.upgrade_container} key={`upgrade_${key}_${idx}`}>
                                <XWingIcon useDef icon={key} />
                                <Text style={{ fontSize: 13, color: scheme.text, marginTop: 2, fontFamily: "EurostileOblique" }}>{config}</Text>
                            </View>
                        )))}
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 32,
        gap: 15,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    card_end: {
        paddingTop: 10,
        paddingHorizontal: 5,
        flex: 1,
        backgroundColor: "#1F2426",
        borderRadius: 5
    },
    card: {
        paddingTop: 10,
        paddingHorizontal: 5,
        borderRadius: 5,
        backgroundColor: "#1F2426",
        flex: 1,
        borderBottomColor: "gray",
        borderBottomWidth: 1,
    },
    upgrade_container: {
        display: "flex",
        flexDirection: "row",
        width: "50%",
        alignItems: "center",
        gap: 4,
        justifyContent: "flex-start",
        alignContent: "center"
    },
    upgrades_container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start"
    },
    threat_container: {
        marginVertical: 15,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center"
    },
    threat_numb_container: {
        marginHorizontal: "auto",
        width: "80%",
        display: "flex",
        flexDirection: "row",
        gap: 10
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