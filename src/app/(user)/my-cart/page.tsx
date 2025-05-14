// @ts-nocheck
"use client";
import { Minus, Plus, Trash2, ChevronDown, Circle } from "lucide-react";
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
import { deleteApi, getApi, postApi } from "@/api/apiService";
import { APIS } from "@/api/endpoints";
import { useEffect, useState } from "react";
import { CustomModel } from "@/components/ui/custom/models/CustomModel";
import { Form, Formik } from "formik";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import Spinner from "@/components/common/spinner";
import { fetchCartData } from "@/lib/store/slices/cartSlice";

type CartItemType = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
};

type CartDataType = {
  items: CartItemType[];
};

export default function CartPage() {
  const router = useRouter();
  const [cartData, setCartData] = useState<CartDataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      setLoading(true);
      const deviceId = localStorage.getItem("device_id");

      setDeviceId(deviceId);
      const res = await getApi(`${APIS.CART_DATA}?deviceId=${deviceId}`);
      setCartData(res?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalItems =
    cartData?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const totalPrice =
    cartData?.items?.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ) || 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="wrapper mt-28 lg:mb-20 md:mb-10 mb-5 lg:w-[60%] mx-auto space-y-6">
      {/* Cart Items */}
      <div>
        <AnimateEachElement className="space-y-10">
          <CartItem
            item={cartData}
            onDelete={() => {
              fetchCartData();
            }}
            deviceId={deviceId}
          />
        </AnimateEachElement>
      </div>

      <AnimateEachElement className="space-y-6">
        {/* Cooking Notes */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Add Cooking Requests</h3>
          <Textarea
            placeholder="Write your instructions..."
            className="min-h-[100px] resize-none"
          />
        </div>

        {/* Table Number Selection */}
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
              <span className="text-muted-foreground">
                Total Items ({totalItems})
              </span>
              <span>${totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span>$40</span>
            </div>
            <div className="flex justify-between pt-4 font-semibold">
              <span>Total</span>
              <span>${(totalPrice + 40).toLocaleString()}</span>
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

type CartItemProps = {
  item: CartItemType;
  deviceId: string;
  onDelete: () => void;
};

function CartItem({ item, onDelete, deviceId }: CartItemProps) {
  const [isCustomize, setIsCustomize] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState(null);

  const [updatedItems, setUpdatedItems] = useState([]);

  useEffect(() => {
    if (!!data) {
      setQuantity(data?.quantity);
    }
  }, [data]);

  useEffect(() => {
    if (item?.items?.length > 0) {
      setUpdatedItems(item?.items);
    }
  }, [item]);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleUpdateItem = async (values: any) => {
    const item = {
      itemId: data?._id,
      image: data?.image,
      name: data?.name,
      category: data?.category,
      price: data?.price,
      quantity: quantity,
    };

    if (values.addOns && Array.isArray(values.addOns)) {
      item.addOns = values.addOns.map(({ _id, ...rest }) => rest);
    }

    if (values.addBeverages && Array.isArray(values.addBeverages)) {
      item.addBeverages = values.addBeverages.map(({ _id, ...rest }) => rest);
    }

    if (values.chooseYourSides && Array.isArray(values.chooseYourSides)) {
      item.chooseYourSides = values.chooseYourSides.map(
        ({ _id, ...rest }) => rest
      );
    }

    const payload = {
      tableNumber: "2",
      items: [item],
      addCookingRequest: "",
      deviceId: deviceId,
    };

    try {
      const res = await postApi(APIS.EDIT_CART, payload);

      if (res?.statusCode === 200) {
        toast.success("Item added to cart");
        setIsCustomize(false);
        dispatch(fetchCartData());
        onDelete(true);
      } else {
        console.error("API returned an error:", res);
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error?.response?.data?.data || "Something went wrong");
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteApi(
        `${APIS.DELETE_CART_ITEM}?itemId=${id}&cartId=${item?._id}`
      );
      dispatch(fetchCartData());
      onDelete(true);
      toast.success("Item removed from cart");
    } catch (error) {
      console.error(error);
    }
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const increase = (item) => {
    const array = updatedItems?.map((i) => {
      if (i?._id === item?._id) {
        return {
          ...i,
          quantity: i.quantity + 1,
        };
      }
      return i;
    });
    setUpdatedItems(array);
  };

  const decrease = (item) => {
    const array = updatedItems?.map((i) => {
      if (i?._id === item?._id) {
        if (i.quantity > 1) {
          return {
            ...i,
            quantity: i.quantity - 1,
          };
        } else {
          return i;
        }
      }
      return i;
    });
    setUpdatedItems(array);
  };

  return (
    <div className="space-y-10">
      {updatedItems?.map((item, index) => {
        return (
          <div className="bg-white rounded-3xl card-shadow p-4" key={index}>
            <div className="flex relative flex-col md:flex-row md:items-start gap-4">
              <div className="flex items-start gap-4 flex-1">
                <img
                  src={item.image || ImageProvider()?.src}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  <Button
                    variant="ghost"
                    className="h-8 px-0 text-sm font-semibold"
                    onClick={() => {
                      setData(item);
                      setIsCustomize(true);
                    }}
                  >
                    Customise <ChevronDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="absolute top-0 right-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:text-red-600"
                  onClick={() => {
                    handleDeleteItem(item?._id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Separator className="mb-2 border-b-[1.5px] border-gray-200 " />
            <div className="flex items-center justify-between gap-2">
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 rounded-full w-8"
                  onClick={() => decrease(item)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 font-semibold text-center">
                  {item.quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 rounded-full w-8"
                  onClick={() => increase(item)}
                >
                  <Plus className="h-4 w-4" onClick={increaseQuantity} />
                </Button>
              </div>
              <span className="font-semibold">
                ${(item.price * item.quantity).toLocaleString()}
              </span>
            </div>
          </div>
        );
      })}
      <CustomModel
        open={isCustomize}
        setOpenModel={() => {
          setIsCustomize(true);
        }}
        closeModel={() => {
          setIsCustomize(false);
        }}
        title=""
        trigger={<Button variant="outline">Customize</Button>}
        contentClassName="bg-gray-50 rounded-t-xl"
      >
        <Formik
          enableReinitialize
          initialValues={{
            addOns: data?.addOns?.filter((item) => item.isSelect) || [],
            addBeverages:
              data?.addBeverages?.filter((item) => item.isSelect) || [],
            chooseYourSides:
              data?.chooseYourSides?.filter((item) => item.isSelect) || [],
          }}
          onSubmit={handleUpdateItem}
        >
          {({ values, setFieldValue, isSubmitting }) => {
            return (
              <Form>
                <div className="flex relative bg-white rounded-2xl card-shadow items-center gap-2 p-4">
                  <img
                    src={data?.image}
                    alt="Product"
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <h3 className="text-base font-semibold">{data?.name}</h3>
                </div>

                <div className="mt-4 pb-5 space-y-4">
                  <h4 className="text-base font-medium">
                    Customise as per your taste
                  </h4>

                  {!!data?.addOns > 0 && (
                    <div className="bg-white rounded-xl card-shadow p-4">
                      <h5 className="text-sm font-semibold w-full border-b pb-2 mb-2">
                        Add-ons
                      </h5>
                      {data?.addOns?.map((addon, index) => {
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between py-2"
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={`border-2 p-[2px] ${
                                  addon.category === "veg"
                                    ? "border-green-500"
                                    : "border-red-500"
                                }`}
                              >
                                <Circle
                                  className={`w-2 h-2 ${
                                    addon.category === "veg"
                                      ? "fill-green-500"
                                      : "fill-red-500"
                                  }`}
                                />
                              </div>
                              <span className="text-sm">{addon.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm">+${addon.price}</span>
                              <Checkbox
                                checked={values.addOns.some((item) => {
                                  return (
                                    item._id === addon._id && item.isSelect
                                  );
                                })}
                                onCheckedChange={(checked) => {
                                  setFieldValue(
                                    "addOns",
                                    checked
                                      ? [
                                          ...values.addOns,
                                          { ...addon, isSelect: true },
                                        ]
                                      : values.addOns.filter(
                                          (item) => item._id !== addon._id
                                        )
                                  );
                                }}
                                className="border-2 border-gray-300 data-[state=checked]:bg-appColor data-[state=checked]:border-appColor"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {data?.addBeverages?.length > 0 && (
                    <div className="bg-white rounded-xl card-shadow p-4">
                      <h5 className="text-sm font-semibold w-full border-b pb-2 mb-2">
                        Add Beverages
                      </h5>
                      {data?.addBeverages?.map((bev, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2"
                        >
                          <div className="flex items-center gap-2">
                            <div className="border-2 border-green-500 p-[2px]">
                              <Circle className="w-2 h-2 fill-green-500" />
                            </div>
                            <span className="text-sm">{bev.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm">+${bev.price}</span>
                            <Checkbox
                              checked={values.addBeverages.some(
                                (item) => item._id === bev._id && item.isSelect
                              )}
                              onCheckedChange={(checked) => {
                                const isChecked = checked === true;

                                const updatedBeverages = isChecked
                                  ? [
                                      ...values.addBeverages.filter(
                                        (item) => item._id !== bev._id
                                      ),
                                      { ...bev, isSelect: true },
                                    ]
                                  : values.addBeverages.map((item) =>
                                      item._id === bev._id
                                        ? { ...item, isSelect: false }
                                        : item
                                    );

                                setFieldValue("addBeverages", updatedBeverages);
                              }}
                              className="border-2 border-gray-300 data-[state=checked]:bg-appColor data-[state=checked]:border-appColor"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {!!data?.chooseYourSides.length > 0 && (
                    <div className="bg-white rounded-xl card-shadow p-4">
                      <h5 className="text-sm font-semibold w-full border-b pb-2 mb-2">
                        Choose your Sides
                      </h5>
                      {data?.chooseYourSides?.map((side, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2"
                        >
                          <div className="flex items-center gap-2">
                            <div className="border-2 border-red-500 p-[2px]">
                              <Circle className="w-2 h-2 fill-red-500" />
                            </div>
                            <span className="text-sm">{side.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm">+${side.price}</span>
                            <Checkbox
                              checked={values.chooseYourSides.some(
                                (item) => item._id === side._id && item.isSelect
                              )}
                              onCheckedChange={(checked) => {
                                const isChecked = checked === true;

                                const updatedSides = isChecked
                                  ? [
                                      ...values.chooseYourSides.filter(
                                        (item) => item._id !== side._id
                                      ),
                                      { ...side, isSelect: true },
                                    ]
                                  : values.chooseYourSides.map((item) =>
                                      item._id === side._id
                                        ? { ...item, isSelect: false }
                                        : item
                                    );

                                setFieldValue("chooseYourSides", updatedSides);
                              }}
                              className="border-2 border-gray-300 data-[state=checked]:bg-appColor data-[state=checked]:border-appColor"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SIDES */}

                  {/* Quantity and Submit */}
                  <div className="sticky flex gap-4 bottom-0 left-0 right-0 p-4 bg-white rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3 border-appColor border-[1.5px] bg-rose-50 rounded-lg py-1 px-2">
                        <button
                          onClick={decreaseQuantity}
                          type="button"
                          className="p-1"
                        >
                          <Minus size={16} className="text-black" />
                        </button>
                        <span className="text-base min-w-8 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={increaseQuantity}
                          type="button"
                          className="p-1"
                        >
                          <Plus size={16} className="text-black" />
                        </button>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full rounded-full bg-appColor hover:bg-appColor/90 text-white"
                    >
                      {/* Update Item */}
                      {isSubmitting ? "Updating..." : "Update Item"}
                    </Button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </CustomModel>
    </div>
  );
}
