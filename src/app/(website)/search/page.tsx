import {
  getAllCategories,
  getAllProducts,
} from "@/lib/actions/product.actions";
import ProductCard from "@/components/shared/card/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Sortfilter from "@/components/shared/SortFilter";
import { getFiltereUrl } from "@/lib/utils";
import Rating from "@/components/shared/product/Rating";
import Pagination from "@/components/shared/Pagination";
import { priceRanges, sortOrders } from "@/lib/data/data";

export async function generateMetadata(props: {
  searchParams: Promise<{
    k?: string;
    category?: string;
    tag?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const {
    k = "all",
    category = "all",
    tag = "all",
    price = "all",
    rating = "all",
  } = searchParams;

  if (
    (k !== "all" && k !== "") ||
    category !== "all" ||
    tag !== "all" ||
    rating !== "all" ||
    price !== "all"
  ) {
    return {
      title: `Search ${k !== "all" ? k : ""}
        ${category !== "all" ? ` : Category ${category}` : ""}
        ${tag !== "all" ? ` : Tag ${tag}` : ""}
        ${price !== "all" ? ` : Price ${price}` : ""}
        ${rating !== "all" ? ` : Rating ${rating}` : ""}
        `,
    };
  } else {
    return {
      title: "Search products",
    };
  }
}

const SearchPage = async (props: {
  searchParams: Promise<{
    k: string;
    category: string;
    tag: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  }>;
}) => {
  const searchParams = await props.searchParams;

  const {
    k = "all",
    category = "all",
    tag = "all",
    price = "all",
    rating = "all",
    sort = "best-seller",
    page = "1",
  } = searchParams;

  const params = { k, category, tag, price, rating, sort, page };
  const categories = await getAllCategories();
  const data = await getAllProducts({
    query: k,
    category,
    tag,
    price,
    rating,
    sort,
    page: Number(page),
  });

  const tags = ["best-seller", "new-arrival", "today-deal", "featured"];

  return (
    <div className="">
      <div className="">
        {data && data?.products.length > 0 ? (
          <div className="contaner">
            <div className="row shadow-md px-5 mb-3">
              <div className="flex justify-between items-center py-2 ">
                <div className="flex items-center">
                  {data?.totalProducts === 0
                    ? "No"
                    : `${data?.from}-${data?.to} of ${data?.totalProducts}`}{" "}
                  results{" "}
                  {k !== "all" && (
                    <p className="ml-1">
                      <span>for </span>{" "}
                      <span className="text-[tomato] font-semibold">{`"${k}"`}</span>
                    </p>
                  )}
                  {k !== "all" ||
                  category !== "all" ||
                  tag !== "all" ||
                  rating !== "all" ||
                  price !== "all" ? (
                    <Button variant={"link"} className="" asChild>
                      <Link href="/search" className=" hover:text-[tomato]">
                        Clear
                      </Link>
                    </Button>
                  ) : null}
                </div>
                <div>
                  <Sortfilter
                    sortOrders={sortOrders}
                    sort={sort}
                    params={params}
                  />
                </div>
              </div>
            </div>
            <div className="row px-5">
              <div className="grid grid-cols-12">
                <div className="col-span-3 flex flex-col gap-2">
                  {/* <Filters /> */}
                  <div className="">
                    <h1 className=" font-bold mb-1">Category</h1>
                    <div>
                      <ul>
                        <li className="font-semibold  ">
                          <Link
                            className={`${
                              ("all" === category || "" === category) &&
                              "text-gray-600"
                            }`}
                            href={getFiltereUrl({ category: "all", params })}
                          >
                            All
                          </Link>
                        </li>
                        {categories.map((c: string) => (
                          <li key={c} className="font-semibold">
                            <Link
                              className={`${c === category && "text-gray-600"}`}
                              href={getFiltereUrl({ category: c, params })}
                            >
                              {c}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="">
                    <h1 className="font-bold  mb-1">Price</h1>
                    <div>
                      <ul>
                        <li className="font-semibold">
                          <Link
                            className={`${"all" === price && "text-gray-600"}`}
                            href={getFiltereUrl({ price: "all", params })}
                          >
                            All
                          </Link>
                        </li>
                        {priceRanges.map((p) => (
                          <li key={p.value} className="font-semibold">
                            <Link
                              className={`${
                                p.value === price && "text-gray-600"
                              }`}
                              href={getFiltereUrl({ price: p.value, params })}
                            >
                              {p.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="">
                    <h1 className="font-bold  mb-1">Customer Review</h1>
                    <div>
                      <ul>
                        <li className="font-semibold">
                          <Link
                            className={`${"all" === rating && "text-gray-600"}`}
                            href={getFiltereUrl({ rating: "all", params })}
                          >
                            All
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={`${"4" === rating && "text-gray-600"}`}
                            href={getFiltereUrl({ rating: "4", params })}
                          >
                            <div className="flex gap-1">
                              <Rating rating={4} /> & Up
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="">
                    <h1 className="font-bold  mb-1">Tags</h1>
                    <div>
                      <ul>
                        <li className="font-semibold">
                          <Link
                            className={`${
                              "all" === tag || ("" === tag && "text-gray-600")
                            }`}
                            href={getFiltereUrl({ tag: "all", params })}
                          >
                            All
                          </Link>
                        </li>
                        {tags.map((t: string) => (
                          <li key={t} className="capitalize font-semibold">
                            <Link
                              className={`${t === tag && "text-gray-600"}`}
                              href={getFiltereUrl({ tag: t, params })}
                            >
                              {t}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-span-9 ">
                  <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
                    {data?.products?.length === 0 && (
                      <div>No products found</div>
                    )}
                    {data?.products?.map((data) => (
                      <ProductCard
                        key={data?._id.toString()}
                        product={data}
                        hideBtn
                      />
                    ))}
                  </div>

                  <div className="flex justify-center items-center my-5">
                    <Pagination
                      currentPage={Number(page)}
                      totalPages={data.totalPages}
                      params={params}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h1>No Product found</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
