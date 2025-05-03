"use client";
import React, { useEffect, useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  createNewAddress,
  updatedAddress,
} from "@/lib/actions/address.actions";
import { toast } from "sonner";
import { IAddress } from "@/models/address.model";
interface CreateAddressFormProps {
  addressData?: IAddress;
  onClose: () => void;
  submitBtnTitle: string;
}

const CreateAddressForm = ({
  addressData,
  submitBtnTitle,
  onClose,
}: CreateAddressFormProps) => {
  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  });
  const [isPending, startTransition] = useTransition();

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        await createNewAddress(address);
        toast.success("Address created successfully");
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Something went wrong.";
        toast.error(errorMessage);
      }
    });
    onClose();
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (addressData) {
      startTransition(async () => {
        try {
          const res = await updatedAddress({
            addressId: addressData?._id as string,
            updateData: address,
          });
          if (res.success) {
            toast.success("Address updated successfully!");
          } else {
            toast.error(res.message || "Failed to update address.");
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Something went wrong.";
          toast.error(errorMessage);
        }
      });
      onClose();
    }
  };

  useEffect(() => {
    if (addressData) {
      setAddress(addressData);
    }
  }, [addressData]);
  return (
    <div className=" flex w-full  justify-center">
      <Card className=" border-none bg-white w-full">
        <CardHeader>
          <CardTitle className="text-gray-600 text-xl">
            {addressData ? "Edit Your Address" : "Create New Address"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <form
              onSubmit={addressData ? handleUpdateSubmit : handleCreateSubmit}
            >
              <div className="w-full grid lg:grid-cols-2 gap-2 md:grid-cols-2 grid-cols-1">
                <Input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-2 border mb-4 rounded"
                  value={address.fullName}
                  onChange={(e) =>
                    setAddress({ ...address, fullName: e.target.value })
                  }
                />
                <Input
                  type="number"
                  placeholder="Phone"
                  className="w-full p-2 border mb-4 rounded"
                  value={address.phone}
                  onChange={(e) =>
                    setAddress({ ...address, phone: e.target.value })
                  }
                />
              </div>
              <div className="w-full grid lg:grid-cols-2 gap-2 md:grid-cols-2 grid-cols-1">
                <Input
                  type="street"
                  placeholder="Street"
                  className="w-full p-2 border mb-6 rounded"
                  value={address.street}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                />
                <Input
                  type="city"
                  placeholder="City"
                  className="w-full p-2 border mb-6 rounded"
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                />
              </div>
              <div className="w-full grid lg:grid-cols-2 gap-2 md:grid-cols-2 grid-cols-1">
                <Input
                  type="state"
                  placeholder="State"
                  className="w-full p-2 border mb-6 rounded"
                  value={address.state}
                  onChange={(e) =>
                    setAddress({ ...address, state: e.target.value })
                  }
                />
                <Input
                  type="postalCode"
                  placeholder="PostalCode"
                  className="w-full p-2 border mb-6 rounded"
                  value={address.postalCode}
                  onChange={(e) =>
                    setAddress({ ...address, postalCode: e.target.value })
                  }
                />
              </div>

              <div className="w-full grid grid-cols-1">
                <Input
                  type="country"
                  placeholder="Country"
                  className="w-full p-2 border mb-6 rounded"
                  value={address.country}
                  onChange={(e) =>
                    setAddress({ ...address, country: e.target.value })
                  }
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-400 p-2 "
              >
                {submitBtnTitle ? submitBtnTitle : "Add address"}
                {isPending && "Processing..."}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAddressForm;
