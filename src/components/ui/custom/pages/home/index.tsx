// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, SearchIcon } from "lucide-react";
import BgTexture from "../../../../../../public/bg-stecture.svg";
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
import { getApi } from "@/api/apiService";
import { APIS } from "@/api/endpoints";
import Spinner from "@/components/common/spinner";

interface MenuItem {
  _id: string;
  name: string;
  image: string;
  category: string;
  description: string;
  price: number;
}

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Sandwiches");
  const [page] = useState<number>(0);
  const [limit] = useState<number>(10);
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getMenuData();
  }, []);

  const getMenuData = async () => {
    setLoading(true);
    try {
      const url = `${APIS.GET_MENU}?page=${page}&limit=${limit}`;
      const res = await getApi(url);
      const data = res?.data?.menu ?? [];
      setMenuData(data);
    } catch (error) {
      console.error("Fetch Menu Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const safeIsDesktop = typeof window !== "undefined" && isDesktop();
  const safeIsMobile = typeof window !== "undefined" && isMobile();

  return (
    <div className="bg-gray-50 min-h-[200vh]">
      {safeIsDesktop &&
        (loading ? (
          <div className="flex justify-center items-center h-screen">
            <Spinner />
          </div>
        ) : (
          <>
            {/* Top Search Bar */}
            <div className="bg-appColor relative min-h-[40vh] flex justify-center items-center pb-6">
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-appColor opacity-50">
                <Image
                  src={BgTexture}
                  alt="BgTexture"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative top-10 w-[40vw] mx-auto flex items-center">
                <div className="flex bg-white px-4 rounded-full items-center w-full h-full">
                  <SearchIcon className="w-5 h-5 text-gray-500" />
                  <input
                    type="search"
                    placeholder="Search menu"
                    className="w-full outline-none border-none rounded-full py-3 pl-4 pr-12"
                  />
                </div>
              </div>
            </div>

            {/* Categories */}
            <Separator className="w-full h-10 bg-gray-100" />
            <div className="w-full bg-gray-100">
              <div className="wrapper">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-3xl font-semibold">Popular Categories</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-white bg-appColor hover:bg-appColor/90 hover:text-white flex items-center gap-2"
                  >
                    Filter
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
                <Carousel
                  opts={{ align: "start", loop: true }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {menuData.map((item, index) => (
                      <CarouselItem
                        key={index}
                        className="md:basis-1/3 lg:basis-1/5"
                      >
                        <div className="flex flex-col w-full h-fit items-center">
                          <div className="w-[172px] h-[172px] flex justify-center items-center rounded-full bg-white shadow-sm p-2 mb-2 hover:shadow-md transition-shadow">
                            <Image
                              src={item.image}
                              alt={item.name}
                              className="w-[80%] rounded-full h-[80%] object-cover"
                              width={138}
                              height={138}
                            />
                          </div>
                          <span className="text-lg font-semibold text-gray-600">
                            {item.category}
                          </span>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden md:flex !text-3xl -left-8 bg-transparent !shadow-none" />
                  <CarouselNext className="hidden md:flex !text-3xl -right-8 bg-transparent !shadow-none" />
                </Carousel>
              </div>
            </div>
            <Separator className="w-full h-10 bg-gray-100" />
          </>
        ))}

      {/* Menu Section */}
      <div className="w-full lg:mt-0 md:mt-0 mt-16 bg-white">
        <div className="wrapper">
          <Separator className="w-full h-10 bg-white" />
          <h2 className="lg:text-3xl text-2xl font-bold lg:hidden md:hidden block mb-2">
            Make Your Selection!
          </h2>
          <h2 className="text-3xl font-bold hidden md:block mb-4">
            Recommended For You
          </h2>

          {/* Mobile Search + Filter */}
          {safeIsMobile && (
            <div className="w-full flex justify-between items-center gap-2">
              <div className="flex w-[85%] border-gray-200 border bg-white px-4 rounded-full items-center h-full">
                <SearchIcon className="w-5 h-5 text-gray-500" />
                <input
                  type="search"
                  placeholder="Search menu"
                  className="w-full bg-white outline-none border-none rounded-full py-3 pl-4 pr-12"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-appColor rounded-full px-0 py-0 w-10 h-10 flex items-center justify-center"
              >
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Category Tabs */}
          <Separator className="w-full h-5 bg-white" />
          <div className="lg:hidden md:hidden flex gap-6 overflow-x-auto border-b mb-6 no-scrollbar">
            {menuData.map((category, index) => (
              <div key={index} className="relative">
                <button
                  onClick={() => setActiveCategory(category.category)}
                  className={`pb-2 px-1 font-semibold text-sm whitespace-nowrap ${
                    activeCategory === category.category
                      ? "text-[#0a0a0a]"
                      : "text-gray-500"
                  }`}
                >
                  {category.category}
                  {activeCategory === category.category && (
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

          {/* Menu Items Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Spinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 md:gap-6 gap-4 lg:pb-24 pb-10">
              {menuData.map((item) => {
                return (
                  <CardOne
                    key={item._id}
                    image={item?.image}
                    title={item.name}
                    description={item.description}
                    price={item.price}
                    item={item}
                    loading={loading}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
