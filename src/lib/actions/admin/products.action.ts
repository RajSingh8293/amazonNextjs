"use server";

import { requireAdmin } from "@/lib/auth/requireAdmin";
import { dbConnect } from "@/lib/db/dbConnect";
import Product, { IProducts } from "@/models/product-model";

export const getAllProductsForAdmin = async () => {
  await dbConnect();

  try {
    await requireAdmin(); // Only allow admin access

    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    const countProducts = await Product.countDocuments();
    return {
      products: JSON.parse(JSON.stringify(products)) as IProducts[],
      count: countProducts,
    };
  } catch (error) {
    console.error("[ADMIN_PRODUCTS_ERROR]", error);
    return null;
  }
};
