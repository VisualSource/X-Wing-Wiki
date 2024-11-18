import { Pressable, StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import type { Loadout } from "@/constants/Loadouts";
import { Card } from "./Card";

const Pager: React.FC<{ data: Loadout }> = ({ data }) => {
    const [offset, setOffset] = useState(0);

    const pages = Math.ceil(data.builds.length / 3);

    const builds = data.builds.slice(offset * 3, (offset * 3) + 3);

    return (
        <View style={{ flex: 1 }}>
            <Card builds={builds} />
            <View style={styles.btn_container}>
                <Pressable onPress={() => {
                    setOffset((value) => {
                        const p = value - 1;
                        return p <= 0 ? 0 : 1;
                    });
                }} style={styles.btn}>
                    <Text>Prev {offset}</Text>
                </Pressable>
                <Pressable onPress={() => {
                    setOffset((value) => {
                        const n = value + 1;
                        return n >= pages ? pages - 1 : n;
                    });
                }} style={styles.btn}>
                    <Text>Next</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    btn_container: {
        display: "flex",
        gap: 10,
        marginHorizontal: 32,
        flexDirection: "row",
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#fff',
    }
})

export default Pager;