"use client"
import AnimateEachElement from "@/components/ui/custom/animations/AnimateEachElement"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"
import ImageProvider from "@/lib/hooks/ImageProvider"

export default function AboutUs() {
    return (
       
            <div className="wrapper mx-auto  mt-24 py-8 ">
                 <AnimateEachElement>
                {/* Hotel Image */}
                <div className="relative w-full lg:h-[400px] h-[300px] mb-6 rounded-lg overflow-hidden">
                    <Image
                        src={ImageProvider()?.src || '/default-image.jpg'}
                        alt="The Beverly Hills Hotel"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Hotel Title and Rating */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold mb-2">The Beverly Hills Hotel</h1>
                    <div className="flex items-center">
                        {[...Array(4)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-xl">★</span>
                        ))}
                        <span className="ml-2 text-pink-500">Add Review</span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>

                {/* Venue Information */}
                <div className="space-y-6">
                    <div>
                        <h2 className="font-semibold mb-2">Venue</h2>
                        <p className="text-gray-600">123 Beverly Hills Avenue, Manhattan City, New York, USA</p>
                    </div>

                    <div>
                        <h2 className="font-semibold mb-2">Contact Number</h2>
                        <p className="text-gray-600">+1 (234) 567-8900</p>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h2 className="font-semibold mb-2">Social Links</h2>
                        <div className="flex gap-4">
                            <Link href="#" className="text-blue-600 text-2xl">
                                <Facebook />
                            </Link>
                            <Link href="#" className="text-pink-600 text-2xl">
                                <Instagram />
                            </Link>
                        </div>
                    </div>

                    {/* Map */}
                    <div>
                        <h2 className="font-semibold mb-2">Location on Map</h2>
                        <div className="w-full h-[300px] rounded-lg overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=your-map-embed-url"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
                </AnimateEachElement>
            </div>
       
    )
}