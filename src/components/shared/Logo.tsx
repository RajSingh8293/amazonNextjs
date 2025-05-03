import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Link href="/" className="flex">
        <Image
          src="/images/amazon-logo.png"
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

export default Logo;
