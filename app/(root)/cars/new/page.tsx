import { currentUser } from '@clerk/nextjs';

import CarForm from '@/components/forms/CarForm';
import { userFromDB } from '@/lib/actions/user.actions';
import { objectToStringId } from '@/utils/objectToStringId';

const Page = async () => {
  let user;
  let userMongo;
  let userIdString;

  try {
    user = await currentUser();
    if (!user) throw new Error('User not authenticated.');

    userMongo = await userFromDB(user.id);
    if (!userMongo) throw new Error('Failed to fetch user from MongoDB.');

    userIdString = objectToStringId(userMongo._id);
    if (!userIdString) throw new Error('Error processing user ID.');
  } catch (err) {
    console.error(err);
    return <div>Error fetching data.</div>;
  }

  return (
    <div className="my-10 flex w-full items-center justify-center bg-white200">
      <CarForm userId={userIdString} />
    </div>
  );
};

export default Page;
