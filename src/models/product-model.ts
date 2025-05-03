import mongoose, { Schema, Document } from "mongoose";

export interface IProducts extends Document {
  _id: string;
  name: string;
  slug: string;

  description: string;
  price: number;
  listPrice: number;
  brand: string;

  images: string[];
  category: string;
  tags: string[];
  isPublished: boolean;

  avgRating: number;
  numReviews: number;
  numSales: number;

  countInStock: number;
  colors: string[];
  sizes: string[];
  reviews: string[];
  createdAt: Date;
  updateddAt: Date;
}

const ProductSchema = new Schema<IProducts>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    listPrice: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    images: [String],
    category: {
      type: String,
      required: true,
    },
    tags: [String],
    colors: [String],
    avgRating: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    numSales: {
      type: Number,
      default: 0,
    },

    countInStock: {
      type: Number,
      default: 0,
    },
    sizes: [String],
    reviews: [String],
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product ||
  mongoose.model<IProducts>("Product", ProductSchema);
export default Product;

// interface Product {
//   _id?: string; // Optional for creation
//   title: string;
//   description: string;
//   images: string[]; // Array of image URLs
//   price: number;
//   discountPrice?: number; // Optional discounted price
//   inStock: number; // Quantity in stock
//   category: string;
//   subCategory?: string;
//   brand?: string;
//   colorOptions?: string[]; // Example: ["Red", "Blue"]
//   sizeOptions?: string[];  // Example: ["S", "M", "L", "XL"]
//   tags?: string[];         // Searchable tags
//   ratings?: number;        // Average rating
//   reviews?: {
//     userId: string;
//     name: string;
//     rating: number;
//     comment: string;
//     date: Date;
//   }[];
//   isFeatured?: boolean;    // For homepage promotions
//   isActive: boolean;       // Product visibility
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   images: [{ type: String, required: true }],
//   price: { type: Number, required: true },
//   discountPrice: { type: Number },
//   inStock: { type: Number, required: true },
//   category: { type: String, required: true },
//   subCategory: { type: String },
//   brand: { type: String },
//   colorOptions: [String],
//   sizeOptions: [String],
//   tags: [String],
//   ratings: { type: Number, default: 0 },
//   reviews: [
//     {
//       userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//       name: String,
//       rating: Number,
//       comment: String,
//       date: { type: Date, default: Date.now }
//     }
//   ],
//   isFeatured: { type: Boolean, default: false },
//   isActive: { type: Boolean, default: true }
// }, { timestamps: true });

// const Product = mongoose.model("Product", productSchema);

// export default Product;
