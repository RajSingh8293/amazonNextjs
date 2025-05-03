"use client";
import Link from "next/link";
import React from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Logo from "./Logo";

const Footer = () => {
  return (
    <div>
      <div className="bg-gray-800 py-2 flex justify-center items-center">
        <Button
          variant="outline"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-white  py-2 hover:text-white cursor-pointer shadow-none border-0 hover:bg-gray-700 h-full rounded-none  bg-gray-800"
        >
          <ChevronUp />
          Back to top
        </Button>
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-3 text-white lg:px-24 px-10 py-16 bg-gray-900">
        <div className="flex flex-col gap-2   justify-start">
          <h1 className="text-xl font-semibold text-white">Get to Know Us</h1>
          <Link className="text-sm font-medium" href="/about">
            About Amazon
          </Link>
          <Link className="text-sm font-medium" href="/careers">
            Careers
          </Link>
          <Link className="text-sm font-medium" href="/releases">
            Press Releases
          </Link>
          <Link className="text-sm font-medium" href="/contact">
            Contact
          </Link>
        </div>
        <div className="flex flex-col gap-2   justify-start">
          <h1 className="text-xl font-semibold text-white">Connect with Us</h1>
          <Link className="text-sm font-medium" href="/Facebook">
            Facebook
          </Link>
          <Link className="text-sm font-medium" href="/Twitter">
            Twitter
          </Link>
          <Link className="text-sm font-medium" href="/Instagram">
            Instagram
          </Link>
        </div>
        <div className="flex flex-col gap-2   justify-start">
          <h1 className="text-xl font-semibold text-white">
            Make Money with Us
          </h1>
          <Link className="text-sm font-medium" href="/Sell on Amazon">
            Sell on Amazon
          </Link>
          <Link
            className="text-sm font-medium"
            href="/Protect and Build Your Brand"
          >
            Protect and Build Your Brand
          </Link>
          <Link className="text-sm font-medium" href="/Advertise Your Products">
            Advertise Your Products
          </Link>
          <Link className="text-sm font-medium" href="/Advertise Your Products">
            Advertise Your Products
          </Link>
        </div>
        <div className="flex flex-col gap-2   justify-start">
          <h1 className="text-xl font-semibold text-white">Let Us Help You</h1>
          <Link className="text-sm font-medium" href="/Your Account">
            Your Account
          </Link>
          <Link className="text-sm font-medium" href="/PReturns Centre">
            Returns Centre
          </Link>
          <Link
            className="text-sm font-medium"
            href="/	Recalls and Product Safety Alerts"
          >
            Recalls and Product Safety Alerts
          </Link>
          <Link className="text-sm font-medium" href="/Help">
            Help
          </Link>
        </div>
      </div>
      <Separator />

      <div className=" bg-gray-700 p-5 flex justify-center items-center">
        <Logo />
      </div>
    </div>
  );
};

export default Footer;
