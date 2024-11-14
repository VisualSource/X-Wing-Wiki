import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "./ThemedText";

type SearchItem = {
    id: string;
    title: string;
    category: string[];
    tags: string[];
    desc?: string;
}

const RenderTags = ({ tags }: { tags: string[] }) => {
    const seen = tags.slice(0, 8);

    return (
        <>
            {seen.map((e, i) => (<Text key={`tag_${i}_${e}`} style={styles.tag_seen}>{e}</Text>))}
            {tags.length > 8 ? (<Text style={styles.tag_plus}>Plus {tags.length - 8} Tags</Text>) : null}
        </>
    );
}

export default function ListItem({ item, path }: { path: "/(content)/rules/[id]" | "/(content)/loadouts/[id]", item: SearchItem }) {
    const nav = useRouter();
    return (
        <Pressable onPress={() => nav.push({ pathname: path, params: { id: item.id } })} style={styles.container}>
            <ThemedText style={styles.header}>{item.title}</ThemedText>
            <View style={styles.tag_container}>
                {item.category.map(e => (<Text key={`cat_${e}`} style={styles.tag_category}>{e}</Text>))}
                <RenderTags tags={item.tags} />
            </View>
            {item?.desc ? <ThemedText style={styles.description}>{item.desc}</ThemedText> : null}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1F2426",
        minHeight: 50,
        width: "auto",
        marginVertical: 10,
        paddingHorizontal: 5
    },
    description: {
        fontSize: 15
    },
    tag_plus: {

    },
    tag_category: {
        color: "#2db7fc",
        fontWeight: "medium",
        fontSize: 14
    },
    tag_seen: {
        color: "#fc2d2d",
        fontWeight: "medium",
        fontSize: 14
    },
    tag_container: {
        display: "flex",
        flexDirection: "row",
        gap: 4,
        flexWrap: "wrap"
    },
    header: {
        fontWeight: "bold",
        fontSize: 17,
        textDecorationLine: "underline"
    }
});