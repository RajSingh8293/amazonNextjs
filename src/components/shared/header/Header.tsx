import Link from "next/link";
import React from "react";
import SearchForm from "./SearchForm";
import UserButton from "./UserButton";
import CartButton from "./CartButton";
import { data } from "@/lib/data/data";
import { getAllCategories } from "@/lib/actions/product.actions";
import MenuSidebar from "./MenuSidebar";
import Logo from "../Logo";
const tags = ["best-seller", "today-deal", "featured"];
const Header = async () => {
  const categories = await getAllCategories();
  return (
    <>
      <div className="px-5 py-1 flex gap-5 justify-between items-center bg-[#131921]">
        <div className="text-white rounded h-full pt-4   border-2 border-transparent hover:border-white p-1 flex hover:text-white">
          <Logo />
          <span>.in</span>
        </div>
        <div className="lg:max-w-xl max-w-[400px] w-full  hidden md:block">
          <SearchForm />
        </div>
        <div className="flex gap-4 h-full items-center">
          <UserButton />
          <CartButton />
        </div>
      </div>
      <div className="w-full px-5 py-2 bg-gray-800  flex justify-center items-center lg:hidden md:hidden">
        <div className=" w-full ">
          <SearchForm />
        </div>
      </div>
      {/* <BottomNavbar /> */}
      <div className="bg-gray-800 h-[42px] flex items-center">
        <div className="flex gap-5 flex-wrap items-center px-5">
          <MenuSidebar categories={categories} tags={tags} />
          {data?.navMenus?.map((nav, i) => (
            <div
              key={i}
              className="text-white hidden md:block p-2 border-2 border-transparent rounded hover:border-white hover:text-white"
            >
              <Link key={i} href={nav.link}>
                {nav.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
