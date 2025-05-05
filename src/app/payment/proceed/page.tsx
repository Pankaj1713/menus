"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
type PaymentMethod = "card" | "paypal" | "apple";

export default function PaymentForm() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        {selectedMethod === "card" && (
          <div className="space-y-6">
            <div>
              <label className="text-gray-700 text-base mb-2 block">
                Cardholder Name
              </label>
              <Input
                placeholder="Albert Stevano Bajefski"
                className="h-14 text-lg rounded-xl"
              />
            </div>

            <div>
              <label className="text-gray-700 text-base mb-2 block">
                Card Number
              </label>
              <Input
                placeholder="3822 8293 8292 2356"
                className="h-14 text-lg rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-700 text-base mb-2 block">
                  Expiry Date
                </label>
                <Input
                  placeholder="11/24"
                  className="h-14 text-lg rounded-xl"
                />
              </div>

              <div>
                <label className="text-gray-700 text-base mb-2 block">
                  3-Digit CVV
                </label>
                <Input
                  placeholder="531"
                  maxLength={3}
                  className="h-14 text-lg rounded-xl"
                />
              </div>
            </div>
          </div>
        )}
        <Button
          onClick={() => router.push("/payment/status")}
          className="w-full h-14 text-lg bg-[#D84B6B] hover:bg-[#C23757] rounded-xl"
          type="submit"
        >
          Pay Now
        </Button>
      </form>
    </div>
  );
}
