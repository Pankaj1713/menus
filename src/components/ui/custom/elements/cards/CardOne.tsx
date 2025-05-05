"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setIsAddToCart, setModalId } from "@/lib/store/slices/models.slice";
import { isDesktop, isMobile, isTablet } from "@/lib/hooks/Diamensions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardOneProps {
  item: any;
  image: StaticImageData;
  title: string;
  description: string;
  price: number;
  loading: boolean;
}

export default function CardOne({
  item,
  image,
  title,
  description,
  price,
  loading,
}: CardOneProps) {
  const dispatch = useDispatch();

  return (
    <Card className="w-full card-shadow overflow-hidden  lg:border md:border border-none border-black/90 rounded-2xl">
      {isDesktop() ? (
        <>
          <CardContent className="p-0">
            <Image
              src={image}
              alt={title}
              width={400}
              height={220}
              className="w-full h-[220px] rounded-t-lg object-cover"
            />
          </CardContent>
          <CardHeader className="p-3 space-y-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="text-sm line-clamp-2">
              {description}
            </CardDescription>
          </CardHeader>
          <CardFooter className="px-3 pb-3 pt-0 flex justify-between items-center">
            <p className="text-lg font-bold text-appColor">${price}</p>
            <Button
              onClick={() => {
                dispatch(setIsAddToCart(true));
                dispatch(setModalId(item?._id));
              }}
              variant="default"
              className="h-8 text-sm px-3"
            >
              + Add
            </Button>
          </CardFooter>
        </>
      ) : (
        <></>
      )}

      {isMobile() ? (
        <>
          <div className=" bg-white  flex justify-between h-full items-start  p-4 gap-2">
            <CardContent className="p-0 order-2 h-full w-[40%] ">
              <div className=" relative h-[96px] w-[118px] ">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="w-full  rounded-lg object-cover"
                />
                <Button
                  // onClick={() => dispatch(setIsAddToCart(true))}
                  onClick={() => {
                    dispatch(setIsAddToCart(true));
                    dispatch(setModalId(item?._id));
                  }}
                  variant="outline"
                  className="h-7 bg-white border-[1.5px] border-black/20 absolute -bottom-3 left-1/2 -translate-x-1/2 text-sm font-semibold px-3"
                >
                  + Add
                </Button>
              </div>
            </CardContent>
            <div className=" order-1 w-[90%] ">
              <CardHeader className=" px-0 py-0 space-y-1">
                <CardTitle className="lg:text-lg md:text-base text-[14px]">
                  {title}
                </CardTitle>
                <CardDescription className="text-[12px] lg:line-clamp-2 md:line-clamp-2 line-clamp-4">
                  {description}
                </CardDescription>
              </CardHeader>
              <CardFooter className=" px-0 pb-0 pt-1 flex justify-between items-center">
                <p className="text-lg font-bold text-black">${price}</p>
              </CardFooter>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </Card>
  );
}
