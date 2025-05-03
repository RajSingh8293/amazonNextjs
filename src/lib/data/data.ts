import bcrypt from "bcryptjs";

export const data = {
  carousals: [
    {
      title: "Sale! Up to 70% off",
      desc: "Most Popular Shoes",
      btnCaption: "Shop Now",
      image: "/images/shoes/shoes_p4-2.jpg",
      url: "/search?category=Shoes",
      isPublished: true,
    },
    {
      title: "Sale! Up to 30% off",
      desc: "Summer Collections",
      btnCaption: "Shop Now",
      image: "/images/banner11.jpg",
      url: "/search?category=T-Shirts",
      isPublished: true,
    },
    {
      title: "Sale! Up to 80% off",
      desc: "Wrist Watches",
      btnCaption: "Shop Now",
      image: "/images/banner10.jpg",
      url: "/search?category=Wrist Watches",
      isPublished: true,
    },
  ],
  navMenus: [
    {
      name: "Bestsellers",
      link: "/search?tag=best-seller",
    },
    {
      name: "New Arrival",
      link: "/search?tag=new-arrival",
    },
    {
      name: "Today's Deals",
      link: "/search?tag=today-deal",
    },
    {
      name: "Featured",
      link: "/search?tag=featured",
    },
  ],
};

export interface CategoriesData {
  label: string;
  value: string;
}
export const categories: CategoriesData[] = [
  {
    label: "all",
    value: "all",
  },
  {
    label: "T-Shirts",
    value: "T-Shirts",
  },
  {
    label: "Shirts",
    value: "Shirts",
  },
  {
    label: "Jeans",
    value: "Jeans",
  },
  {
    label: "Shoes",
    value: "Shoes",
  },
];

export interface CheckItem {
  _id: number;
  label: string;
  isChecked: boolean;
}

export const checkboxes: CheckItem[] = [
  { _id: 1, label: "red", isChecked: false },
  { _id: 2, label: "blue", isChecked: false },
  { _id: 3, label: "black", isChecked: false },
  { _id: 4, label: "white", isChecked: false },
  { _id: 5, label: "yellow", isChecked: false },
  { _id: 6, label: "green", isChecked: false },
  { _id: 7, label: "dark-blue", isChecked: false },
];

export interface PricesFilterArray {
  lable: string;
  value: string;
}
export const pricesFilterArray: PricesFilterArray[] = [
  {
    value: "all",
    lable: "All",
  },
  {
    value: "under50",
    lable: "Under $50",
  },
  {
    value: "50to100",
    lable: "$50 - $100",
  },
  {
    value: "100to200",
    lable: "$100 - $200",
  },
  {
    value: "200to300",
    lable: "$200 - $300",
  },
  {
    value: "over300",
    lable: "Over $300",
  },
];

export interface SortOptions {
  label: string;
  value: string;
}

export const sortOptions: SortOptions[] = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "price-low-high", label: "Price (Low to High)" },
  { value: "price-high-low", label: "Price (High to Low)" },
];

export const sortOrders = [
  { value: "price-low-to-high", name: "Price: Low to high" },
  { value: "price-high-to-low", name: "Price: High to Low" },
  { value: "new-arrivals", name: "Newest arrivals" },
  { value: "avg-customer-review", name: "Avg. customer review" },
  { value: "best-selling", name: "Best selling" },
];

export const priceRanges = [
  { name: "Under $50", value: "0-50" },
  { name: "$50 - $100", value: "50-100" },
  { name: "$100 - $200", value: "100-200" },
  { name: "$200 - $300", value: "200-300" },
  { name: "$300 - $400", value: "300-400" },
  { name: "$400 - $500", value: "400-500" },
  { name: "$500 - $600", value: "500-600" },
];

export const youAccountData = [
  {
    _id: "1",
    image:
      "https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/Box._CB485927553_.png",
    title: "Your Orders",
    msg: "Track, return, or buy things again",
    href: "/your-account/orders",
  },
  {
    _id: "2",
    image:
      "https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/sign-in-lock._CB485931504_.png",
    title: "Login & Security",
    msg: "Track, return, or buy things again",
    href: "/your-account/profile",
  },
  {
    _id: "4",
    image:
      "https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/address-map-pin._CB485934183_.png",
    title: "Your Addresses",
    msg: "Edit, create Your Addresses",
    href: "/your-account/addresses",
  },
];
export const paymentMethods = [
  {
    id: "paypal",
    label: "Paypal",
    // icon: "/images/payment/paypal-logo.png",
  },
  {
    id: "stripe",
    label: "Stripe",
    // icon: "/images/payment/Stripe-Logo.png",
  },
  {
    id: "upi",
    label: "UPI / Net Banking",
    // icon: "/images/payment/upi_logo.webp",
  },
  {
    id: "cod",
    label: "Cash on Delivery (COD)",
    // icon: "/images/payment/credit-logo.png",
  },
];
export interface IProducts {
  _id: string | null | undefined;
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
  // ratingDistribution: RatingDistribution[];
  numSales: number;

  countInStock: number;
  colors: string[];
  sizes: string[];
  reviews: string[];
}

export const users = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: bcrypt.hash("admin", 10),
    role: "admin",
    address: {
      fullName: "John Cena",
      street: "120 First Ave",
      city: "Lajpat nagar",
      state: "Delhi",
      postalCode: "126278",
      country: "INDIA",
      phone: "8767865428",
    },
    emailVerified: false,
    paymentMethod: "stripe",
  },
  {
    name: "user",
    email: "user@gmail.com",
    password: bcrypt.hash("user", 10),
    role: "user",
    address: {
      fullName: "John Cena",
      street: "123 First Ave",
      city: "Neheru Place",
      state: "Delhi",
      postalCode: "126278",
      country: "INDIA",
      phone: "8767865489",
    },
    emailVerified: false,
    paymentMethod: "stripe",
  },
];
export const products = [
  // best-seller products
  {
    name: "Red Chief Genuine Leather Derby Lace Up |Formal Shoes for Men for Office | PU Sole | RC3506",
    slug: "Red Chief Genuine Leather Derby Lace Up |Formal Shoes for Men for Office | PU Sole | RC3506",

    description:
      "Elevate your street cred by pairing these Baggy Oversized Jeans with a graphic t-shirt and high-top sneakers. Roll up the cuffs for an added edge and throw on a bomber jacket to complete the look",
    price: 29.99,
    listPrice: 0,

    images: [
      "/images/watches/watches_p2-1.jpg",
      "/images/watches/watches_p2-2.jpg",
    ],
    category: "Watches",
    brand: "Omega ",
    tags: ["best-seller"],
    isPublished: true,
    avgRating: 4.5,
    numReviews: 6,

    numSales: 9,
    countInStock: 60,
    colors: ["blue", "dark-blue", "yellow"],
    sizes: ["S", "M", "L", "XL"],
    reviews: [],
  },
  {
    name: "Lymio Men's Loose Shirt || Men's Shirt Pants || Denim Shirt || Baggy",
    slug: "Lymio Men's Loose Shirt || Men's Shirt Pants || Denim Shirt || Baggy",

    description:
      "Elevate your street cred by pairing these Baggy Oversized shirt with a graphic t-shirt and high-top sneakers. Roll up the cuffs for an added edge and throw on a bomber jacket to complete the look",
    price: 29.99,
    listPrice: 0,

    images: [
      "/images/shirts/shirts_p1-1.jpg",
      "/images/shirts/shirts_p1-2.jpg",
    ],
    category: "Shirts",
    brand: "Levi's",
    tags: ["best-seller"],
    isPublished: true,
    avgRating: 4.5,
    numReviews: 6,

    numSales: 9,
    countInStock: 60,
    colors: ["blue", "dark-blue"],
    sizes: ["S", "M", "L", "XL"],
    reviews: [],
  },
  {
    name: "Maniac || Mens || Solid || Collared Neck || Full Sleeve || Knitted Shoes",
    slug: "Maniac || Mens || Solid || Collared Neck || Full Sleeve || Knitted Shoes",

    description:
      "Elevate your street cred by pairing these Baggy Oversized Jeans with a graphic shoes and high-top sneakers. Roll up the cuffs for an added edge and throw on a bomber jacket to complete the look",
    price: 29.99,
    listPrice: 0,

    images: ["/images/shoes/shoes_p3-1.jpg", "/images/shoes/shoes_p3-2.jpg"],
    category: "Shoes",
    brand: "Adidas",
    tags: ["best-seller"],
    isPublished: true,
    avgRating: 4.5,
    numReviews: 6,

    numSales: 9,
    countInStock: 60,
    colors: ["blue", "dark-blue"],
    sizes: ["S", "M", "L", "XL"],
    reviews: [],
  },
  {
    name: "Lymio Men's Fit T-Shirts || Men's T-Shirts || Denim T-Shirts || Baggy",
    slug: "Lymio Men's Fit T-Shirts || Men's T-Shirts || Denim T-Shirts || Baggy",

    description:
      "Elevate your street cred by pairing these Baggy Oversized Jeans with a graphic t-shirt and high-top sneakers. Roll up the cuffs for an added edge and throw on a bomber jacket to complete the look",
    price: 29.99,
    listPrice: 0,

    images: [
      "/images/t-shirts/t-shirts_p2-1.jpg",
      "/images/t-shirts/t-shirts_p2-2.jpg",
    ],
    category: "T-Shirts",
    brand: "Polo",
    tags: ["best-seller"],
    isPublished: true,
    avgRating: 4.5,
    numReviews: 6,

    numSales: 9,
    countInStock: 60,
    colors: ["blue", "dark-blue"],
    sizes: ["S", "M", "L", "XL"],
    reviews: [],
  },
  {
    name: "Lymio Men's Loose Jeans || Men's Jeans Pants || Denim Jeans || Baggy",
    slug: "Lymio Men's Loose Jeans || Men's Jeans Pants || Denim Jeans || Baggy",

    description:
      "Elevate your street cred by pairing these Baggy Oversized Jeans with a graphic t-shirt and high-top sneakers. Roll up the cuffs for an added edge and throw on a bomber jacket to complete the look",
    price: 29.99,
    listPrice: 0,

    images: ["/images/jeans/jeans_p1-1.jpg", "/images/jeans/jeans_p1-2.jpg"],
    category: "Jeans",
    brand: "Levi's",
    tags: ["best-seller"],
    isPublished: true,
    avgRating: 4.5,
    numReviews: 6,

    numSales: 9,
    countInStock: 60,
    colors: ["blue", "dark-blue"],
    sizes: ["S", "M", "L", "XL"],
    reviews: [],
  },
  {
    name: "Lymio Men's Loose shirts || Men's shirts Pants || Denim shirts || Baggy",
    slug: "Lymio Men's Loose shirts || Men's shirts Pants || Denim shirts || Baggy",

    description:
      "Elevate your street cred by pairing these Baggy Oversized shirts with a graphic t-shirt and high-top sneakers. Roll up the cuffs for an added edge and throw on a bomber jacket to complete the look",
    price: 29.99,
    listPrice: 0,

    images: [
      "/images/shirts/shirts_p1-1.jpg",
      "/images/shirts/shirts_p1-2.jpg",
    ],
    category: "Shirts",
    brand: "Tom Ford",
    tags: ["best-seller"],
    isPublished: true,
    avgRating: 4.5,
    numReviews: 6,

    numSales: 9,
    countInStock: 60,
    colors: ["blue", "dark-blue"],
    sizes: ["S", "M", "L", "XL"],
    reviews: [],
  },
  {
    name: "Lymio Men's Loose shirts || Men's t-shirts Pants || Baggy",
    slug: "Lymio Men's Loose shirts || Men's t-shirts Pants || Baggy",

    description:
      "Elevate your street cred by pairing these Baggy Oversized shirts with a graphic t-shirt and high-top sneakers. Roll up the cuffs for an added edge and throw on a bomber jacket to complete the look",
    price: 29.99,
    listPrice: 0,

    images: [
      "/images/shirts/shirts_p2-1.jpg",
      "/images/shirts/shirts_p2-2.jpg",
    ],
    category: "Shirts",
    brand: "Tom Ford",
    tags: ["best-seller"],
    isPublished: true,
    avgRating: 4.5,
    numReviews: 6,

    numSales: 9,
    countInStock: 60,
    colors: ["blue", "dark-blue"],
    sizes: ["S", "M", "L", "XL"],
    reviews: [],
  },
  // new-arrival products
  {
    name: "Noble Monk Men's Solid Casual Shirt |Full Sleeve|Stylish Shirt for Men",
    slug: "Noble Monk Men's Solid Casual Shirt |Full Sleeve|Stylish Shirt for Men",

    description:
      "Elevate your street cred by pairing these Baggy Oversized Jeans with a graphic t-shirt and high-top sneakers. Roll up the cuffs for an added edge and throw on a bomber jacket to complete the look",
    price: 29.99,
    listPrice: 0,

    images: ["/images/shoes/shoes_p1-1.jpg", "/images/shoes/shoes_p1-2.jpg"],
    category: "Shirts",
    brand: "Levi's",
    tags: ["new-arrival"],
    isPublished: true,
    avgRating: 4.5,
    numReviews: 6,

    numSales: 9,
    countInStock: 60,
    colors: ["blue", "dark-blue"],
    sizes: ["S", "M", "L", "XL"],
    reviews: [],
  },
  {
    name: "Fossil Nate Chronograph Analog Black Dial Grey Band Men's Stainless Steel Watch ",
    slug: "Fossil Nate Chronograph Analog Black Dial Grey Band Men's Stainless Steel Watch ",

    description: "Fossil Nate JR1401 Chronograph Watch - For Men",
    price: 149.99,
    listPrice: 0,
    images: [
      "/images/watches/watches_p1-1.jpg",
      "/images/watches/watches_p1-2.jpg",
    ],
    category: "Jeans",
    brand: "Levi’s",
    tags: ["new-arrival"],
    isPublished: true,
    avgRating: 4.5,
    numReviews: 6,

    numSales: 16,
    countInStock: 20,
    colors: ["blue", "red", "green"],
    sizes: ["S", "M", "L", "XL"],
    reviews: [],
  },
  {
    name: "Classic Moccasins Non-Lace Up Formal Shoes for Office, Party,Wedding | Dress Shoes",
    slug: "Classic Moccasins Non-Lace Up Formal Shoes for Office, Party,Wedding | Dress Shoes",

    description: "This is the description of product.",
    price: 129.99,
    listPrice: 0,
    images: ["/images/shoes/shoes_p3-1.jpg", "/images/shoes/shoes_p3-2.jpg"],
    category: "Jeans",
    brand: "Levi’s",
    tags: ["new-arrival"],
    isPublished: true,
    avgRating: 4,
    numReviews: 6,

    numSales: 16,
    countInStock: 20,
    colors: ["blue", "red", "green"],
    sizes: ["S", "M", "L", "XL"],
    reviews: [],
  },
  {
    name: "Centrino Mens 7957 Classic Moccasins Non-Lace Up Formal Shoes for Office, Party",
    slug: "Centrino Mens 7957 Classic Moccasins Non-Lace Up Formal Shoes for Office, Party",
    description: "This is the description of product 1.",
    price: 149.99,
    listPrice: 0,
    images: ["/images/shoes/shoes_p2-1.jpg", "/images/shoes/shoes_p2-2.jpg"],
    category: "Jeans",
    brand: "Levi’s",
    tags: ["new-arrival"],
    isPublished: true,
    avgRating: 4.5,
    numReviews: 6,

    numSales: 16,
    countInStock: 20,
    colors: ["blue", "red", "green"],
    sizes: ["S", "M", "L", "XL"],
    reviews: [],
  },
  {
    name: "Symbol Premium Men's Slim Fit Stretchable Jeans | Casual Denim | Cotton Stretch ",
    slug: "Symbol Premium Men's Slim Fit Stretchable Jeans | Casual Denim | Cotton Stretch ",

    description:
      "Symbol Premium's easy stretch jeans feature 'Air-Lite' hollow fiber, providing a unique blend of style, comfort. A desirable choice for denim lovers seeking both fashion and functionality in their wardrobe",
    price: 149.99,
    listPrice: 0,
    images: ["/images/jeans/jeans_p1-1.jpg", "/images/jeans/jeans_p1-2.jpg"],
    category: "Jeans",
    brand: "Levi’s",
    tags: ["new-arrival"],
    isPublished: true,
    avgRating: 4.5,
    numReviews: 6,

    numSales: 16,
    countInStock: 20,
    colors: ["blue", "red", "green"],
    sizes: ["S", "M", "L", "XL"],
    reviews: [],
  },
  {
    name: "Ben Martin Men's Relaxed Fit Jeans",
    slug: "Ben Martin Men's Relaxed Fit Jeans",

    description:
      "This Ben Martin casual denim jeans pant for men Durable and timeless look.AVAILABLE SIZE & COLOUR: This Ben Martin Mens Cotton Denim Jeans comes Range of sizes & Colors to suit different types. 40 Dark Blue, Light Blue, Brown, Green, Grey, Black & White. This Ben Martin Denim Jeans pant for Men is light weight breathable soft denim fabric. 1) Comfortable for all-day wear. 2) Casual and laid-back style. 3) 5 Basic Coin pockets for added functionality. 4) vailable in different washes and finishes.",
    price: 149.99,
    listPrice: 0,
    images: ["/images/jeans/jeans_p2-1.jpg", "/images/jeans/jeans_p2-2.jpg"],
    category: "Jeans",
    brand: "Levi’s",
    tags: ["new-arrival"],
    isPublished: true,
    avgRating: 4.5,
    numReviews: 6,

    numSales: 16,
    countInStock: 20,
    colors: ["blue", "red", "green"],
    sizes: ["S", "M", "L", "XL"],
    reviews: [],
  },

  // today's deal products
  {
    name: "Ben Martin Men's Regular Fit Stylish Stretchable 32 Size Brown Casusal Denim Jeans Pant for Men",
    slug: "Ben Martin Men's Regular Fit Stylish Stretchable 32 Size Brown Casusal Denim Jeans Pant for Men",
    description:
      "STRETCH COMFORT : These Ben Martin cotton denim casual jeans pant for men are constructed from a perfect blend of stretch-cotton fabric, which maximizes freedom of movement and ensures comfortable wear all day long.",
    price: 59.99,
    listPrice: 0,

    images: ["/images/jeans/jeans_p3-1.jpg", "/images/jeans/jeans_p3-2.jpg"],
    category: "Jeans",
    brand: "Gucci",
    tags: ["today-deal"],
    isPublished: true,
    avgRating: 4.5,
    numReviews: 6,

    numSales: 13,
    countInStock: 40,
    colors: ["black", "white"],
    sizes: ["S", "M", "L", "XL"],
    reviews: [],
  },
  {
    name: "Red Chief Genuine Leather Derby Lace Up |Formal Shoes for Men for Office | PU Sole | RC3506",
    slug: "Red Chief Genuine Leather Derby Lace Up |Formal Shoes for Men for Office | PU Sole | RC3506",
    description:
      "Elevate your street cred by pairing these Baggy Oversized Jeans with a graphic t-shirt and high-top sneakers. Roll up the cuffs for an added edge and throw on a bomber jacket to complete the look",
    price: 29.99,
    listPrice: 0,

    images: ["/images/shoes/shoes_p2-1.jpg", "/images/shoes/shoes_p2-2.jpg"],
    category: "Shoes",
    brand: "Puma",
    tags: ["today-deal"],
    isPublished: true,
    avgRating: 4.5,
    numReviews: 6,

    numSales: 9,
    countInStock: 60,
    colors: ["blue", "dark-blue"],
    sizes: ["S", "M", "L", "XL"],
    reviews: [],
  },
  {
    name: "Lymio Men's Loose Jeans || Men's Jeans Pants || Denim Jeans || Baggy",
    slug: "Lymio Men's Loose Jeans || Men's Jeans Pants || Denim Jeans || Baggy",

    description:
      "Elevate your street cred by pairing these Baggy Oversized Jeans with a graphic t-shirt and high-top sneakers. Roll up the cuffs for an added edge and throw on a bomber jacket to complete the look",
    price: 229.99,
    listPrice: 0,

    images: ["/images/jeans/jeans_p2-1.jpg", "/images/jeans/jeans_p2-2.jpg"],
    category: "Jeans",
    brand: "Gucci",
    tags: ["today-deal"],
    isPublished: true,
    avgRating: 4.5,
    numReviews: 6,

    numSales: 9,
    countInStock: 60,
    colors: ["blue", "dark-blue"],
    sizes: ["S", "M", "L", "XL"],
    reviews: [],
  },
  {
    name: "Lymio Polo T Shirt for Men || Men Casual T-Shirt (Polo 44-47)",
    slug: "Lymio Polo T Shirt for Men || Men Casual T-Shirt (Polo 44-47)",
    description:
      "Elevate your street cred by pairing these Baggy Oversized Jeans with a graphic t-shirt and high-top sneakers. Roll up the cuffs for an added edge and throw on a bomber jacket to complete the look",
    price: 329.99,
    listPrice: 0,

    images: [
      "/images/t-shirts/t-shirts_p1-1.jpg",
      "/images/t-shirts/t-shirts_p1-2.jpg",
    ],
    category: "T-Shirts",
    brand: "Polo",
    tags: ["today-deal"],
    isPublished: true,
    avgRating: 4.5,
    numReviews: 6,

    numSales: 9,
    countInStock: 60,
    colors: ["blue", "dark-blue"],
    sizes: ["S", "M", "L", "XL"],
    reviews: [],
  },
  {
    name: "Lymio Polo T Shirt for Men || Men Casual T-Shirt",
    slug: "Lymio Polo T Shirt for Men || Men Casual T-Shirt",

    description:
      "Elevate your street cred by pairing these Baggy Oversized Jeans with a graphic t-shirt and high-top sneakers. Roll up the cuffs for an added edge and throw on a bomber jacket to complete the look",
    price: 329.99,
    listPrice: 0,

    images: [
      "/images/t-shirts/t-shirts_p2-1.jpg",
      "/images/t-shirts/t-shirts_p3-2.jpg",
    ],
    category: "T-Shirts",
    brand: "Polo",
    tags: ["today-deal"],
    isPublished: true,
    avgRating: 4.5,
    numReviews: 6,

    numSales: 9,
    countInStock: 60,
    colors: ["blue", "dark-blue"],
    sizes: ["S", "M", "L", "XL"],
    reviews: [],
  },
  {
    name: "POLO Men's Wonder-14 T-Shirts (p-40-69)",
    slug: "POLO Men's Wonder-14 T-Shirts (p-40-69)",
    description:
      "Elevate your street cred by pairing these Baggy POLO Men's Wonder-13 Sports Running T-Shirts. High-top sneakers. Roll up the cuffs for an added edge and throw on a bomber jacket to complete the look",
    price: 99.99,
    listPrice: 0,

    images: [
      "/images/t-shirts/t-shirts_p3-1.jpg",
      "/images/t-shirts/t-shirts_p3-2.jpg",
    ],
    category: "T-Shirts",
    brand: "Burberry",
    tags: ["today-deal"],
    isPublished: true,
    avgRating: 4.5,
    numReviews: 6,

    numSales: 9,
    countInStock: 60,
    colors: ["blue", "dark-blue"],
    sizes: ["S", "M", "L", "XL"],
    reviews: [],
  },

  // featured products
  {
    name: "Urbano Fashion Men's Cotton Full Sleeve Regular Fit Casual Solid Shirt",
    slug: "Urbano Fashion Men's Cotton Full Sleeve Regular Fit Casual Solid Shirt",

    description:
      "Elevate your street cred by pairing these Baggy Oversized Jeans with a graphic t-shirt and high-top sneakers. Roll up the cuffs for an added edge and throw on a bomber jacket to complete the look",
    price: 329.99,
    listPrice: 0,

    images: [
      "/images/shirts/shirts_p1-1.jpg",
      "/images/shirts/shirts_p1-2.jpg",
    ],
    category: "Shirts",
    brand: "Levi's",
    tags: ["featured"],
    isPublished: true,
    avgRating: 4.5,
    numReviews: 6,

    numSales: 9,
    countInStock: 60,
    colors: ["blue", "dark-blue"],
    sizes: ["S", "M", "L", "XL"],
    reviews: [],
  },
  {
    name: "Urbano Fashion Men's Cotton Full Sleeve Regular Fit Casual Solid Shirt",
    slug: "Urbano Fashion Men's Cotton Full Sleeve Regular Fit Casual Solid Shirt",

    description:
      "Elevate your street cred by pairing these Baggy Oversized Jeans with a graphic t-shirt and high-top sneakers. Roll up the cuffs for an added edge and throw on a bomber jacket to complete the look",
    price: 329.99,
    listPrice: 0,

    images: [
      "/images/watches/watches_p2-1.jpg",
      "/images/watches/watches_p2-2.jpg",
    ],
    category: "Watches",
    brand: "Breitling ",
    tags: ["featured"],
    isPublished: true,
    avgRating: 4.5,
    numReviews: 6,

    numSales: 9,
    countInStock: 60,
    colors: ["blue", "dark-blue"],
    sizes: ["S", "M", "L", "XL"],
    reviews: [],
  },
  {
    name: "ASIAN Men's Wonder-13 Sports Running Shoes",
    slug: "ASIAN Men's Wonder-13 Sports Running Shoes",

    description:
      "Elevate your street cred by pairing these Baggy ASIAN Men's Wonder-13 Sports Running Shoe. High-top sneakers. Roll up the cuffs for an added edge and throw on a bomber jacket to complete the look",
    price: 329.99,
    listPrice: 0,

    images: ["/images/shoes/shoes_p4-1.jpg", "/images/shoes/shoes_p4-2.jpg"],
    category: "Shoes",
    brand: "Nike",
    tags: ["featured"],
    isPublished: true,
    avgRating: 4.5,
    numReviews: 6,

    numSales: 9,
    countInStock: 60,
    colors: ["blue", "dark-blue"],
    sizes: ["S", "M", "L", "XL"],
    reviews: [],
  },
  {
    name: "ASIAN Men's Wonder-13 Sports Running Shoes",
    slug: "ASIAN Men's Wonder-13 Sports Running Shoes",

    description:
      "Elevate your street cred by pairing these Baggy ASIAN Men's Wonder-13 Sports Running Shoe. High-top sneakers. Roll up the cuffs for an added edge and throw on a bomber jacket to complete the look",
    price: 329.99,
    listPrice: 0,

    images: [
      "/images/shirts/shirts_p2-1.jpg",
      "/images/shirts/shirts_p2-2.jpg",
    ],
    category: "Shirts",
    brand: "Burberry",
    tags: ["featured"],
    isPublished: true,
    avgRating: 4.5,
    numReviews: 6,

    numSales: 9,
    countInStock: 60,
    colors: ["blue", "dark-blue"],
    sizes: ["S", "M", "L", "XL"],
    reviews: [],
  },
  {
    name: "POLO Men's Wonder-13 T-Shirts",
    slug: "POLO Men's Wonder-13 T-Shirts",

    description:
      "Elevate your street cred by pairing these Baggy POLO Men's Wonder-13 Sports Running T-Shirts. High-top sneakers. Roll up the cuffs for an added edge and throw on a bomber jacket to complete the look",
    price: 329.99,
    listPrice: 0,

    images: [
      "/images/t-shirts/t-shirts_p4-1.jpg",
      "/images/t-shirts/t-shirts_p4-2.jpg",
    ],
    category: "T-Shirts",
    brand: "Burberry",
    tags: ["featured"],
    isPublished: true,
    avgRating: 4.5,
    numReviews: 6,

    numSales: 9,
    countInStock: 60,
    colors: ["blue", "dark-blue"],
    sizes: ["S", "M", "L", "XL"],
    reviews: [],
  },
  {
    name: "POLO Men's Wonder-14 T-Shirts (p-40-69)",
    slug: "POLO Men's Wonder-14 T-Shirts (p-40-69)",
    description:
      "Elevate your street cred by pairing these Baggy POLO Men's Wonder-13 Sports Running T-Shirts. High-top sneakers. Roll up the cuffs for an added edge and throw on a bomber jacket to complete the look",
    price: 99.99,
    listPrice: 0,

    images: [
      "/images/t-shirts/t-shirts_p3-1.jpg",
      "/images/t-shirts/t-shirts_p3-2.jpg",
    ],
    category: "T-Shirts",
    brand: "Burberry",
    tags: ["featured"],
    isPublished: true,
    avgRating: 4.5,
    numReviews: 6,

    numSales: 9,
    countInStock: 60,
    colors: ["blue", "dark-blue"],
    sizes: ["S", "M", "L", "XL"],
    reviews: [],
  },
];

export const shippingOptions = [
  {
    id: "standard",
    label: "Standard Delivery (1-5 days)",
    charge: 0,
    deliveryDays: 5,
  },
  {
    id: "express",
    label: "Express Delivery (1-2 days)",
    charge: 6.9,
    deliveryDays: 2,
  },
  {
    id: "super-express",
    label: "Super Express Delivery (Next day)",
    charge: 12.9,
    deliveryDays: 1,
  },
];
