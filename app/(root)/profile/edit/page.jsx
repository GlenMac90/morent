import { currentUser } from '@clerk/nextjs';

import { fetchUser } from '@/lib/actions/user.actions';
import { AccountProfile } from '@/components/forms/AccountProfile';

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? '',
    bio: userInfo ? userInfo?.bio : '',
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  console.log(userData);

  return (
    <>
      <h1 className="">Edit Profile</h1>
      <p className="">Make any changes</p>

      <section className="mt-12">
        <AccountProfile user={userData} />
      </section>
    </>
  );
}

export default Page;
