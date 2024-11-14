import { Stack, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
export default function ContentLayout() {
    return <Stack screenOptions={{
        headerTitle: () => {
            const props = useLocalSearchParams<{ id: string }>();
            return (<ThemedText>{props.id}</ThemedText>)
        }
    }} />
}