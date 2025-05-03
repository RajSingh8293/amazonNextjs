"use client";

import { useCartStore } from "@/lib/hooks/useCartStore";
// import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash } from "lucide-react";

type Props = {
  id: string;
  color: string;
  size: string;
  quantity: number;
};

export const UpdateQuantityButton = ({ id, color, size, quantity }: Props) => {
  // const updateQuantity = useCartStore((state) => state.updateQuantity);
  const { updateQuantity, removeFromCart } = useCartStore();

  const increment = () => {
    updateQuantity(id, quantity + 1, color, size);
  };

  const decrement = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1, color, size);
    }
  };

  return (
    <div className="flex items-center gap-2 border-2 justify-center border-yellow-500 w-24 rounded-full">
      {/* <Button size="sm" className="border" onClick={decrement}> */}
      {quantity === 1 ? (
        <Trash size={15} onClick={() => removeFromCart(id, color, size)} />
      ) : (
        <Minus onClick={decrement} size={15} />
      )}
      {/* </Button> */}
      <span className="px-1">{quantity}</span>
      {/* <Button size="sm" className="border" onClick={increment}> */}
      <Plus onClick={increment} size={15} />
      {/* </Button> */}
    </div>
  );
};
