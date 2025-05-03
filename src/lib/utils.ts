import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
  minimumFractionDigits: 2,
});

export function formatCurrency(amount: number) {
  return CURRENCY_FORMATTER.format(amount);
}
export function dateFormat(date: Date) {
  const formatDate = date.toString().split("T")[0];
  return formatDate;
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");
export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number);
}

export const FREE_DELIVERY_MIN_PRICE: number = process.env
  .FREE_DELIVERY_MIN_PRICE
  ? Number(process.env.FREE_DELIVERY_MIN_PRICE)
  : 499;
// export function round2(number: number) {
//   Math.round((number + Number.EPSILON) * 100) / 100;
// }

// export function generatedId() {
//   Array.from({ length: 24 }, () => Math.floor(Math.random() * 10)).join("");
// }
// export function generatedId(): string {
//   return Array.from({ length: 24 }, () => Math.floor(Math.random() * 10)).join(
//     ""
//   );
// }

export const getFiltereUrl = ({
  params,
  category,
  tag,
  sort,
  price,
  rating,
  page,
}: {
  params: {
    k?: string;
    category?: string;
    tag?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  };
  category?: string;
  tag?: string;
  sort?: string;
  price?: string;
  rating?: string;
  page?: string;
}) => {
  const newParams = { ...params };
  if (category) newParams.category = category;
  if (tag) newParams.tag = tag;
  if (price) newParams.price = price;
  if (rating) newParams.rating = rating;
  if (page) newParams.page = page;
  if (sort) newParams.sort = sort;
  return `/search?${new URLSearchParams(newParams).toString()}`;
};

export const getExpectedDeliveryDate = (id?: string): Date => {
  const today = new Date();

  if (id === "standard") {
    today.setDate(today.getDate() + 5);
  } else if (id === "express") {
    today.setDate(today.getDate() + 2);
  } else if (id === "super-express") {
    today.setDate(today.getDate() + 1);
  } else {
    today.setDate(today.getDate() + 5); // default fallback
  }

  return today;
};

export const getDayeAndDateAndTime = (
  expectedDeliveryDate: string | number | Date
) => {
  const deliveryDate = new Date(expectedDeliveryDate);
  const formatted = deliveryDate.toLocaleString("en-US", {
    weekday: "long", // e.g., "Monday"
    year: "numeric",
    month: "long", // e.g., "April"
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true, // or false for 24-hour format
  });
  return formatted;
};
