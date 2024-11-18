import RULES_SEARCH_DATA from "@/assets/search/docs.json";
import { Search } from "@/components/Search";

export default function RulesSearch() {
    return (
        <Search path="/(content)/rules/[id]" searchHint="Search Rules" searchTitle="Search rules" data={RULES_SEARCH_DATA} />
    );
}