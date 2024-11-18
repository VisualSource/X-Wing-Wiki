import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { ThemedView } from "@/components/ThemedView";
import Pager from "@/components/loadouts/pager";
import Loadouts from "@/constants/Loadouts";

export default function LoadoutsPage() {
    const navigate = useNavigation();
    const { id } = useLocalSearchParams<{ id: string }>();

    const [faction, ship] = id.split("-");
    const data = Loadouts[faction];
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