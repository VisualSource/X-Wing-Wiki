import { useLocalSearchParams } from "expo-router";
import Pager from "@/components/loadouts/pager";
import { ThemedView } from "@/components/ThemedView";
import Loadouts from "@/constants/Loadouts";

export default function LoadoutsPage() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const [faction, ship] = id.split("-");

    const data = Loadouts.get(faction);
    if (!data) throw new Error("Failed to get faction data");
    const item = data[ship];
    if (!item) throw new Error("Not Found");

    return (
        <ThemedView style={{ flex: 1 }}>
            <Pager data={item} />
        </ThemedView>
    );
}