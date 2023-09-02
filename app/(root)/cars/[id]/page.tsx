import { fetchCarById } from "@/lib/actions/car.actions";
import CarForm from "@/components/forms/CarForm";

interface EditCarPageProps {
  params: {
    id: string;
  };
}

const EditCarPage: React.FC<EditCarPageProps> = async ({ params }) => {
  const { id } = params;
  const carData = await fetchCarById(id);

  if (!carData) {
    return <div>Error fetching car data or car data not found.</div>;
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-full justify-center py-40">
        <CarForm car={carData} />
      </div>
    </div>
  );
};

export default EditCarPage;
