'use client'
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"; // Use Shadcn's button
import { cn } from "@/lib/utils"; // Optional utility for className merging
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import LogoIcon from '@/utils/icons/logo.svg';
import { isDesktop, isMobile } from '@/lib/hooks/Diamensions';
import { Menu, Plus, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const currentPage = pathname.split('/')[1];
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Add these animation variants
    const menuVariants = {
        closed: {
            opacity: 0,
            height: 0
        },
        open: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.3,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.3,
                when: "afterChildren",
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    };

    // Add these sidebar animation variants
    const sidebarVariants = {
        closed: {
            x: "-100%",
            opacity: 0,
            transition: {
                duration: 0.3
            }
        },
        open: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.3,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        closed: {
            x: -20,
            opacity: 0
        },
        open: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <header className={cn(
            "w-full fixed top-0 z-50 bg-appColor left-0 transition-all duration-300",
            // {
            //     'bg-appColor': isScrolled,
            //     'bg-transparent': !isScrolled,
            // }
        )}>
            <div className=" wrapper  py-4">
                {
                    isDesktop() && (
                        <>
                            <div className="flex items-center justify-between h-16">
                                <Link className='' href="/">
                                    <Image src={LogoIcon} alt="Logo" width={80} className="  " height={80} />
                                </Link>
                                {/* Desktop Menu */}
                                <div className="hidden text-md font-semibold md:flex items-center space-x-6">
                                    {menues.map((menu, index) => (
                                        <Link
                                            key={index}
                                            href={menu.link}
                                            className={cn("transition-colors relative",
                                                {
                                                    'text-white hover:text-gray-900': isHomePage || isScrolled,
                                                    'text-white hover:text-white': !isHomePage && !isScrolled,
                                                }
                                            )}
                                        >
                                            <div className={cn("absolute inset-0  border-b-[1.5px] border-white   transition-all duration-300", {
                                                'w-0': pathname !== menu.link,
                                                'w-[110%]': pathname === menu.link,
                                            })}></div>
                                            {menu.title}
                                        </Link>
                                    ))}
                                    <button
                                        onClick={() => router.push("/my-cart")}
                                        className={cn("font-semibold p-2 bg-white rounded-lg text-appColor ",
                                        //      {
                                        //     'bg-opacity-90 hover:bg-transparent text-white !px-0 !py-0 hover:bg-opacity-100': !isScrolled,
                                        //     'bg-white text-appColor rounded-lg hover:bg-white ': pathname === "/my-cart"
                                        // }
                                    )}
                                    >
                                        <ShoppingCart className="!w-6  !h-6" />
                                    </button>
                                </div>

                                {/* Mobile Menu Button */}
                                <div className="flex md:hidden">
                                    <button
                                        onClick={toggleMenu}
                                        className={cn("hover:text-gray-700 focus:outline-none", {
                                            'text-gray-500': isHomePage || isScrolled,
                                            'text-white': !isHomePage && !isScrolled,
                                        })}
                                    >
                                        {menuOpen ? (
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 6h16M4 12h16m-7 6h7"
                                                />
                                            </svg>
                                        )}
                                    </button>


                                </div>
                            </div>
                        </>
                    )

                }

                {
                    isMobile() && (
                        <>
                            <div className="flex items-center   bg-appColor justify-between h-12">
                                <div className="flex   ">
                                    <button
                                        onClick={toggleMenu}
                                        className={cn("hover:text-gray-700 focus:outline-none", {
                                            'text-gray-500': isHomePage || isScrolled,
                                            'text-white': !isHomePage && !isScrolled,
                                        })}
                                    >
                                        {menuOpen ? (
                                            <Plus className="w-6 text-white rotate-45 h-6" />
                                        ) : (
                                            <Menu className="w-6 text-white h-6" />
                                        )}
                                    </button>
                                </div>
                                <Link className='' href="/">
                                    <Image src={LogoIcon} alt="Logo" width={60} className="  " height={60} />
                                </Link>

                                <button
                                      onClick={() => router.push("/my-cart")}
                                    className={cn("font-semibold", {
                                        'bg-opacity-90 hover:bg-transparent px-0 py-0 hover:bg-opacity-100': !isScrolled
                                    })}
                                >
                                    <ShoppingCart className="!w-6 text-white !h-6" />
                                </button>
                            </div>
                        </>
                    )
                }
            </div>

            {/* Replace the existing mobile menu with this new sidebar */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black z-40"
                            onClick={() => setMenuOpen(false)}
                        />
                        
                        {/* Sidebar */}
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={sidebarVariants}
                            className="fixed left-0 top-0 h-full w-64 bg-appColor z-50"
                        >
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-8">
                                    <Image src={LogoIcon} alt="Logo" width={60} height={60} />
                                    <button
                                        onClick={() => setMenuOpen(false)}
                                        className="text-white"
                                    >
                                        <Plus className="w-6 h-6 rotate-45" />
                                    </button>
                                </div>

                                <nav className="flex flex-col space-y-6">
                                    {menues.map((menu, index) => (
                                        <motion.div
                                            key={menu.link}
                                            variants={itemVariants}
                                        >
                                            <Link
                                                href={menu.link}
                                                className="text-white text-lg font-semibold"
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                {menu.title}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;

const menues = [
    {
        title: "Home",
        link: "/"
    },
    {
        title: "About",
        link: "/about-us"
    },
    {
        title: "Announcements",
        link: "/announcements"
    },
    {
        title: "My Orders",
        link: "/my-orders"
    },
]