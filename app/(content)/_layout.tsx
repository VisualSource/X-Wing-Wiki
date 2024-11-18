import { useKeepAwake } from "expo-keep-awake";
import { Stack } from "expo-router";

export default function ContentLayout() {
    useKeepAwake();
    return <Stack screenOptions={{
        headerTitle: "Search",
    }} />
}