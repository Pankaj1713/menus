"use client";
import { Minus, Plus, Trash2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import AnimateEachElement from "@/components/ui/custom/animations/AnimateEachElement";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageProvider from "@/lib/hooks/ImageProvider";
import { Separator } from "@radix-ui/react-separator";
import { getApi } from "@/api/apiService";
import { APIS } from "@/api/endpoints";
import { useEffect } from "react";
export default function CartPage() {
  const router = useRouter();

  useEffect(() => {
    fetchCartData();
  }, []);
  const fetchCartData = async () => {
    const res = await getApi(APIS.CART_DATA);
  };
  return (
    <div className=" wrapper mt-28 lg:mb-20 md:mb-10 mb-5 lg:w-[60%] mx-auto  space-y-6">
      {/* Cart Items */}
      <div>
        <AnimateEachElement className="space-y-10">
          <CartItem />
          <CartItem />
        </AnimateEachElement>
      </div>
      <AnimateEachElement className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Add Cooking Requests</h3>
          <Textarea
            placeholder="write your instructions.."
            className="min-h-[100px] resize-none"
          />
        </div>
        {/* Table Selection */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Select Table Number</h3>
          <Select>
            <SelectTrigger className="!py-6">
              <SelectValue placeholder="12" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(20)].map((_, i) => (
                <SelectItem key={i + 1} value={`${i + 1}`}>
                  {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Payment Summary */}
        <Card className="p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4">Payment Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Items (4)</span>
              <span>$48,900</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span>$40</span>
            </div>
            <div className="flex justify-between pt-4 font-semibold">
              <span>Total</span>
              <span>$38,000</span>
            </div>
          </div>
        </Card>

        <Button
          onClick={() => router.push("/payment")}
          size="lg"
          className="w-full bg-[#C32B5C] hover:bg-[#A6224D] text-white"
        >
          Continue
        </Button>
      </AnimateEachElement>
    </div>
  );
}

function CartItem() {
  return (
    <div className=" bg-white rounded-3xl card-shadow p-4 ">
      <div className="flex relative flex-col md:flex-row md:items-start gap-4">
        <div className="flex items-start gap-4 flex-1">
          <img
            src={ImageProvider()?.src}
            alt="Spicy Chicken Burger"
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold">Spicy Chicken Burger</h3>
            <p className="text-sm text-muted-foreground">
              Lettuce, Bacon, Olives
            </p>
            <Button variant="ghost" className="h-8 px-0 text-sm font-semibold ">
              Customise <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="  absolute top-0 right-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Separator className="mb-2 border-b-[1.5px] border-gray-200 " />
      <div className=" flex items-center   justify-between gap-2">
        <div className=" space-x-2   ">
          <Button
            variant="outline"
            size="icon"
            className="h-8 rounded-full w-8"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 font-semibold text-center">2</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 rounded-full w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <span className="font-semibold">$ 12,230</span>
      </div>
    </div>
  );
}
