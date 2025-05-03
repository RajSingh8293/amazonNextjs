"use client";
import Link from "next/link";
// import { auth } from "../../../auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import MobileProfileSideBar from "./MobileProfileSideBar";

const UserButton = () => {
  const { data: session } = useSession();
  console.log("session :", session);

  return (
    <div>
      <div className="text-white hidden lg:block rounded h-full  border-2 border-transparent hover:border-white hover:text-white p-1">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <p className="text-sm text-start">
              Hello, {session ? session?.user.name : "sign in"}
            </p>
            <h2 className="text-white font-bold text-sm">Account & Orders</h2>
          </DropdownMenuTrigger>
          {session ? (
            <DropdownMenuContent className="bg-white w-80 py-3 text-black border-0">
              <DropdownMenuLabel>
                <div>
                  <p>{session?.user.name}</p>
                  <p>{session?.user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/your-account">Your Account</Link>
              </DropdownMenuItem>
              {session?.user.role === "admin" && (
                <DropdownMenuItem>
                  <Link href="/admin">Admin</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                {/* <form action={SignOut}> */}
                <Button onClick={() => signOut()}>Sign-Out</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          ) : (
            <DropdownMenuContent className="bg-white w-80 py-3  text-black border-0">
              <div className="flex justify-center items-center gap-1 flex-col">
                <div className="w-[70%]">
                  <Button
                    size="sm"
                    className="bg-yellow-500 w-full hover:bg-yellow-400 "
                  >
                    <Link href="/sign-in" className="text-black">
                      SignIn
                    </Link>
                  </Button>
                </div>
                <div className="flex gap-1 text-sm">
                  <p>New customer? </p>
                  <Link href="/sign-up" className="text-blue-500">
                    {" "}
                    Start here.
                  </Link>
                </div>
              </div>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>
      {/* <div className="text-white lg:hidden block rounded h-full  border-2 border-transparent hover:border-white hover:text-white p-1"> */}
      {/* <div className="flex items-center">
          <p className="text-sm text-start">
            {session ? session?.user.name : "sign in"}
          </p>
          <User size={30} />
        </div> */}
      <MobileProfileSideBar />
      {/* </div> */}
    </div>
  );
};

export default UserButton;
