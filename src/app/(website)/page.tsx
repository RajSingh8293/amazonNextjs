import HeroCarousel from "@/components/home/HeroCarousel";
import HomeCard from "@/components/home/HomeCard";
import BrowsHistory from "@/components/shared/BrowsHistory";
import ProductCarousal from "@/components/shared/ProductCarousal";
import {
  getCategosries,
  getProductsByTag,
  getProductsByTagName,
} from "@/lib/actions/product.actions";

import { IProducts } from "@/models/product-model";

const Home = async () => {
  const categoriesData: IProducts[] =
    (await getCategosries()).slice(0, 4) ?? [];
  const bestSeller =
    (await getProductsByTag({
      tag: "best-seller",
      limit: 4,
    })) ?? [];

  const newArrival =
    (await getProductsByTag({
      tag: "new-arrival",
      limit: 4,
    })) ?? [];
  const featuredProducts =
    (await getProductsByTag({
      tag: "featured",
      limit: 4,
    })) ?? [];
  const bestSellerProducts =
    (await getProductsByTagName({
      tag: "best-seller",
    })) ?? [];
  const todayDealProducts =
    (await getProductsByTagName({
      tag: "today-deal",
    })) ?? [];
  const newArrivalProducts =
    (await getProductsByTagName({
      tag: "new-arrival",
    })) ?? [];

  const cardsData = [
    {
      title: "Categories to explore",
      link: {
        text: "Explore more",
        href: "/search",
      },
      items: categoriesData.map((category) => ({
        name: category.category,
        image: category.images[0],
        href: `/search?category=${category.category}`,
      })),
      // items: categoriesData,
    },
    {
      title: "Explore New Arrivals",
      link: {
        text: "View All",
        href: "/search?tag=new-arrival",
      },
      items: newArrival,
    },
    {
      title: "Discover Best Sellers",
      link: {
        text: "See more",
        href: "/search?tag=best-seller",
      },
      items: bestSeller,
    },
    {
      title: "Featured Products",
      link: {
        text: "See more",
        href: "/search?tag=featured",
      },
      items: featuredProducts,
    },
  ];

  return (
    <main className="bg-gray-200 ">
      <HeroCarousel />
      <HomeCard cards={cardsData} />
      <ProductCarousal
        title="Today's Deals"
        link="See more"
        urlLink="/search?tag=today-deal"
        data={todayDealProducts}
        hideBtn
        hideAddBtn
      />
      <ProductCarousal
        title="Best Seller Products"
        link="See more"
        urlLink="/search?tag=best-seller"
        data={bestSellerProducts}
        hideAddBtn
      />

      <ProductCarousal
        title="New Arrival Products"
        data={newArrivalProducts}
        hideDetail
        link="See more"
        urlLink="/search?tag=new-arrival"
        hideAddBtn
      />

      <BrowsHistory
        title="Your browsing history"
        className="h-44"
        size="24vh"
        grid="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
      />
    </main>
  );
};

export default Home;
