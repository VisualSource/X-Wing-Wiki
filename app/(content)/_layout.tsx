import { type ErrorBoundaryProps, Link, Stack } from "expo-router";
import { useKeepAwake } from "expo-keep-awake";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
    return (
        <>
            <Stack.Screen options={{ title: 'Oops!' }} />
            <ThemedView style={styles.container}>
                <ThemedText type="title">There was an error.</ThemedText>
                <ThemedText type="subtitle">{error.message}</ThemedText>
                <Link href="/" style={styles.link}>
                    <ThemedText type="link">Go to home screen!</ThemedText>
                </Link>
            </ThemedView>
        </>
    );
}

export default function ContentLayout() {
    useKeepAwake();
    return (
        <Stack>
            <Stack.Screen options={{ headerTitle: "Loadouts" }} name="loadouts/[id]" />
            <Stack.Screen options={{ headerTitle: "Rules" }} name="rules/[id]" />
        </Stack>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
});
