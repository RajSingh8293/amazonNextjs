// "use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { requireAuthSession } from "@/lib/auth/requireAuthSession";
// import { useSession } from "next-auth/react";

const Profile = async () => {
  // const { data: session } = useSession();
  const session = await requireAuthSession();
  console.log("session :", session?.user);

  return (
    <div className="flex  justify-center min-h-screen w-full">
      <div className="my-5 w-1/2 mx-auto">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/your-account"
                  className="hover:underline text-blue-500"
                >
                  {" "}
                  Your account
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-blue-500" />
              <BreadcrumbItem>
                <BreadcrumbLink className="text-[tomato]">
                  Login and Security
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="">
          <h1 className="text-3xl py-3 ">Login and Security</h1>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Name</CardTitle>
                  <CardDescription className="mt-1 text-black">
                    {session?.user?.name}
                  </CardDescription>
                </div>
                <Button variant="outline">Edit</Button>
              </div>
            </CardHeader>
            <Separator />
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Email</CardTitle>
                  <CardDescription className="mt-1 text-black">
                    {session?.user?.email}
                  </CardDescription>
                </div>
                <Button variant="outline">Edit</Button>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
