import { currentUser } from "@clerk/nextjs";

import CarForm from "@/components/forms/CarForm";
import { userFromDB } from "@/lib/actions/user.actions";
import { objectToStringId } from "@/utils/utility.functions";
import ErrorPage from "@/components/transitionPages/ErrorPage";

const Page = async () => {
  let user;
  let userMongo;
  let userIdString;

  try {
    user = await currentUser();
    if (!user) {
      return <ErrorPage errorMessage="User not authenticated" />;
    }

    userMongo = await userFromDB(user.id);
    if (!userMongo) {
      return <ErrorPage errorMessage="Failed to fetch user from MongoDB." />;
    }

    userIdString = objectToStringId(userMongo._id);
    if (!userIdString) {
      return <ErrorPage errorMessage="Error processing user ID." />;
    }
  } catch (err) {
    console.error(err);
    return <ErrorPage errorMessage="Error fetching data." />;
  }

  return (
    <div className="flex w-screen items-center justify-center bg-white200 dark:bg-gray900">
      <div className="mb-12 mt-[7.6rem] flex w-screen max-w-4xl items-center justify-center px-5 md:mt-[9.4rem]">
        <CarForm userId={userIdString} />
      </div>
    </div>
  );
};

export default Page;
