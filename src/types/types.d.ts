module Ships {
    type ShipSearchData = {
        title: string;
        faction_icon: string;
        id: string;
        ship_icon: string;
        tags: string[];
    }

    type Ship = {
        icon: string;
        dial: `${number}${string}`[],
        xws: string;
        pilots: {
            xws: string;
            image: string;
            loadout_full: Record<string, {

            }>
        }[]
    }

}