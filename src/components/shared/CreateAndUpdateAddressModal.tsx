"use client";
import React from "react";
import Modal from "../Modal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateAddressForm from "./CreateAddressForm";
import { IAddress } from "@/models/address.model";
const CreateAndUpdateAddressModal = ({
  btnText,
  submitBtnTitle,
  hideIcon = false,
  addressData,
}: {
  btnText?: string;
  submitBtnTitle?: string;
  hideIcon?: boolean;
  addressData?: IAddress;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        {!hideIcon && <Plus size={50} className="text-black" />}
        <span>{btnText}</span>
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <CreateAddressForm
          addressData={addressData}
          onClose={() => setIsOpen(false)}
          submitBtnTitle={submitBtnTitle ?? ""}
        />
      </Modal>
    </>
  );
};

export default CreateAndUpdateAddressModal;
