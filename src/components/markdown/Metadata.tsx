import type { ASTNode } from "react-native-markdown-display";
import { View, Text } from "react-native";
import { Fragment, useEffect } from "react";

import { XWingIcon } from "../XwingIcon";
import { useNavigation } from "expo-router";
import { useTheme } from "@/hooks/useTheme";

export const Metadata: React.FC<{ node: ASTNode }> = ({ node }) => {
    const navigate = useNavigation();
    const theme = useTheme()
    const title = node.attributes.title;
    useEffect(() => {
        navigate.setOptions({ headerTitle: title });
    }, [navigate, title]);

    return (
        <View key={node.key}>
            <View style={{ width: "auto" }}>
                <View style={{ width: "auto", display: "flex", flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <Text style={{ color: theme.text, fontSize: 20, fontWeight: "bold" }}>
                        {node.attributes.title}
                    </Text>
                    {node.attributes.icons ? (
                        <View style={{ display: "flex", width: "auto", flexDirection: "row" }}>
                            <Text style={{ color: theme.text, fontWeight: "bold" }}>[</Text>
                            {node.attributes.icons.map((e: string, i: number) => (
                                <Fragment key={`${i}_${e}`}>
                                    <XWingIcon useDef icon={e} />
                                    {i !== (node.attributes.icons.length - 1) ? (<Text style={{ color: theme.text }}>,</Text>) : null}
                                </Fragment>
                            ))}
                            <Text style={{ color: theme.text, fontWeight: "bold" }}>]</Text>
                        </View>
                    ) : null}
                </View>
                <View style={{ borderBottomWidth: 2, borderBottomColor: theme.tint }} />
                <Text style={{ fontSize: 16, color: theme.icon }}>{node.attributes.version}</Text>
            </View>
            {node.attributes?.links?.length ? (
                <View style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", gap: 2, marginTop: 10 }}>
                    {node.attributes.links.map((e: { id: string, title: string, icons?: string[] }) => (
                        <Text key={e.id} style={{ textDecorationLine: "underline", color: "blue", flex: 1 }}>
                            {e.title}
                        </Text>
                    ))}
                </View>
            ) : null}
        </View>
    );
}