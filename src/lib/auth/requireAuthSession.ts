// lib/auth/requireAuthSession.ts
import { redirect } from "next/navigation";
import { getAuthSession } from "./auth";

export const requireAuthSession = async () => {
  const session = await getAuthSession();

  if (!session) {
    redirect("/sign-in");
  }

  return session;
};
