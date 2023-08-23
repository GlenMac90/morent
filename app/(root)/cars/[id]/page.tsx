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
    <div className="my-10 flex w-full items-center justify-center bg-white200">
      <CarForm car={carData} />
    </div>
  );
};

export default EditCarPage;
