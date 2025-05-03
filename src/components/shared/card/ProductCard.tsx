"use client";
import Image from "next/image";
import Link from "next/link";
import { IProducts } from "@/models/product-model";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ProductCardDetails from "./ProductCardDetails";
import { Button } from "@/components/ui/button";
import { CartItem, useCartStore } from "@/lib/hooks/useCartStore";
// import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ProductCard = ({
  product,
  hideDetail,
  hideBtn,
  className,
  size,
  hideAddBtn,
}: // hideDetail = false,
{
  product: IProducts;
  hideDetail?: boolean;
  hideAddBtn?: boolean;
  hideBtn?: boolean;
  className?: string;
  size?: string;
}) => {
  // const router = useRouter();

  const addToCart = useCartStore((state) => state.addToCart);
  const item: CartItem = {
    _id: product._id,
    name: product.name,
    price: product.price,
    quantity: 1,
    color: product.colors[0],
    size: product.sizes[0],
    countInStock: product.countInStock,
    image: product.images[0],
  };
  const AddToCartProduct = () => {
    addToCart(item);
    // router.push(`/cart/${item._id}`);
    toast.success("Product addded to cart");
  };
  return (
    <>
      <Card className="w-full m-0 bg-white border-0 overflow-hidden shadow-none">
        <CardHeader className="p-0">
          <Link
            href={`/product/${product._id}`}
            className="w-full  overflow-hidden bg-white"
          >
            <div
              className={cn(
                "relative items-center flex justify-center overflow-hidden ",
                className ? className : "lg:h-60 h-52"
              )}
            >
              <Image
                src={product.images[0]}
                alt=""
                sizes={size ? size : "80vh"}
                fill
                priority
                className="absolute z-20 hover:opacity-0 transition-opacity ease duration-200 cursor-pointer  aspect-square object-scale-down max-w-full h-auto"
              />
              <Image
                src={product.images[1]}
                alt=""
                sizes={size ? size : "80vh"}
                fill
                priority
                className="absolute  ease opacity-100 transition-opacity duration-500 cursor-pointer aspect-square object-scale-down max-w-full h-auto "
              />
            </div>
          </Link>
        </CardHeader>
        {!hideDetail && (
          <CardContent>
            <ProductCardDetails product={product} hideBtn={hideBtn} />
          </CardContent>
        )}
        {!hideAddBtn && (
          <div className="flex justify-center">
            <Button
              size="sm"
              className="w-fit font-thin text-black bg-yellow-500 text-sm hover:bg-yellow-400  border rounded-2xl"
              onClick={() => AddToCartProduct()}
            >
              Add to cart
            </Button>
          </div>
        )}
      </Card>
    </>
  );
};

export default ProductCard;
