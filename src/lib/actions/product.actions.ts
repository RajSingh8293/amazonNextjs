"use server";
import Product, { IProducts } from "@/models/product-model";
import { Types } from "mongoose";
import { dbConnect } from "../db/dbConnect";

export const getCategosries = async (): Promise<IProducts[]> => {
  try {
    await dbConnect();
    const productData = await Product.find({ isPublished: true });
    const products = JSON.parse(JSON.stringify(productData));
    return products;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const getProductsByTag = async ({
  tag,
  limit = 4,
}: {
  tag: string;
  limit?: number;
}) => {
  try {
    await dbConnect();
    const products = await Product.find(
      {
        tags: { $in: [tag] },
        isPublished: true,
      },
      {
        name: 1,
        href: { $concat: ["/product/", { $toString: "$_id" }] },
        image: { $arrayElemAt: ["$images", 0] },
      }
    ).limit(limit);

    return JSON.parse(JSON.stringify(products)) as {
      name: string;
      href: string;
      image: string;
    }[];
    // return products as {
    //   name: string;
    //   href: string;
    //   image: string;
    // }[];
  } catch (error) {
    console.error("Error:", error);
  }
};
export const getProductsByTagName = async ({
  tag,
  limit = 10,
}: {
  tag: string;
  limit?: number;
}) => {
  await dbConnect();
  const products = await Product.find({
    tags: { $in: [tag] },
    isPublished: true,
  }).limit(limit);

  return JSON.parse(JSON.stringify(products)) as IProducts[];
  // return products;
};

export const getProductById = async (productId: string) => {
  try {
    await dbConnect();

    if (!Types.ObjectId.isValid(productId)) {
      throw new Error("Invalid product ID");
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    return JSON.parse(JSON.stringify(product));
    // return product;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getRelatedProductByCategory = async ({
  category,
  productId,
  limit = 10,
  page = 1,
}: {
  category: string;
  productId: string;
  limit?: number;
  page?: number;
}) => {
  try {
    await dbConnect();

    // if (!Types.ObjectId.isValid(productId)) {
    //   throw new Error("Invalid product ID");
    // }

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      isPublished: true,
      category,
      _id: { $ne: productId },
    };
    const product = await Product.find(conditions)
      .sort({ numSales: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const productCount = await Product.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(product)) as IProducts[],
      // data: product,
      totalProducts: Math.ceil(productCount / limit),
    };
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getRelatedProductsByTagName = async ({
  tag,
  brand,
  productId,
  limit = 10,
  page = 1,
}: {
  tag: string;
  brand: string;
  productId: string;
  limit?: number;
  page?: number;
}) => {
  try {
    await dbConnect();

    const conditions = {
      isPublished: true,
      tags: { $in: [tag] },
      _id: { $ne: productId },
      brand,
    };
    const skipAmount = (Number(page) - 1) * limit;

    const products = await Product.find(conditions)
      .sort({ numSales: "desc" })
      .skip(skipAmount)
      .limit(limit);
    return JSON.parse(JSON.stringify(products)) as IProducts[];
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getAllProducts = async ({
  query,
  limit,
  page,
  category,
  tag,
  price,
  rating,
  sort,
}: {
  query?: string;
  category?: string;
  tag?: string;
  limit?: number;
  page?: number;
  price?: string;
  rating?: string;
  sort?: string;
}) => {
  try {
    await dbConnect();
    limit = limit || 12;
    const queryFilter =
      query && query !== "all"
        ? {
            name: {
              $regex: query,
              $options: "i",
            },
          }
        : {};

    const categoryFilter = category && category !== "all" ? { category } : {};
    const tagFilter = tag && tag !== "all" ? { tags: tag } : {};
    const ratingFilter =
      rating && rating !== "all" ? { avgRating: { $gte: Number(rating) } } : {};
    const priceFilter =
      price && price !== "all"
        ? {
            price: {
              $gte: Number(price.split("-")[0]),
              $lte: Number(price.split("-")[1]),
            },
          }
        : {};

    const order: Record<string, 1 | -1> =
      sort == "best-seller"
        ? { numSales: -1 }
        : sort === "price-low-to-high"
        ? { price: 1 }
        : sort === "price-high-to-low"
        ? { price: -1 }
        : sort === "avg-customer-review"
        ? { avgRating: -1 }
        : { _id: -1 };

    const isPublished = { isPublished: true };
    const products = await Product.find({
      ...isPublished,
      ...queryFilter,
      ...categoryFilter,
      ...tagFilter,
      ...ratingFilter,
      ...priceFilter,
    })
      .sort(order)
      .skip(limit * (Number(page) - 1))
      .limit(limit)
      .lean();

    const countProducts = await Product.countDocuments({
      ...isPublished,
      ...queryFilter,
      ...categoryFilter,
      ...tagFilter,
      ...ratingFilter,
      ...priceFilter,
    });
    return {
      products: JSON.parse(JSON.stringify(products)) as IProducts[],
      totalPages: Math.ceil(countProducts / limit),
      totalProducts: countProducts,
      from: limit * (Number(page) - 1) + 1,
      to: limit * (Number(page) - 1) + products.length,
    };
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getAllTags = async () => {
  const tags = await Product.aggregate([
    { $unwind: "$tags" },
    { $group: { _id: null, uniqueTags: { $addToSet: "$tags" } } },
    { $project: { _id: 0, uniqueTags: 1 } },
  ]);

  return (
    (tags[0]?.uniqueTags
      .sort((a: string, b: string) => a.localeCompare(b))
      .map((x: string) =>
        x
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      ) as string[]) || []
  );
};

export const getAllCategories = async () => {
  try {
    await dbConnect();
    const categoryData = await Product.find({ isPublished: true }).distinct(
      "category"
    );

    const categories = JSON.parse(JSON.stringify(categoryData));
    return categories;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
