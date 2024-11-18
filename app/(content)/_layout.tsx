import { useKeepAwake } from "expo-keep-awake";
import { Stack } from "expo-router";

export default function ContentLayout() {
    useKeepAwake();
    return (
        <Stack>
            <Stack.Screen name="/loadouts/[id]" />
            <Stack.Screen name="/rules/[id]" />
        </Stack>
    );
}