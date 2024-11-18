import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function ThemedSearch<T>({ placeholder = "Search", onSearch }: { onSearch: (value: string) => void, placeholder?: string }) {
    const [text, setText] = useState<string>();
    const color = useThemeColor({}, 'text');

    const submit = () => {
        if (text) onSearch(text);
    }

    return (
        <View style={styles.container}>
            <TextInput onChangeText={e => setText(e)} enterKeyHint="search" onSubmitEditing={submit} placeholder={placeholder} placeholderTextColor={color} style={[{ color, borderColor: color }, styles.input]} />
            <Pressable onPress={submit} style={styles.btn_core}>
                <Ionicons size={20} name="search" style={{ color: "#9BA1A6" }} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 4,
        marginHorizontal: 10,
        alignItems: "center",
        width: "auto",
        gap: 10,
        display: "flex",
        flexDirection: "row"
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: 12,
        paddingHorizontal: 10,
    },
    btn_core: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#fff',
    },
});