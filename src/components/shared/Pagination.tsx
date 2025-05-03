// // components/Pagination.tsx

// import Link from "next/link";

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   baseUrl: string;
//   currentParams: URLSearchParams;
// }

// export default function Pagination({
//   currentPage,
//   totalPages,
//   baseUrl,
//   currentParams,
// }: PaginationProps) {
//   if (totalPages <= 1) return null;

//   const createPageLink = (page: number) => {
//     const params = new URLSearchParams(currentParams.toString());
//     params.set("page", page.toString());
//     return `${baseUrl}?${params.toString()}`;
//   };

//   return (
//     <div className="flex gap-2 justify-center mt-8">
//       {currentPage > 1 && (
//         <Link
//           href={createPageLink(currentPage - 1)}
//           className="px-3 py-1 border rounded hover:bg-gray-100"
//         >
//           Prev
//         </Link>
//       )}

//       {Array.from({ length: totalPages }, (_, i) => (
//         <Link
//           key={i + 1}
//           href={createPageLink(i + 1)}
//           className={`px-3 py-1 border rounded ${
//             currentPage === i + 1 ? "bg-black text-white" : "hover:bg-gray-100"
//           }`}
//         >
//           {i + 1}
//         </Link>
//       ))}

//       {currentPage < totalPages && (
//         <Link
//           href={createPageLink(currentPage + 1)}
//           className="px-3 py-1 border rounded hover:bg-gray-100"
//         >
//           Next
//         </Link>
//       )}
//     </div>
//   );
// }

// components/Pagination.tsx
"use client";

import { getFiltereUrl } from "@/lib/utils";
import Link from "next/link";

interface Props {
  currentPage: number;
  totalPages: number;
  params: Record<string, string | undefined>;
}

const Pagination = ({ currentPage, totalPages, params }: Props) => {
  if (totalPages <= 1) return null;
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  return (
    // <div className="flex justify-center gap-2 mt-6">
    //   {Array.from({ length: totalPages }).map((_, idx) => {
    //     const pageNum = idx + 1;
    //     return (
    //       <Link
    //         key={pageNum}
    //         href={getFiltereUrl({ params, page: pageNum.toString() })}
    //         className={`px-3 py-1 border rounded ${
    //           pageNum === currentPage
    //             ? "bg-black text-white"
    //             : "bg-white text-black"
    //         }`}
    //       >
    //         {pageNum}
    //       </Link>
    //     );
    //   })}
    // </div>
    <div className="flex flex-wrap gap-2 justify-center">
      {prevPage && (
        <Link
          href={getFiltereUrl({ params, page: prevPage.toString() })}
          className="px-3 py-1 rounded border bg-white hover:bg-gray-100"
        >
          « Prev
        </Link>
      )}

      {Array.from({ length: totalPages }).map((_, idx) => {
        const pageNum = idx + 1;
        return (
          <Link
            key={pageNum}
            href={getFiltereUrl({ params, page: pageNum.toString() })}
            className={`px-3 py-1 border rounded ${
              pageNum === currentPage
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {pageNum}
          </Link>
        );
      })}

      {nextPage && (
        <Link
          href={getFiltereUrl({ params, page: nextPage.toString() })}
          className="px-3 py-1 rounded border bg-white hover:bg-gray-100"
        >
          Next »
        </Link>
      )}
    </div>
  );
};

export default Pagination;
