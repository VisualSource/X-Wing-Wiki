import Animated, { FadingTransition } from "react-native-reanimated";
import PagerView from "react-native-pager-view";
import { View } from "react-native";

import type { Loadout } from "@/constants/Loadouts";
import { Card } from "./LoadoutCard";
import { ThemedText } from "../ThemedText";
import { chunk } from "@/lib/arrayChunk";


const Pager: React.FC<{ data: Loadout }> = ({ data }) => {
    const builds = chunk(data?.builds ?? [], 3);
    const pages = builds.length;

    return (
        <PagerView style={{ flex: 1 }} initialPage={0}>
            {builds.map((builds, i) => (
                <View collapsable={false} style={{ flex: 1 }} key={i}>
                    <Animated.View layout={FadingTransition} style={{ flex: 1 }}>
                        <Card builds={builds} />
                    </Animated.View>
                    <View style={{ width: "auto", alignItems: "center", marginBottom: 10, display: "flex", justifyContent: "center" }}>
                        <ThemedText style={{ textAlign: "center", marginVertical: "auto" }}>Page {i + 1} of {pages}</ThemedText>
                    </View>
                </View>
            ))}
        </PagerView>
    );
}

export default Pager;