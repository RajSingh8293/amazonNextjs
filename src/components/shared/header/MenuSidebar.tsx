/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { AlignJustify } from "lucide-react";
import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { Separator } from "@/components/ui/separator";
import { User2Icon, X } from "lucide-react";
import Link from "next/link";
import MenuSidebarDetail from "./MenuSidebarDetail";
const MenuSidebar = ({
  categories,
  tags,
}: {
  categories: string[];
  tags: string[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        className="text-white border-2 p-2 flex gap-2 border-transparent rounded hover:border-white hover:text-white"
        onClick={toggleSidebar}
      >
        <AlignJustify className="" /> <span className="">All</span>
      </div>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}>
        <MenuSidebarDetail categories={categories} tags={tags} />
      </Sidebar>
    </div>
  );
};

export default MenuSidebar;
