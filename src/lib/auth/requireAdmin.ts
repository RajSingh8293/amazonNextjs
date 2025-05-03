// lib/auth/requireAdmin.ts
import { redirect } from "next/navigation";
import { getAuthSession } from "./auth";

export const requireAdmin = async () => {
  const session = await getAuthSession();

  if (!session) {
    redirect("/sign-in");
  }

  if (session.user.role !== "admin") {
    redirect("/unauthorized");
  }

  return session;
};
