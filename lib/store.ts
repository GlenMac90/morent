import { create } from "zustand";

interface filterState {
  search: string;
  type: string[];
  capacity: string[];
  price: number[];
  typeCounts: { [key: string]: number };
  capacityCounts: { [key: string]: number };
}

type filterActions = {
  setSearch: (search: string) => void;
  setType: (type: string[]) => void;
  setCapacity: (capacity: string[]) => void;
  setPrice: (price: number[]) => void;
  setTypeCounts: (typeCounts: { [key: string]: number }) => void;
  setCapacityCounts: (capacityCounts: { [key: string]: number }) => void;
};

const useFilterStore = create<filterState & filterActions>()((set) => ({
  search: "",
  type: [],
  capacity: [],
  price: [950],
  typeCounts: {},
  capacityCounts: {},
  setSearch: (search: string) => set(() => ({ search })),
  setType: (type: string[]) => set(() => ({ type })),
  setCapacity: (capacity: string[]) => set(() => ({ capacity })),
  setPrice: (price: number[]) => set(() => ({ price })),
  setTypeCounts: (typeCounts: { [key: string]: number }) =>
    set(() => ({ typeCounts })),
  setCapacityCounts: (capacityCounts: { [key: string]: number }) =>
    set(() => ({ capacityCounts })),
}));

export default useFilterStore;
