"use client";

import { FilterData } from "@/constants";
import Filter from "@/components/Filter";
import useFilterStore from "@/lib/store";

const FilteringContent = ({ desktopView }: { desktopView: boolean }) => {
  const [typeCounts, capacityCounts] = useFilterStore((state) => [
    state.typeCounts,
    state.capacityCounts,
  ]);

  return (
    <div className={`lg:flex lg:flex-col ${desktopView && "hidden"}`}>
      {FilterData.map((item) => (
        <Filter
          key={item.label}
          label={item.label}
          payload={item.payload}
          count={item.label === "type" ? typeCounts : capacityCounts}
          desktopView={desktopView}
        />
      ))}
    </div>
  );
};

export default FilteringContent;
