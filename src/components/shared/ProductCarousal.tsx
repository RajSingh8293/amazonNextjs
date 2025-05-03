// "use client";

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { cn } from "@/lib/utils";
// import Autoplay from "embla-carousel-autoplay";
// import React from "react";
// import ProductCard from "../home/ProductCard";
// import { IProducts } from "@/lib/data";
// interface ProducDatas {
//   title?: string;
//   className?: string;
//   data: IProducts[];
// }

// const ProductCarousal = ({ data, className, title }: ProducDatas) => {
//   const plugin = React.useRef(
//     Autoplay({ delay: 3000, stopOnInteraction: true })
//   );
//   return (
//     <div className="px-5 pt-5 my-5 bg-white shadow-lg mx-5">
//       <h1 className="text-2xl text-gray-500 ">{title}</h1>

//       <Carousel
//         dir="ltr"
//         plugins={[plugin.current]}
//         onMouseEnter={plugin.current.stop}
//         onMouseLeave={plugin.current.reset}
//         className="w-full bg-white"
//         opts={{
//           align: "start",
//         }}
//       >
//         <CarouselContent>
//           {data?.map((product: IProducts) => (
//             <CarouselItem key={product._id}>
//               <div className="flex lg:flex-row cursor-pointer -z-10 md:flex-row flex-row w-screen relative">
//                 <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 gap-3 mt-5 z-20">
//                   <ProductCard product={product} />
//                 </div>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious
//           className={cn(
//             "-left-5 z-50",
//             className !== "" ? className : "bg-black"
//           )}
//         />
//         <CarouselNext
//           className={cn(
//             "-right-5 z-50",
//             className !== "" ? className : "bg-black"
//           )}
//         />
//       </Carousel>
//     </div>
//   );
// };
// export default ProductCarousal;

// import { IProducts } from "@/lib/data";
// import React from "react";
// import AliceCarousel from "react-alice-carousel";
// import "react-alice-carousel/lib/alice-carousel.css";
// import ProductCard from "../home/ProductCard";
// import { ArrowLeft, ArrowRight } from "lucide-react";

// interface ProducDatas {
//   title?: string;
//   className?: string;
//   data: IProducts[];
//   time?: number;
//   hideDetail?: boolean;
// }
// const ProductCarousal = ({ data, title, time, hideDetail }: ProducDatas) => {
//   const items = data?.map((item) => (
//     <ProductCard product={item} key={item._id} hideDetail={hideDetail} />
//   ));
//   const responsive = {
//     0: { items: 1 },
//     568: { items: 2 },
//     768: { items: 3 },
//     1024: { items: 5 },
//   };

//   return (
//     <div tabIndex={0} className="px-5 bg-white mt-4">
//       <h1 className="text-2xl text-gray-500 py-5  ">{title}</h1>
//       <AliceCarousel
//         mouseTracking
//         disableButtonsControls
//         disableDotsControls
//         responsive={responsive}
//         items={items}
//         autoPlay
//         infinite
//         animationDuration={time}
//       />
//       <ArrowLeft />
//       <ArrowRight />
//     </div>
//   );
// };

// export default ProductCarousal;
"use client";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "./card/ProductCard";
import { IProducts } from "@/models/product-model";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProducDatas {
  title?: string;
  className?: string;
  data: IProducts[];
  hideDetail?: boolean;
  hideBtn?: boolean;
  link?: string | undefined;
  urlLink?: string;
  width?: number;
  height?: number;
  grid?: string;
  size?: string;
  hideAddBtn?: boolean;
}
function ProductCarousal({
  data,
  title,
  link,
  urlLink,
  hideDetail,
  hideBtn,
  className,
  grid,
  size,
  hideAddBtn,
}: ProducDatas) {
  return (
    <>
      <div className="bg-white mx-5 ">
        {title && (
          <div className="px-5 text-gray-700 flex items-center pt-5">
            <div>
              <span className="text-2xl font-semibold capitalize ">
                {title}
              </span>
              {link && (
                <Link
                  className="font-medium mx-2 hover:underline text-sky-700 hover:text-sky-800"
                  href={urlLink ?? "/"}
                >
                  {link}
                </Link>
              )}
            </div>
          </div>
        )}
        {data.length > 0 && (
          <div className="px-8 m-5">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full "
            >
              <CarouselContent>
                {data.map((item) => (
                  <CarouselItem
                    key={item._id}
                    className={cn(
                      "flex-shrink-0 rounded-none overflow-hidden",
                      grid ? grid : "sm:basis-1/2 md:basis-1/3 lg:basis-1/4 "
                    )}
                  >
                    <ProductCard
                      product={item}
                      hideDetail={hideDetail}
                      hideBtn={hideBtn}
                      className={className}
                      size={size}
                      hideAddBtn={hideAddBtn}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {data.length > 4 && (
                <>
                  <CarouselPrevious className="bg-white text-black shadow   rounded-lg" />

                  <CarouselNext className="bg-white text-black shadow   rounded-lg" />
                </>
              )}
            </Carousel>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductCarousal;
