import LOADOUTS from "@/assets/search/loadouts.json";
import { Search } from "@/components/Search";

export default function LoadoutSearch() {
    return (<Search path="/(content)/loadouts/[id]" searchHint="Search Loadouts" searchTitle="Search Loadouts" data={LOADOUTS} />);
}