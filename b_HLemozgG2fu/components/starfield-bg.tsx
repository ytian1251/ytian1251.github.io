"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

/**
 * 星空背景 - 散落的闪烁星点 + 大气光圈
 */
export function StarfieldBg() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // 只在客户端设置为true，确保随机生成的内容只在客户端渲染
    setIsClient(true)
  }, [])

  // 服务器端和客户端都返回相同的基础结构，避免 hydration mismatch
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* 基底深色渐变 - 这个部分在服务器端和客户端都渲染，结构相同 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, oklch(0.18 0.025 220) 0%, oklch(0.12 0.015 230) 50%, oklch(0.09 0.01 235) 100%)",
        }}
      />

      {/* 顶部大气光晕 - 这个部分在服务器端和客户端都渲染，结构相同 */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.5 0.15 180 / 0.25) 0%, transparent 70%)",
        }}
      />

      {/* 只在客户端渲染随机生成的星点和光环，避免 hydration mismatch */}
      {isClient && (
        <>
          {/* 星点 */}
          {Array.from({ length: 60 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 0.5,
            delay: Math.random() * 3,
            duration: 2 + Math.random() * 3,
          })).map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
              }}
              animate={{
                opacity: [0.2, 0.9, 0.2],
              }}
              transition={{
                duration: star.duration,
                delay: star.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* 小型装饰光环 */}
          {Array.from({ length: 8 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 6 + Math.random() * 10,
            delay: Math.random() * 2,
          })).map((ring) => (
            <motion.div
              key={`ring-${ring.id}`}
              className="absolute rounded-full"
              style={{
                left: `${ring.x}%`,
                top: `${ring.y}%`,
                width: ring.size,
                height: ring.size,
                border: "1px solid oklch(0.7 0.12 180 / 0.2)",
                boxShadow: "inset 0 0 6px oklch(0.6 0.15 170 / 0.3)",
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 5,
                delay: ring.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}
