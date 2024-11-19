import { GestureDetector, Gesture, Directions, GestureHandlerRootView } from "react-native-gesture-handler";
import { Text, View } from "react-native";
import { useState } from "react";

import type { Loadout } from "@/constants/Loadouts";
import { Card } from "./LoadoutCard";
import { ThemedText } from "../ThemedText";
import Animated, { FadingTransition } from "react-native-reanimated";

const Pager: React.FC<{ data: Loadout }> = ({ data }) => {
    const [offset, setOffset] = useState(0);
    const pages = Math.ceil(data.builds.length / 3);
    const builds = data.builds.slice(offset * 3, (offset * 3) + 3);

    const flingLeft = Gesture.Fling().runOnJS(true).direction(Directions.LEFT).onEnd(() => {
        setOffset((value) => {
            const n = value + 1;
            return n >= pages ? pages - 1 : n;
        });
    });
    const flingRight = Gesture.Fling().runOnJS(true).direction(Directions.RIGHT).onEnd(() => {
        setOffset((value) => {
            const p = value - 1;
            return p <= 0 ? 0 : p;
        });
    });
    const composed = Gesture.Race(flingRight, flingLeft);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <GestureDetector gesture={composed}>
                <View collapsable={false} style={{ flex: 1 }}>
                    <Animated.View layout={FadingTransition} style={{ flex: 1 }}>
                        <Card builds={builds} />
                    </Animated.View>
                    <View style={{ width: "auto", alignItems: "center", marginBottom: 10, display: "flex", justifyContent: "center" }}>
                        <ThemedText style={{ textAlign: "center", marginVertical: "auto" }}>Page {offset + 1} of {pages}</ThemedText>
                    </View>
                </View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
}

export default Pager;