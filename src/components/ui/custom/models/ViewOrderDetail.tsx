import React from "react";
import { CustomModel } from "./CustomModel";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderDetailsProps {
  orderId: string;
  orderDate: string;
  items: OrderItem[];
  itemTotal: number;
  taxes: number;
  grandTotal: number;
  status: string;
  open?: boolean;
  onClose?: () => void;
}

export default function ViewOrderDetail({
  orderId,
  orderDate,
  items,
  itemTotal,
  taxes,
  grandTotal,
  status,
  open,
  onClose,
}: OrderDetailsProps) {
  return (
    <CustomModel
      title=""
      open={open}
      closeModel={onClose}
      contentClassName="max-w-md lg:h-fit md:h-fit h-[60vh]   "
    >
      <div className="space-y-4 lg:p-2 md:p-2 p-3 !h-fit">
        {/* Status Badge */}
        <div className="flex justify-between border-b pb-3 border-dashed border-black/70 items-center">
          <p className="text-lg font-semibold">Order Detailsasdasd</p>
          <span className="px-3 py-1 text-sm text-white bg-green-500 rounded-full">
            #{status}
          </span>
        </div>

        {/* Order Info */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Order ID: {orderId}</p>
          <p className="text-sm text-gray-500">Order Placed: {orderDate}</p>
        </div>

        {/* Order Items */}
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-sm">
                {item.name} x {item.quantity}
              </span>
              <span className="text-sm font-medium">
                ${item.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="pt-3 space-y-2 border-t border-dashed border-black/70">
          <div className="flex justify-between">
            <span className="text-sm">Item Total</span>
            <span className="text-sm font-medium">${itemTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Taxes</span>
            <span className="text-sm font-medium">${taxes.toFixed(2)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-black/50">
            <span className="text-lg font-semibold">Grand Total</span>
            <span className="text-lg font-semibold">
              ${grandTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </CustomModel>
  );
}
