import { View } from "react-native";
import { useState } from "react";
import type { Loadout } from "@/constants/Loadouts";
import { Card } from "./Card";

const Pager: React.FC<{ data: Loadout }> = ({ data }) => {
    const [offset, setOffset] = useState(0);

    const builds = data.builds.slice(offset, offset + 2);

    return (
        <View style={{ flex: 1 }}>
            <Card builds={builds} />
        </View>
    );
}

export default Pager;