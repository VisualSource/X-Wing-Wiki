import { useLocalSearchParams } from "expo-router";

import LoadoutComponent from "@/components/loadouts/loadout";
import { ThemedView } from "@/components/ThemedView";
import Loadouts from "@/constants/Loadouts";
import { Loadout } from "@/lib/types";

export default function LoadoutsPage() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const [faction, ship] = id.split("-");

    const data = Loadouts.get(faction) as Loadout;
    const item = data.find(e => e.xws === ship);
    if (!item) throw new Error("Not Found");

    return (
        <ThemedView style={{ flex: 1 }}>
            <LoadoutComponent item={item} />
        </ThemedView>
    );
}