import { FilterData } from "@/constants";
import Filter from "@/components/Filter";

const FilteringContent = ({ desktopView }: { desktopView: boolean }) => {
  const dummyCountData = 10;

  return (
    <div className={`lg:flex lg:flex-col ${desktopView && "hidden"}`}>
      {FilterData.map((item) => (
        <Filter
          key={item.label}
          label={item.label}
          payload={item.payload}
          count={dummyCountData}
          desktopView={desktopView}
        />
      ))}
    </div>
  );
};

export default FilteringContent;
