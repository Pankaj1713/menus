"use client";
import { useEffect, useState } from "react";
import AnimateEachElement from "@/components/ui/custom/animations/AnimateEachElement";
import ViewOrderDetail from "@/components/ui/custom/models/ViewOrderDetail";
import Nodata from "@/components/ui/custom/pages/common/Nodata";
import { getApi } from "@/api/apiService";
import { APIS } from "@/api/endpoints";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getApi(`${APIS.GET_ORDER}?deviceId=1`);
      setOrders(res?.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  function OrderItem({ orderId, date, amount, items, status }: OrderItemProps) {
    const getStatusBadge = () => {
      const statusStyles = {
        active: "bg-green-500 text-white",
        completed: "bg-appColor text-white",
        cancelled: "bg-red-600 text-white",
      };
      return (
        <span
          className={`px-2 py-1 text-sm rounded-lg ${statusStyles[status]}`}
        >
          #{status}
        </span>
      );
    };

    return (
      <div
        onClick={() => setOpen(true)}
        className="bg-white cursor-pointer card-shadow rounded-xl p-4 space-y-2"
      >
        <div className="flex border-b border-gray-900 pb-2 border-dashed justify-between items-center">
          <div className="space-y-2">
            <p className="lg:text-lg text-md font-semibold">
              Order ID: {orderId}
            </p>
          </div>
          {getStatusBadge()}
        </div>
        <div>
          <p className="lg:text-sm text-sm text-gray-500">
            Order Placed: {date}
          </p>
        </div>
        <div className="flex justify-between flex-col items-start">
          <p className="lg:text-lg text-md font-bold text-appColor">{amount}</p>
          <p className="lg:text-md text-sm font-semibold">{items}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="wrapper mt-28 lg:!mt-34 min-h-[80vh] lg:mb-20 md:mb-10 mb-5 lg:w-[60%] mx-auto space-y-6">
        <AnimateEachElement className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="bg-white card-shadow rounded-xl p-4 space-y-2 animate-pulse"
            >
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  <div className="h-3 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 w-48 bg-gray-200 rounded"></div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </AnimateEachElement>
      </div>
    );
  }

  return (
    <div className="wrapper lg:mt-40 mt-28 lg:!mt-34 min-h-[80vh] lg:mb-20 md:mb-10 mb-5 lg:w-[60%] mx-auto space-y-6">
      {orders.length === 0 ? (
        <Nodata
          title="Ouch! Hungry"
          description="Seems like you have not ordered any food yet"
          buttonText="Find Foods"
          buttonLink="/"
        />
      ) : (
        <AnimateEachElement className="space-y-4">
          {orders.map((order, index) => (
            <OrderItem
              key={order._id || index}
              orderId={order.orderNumber || "N/A"}
              date={new Date(order.createdAt).toLocaleString()}
              amount={`$${order.PaymentSummary.totalPrice}`}
              items={order.items.map((item: any) => item.name).join(", ")}
              status={order.status.toLowerCase()}
            />
          ))}
        </AnimateEachElement>
      )}

      <ViewOrderDetail
        orderId="56567253782653"
        orderDate="14:42 PM, 02 Oct, 2024"
        status="Active"
        items={[
          { name: "Grilled Pizza", quantity: 1, price: 18.98 },
          { name: "Maxico Pasta", quantity: 2, price: 32.54 },
          { name: "French Fries", quantity: 1, price: 29.98 },
          { name: "Pepsi", quantity: 1, price: 15.0 },
        ]}
        itemTotal={96.05}
        taxes={23.16}
        grandTotal={119.21}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

interface OrderItemProps {
  orderId: string;
  date: string;
  amount: string;
  items: string;
  status: "active" | "completed" | "cancelled";
}
