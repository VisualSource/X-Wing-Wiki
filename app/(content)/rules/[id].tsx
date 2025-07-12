import Markdown, { MarkdownIt, type RenderRules } from "react-native-markdown-display";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { bare as MarkdownEmoji } from "markdown-it-emoji";
import MarkdownAttrs from "markdown-it-attrs";
import { Image } from "expo-image"
import { Metadata } from "@/components/markdown/Metadata";
import markdownMeta from "@/lib/markdownMetaPlugin";

import { XWingIcon } from "@/components/XwingIcon";
import Icons, { type XWing } from "@/constants/Icons";
import { useTheme } from "@/hooks/useTheme";
import IMAGE_REFS from "@/lib/imageRefs";
import DOCS from "@/assets/docs.json";

const mki = MarkdownIt({ typographer: true })
    .use(markdownMeta)
    .use(MarkdownAttrs)
    .use(MarkdownEmoji, {
        defs: Icons
    });

const renderRules: RenderRules = {
    image: (node) => (
        <View key={node.key} style={{ flex: 1, maxHeight: 400, minHeight: 100, width: "100%", alignItems: "center", justifyContent: "center" }}>
            <Image style={{ flex: 1, width: "100%" }} contentFit="contain" alt={node.attributes.alt} source={IMAGE_REFS[node.attributes.src as keyof typeof IMAGE_REFS]} />
        </View>
    ),
    metadata: (node) => (<Metadata key={node.key} node={node} />),
    emoji: (node) => (<XWingIcon useDef={false} icon={node.content as XWing} key={node.key} />)
};

export default function Rules() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const scheme = useTheme();

    return (
        <View style={{ backgroundColor: scheme.background, height: "auto", flex: 1, display: "flex", flexDirection: "column" }}>
            <ScrollView style={{ marginHorizontal: 6 }}>
                <Markdown onLinkPress={(url) => {
                    if (url.startsWith("http")) {
                        return true;
                    }
                    router.push(url as never);
                    return false;
                }} markdownit={mki} rules={renderRules} mergeStyle style={{
                    pre: styles.markdown_pre,
                    body: {
                        backgroundColor: scheme.background
                    },
                    list_item: {
                        color: scheme.text
                    },
                    text: {
                        color: scheme.text,
                    },
                    blockquote: styles.blockquote,
                    blocklink: styles.link,
                    link: styles.link

                }}>
                    {DOCS[id as keyof typeof DOCS]}
                </Markdown>
                <View style={{ height: 100, width: "auto" }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    markdown_pre: {
        fontStyle: "italic",
        textAlign: "center"
    },
    link: {
        color: "blue",
    },
    blockquote: {
        backgroundColor: "#1f2426"
    }
});