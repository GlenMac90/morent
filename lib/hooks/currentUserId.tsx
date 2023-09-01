"use server";

import { currentUser } from "@clerk/nextjs";
import { connectToDB } from "../mongoose";
import User from "../models/user.model";

const currentUserId = async () => {
  connectToDB();
  const user = await currentUser();
  const userDocument = await User.findOne({ id: user?.id });
  const document = userDocument.toObject();

  const mongoDBObject = {
    id: document._id.toString(),
    image: document.image,
    username: document.username,
  };

  document._id.toString();
  if (user?.id !== null) {
    return mongoDBObject;
  } else {
    return <p>user not found</p>;
  }
};

export default currentUserId;
