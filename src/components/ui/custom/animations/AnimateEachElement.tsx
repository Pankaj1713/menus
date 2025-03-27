"use client"
import React from 'react'
import { motion } from 'framer-motion'

interface AnimateEachChildProps {
  children: React.ReactNode
  delay?: number // optional delay between each child
  duration?: number // optional animation duration
  className?: string
}

export default function AnimateEachChild({ 
  children, 
  delay = 0.15, // default delay
  duration = 0.5, // default duration
  className
}: AnimateEachChildProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
      },
    },
  }

  const childVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        ease: "easeOut"
      }
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={childVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
