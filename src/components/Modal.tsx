"use client";
import { X } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (typeof window === "undefined") return null;
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <Button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X />
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
