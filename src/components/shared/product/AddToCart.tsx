// "use client";
// import { Button } from "@/components/ui/button";
// // import { useToast } from "@/hooks/use-toast";
// import { CartItem, useCartStore } from "@/store/useCartStore";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// // type Props = {
// //   item: {
// //     _id: string;
// //     name: string;
// //     price: number;
// //     image?: string;
// //     sizes: string[]; // Available sizes
// //     colors: string[]; // Available colors
// //   };
// // };
// const AddToCart = ({
//   item,
//   minimal = false,
// }: {
//   // item: OrderItem;
//   item: CartItem;
//   minimal?: boolean;
// }) => {
//   const router = useRouter();
//   // const { toast } = useToast();
//   // const { addToCart } = useCartStore();
//   const addToCart = useCartStore((state) => state.addToCart);
//   const [quantity, setQuantity] = useState(1);

//   console.log("add to component item :", item);

//   const AddToCartItem = () => {
//     // addToCart(item, quantity);
//     addToCart(item);
//     router.push("/cart");
//   };

//   return (
//     <div>
//       {minimal ? (
//         <Button
//           className="rounded-full w-auto"
//           onClick={() => {
//             try {
//               addToCart(item, 1);
//               toast({
//                 description: "Add To cart",
//                 action: (
//                   <Button
//                     onClick={() => {
//                       router.push("/cart");
//                     }}
//                   >
//                     Go to Cart
//                   </Button>
//                 ),
//               });
//             } catch (error) {
//               toast({
//                 variant: "destructive",
//                 description: (error as Error).message,
//               });
//             }
//           }}
//         >
//           Add To Cart
//         </Button>
//       ) : (
// <div className="w-full space-y-2 mt-3">
//   <Select
//     value={quantity.toString()}
//     onValueChange={(value) => setQuantity(Number(value))}
//   >
//     <SelectTrigger className="border-0 bg-white rounded-full">
//       <SelectValue placeholder={`Quantity`}>
//         Quantity : {quantity}
//       </SelectValue>
//     </SelectTrigger>
//     <SelectContent>
//       {Array.from({ length: item.countInStock }, (_, i) => i + 1).map(
//         (num) => (
//           <SelectItem
//             className="text-white"
//             key={num}
//             value={num.toString()}
//           >
//             {num}
//           </SelectItem>
//           // <SelectItem
//           //   className="text-white"
//           //   key={num + 1}
//           //   value={num.toString() + 1}
//           // >
//           //   {num + 1}
//           // </SelectItem>
//         )
//       )}
//     </SelectContent>
//   </Select>

//           <Button
//             className="w-full rounded-full bg-yellow-500"
//             type="button"
//             onClick={async () => {
//               try {
//                 const itemId = addToCart(item, quantity);
//                 router.push(`/cart/${itemId}`);
//               } catch (error) {
//                 toast({
//                   variant: "destructive",
//                   description: (error as Error).message,
//                 });
//               }
//             }}
//           >
//             Add To Cart
//           </Button>

//           <Button
//             className="w-full rounded-full bg-yellow-600"
//             variant="secondary"
//             onClick={() => {
//               try {
//                 addToCart(item, quantity);
//                 router.push(`/checkout`);
//               } catch (error) {
//                 toast({
//                   variant: "destructive",
//                   description: (error as Error).message,
//                 });
//               }
//             }}
//           >
//             Buy Now
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddToCart;
