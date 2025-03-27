"use client"
import AnimateEachElement from "@/components/ui/custom/animations/AnimateEachElement"
import Image from "next/image"
import ImageProvider from "@/lib/hooks/ImageProvider"

interface Event {
    id: number;
    title: string;
    date: string;
    time: string;
    imageUrl: string;
}

const events: Event[] = [
    {
        id: 1,
        title: "Thrifty X Dosti Yaari",
        date: "Sep 29",
        time: "2PM",
        imageUrl: "/bread.jpg"
    },
    {
        id: 2,
        title: "Thrifty X Dosti Yaari",
        date: "Sep 29",
        time: "2PM",
        imageUrl: "/bread.jpg"
    },
    {
        id: 3,
        title: "Thrifty X Dosti Yaari",
        date: "Sep 29",
        time: "2PM",
        imageUrl: "/bread.jpg"
    },
    {
        id: 4,
        title: "Thrifty X Dosti Yaari",
        date: "Sep 29",
        time: "2PM",
        imageUrl: "/bread.jpg"
    },
    {
        id: 5,
        title: "Thrifty X Dosti Yaari",
        date: "Sep 29",
        time: "2PM",
        imageUrl: "/bread.jpg"
    },
    {
        id: 6,
        title: "Thrifty X Dosti Yaari",
        date: "Sep 29",
        time: "2PM",
        imageUrl: "/bread.jpg"
    },
];

export default function Announcements() {
    return (
            <div className="wrapper mx-auto mt-24 lg:mt-32 pb-8 ">
                <h1 className="text-2xl font-bold lg:block hidden md:block mb-6">Upcoming Events</h1>
                
                <div >
                    <AnimateEachElement className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 md:gap-5 gap-4">
                    {events.map((event) => (
                        <div key={event.id} className="relative border-[1.4px] border-gray-500 rounded-lg  group  overflow-hidden ">
                            <div className=" w-full lg:h-[300px] md:h-[200px] h-[22vw] overflow-hidden relative">
                                <Image
                                    src={ImageProvider()?.src || '/bread.jpg'}
                                    alt={event.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                            <div className=" pb-4 px-4 mt-3 space-y-1 ">
                                <h3 className="text-black text-md lg:text-xl truncate font-semibold">{event.title}</h3>
                                <p className="text-gray-600 lg:text-sm text-xs">
                                    {event.date} | {event.time}
                                </p>
                            </div>
                        </div>
                    ))}
                    </AnimateEachElement>
                </div>
            </div>
       
    )
}