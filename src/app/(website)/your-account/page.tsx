import React from "react";
import AccountCard from "@/components/shared/AccountCard";
import BrowsHistory from "@/components/shared/BrowsHistory";
import { youAccountData } from "@/lib/data/data";

const YourAccont = () => {
  return (
    <div className="min-h-screen w-full px-5">
      <div className="my-5 mx-auto w-full max-w-[1100px]">
        <div className="">
          <h1 className="text-3xl py-3 ">Your Account</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
            {youAccountData.map((data) => (
              <AccountCard key={data._id} data={data} />
            ))}
          </div>
        </div>
      </div>

      <div>
        <BrowsHistory
          title="Your browsing history"
          className="h-32"
          size="24vh"
          grid="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
        />
      </div>
    </div>
  );
};

export default YourAccont;
