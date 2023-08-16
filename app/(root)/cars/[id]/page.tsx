import { fetchCarById } from '@/lib/actions/car.actions';

const EditCarPage = async ({ params }) => {
  const { id } = params;
  const carData = await fetchCarById(id);

  return (
    <div className="my-10 flex w-full items-center justify-center bg-white200">
      Car data
    </div>
  );
};

export default EditCarPage;
