'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

interface AnimatedNumberProps {
  value: number
  suffix?: string
  duration?: number
}

export function AnimatedNumber({ value, suffix = '', duration = 2 }: AnimatedNumberProps) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, latest => Math.round(latest))

  useEffect(() => {
    const animation = animate(count, value, { duration })
    return animation.stop
  }, [count, value, duration]) // Added duration to dependencies

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  )
}
