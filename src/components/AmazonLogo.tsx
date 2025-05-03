import Image from "next/image";
import Link from "next/link";
import React from "react";

const AmazonLogo = () => {
  return (
    <div className=" ">
      <Link href="/">
        <Image
          src="/images/amazon_logo_2.png"
          width={100}
          height={30}
          sizes="200px"
          alt="logo"
          priority
        />
      </Link>
    </div>
  );
};

export default AmazonLogo;
