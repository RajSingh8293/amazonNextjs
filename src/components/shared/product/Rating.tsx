// import { Star } from "lucide-react";
// import React from "react";

// const Rating = ({
//   rating = 0,
//   size = 6,
// }: {
//   rating: number;
//   size?: number;
// }) => {
//   const fullStars = Math.floor(rating);
//   const partialStar = rating % 1;
//   const emptyStars = 5 - Math.ceil(rating);
//   return (
//     <div
//       className="flex items-center"
//       aria-label={`Rating : ${rating} out of 5 stars`}
//     >
//       {[...Array(fullStars)].map((_, i) => (
//         <Star
//           key={`full-${i}`}
//           className={`w-${size} fill-primary text-primary`}
//         />
//       ))}
//       {partialStar > 0 && (
//         <div className="relative">
//           <Star className={`w-${size} h-${size}  text-primary`} />
//           <div
//             className="absolute top-0 left-0 overflow-hidden"
//             style={{ width: `${partialStar * 100}%` }}
//           >
//             <Star className={`w-6 h-6 fill-primary text-primary`} />
//           </div>
//         </div>
//       )}
//       {[...Array(emptyStars)].map((_, i) => (
//         <Star key={`empty-${i}`} className={`w-${size}  text-primary`} />
//       ))}
//     </div>
//   );
// };

// export default Rating;

import { Star, StarHalf, Star as StarOutline } from "lucide-react";

const Rating = ({ rating = 0, size }: { rating: number; size?: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star
          size={size ? size : 25}
          key={i}
          className="text-[#DE7921]"
          fill="currentColor"
        />
      ))}
      {hasHalfStar && (
        <StarHalf
          size={size ? size : 25}
          className="text-[#DE7921]"
          fill="currentColor"
        />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <StarOutline
          size={size ? size : 25}
          key={i}
          className="text-gray-400"
        />
      ))}
    </div>
  );
};

export default Rating;
