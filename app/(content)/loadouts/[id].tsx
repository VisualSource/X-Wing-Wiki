import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { ThemedView } from "@/components/ThemedView";
import Pager from "@/components/loadouts/pager";
import Loadouts from "@/constants/Loadouts";

export default function LoadoutsPage() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const navigate = useNavigation();
    const [faction, ship] = id.split("-");
    const data = Loadouts.get(faction) ?? {};
    const item = data[ship];

    useEffect(() => {
        navigate.setOptions({ headerTitle: item.name });
    }, [navigate, item]);


    if (!item) throw new Error("Not Found");

    return (
        <ThemedView style={{ flex: 1 }}>
            <Pager data={item} />
        </ThemedView>
    );
}