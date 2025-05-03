import ProductCarousal from "@/components/shared/ProductCarousal";
import { IProducts } from "@/models/product-model";
import { Separator } from "@/components/ui/separator";
import Rating from "@/components/shared/product/Rating";
import ProductPrice from "@/components/shared/product/ProductPrice";
import SelectVariant from "@/components/shared/product/SelectVariant";
import { Card, CardContent } from "@/components/ui/card";
import AddToButton from "@/components/shared/product/AddToButton";
import BrowsHistory from "@/components/shared/BrowsHistory";
import ImagesGallary from "@/components/shared/product/ImagesGallary";
import {
  getProductById,
  getRelatedProductByCategory,
  getRelatedProductsByTagName,
} from "@/lib/actions/product.actions";
import CustomerReview from "@/components/shared/CustomerReview";

export interface RelatedProducts {
  data: IProducts[];
  totalProducts: number;
}
const ProductDetail = async (props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page: string; color: string; size: number }>;
}) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { color, size, page } = searchParams;
  console.log("color, size, page : ", color, size, page);

  const productId = params.id;
  const product = await getProductById(productId);
  const relatedProducts: RelatedProducts | undefined =
    await getRelatedProductByCategory({
      category: product.category,
      productId: productId,
    });
  if (!relatedProducts) return null;

  const relatedProductsByTagName = await getRelatedProductsByTagName({
    tag: product.tags[0],
    brand: product.brand,
    productId: productId,
  });
  if (!relatedProductsByTagName) return null;

  const getUrlFromTags = relatedProductsByTagName?.map((data) => data.tags);

  return (
    <>
      <div className="mx-auto bg-white shadow rounded-lg mt-16 p-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="col-span-5">
            <div className="w-full lg:sticky  top-20 ">
              <ImagesGallary images={product.images} />
            </div>
          </div>
          <div className="col-span-5 ">
            <div className="flex flex-col gap-2">
              <div>
                <h2>
                  Brand {product.brand} {product.category}
                </h2>
                <h4 className="text-xl lg:text-2xl font-semibold text-black">
                  {product.name}
                </h4>
                <div className="flex items-center gap-2">
                  <Rating rating={product.avgRating} />
                  <span>({product.numReviews}) ratings</span>
                </div>
              </div>
              <Separator className="my-2 bg-gray-300" />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center ">
                <div className="flex gap-3">
                  <ProductPrice
                    price={product.price}
                    listPrice={product.listPrice}
                    className="text-black"
                    forListing={false}
                    isDeal={product.tags.includes("today-deal")}
                  />
                </div>
              </div>
              <div>
                <SelectVariant
                  product={product}
                  size={String(size || product.sizes[0])}
                  color={color || product.colors[0]}
                />
              </div>
              <Separator className="my-2 bg-gray-300" />
              <div className="mt-3">
                <h2>About Item :</h2>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="w-full">
              <Card className="bg-white py-4 rounded-none border-gray-300">
                <CardContent>
                  <ProductPrice price={product.price} />
                  {product.countInStock > 0 && product.countInStock <= 3 && (
                    <div className="text-destructive font-bold">
                      {`Only ${product.countInStock} left in stock - order soon`}
                    </div>
                  )}
                  {product.countInStock !== 0 ? (
                    <div className="text-green-700 text-xl">In Stock</div>
                  ) : (
                    <div className="text-green-700 text-xl">In Stock</div>
                  )}

                  <AddToButton
                    product={product}
                    color={color || product.colors[0]}
                    size={String(size || product.sizes[0])}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="my-12 px-5">
        <CustomerReview
          rating={product.avgRating}
          numReviews={product.numReviews}
        />
      </div>
      <div className="my-8">
        <ProductCarousal
          title="Related Products"
          link="See more"
          data={relatedProducts?.data ?? []}
          urlLink={`/search?tag=${getUrlFromTags[0]}`}
          className="lg:h-60 h-32"
          width={200}
          height={200}
        />

        {relatedProductsByTagName.length > 0 && (
          <ProductCarousal
            title={`${getUrlFromTags[0]} Related Products`}
            link="See more"
            urlLink={`/search?tag=${getUrlFromTags[0]}`}
            data={relatedProductsByTagName ?? []}
            className="lg:h-60 h-32"
            width={200}
            height={200}
            hideBtn
          />
        )}

        <BrowsHistory
          title="Based on your browsing history"
          className="h-44"
          size="24vh"
          grid="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 "
        />
      </div>
    </>
  );
};

export default ProductDetail;
