"use client";

import { Bell, Menu, UserCircle } from "lucide-react";

export default function AdminNavbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm">
      {/* Left - Optional Mobile Menu Button */}
      <div className="flex items-center gap-2">
        <Menu className="w-6 h-6 md:hidden cursor-pointer" />
        <h1 className="text-xl font-semibold hidden md:block">
          Admin Dashboard
        </h1>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-4">
        <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600" />
        <div className="flex items-center gap-2 cursor-pointer">
          <UserCircle className="w-8 h-8 text-gray-600" />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-medium">Admin Name</span>
            <span className="text-xs text-gray-500">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
