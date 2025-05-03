import { Button } from "@/components/ui/button";
import { getAllProductsForAdmin } from "@/lib/actions/admin/products.action";
import Image from "next/image";

const AdminProducts = async () => {
  const data = await getAllProductsForAdmin();
  return (
    <div>
      {data?.products?.length !== 0 ? (
        <table className="w-full text-left border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Image</th>
              <th className="p-2">Name</th>
              <th className="p-2">IsPublished</th>
              <th className="p-2">Published</th>
              <th className="p-2">Price</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.products.map((product) => (
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
                <td className="p-2">
                  {product.isPublished === true ? "Yes" : "No"}
                </td>

                <td className="p-2">{product.category}</td>
                <td className="p-2">{product.price}</td>
                <td className="p-2">
                  <div className=" flex items-center gap-2">
                    <Button size="sm">View</Button>
                    <Button size="sm">Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No products found or unauthorized.</div>
      )}
    </div>
  );
};

export default AdminProducts;
