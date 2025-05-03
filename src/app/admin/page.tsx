import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllUsers } from "@/lib/actions/user.actions";
import { getAllProductsForAdmin } from "@/lib/actions/admin/products.action";
import ProductList from "@/components/shared/ProductList";

const AdminPage = async () => {
  const data = await getAllUsers();
  const products = await getAllProductsForAdmin();

  const adminCardData = [
    {
      data: data?.users,
      title: "Total User",
      className: "bg-yellow-200",
    },
    {
      data: products?.products,
      title: "Total User",
      className: "bg-blue-600",
    },
    {
      data: data?.users,
      title: "Total Orders",
      className: "bg-green-600",
    },
  ];
  return (
    <div className="w-full min-h-[100vh]">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {adminCardData?.map((item, i) => (
          <div key={i}>
            <Card className={item ? item?.className : "bg-white"}>
              <CardHeader>
                <CardTitle className="font-bold">{item?.title}</CardTitle>
                <CardDescription>
                  <h1 className="text-4xl font-bold text-black">
                    {item?.data?.length}
                  </h1>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-6 gap-1">
        <div className="col-span-4">
          <ProductList
            products={products?.products ?? []}
            count={products?.count ?? 0}
          />
        </div>
        <div className="col-span-2  w-full h-full">
          <h1 className="text-2xl font-bold py-2">Users</h1>
          <div className="bg-gray-200 w-full h-full"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
