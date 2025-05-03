"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Package, Settings } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: <Home size={20} /> },
  { label: "Users", href: "/admin/users", icon: <Users size={20} /> },
  { label: "Products", href: "/admin/products", icon: <Package size={20} /> },
  { label: "Settings", href: "/admin/settings", icon: <Settings size={20} /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white border-r shadow-sm hidden md:block">
      <div className="p-4 text-2xl font-bold border-b">Admin Panel</div>
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
