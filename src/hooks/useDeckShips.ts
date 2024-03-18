import useLocalStorage from "use-local-storage";

const useDeckShips = () => {
  const [data, setData] = useLocalStorage<
    { ship: Ships.ShipSearchData; idx: number }[]
  >("deck", [], {
    serializer: (object) => JSON.stringify(object),
    parser: (str) => JSON.parse(str),
  });

  return {
    ships: data,
    addShip(ship: Ships.ShipSearchData) {
      setData((current) => {
        if (!current) return current;
        return [{ ship, idx: current.length }, ...current];
      });
    },
    removeShip(id: string, idx: number) {
      setData((current) => {
        if (!current) return current;
        return current
          .filter((item) => item.ship.id !== id && item.idx !== idx)
          .map((value, i) => ({ ship: value.ship, idx: i }));
      });
    },
  };
};

export default useDeckShips;
