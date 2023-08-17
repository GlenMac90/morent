import React from 'react';

import { currentUser } from '@clerk/nextjs';
import CarForm from '@/components/forms/CarForm';
import { fetchUser } from '@/lib/actions/user.actions';

interface MongooseUserObject {
  _id: string;
  id: string;
  __v: number;
  bio: string;
  image: string;
  name: string;
  onboarded: boolean;
  username: string;
  cars: [];
}

interface MongooseUser extends MongooseUserObject {
  toObject: () => MongooseUserObject;
}

const toPlainObject = (mongooseDoc: MongooseUser): MongooseUserObject => {
  const plainObject = mongooseDoc.toObject();
  delete (plainObject as Partial<MongooseUserObject>).__v;
  return plainObject;
};

const Page = async () => {
  const user = (await currentUser()) as any;
  if (!user) return null;
  const userId = user.id;
  const userMongo = await fetchUser(userId);
  // try catch
  const userIdSimpleObject = toPlainObject(userMongo)._id;

  return (
    <div className="my-10 flex w-full items-center justify-center bg-white200">
      <CarForm userId={userIdSimpleObject} carId={null} />
    </div>
  );
};

export default Page;

export function stringToObjectId(id: string): mongoose.Types.ObjectId | null {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return new mongoose.Types.ObjectId(id);
  } else {
    return null;
  }
}
