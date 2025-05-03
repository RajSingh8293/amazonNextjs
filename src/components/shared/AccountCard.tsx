import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

interface AccountCardProps {
  data: {
    image: string;
    title: string;
    msg: string;
    href: string;
  };
}

const AccountCard = ({ data }: AccountCardProps) => {
  return (
    <div>
      {" "}
      <Link href={data.href}>
        <Card>
          <CardHeader>
            <div className="grid grid-cols-3">
              <div className=" col-span-1">
                <div>
                  <Image
                    //   src="/images/amazon_logo_2.png"
                    src={data.image}
                    width={80}
                    height={30}
                    sizes="100px"
                    alt="logo"
                    priority
                  />
                </div>
              </div>
              <div className="col-span-2">
                <CardTitle>{data.title}</CardTitle>
                <CardDescription className=" text-black mt-1">
                  {data.msg}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
};

export default AccountCard;
