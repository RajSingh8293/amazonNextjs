import React from "react";
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  children: React.ReactNode;
}
const Sidebar = ({ isOpen, toggleSidebar, children }: SidebarProps) => {
  return (
    <div
      className={`fixed h-full inset-0 bg-black/50  z-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={toggleSidebar}
    >
      <div
        className={`fixed  top-0 left-0 h-full   w-72 bg-white text-gray-700 shadow-xl transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform ease-in-out duration-300`}
      >
        {/* <Button
          aria-label="Close"
          onClick={toggleSidebar}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X />
        </Button> */}
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
