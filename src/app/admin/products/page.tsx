import React from "react";
import AdminProducts from "./admin-products";
const AllProducts = async () => {
  return (
    <div className="p-6 space-y-2">
      <h1 className="text-2xl font-bold">Product Management</h1>
      <AdminProducts />
    </div>
  );
};

export default AllProducts;
