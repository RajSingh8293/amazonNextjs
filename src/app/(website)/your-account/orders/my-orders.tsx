import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IOrder } from "@/models/order.model";
import { getMyAllOrders } from "@/lib/actions/order.actions";
// interface OrderType {
//   orders?: OrderTypes[];
// }
// const MyOrders = async ({ orders }: { orders?: IOrder[] }) => {
const MyOrders = async () => {
  const { orders } = await getMyAllOrders();

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px] ">Id</TableHead>
            <TableHead className="w-[200px]  text-right">Status</TableHead>
            <TableHead className=" text-right">Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders &&
            orders?.map((item: IOrder) => (
              <TableRow key={String(item?._id)}>
                <TableCell className="">
                  <Link href={`/your-account/orders/${item?._id as string}`}>
                    {item._id as string}
                  </Link>
                </TableCell>
                <TableCell className=" text-right">
                  {item?.isPaid === true ? "Paid" : "Not Paid"}
                </TableCell>
                <TableCell className="font-medium w-[200px]  text-right">
                  {item?.paymentMethod}
                </TableCell>

                <TableCell className="text-right">
                  ${item?.itemsPrice.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyOrders;
