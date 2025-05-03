"use server";

import User, { IUser } from "@/models/user.model";
import { requireAdmin } from "../auth/requireAdmin";
import { dbConnect } from "../db/dbConnect";
export const getAllUsers = async () => {
  await requireAdmin();
  try {
    await dbConnect();
    const users = await User.find({});

    if (!users || users.length === 0) {
      return null;
    }
    return {
      users: JSON.parse(JSON.stringify(users)) as IUser[],
    };
  } catch (error) {
    console.error("Error:", error);
  }
};

import { requireAuthSession } from "../auth/requireAuthSession";

export const getUserProfile = async () => {
  await dbConnect();
  // const session = await getServerSession(authOptions);
  const session = await requireAuthSession();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await User.findOne({ email: session.user.email }).lean();

  if (!user) return null;

  return {
    user: JSON.parse(JSON.stringify(user)),
  };
};
