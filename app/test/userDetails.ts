import { currentUser } from "@clerk/nextjs";

export const userDetails = async () => {
  try {
    const info = await currentUser();

    if (info && info.id) {
      return info.id;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Failed to fetch user details:", error);
    return false; // or throw error, depending on how you want to handle it
  }
};
