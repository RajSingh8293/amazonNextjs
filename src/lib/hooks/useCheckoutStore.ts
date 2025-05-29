import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Address {
  _id?: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface PaymentMethod {
  id: string;
  label: string;
}
export interface PaymentOptions {
  id: string;
  label: string;
  charge: number;
}

interface AddressState {
  selectedAddress: Address | null;
  selectedPaymentMethod: PaymentMethod | null;
  selectedShippingOption: PaymentOptions | null;
  setSelectedAddress: (address: Address) => void;
  clearSelectedAddress: () => void;
  setSelectedPaymentMethod: (method: PaymentMethod) => void;
  clearSelectedPaymentMethod: () => void;
  setSelectedShippingOption: (option: PaymentOptions) => void;
}

export const useCheckoutStore = create<AddressState>()(
  persist(
    (set) => ({
      selectedAddress: null,
      selectedPaymentMethod: null,
      selectedShippingOption: null,
      setSelectedAddress: (address) => set({ selectedAddress: address }),
      clearSelectedAddress: () => set({ selectedAddress: null }),
      setSelectedPaymentMethod: (method) =>
        set({ selectedPaymentMethod: method }),
      setSelectedShippingOption: (option) =>
        set({ selectedShippingOption: option }),
      clearSelectedPaymentMethod: () => set({ selectedPaymentMethod: null }),
    }),
    {
      name: "selected-shipping-address", // Key for localStorage
    }
  )
);
