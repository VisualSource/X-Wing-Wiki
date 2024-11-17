import { Stack } from "expo-router";
import { useKeepAwake } from "expo-keep-awake";

export default function ContentLayout() {
    useKeepAwake();
    return <Stack screenOptions={{
        headerTitle: "Search",
    }} />
}