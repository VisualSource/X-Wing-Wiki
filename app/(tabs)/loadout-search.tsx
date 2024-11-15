import { StatusBar, View, Text, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import type { FuseResult } from "fuse.js";
import { useState } from "react";

import ThemedSearch from "@/components/ThemedSearch";
import { ThemedView } from "@/components/ThemedView";
import LOADOUTS from "@/assets/search/loadouts.json";
import { useSearch } from "@/hooks/useSearch";
import { useTheme } from "@/hooks/useTheme";
import ListItem from "@/components/ListItem";

export default function Search() {
    const scheme = useTheme();
    const [results, setResults] = useState<FuseResult<typeof LOADOUTS[0]>[]>([]);
    const { search } = useSearch(LOADOUTS, {
        isCaseSensitive: false,
        keys: [
            {
                name: "title",
                weight: 0.7
            },
            {
                name: "tags",
                weight: 0.4
            }
        ]
    });

    return (
        <ThemedView style={styles.container}>
            <ThemedSearch placeholder="Search Loadouts" onSearch={(value) => {
                const result = search(value);
                setResults(result);
            }} />

            <View style={styles.separator} />
            {results.length ? (
                <View style={styles.results_container}>
                    <FlashList renderItem={({ item }) => (
                        <ListItem path="/(content)/loadouts/[id]" key={item.refIndex} item={item.item} />
                    )} estimatedItemSize={76} data={results} />
                </View>
            ) : (
                <View style={styles.empty_container}>
                    <Ionicons size={38} name="search" style={[{ color: scheme.text }, styles.empty_icon]} />
                    <Text style={[{ color: scheme.text }, styles.empty_text]}>Search Loadouts</Text>
                </View>
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
    empty_text: {
        fontWeight: "medium",
        fontSize: 20,
        textAlign: "center"
    },
    empty_container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "auto"
    },
    empty_icon: {
        textAlign: "center"
    },
    results_container: {
        flex: 1,
        display: "flex",
        flexDirection: "column"
    },
    separator: {
        height: 10,
        width: "auto"
    }
});