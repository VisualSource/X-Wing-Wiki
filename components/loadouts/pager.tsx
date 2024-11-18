import { GestureDetector, Gesture, Directions, GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native";
import { useState } from "react";

import type { Loadout } from "@/constants/Loadouts";
import { Card } from "./Card";

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
                <View style={{ flex: 1 }}>
                    <Card builds={builds} />
                </View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
}

export default Pager;