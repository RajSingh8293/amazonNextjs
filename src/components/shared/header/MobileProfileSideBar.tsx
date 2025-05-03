"use client";

import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import UserSidebarDetail from "../UserSidebarDetail";
import Sidebar from "../Sidebar";
const MobileProfileSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="lg:hidden block">
      <div
        className="text-white border-2 p-2 flex border-transparent rounded hover:border-white hover:text-white"
        onClick={toggleSidebar}
      >
        <span className="">{session ? session.user.name : "Sign-in"}</span>{" "}
        <User size={30} className="" />
      </div>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}>
        <UserSidebarDetail toggleSidebar={toggleSidebar} />
      </Sidebar>
    </div>
  );
};

export default MobileProfileSideBar;
