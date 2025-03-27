'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

type StatusType = 'success' | 'pending' | 'failed'
import Image from 'next/image'
export default function PaymentStatus() {
    // For demo purposes, you can change this to test different states
    const [status] = useState<StatusType>('success')

    const statusConfig = {
        success: {
            icon: '✓',
            title: 'Thank You!',
            message: 'Your order is placed Successfully',
            buttonText: 'Back Home',
            color: '#C8326C'
        },
        pending: {
            icon: '⏳',
            title: 'Processing',
            message: 'Your payment is being processed',
            buttonText: 'Refresh Status',
            color: '#F5A623'
        },
        failed: {
            icon: '✕',
            title: 'Payment Failed',
            message: 'Something went wrong with your payment',
            buttonText: 'Try Again',
            color: '#D0021B'
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
            {/* Background Pattern */}
            <div className="absolute top-0   left-0 right-0 h-[40vh] "
                style={{
                    backgroundImage: `url("/pattern.svg")`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "repeat",
                }}
            >
                <div className="w-full h-full bg-gradient-to-b from-transparent to-white"></div>
            </div>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center z-10"
            >
                <div
                    className="w-20 card_shadow_2 h-20 rounded-full flex items-center justify-center text-white text-2xl mb-6"
                    style={{ backgroundColor: statusConfig[status].color }}
                >
                    {statusConfig[status].icon}
                </div>
                <h1 className="text-2xl font-semibold mb-2" style={{ color: statusConfig[status].color }}>
                    {statusConfig[status].title}
                </h1>
                <p className="text-gray-600 mb-8" style={{ color: statusConfig[status].color }}>
                    {statusConfig[status].message}
                </p>
                <Link
                    href="/"
                    className="w-full max-w-xs px-6 py-3 rounded-full text-white text-center font-medium transition-transform hover:scale-105"
                    style={{ backgroundColor: statusConfig[status].color }}
                >
                    {statusConfig[status].buttonText}   
                </Link>
            </motion.div>
        </div>
    )
}