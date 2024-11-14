import type { ASTNode } from "react-native-markdown-display";
import { View, Text } from "react-native";
import { Fragment } from "react";

import { useThemeColor } from "@/hooks/useThemeColor";
import { XWingIcon } from "../XwingIcon";

export const Metadata: React.FC<{ node: ASTNode }> = ({ node }) => {
    const color = useThemeColor({}, "text");
    return (
        <View key={node.key}>
            <View style={{ width: "auto" }}>
                <View style={{ width: "auto", display: "flex", flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <Text style={{ color, fontSize: 18, fontWeight: "bold" }}>
                        {node.attributes.title}
                    </Text>
                    {node.attributes.icons ? (
                        <View style={{ display: "flex", width: "auto", flexDirection: "row" }}>
                            <Text style={{ color, fontWeight: "bold" }}>[</Text>
                            {node.attributes.icons.map((e: string, i: number) => (
                                <Fragment key={`${i}_${e}`}>
                                    <XWingIcon useDef icon={e} />
                                    {i !== (node.attributes.icons.length - 1) ? (<Text style={{ color }}>,</Text>) : null}
                                </Fragment>
                            ))}
                            <Text style={{ color, fontWeight: "bold" }}>]</Text>
                        </View>
                    ) : null}
                </View>
                <View style={{ borderBottomWidth: 2, borderBottomColor: "gray" }} />
                <Text style={{ fontSize: 16, color }}>{node.attributes.version}</Text>
            </View>
            {node.attributes?.links?.length ? (
                <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 2, marginTop: 10 }}>
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