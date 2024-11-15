import { View } from "react-native";
import { useState } from "react";
import { Card } from "./card";
import { Loadout } from "@/constants/Loadouts";

const Pager: React.FC<{ data: Loadout[0] }> = ({ data }) => {
    const [offset, setOffset] = useState(0);

    const builds = data.builds.slice(offset, offset + 2);

    return (
        <View style={{ flex: 1 }}>
            <Card builds={builds} />
        </View>
    );
}

export default Pager;