import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { IAddress } from "@/models/address.model";
const AddressCard = ({ addressData }: { addressData: IAddress }) => {
  return (
    <Card className="w-full h-auto">
      <CardHeader>
        <CardTitle className="mt-1 text-black">
          {addressData.fullName}
        </CardTitle>
        <CardDescription className="text-black">
          <p>{addressData.postalCode}</p>
          <p>{addressData.street}</p>
          <p>{addressData.city}</p>
          <p>{addressData.state}</p>
          <p>{addressData.country}</p>
          <p>Phone number: {addressData.phone}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm">
          <Button
            variant="ghost"
            className="bg-white hover:bg-white hover:underline text-blue-700 hover:text-blue-600"
          >
            <Link href="/your-account/edit-address"> Edit</Link>
          </Button>
          <Separator orientation="vertical" />
          <Button
            variant="ghost"
            className="bg-white hover:bg-white hover:underline text-blue-700 hover:text-blue-600"
          >
            remove
          </Button>
          <Separator orientation="vertical" />
          <Button
            variant="ghost"
            className="bg-white hover:bg-white hover:underline text-blue-700 hover:text-blue-600"
          >
            Set as Default
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
