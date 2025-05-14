"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AnimateEachElement from "@/components/ui/custom/animations/AnimateEachElement";
import { CreditCard } from "lucide-react";
import { cardIcon, paypalIcon } from "@/utils/icons/svg";
export default function PaymentMethodPage() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState("mastercard");
  const paymentMethods = [
    {
      id: "card",
      name: "Card",
      number: "0783 7873",
      logo: cardIcon,
    },
    {
      id: "paypal",
      name: "Paypal",
      number: "0582 4672",
      logo: paypalIcon,
    },
  ];

  return (
    <div className="p-4 min-h-[80vh] flex flex-col justify-between lg:mt-40 mt-24 max-w-md mx-auto">
      <div>
        <AnimateEachElement className="space-y-4 mb-8">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedMethod === method.id
                  ? "border-[#C8336C] bg-white shadow"
                  : "border-gray-200 bg-gray-50"
              }`}
              onClick={() => setSelectedMethod(method.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="font-semibold">{method.name}</h3>
                  </div>
                </div>
                <div className="w-12 h-8 relative">{method.logo}</div>
              </div>
            </div>
          ))}
        </AnimateEachElement>
      </div>
      <button
        onClick={() => {
          if (selectedMethod === "card") {
            router.push("/payment/proceed");
          } else if (selectedMethod === "paypal") {
            router.push("/payment/status");
          }
        }}
        className="w-full bg-[#C8336C] text-white py-4 rounded-xl hover:bg-[#B02D60] transition-colors"
      >
        Proceed to Pay
      </button>
    </div>
  );
}
