import { currentUser } from '@clerk/nextjs';

import CarForm from '@/components/forms/CarForm';
import { fetchUser } from '@/lib/actions/user.actions';
import { objectToStringId } from '@/utils/objectToStringId';

const Page = async () => {
  let user, userMongo, userIdString;

  try {
    user = (await currentUser()) as any;
    if (!user) {
      return <div>User not authenticated.</div>;
    }

    userMongo = await fetchUser(user.id);
    if (!userMongo) {
      throw new Error('Failed to fetch user from MongoDB.');
    }

    userIdString = objectToStringId(userMongo._id);
    if (!userIdString) {
      throw new Error('Error processing user ID.');
    }
  } catch (err) {
    console.error(err);
    return <div>Error fetching data.</div>;
  }

  return (
    <div className="my-10 flex w-full items-center justify-center bg-white200">
      <CarForm userId={userIdString} carId={null} />
    </div>
  );
};

export default Page;
