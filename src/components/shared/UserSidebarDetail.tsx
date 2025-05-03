import { User2Icon, X } from "lucide-react";
import React from "react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
interface UserSidebarProps {
  toggleSidebar: () => void;
}
const UserSidebarDetail = ({ toggleSidebar }: UserSidebarProps) => {
  const { data: session } = useSession();
  return (
    <div>
      {" "}
      <div className="flex justify-between p-4 px-5 border-2 bg-gray-800 text-white">
        <div className="text-lg font-bold text-white flex gap-2 ">
          <span className="border-2 border-white rounded-full">
            <User2Icon />
          </span>
          <h1>Hello, {session ? session.user.name : "Sign In"} </h1>
        </div>
        <button onClick={toggleSidebar} className="text-xl font-bold">
          <X />
        </button>
      </div>
      <div className="p-4 space-y-2 overflow-y-auto h-full">
        <div className="p-2 ">
          <ul className="mt-2">
            <li>{session?.user.name}</li>
            <li>{session?.user.email}</li>
          </ul>
        </div>
        <Separator className="my-2" />
        {session?.user.role === "admin" && (
          <div>
            <div>
              <Link href="/your-account">Your Account</Link>
            </div>
            <div>
              <Link href="/admin">Admin</Link>
            </div>
          </div>
        )}
        <div className="p-2 pb-16">
          <h1 className="text-xl font-semibold text-gray-800">
            Help & Settings
          </h1>
          <ul className="mt-2">
            <li className="mb-2">
              <Link href="/your-account">Your Account</Link>{" "}
            </li>
            <li className="mb-2">
              {session ? (
                <Button variant="outline">Logout</Button>
              ) : (
                <Button variant="outline">Sign in</Button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserSidebarDetail;
