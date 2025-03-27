"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter, SearchIcon } from "lucide-react";
import BgTexture from "../../../../../../public/bg-stecture.svg";
import Burger from "../../../../../../public/bread.jpg";
import Image from "next/image";
import CardOne from "@/components/ui/custom/elements/cards/CardOne";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { isDesktop, isMobile } from "@/lib/hooks/Diamensions";
import { motion } from "framer-motion";
import { useState } from "react";

const App = () => {
  const [activeCategory, setActiveCategory] = useState("Sandwiches");

  return (
    <div className="bg-gray-50  min-h-[200vh]">
      {isDesktop() && (
        <>
          <div className="bg-appColor relative min-h-[40vh] flex justify-center items-center  pb-6">
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-appColor opacity-50">
              <Image
                src={BgTexture}
                alt="BgTexture"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative top-10  w-[40vw] mx-auto flex items-center">
              <div className="flex bg-white px-4 rounded-full  items-center w-full h-full">
                <SearchIcon className="w-5 h-5 text-gray-500" />
                <input
                  type="search"
                  placeholder="Search menu"
                  className="w-full  outline-none focus:ring-offset-0 border-none active:border-none focus:border-none active:outline-none out-of-range:active:outline-none active:ring-0 active:shadow-none focus:outline-none focus:ring-0  rounded-full  py-3 pl-4 pr-12"
                />
              </div>
            </div>
          </div>
          {/* Categories */}
          <Separator className="w-full h-10 bg-gray-100" />
          <div className=" w-full bg-gray-100 ">
            <div className=" wrapper ">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-semibold">Popular Categories</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-white text-md  bg-appColor hover:bg-appColor/90 hover:text-white flex items-center gap-2"
                >
                  Filter
                  <Filter className="w-4 h-4" />
                </Button>
              </div>

              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {[
                    { name: "Pizza", image: Burger },
                    { name: "Burger", image: Burger },
                    { name: "Sandwiches", image: Burger },
                    { name: "Ice cream", image: Burger },
                    { name: "Beverages", image: Burger },
                    { name: "Desserts", image: Burger },
                    { name: "Salads", image: Burger },
                    { name: "Pasta", image: Burger },
                  ].map((category) => (
                    <CarouselItem
                      key={category.name}
                      className=" md:basis-1/3 lg:basis-1/5"
                    >
                      <div className="flex flex-col w-w-full h-fit items-center">
                        <div className="w-[172px]  h-[172px] flex justify-center items-center rounded-full bg-white shadow-sm p-2 mb-2 hover:shadow-md transition-shadow">
                          <Image
                            src={category.image}
                            alt={category.name}
                            className="w-[80%] rounded-full h-[80%] object-cover"
                          />
                        </div>
                        <span className="text-lg font-semibold  text-gray-600">
                          {category.name}
                        </span>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex !text-3xl -left-8 bg-transparent !shadow-none  " />
                <CarouselNext className="hidden md:flex !text-3xl -right-8 bg-transparent !shadow-none  " />
              </Carousel>
            </div>
          </div>
          <Separator className="w-full h-10 bg-gray-100" />
        </>
      )}
      <div className=" w-full lg:mt-0 md:mt-0 mt-16 bg-white ">
        <div className=" wrapper">
          <Separator className="w-full h-10 bg-white " />
          <h2 className="lg:text-3xl text-2xl font-bold lg:hidden md:hidden block lg:mb-4 md:mb-4 mb-2">
            Make Your Selection!
          </h2>
          <h2 className="text-3xl font-bold lg:block md:block hidden mb-4">
            Recomended For You
          </h2>
          {isMobile() && (
            <>
              <div className=" w-full flex  justify-between items-center gap-2 ">
                <div className="flex w-[85%] border-gray-200 border bg-white px-4 rounded-full  items-center  h-full">
                  <SearchIcon className="w-5 h-5 text-gray-500" />
                  <input
                    type="search"
                    placeholder="Search menu"
                    className="w-full bg-white outline-none focus:ring-offset-0 border-none active:border-none focus:border-none active:outline-none out-of-range:active:outline-none active:ring-0 active:shadow-none focus:outline-none focus:ring-0  rounded-full  py-3 pl-4 pr-12"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-appColor rounded-full px-0 py-0 w-10 h-10  text-md    flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </>
          )}
          <Separator className="w-full h-5 bg-white " />
          <div className="lg:hidden md:hidden flex gap-6 overflow-x-auto border-b mb-6 no-scrollbar">
            {[
              "Sandwiches",
              "Burgers",
              "Appetizers",
              "Quesadillas",
              "Beverages",
            ].map((category) => (
              <div key={category} className="relative">
                <button
                  onClick={() => setActiveCategory(category)}
                  className={`pb-2 px-1 font-semibold duration-200   text-sm whitespace-nowrap ${
                    activeCategory === category
                      ? "text-[#0a0a0a] "
                      : "text-gray-500"
                  }`}
                >
                  {category}
                  {activeCategory === category && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-1 rounded-t-full bg-[#0a0a0a]"
                      initial={{ width: "100%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              </div>
            ))}
          </div>
          {/* Menu Items */}
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 md:gap-6 gap-4 lg:pb-24 pb-10">
            {Array.from({ length: 12 }).map((_, idx) => (
              <CardOne
                key={idx}
                image={Burger}
                title="Grilled Chicken Sandwich"
                description="A grilled or fried sandwich with a filling and melted cheese. A grilled or fried sandwich with a filling and double saucy flavour."
                price={20}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
