"use client";
import { Separator } from "@/components/ui/separator";
import { User2Icon, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const MenuSidebarDetail = ({
  categories,
  tags,
}: {
  categories: string[];
  tags: string[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div onClick={toggleSidebar}>
      <div className="flex justify-between p-4 px-5 border-2 bg-gray-800 text-white">
        <div className="text-lg font-bold text-white flex gap-2 ">
          <span className="border-2 border-white rounded-full">
            <User2Icon />
          </span>
          <h1>Hello, {session ? session.user.name : "Sign In"}</h1>
        </div>
        <button onClick={toggleSidebar} className="text-xl font-bold">
          <X />
        </button>
      </div>
      <div className="p-4 space-y-2 overflow-y-auto h-full">
        <div className="p-2 ">
          <h1 className="text-xl font-semibold text-gray-800">Trending</h1>
          <ul className="mt-2">
            {tags.map((t: string) => (
              <li key={t} className="mb-2 capitalize">
                <Link className={``} href={`/search?tag=${t}`}>
                  {t}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Separator className="my-2" />
        <div className="p-2 ">
          <h1 className="text-xl font-semibold text-gray-800">
            Shop by Category
          </h1>
          <ul className="mt-2">
            {categories.map((c: string) => (
              <li key={c} className="mb-2">
                <Link className={``} href={`/search?category=${c}`}>
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-2 pb-16">
          <h1 className="text-xl font-semibold text-gray-800">
            Help & Settings
          </h1>
          <ul className="mt-2">
            <li className="mb-2"> Your Account </li>
            <li className="mb-2">signin</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MenuSidebarDetail;
