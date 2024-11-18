import PagerView from "react-native-pager-view";
import { Loadout } from "@/constants/Loadouts";
import { chunk } from "@/lib/arrayChunk";
import { Card } from "./Card";

const Pager: React.FC<{ data: Loadout }> = ({ data }) => {
    return (
        <PagerView style={{ flex: 1 }} initialPage={0}>
            {chunk(data?.builds ?? [], 3).map((builds, i) => (
                <Card key={i} builds={builds} />
            ))}
        </PagerView>
    );
}

export default Pager;