import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { IProducts } from "@/models/product-model";

const ProductList = ({
  products,
  count,
}: {
  products: IProducts[];
  count?: number;
}) => {
  return (
    <div className=" space-y-2">
      <h1 className="text-2xl font-bold py-2">Products ({count})</h1>
      {products?.length ? (
        <div className="w-full border border-gray-300 max-h-[600px] overflow-y-auto rounded shadow-md">
          <table className="w-full text-left min-w-full table-auto">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="p-2">Image</th>
                <th className="p-2">Name</th>
                <th className="p-2 text-center">Published</th>
                <th className="p-2 text-right">Price</th>
                <th className="p-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {products.slice(0, 8).map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="p-2">
                    <Image
                      src={product.images[0]}
                      alt=""
                      width={50}
                      height={50}
                    />
                  </td>
                  <td className="p-2 text-sm">{product.name}</td>
                  <td className="p-2 text-center">
                    {product.isPublished ? "Yes" : "No"}
                  </td>
                  <td className="p-2">{product.price}</td>
                  <td className="p-2 text-right">
                    <div className="flex items-center gap-2">
                      <Button size="sm">View</Button>
                      <Button size="sm">Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No products found or unauthorized.</div>
      )}
    </div>
  );
};

export default ProductList;
