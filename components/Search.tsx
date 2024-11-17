import { StatusBar, View, StyleSheet, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import type { FuseResult } from "fuse.js";
import { useState } from "react";

import ListItem, { type SearchItem } from "./ListItem";
import { useSearch } from "@/hooks/useSearch";
import { useTheme } from "@/hooks/useTheme";
import { ThemedView } from "./ThemedView";
import ThemedSearch from "./ThemedSearch";

type Props = {
    path: "/(content)/rules/[id]" | "/(content)/loadouts/[id]",
    searchHint: string;
    searchTitle: string,
    data: SearchItem[]
}

export const Search: React.FC<Props> = ({ searchTitle, searchHint, data, path }) => {
    const theme = useTheme();
    const [results, setResults] = useState<FuseResult<SearchItem>[]>([]);
    const { search } = useSearch(data, {
        isCaseSensitive: false,
        keys: [
            { name: "title", weight: 0.8 },
            { name: "tags", weight: 0.4 }
        ]
    });

    return (
        <ThemedView style={styles.container}>
            <ThemedSearch placeholder={searchTitle} onSearch={value => setResults(search(value))} />
            <View style={styles.separator} />
            {results.length ? (
                <View style={styles.results_container}>
                    <FlashList renderItem={({ item }) => (
                        <ListItem key={item.refIndex} item={item.item} path={path} />
                    )} estimatedItemSize={76} data={results} />
                </View>
            ) : (
                <View style={styles.empty_container}>
                    <Ionicons size={38} name="search" style={[{ color: theme.text }, styles.empty_icon]} />
                    <Text style={[{ color: theme.text }, styles.empty_text]}>{searchHint}</Text>
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