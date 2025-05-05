"use client";
import AnimateEachElement from "@/components/ui/custom/animations/AnimateEachElement";
import Image from "next/image";
import ImageProvider from "@/lib/hooks/ImageProvider";
import { useEffect, useState } from "react";
import { getApi } from "@/api/apiService";
import { APIS } from "@/api/endpoints";
import moment from "moment";
import Spinner from "@/components/common/spinner";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  imageUrl: string;
}

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Event[]>();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    announcementsData();
  }, []);

  const announcementsData = async () => {
    setLoading(true);
    try {
      const url = `${APIS.GET_ANNOUNCEMENTS}?page=${page}&limit=${limit}`;
      const res = await getApi(url);
      setAnnouncements(res?.data?.announcements);
    } catch (error) {
      console.error({ error });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="wrapper mx-auto mt-24 lg:mt-32 pb-8 ">
      <h1 className="text-2xl font-bold lg:block hidden md:block mb-6">
        Upcoming Events
      </h1>

      <div>
        <AnimateEachElement className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 md:gap-5 gap-4">
          {announcements?.map((event) => (
            <div
              key={event.id}
              className="relative border-[1.4px] border-gray-500 rounded-lg  group  overflow-hidden "
            >
              <div className=" w-full lg:h-[300px] md:h-[200px] h-[22vw] overflow-hidden relative">
                <Image
                  src={event?.image || "/bread.jpg"}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className=" pb-4 px-4 mt-3 space-y-1 ">
                <h3 className="text-black text-md lg:text-xl truncate font-semibold">
                  {event.title}
                </h3>
                <p className="text-gray-600 lg:text-sm text-xs">
                  {moment(event?.date).format("YY-MMMM-DD")} |{" "}
                  {moment(event.time).format("h:mm A")}
                </p>
                {/* <p className="text-gray-600 lg:text-sm text-xs">
                  {moment(event?.date).format("YY-MMMM-DD")} |{" "}
                  {moment(event?.time).format("h:mm A")}
                </p> */}
              </div>
            </div>
          ))}
        </AnimateEachElement>
      </div>
    </div>
  );
}
