import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import BrowsHistory from "@/components/shared/BrowsHistory";
// import MyOrders from "./my-orders";
// import { redirect } from "next/navigation";
import { getMyAllOrders } from "@/lib/actions/order.actions";
import MyOrders from "@/components/order/MyOrders";

const Orders = async () => {
  const orders = await getMyAllOrders();
  // const { data: session } = useSession();

  // if (!session) redirect("/sign-in");

  return (
    <div className="min-h-screen w-full">
      <div className="my-5 w-full max-w-[1100px] mx-auto">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/your-account"
                  className="hover:underline text-blue-500"
                >
                  {" "}
                  Your account
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-blue-500" />
              <BreadcrumbItem>
                <BreadcrumbLink className="text-[tomato]">
                  Your Orders
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="">
          <h1 className="text-3xl py-3 ">Your Orders</h1>
          <div>
            <MyOrders orders={orders?.orders ?? []} />
            {/* <MyOrders /> */}
          </div>
        </div>
      </div>
      <div>
        <BrowsHistory
          title="Your browsing history"
          className="h-32"
          size="24vh"
          grid="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
        />
      </div>
    </div>
  );
};

export default Orders;
