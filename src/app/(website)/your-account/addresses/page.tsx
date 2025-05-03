import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import UserAddress from "./user-address";
import CreateAndUpdateAddressModal from "@/components/shared/CreateAndUpdateAddressModal";

const Addresses = async () => {
  return (
    <div className=" min-h-screen w-full px-5">
      <div className="my-5 max-w-[1100px] w-full mx-auto">
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
                  Your Addresses
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className=" w-full">
          <div className="flex my-3 flex-wrap justify-between items-center gap-4">
            <h1 className="text-3xl py-3 ">Your Addresses</h1>
            <CreateAndUpdateAddressModal btnText="Create New Address" />
          </div>
          <UserAddress />
        </div>
      </div>
    </div>
  );
};

export default Addresses;
