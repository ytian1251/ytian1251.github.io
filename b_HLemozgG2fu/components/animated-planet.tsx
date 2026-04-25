"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AnimatedPlanetProps {
  size?: number
  className?: string
  centerAvatar?: React.ReactNode
  isHovered?: boolean
  isClicked?: boolean
}

/**
 * 持续动态的星球 —— 呼吸 + 漂移 + 表面流转 + 大气层脉冲
 * 灵感来自原始设计中的蓝绿渐变球体
 */
export function AnimatedPlanet({ size = 420, className = "", centerAvatar, isHovered = false, isClicked = false }: AnimatedPlanetProps) {
  const [clickKey, setClickKey] = useState(0)

  // 监听 isClicked 变化，更新 clickKey
  useEffect(() => {
    if (isClicked) {
      setClickKey(prev => prev + 1)
    }
  }, [isClicked])

  return (
    <div
      className={`pointer-events-none relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* 外层柔光大气 - 同步脉动 */}
      <motion.div
        className="absolute inset-[-30%]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.6 0.15 180 / 0.12) 0%, oklch(0.55 0.15 170 / 0.06) 40%, transparent 70%)",
        }}
        animate={{
          scale: isHovered ? [1.02, 1.08, 1.02] : [1, 1.03, 1],
          opacity: isHovered ? [0.15, 0.25, 0.15] : [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 中层大气层 - 同步脉动 */}
      <motion.div
        className="absolute inset-[-10%] rounded-full planet-atmosphere"
        animate={{
          scale: isHovered ? [1.01, 1.05, 1.01] : [0.98, 1.02, 0.98],
          opacity: isHovered ? [0.2, 0.3, 0.2] : [0.15, 0.2, 0.15],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 交互提示电波 - 从左侧发射 */}
      <ElectricWaves isHovered={isHovered} />

      {/* 呼吸 + 漂移 容器 */}
      <motion.div
        className="relative w-full h-full"
        animate={{
          scale: isHovered ? [1.03, 1.07, 1.03] : [0.98, 1.02, 0.98],
          x: [0, 8, -4, -6, 0],
          y: [0, -6, -10, 4, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          scale: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        {/* 星球核心 */}
        <div className="absolute inset-0 rounded-full planet-core overflow-hidden">
          {/* 微小高光点 - 呼吸闪烁 */}
          <motion.div
            className="absolute w-1.5 h-1.5 rounded-full bg-white/70"
            style={{ top: "32%", left: "48%" }}
            animate={{ opacity: isHovered ? [0.5, 1, 0.5] : [0.4, 0.9, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-1 h-1 rounded-full bg-white/60"
            style={{ top: "62%", left: "40%" }}
            animate={{ opacity: isHovered ? [0.4, 0.9, 0.4] : [0.3, 0.8, 0.3] }}
            transition={{ duration: 6, delay: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-1 h-1 rounded-full bg-white/50"
            style={{ top: "45%", left: "68%" }}
            animate={{ opacity: isHovered ? [0.4, 0.8, 0.4] : [0.3, 0.7, 0.3] }}
            transition={{ duration: 7, delay: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* 轨道边缘光圈 - hover强化 */}
        <motion.div
          className="absolute inset-[-2%] rounded-full"
          animate={{
            borderColor: isHovered ? "oklch(0.7 0.12 180 / 0.4)" : "oklch(0.7 0.12 180 / 0.2)",
            boxShadow: isHovered 
              ? "0 0 60px oklch(0.6 0.15 170 / 0.4)" 
              : "0 0 40px oklch(0.6 0.15 170 / 0.25)",
          }}
          style={{
            border: "1px solid",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* 微小光点卫星 - 缓慢公转 */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          style={{ marginLeft: -2, marginTop: -2 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="absolute"
            style={{
              left: size * 0.65,
              top: 0,
              width: 4,
              height: 4,
              borderRadius: 999,
              background: "oklch(0.75 0.13 170)",
              boxShadow: "0 0 8px oklch(0.75 0.13 170 / 0.7)",
            }}
          />
        </motion.div>

        {/* 小型轨道点 */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-primary/70"
          style={{ marginLeft: -4, marginTop: -4 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="absolute"
            style={{
              left: size * 0.55,
              top: 0,
              width: 6,
              height: 6,
              borderRadius: 999,
              background: "oklch(0.82 0.14 165)",
              boxShadow: "0 0 12px oklch(0.82 0.14 165 / 0.8)",
            }}
          />
        </motion.div>

        {/* 持续环绕跃动波纹 - 引导点击 */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          border: "2px solid oklch(0.7 0.12 180 / 0.5)",
          boxShadow: "0 0 20px oklch(0.6 0.15 170 / 0.3)",
        }}
        animate={{
          scale: [1, 1.35, 1.7],
          opacity: [0.8, 0.4, 0],
        }}
        transition={{
          duration: isHovered ? 1.5 : 2.5,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
      
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          border: "1px solid oklch(0.7 0.12 180 / 0.4)",
          boxShadow: "0 0 15px oklch(0.6 0.15 170 / 0.25)",
        }}
        animate={{
          scale: [1, 1.25, 1.55],
          opacity: [0.6, 0.3, 0],
        }}
        transition={{
          duration: isHovered ? 1.5 : 2.5,
          repeat: Infinity,
          ease: "easeOut",
          delay: isHovered ? 0.4 : 0.8,
        }}
      />

      {/* 点击反馈波纹 */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            key={clickKey}
            className="absolute inset-0 rounded-full"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              border: "3px solid oklch(0.7 0.12 180 / 0.8)",
              boxShadow: "0 0 40px oklch(0.6 0.15 170 / 0.6)",
            }}
          />
        )}
      </AnimatePresence>

        {/* 中心头像 - 位于星球正中心，z-index最高 */}
        {centerAvatar && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-20">
            {centerAvatar}
          </div>
        )}
      </motion.div>
    </div>
  )
}

/**
 * 交互提示电波组件
 */
function ElectricWaves({ isHovered }: { isHovered: boolean }) {
  const waveCount = 3

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: waveCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-0 top-1/2"
          style={{ 
            marginTop: -1,
            width: "50%",
            transformOrigin: "right center",
          }}
          animate={{
            scaleX: [0.3, 1.2],
            opacity: [0, isHovered ? 0.3 : 0.15, 0],
          }}
          transition={{
            duration: isHovered ? 1.5 : 2.5,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * (isHovered ? 0.5 : 0.8),
          }}
        >
          {/* 主电波线条 */}
          <div
            className="w-full h-0.5"
            style={{
              background: "linear-gradient(to right, transparent, oklch(0.7 0.12 180 / 0.3), oklch(0.7 0.12 180 / 0.6), oklch(0.7 0.12 180 / 0.3), transparent)",
            }}
          />
          {/* 电波小点 */}
          <motion.div
            className="absolute"
            style={{
              right: "10%",
              top: -2,
              width: 4,
              height: 4,
              borderRadius: 999,
              background: "oklch(0.75 0.13 170 / 0.5)",
              boxShadow: "0 0 6px oklch(0.75 0.13 170 / 0.4)",
            }}
          />
        </motion.div>
      ))}

      {/* 次要电波 - 稍微靠下 */}
      {Array.from({ length: waveCount }).map((_, i) => (
        <motion.div
          key={`secondary-${i}`}
          className="absolute left-0 top-1/2"
          style={{ 
            marginTop: 10,
            width: "40%",
            transformOrigin: "right center",
          }}
          animate={{
            scaleX: [0.2, 1],
            opacity: [0, isHovered ? 0.2 : 0.1, 0],
          }}
          transition={{
            duration: isHovered ? 1.8 : 3,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * (isHovered ? 0.6 : 1) + 0.3,
          }}
        >
          <div
            className="w-full h-0.5"
            style={{
              background: "linear-gradient(to right, transparent, oklch(0.6 0.15 170 / 0.2), oklch(0.6 0.15 170 / 0.4), oklch(0.6 0.15 170 / 0.2), transparent)",
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

/**
 * 漂浮装饰环 - 散布在页面各处的小型装饰
 */
export function OrbitRing({
  delay = 0,
  size = 40,
  className = "",
}: {
  delay?: number
  size?: number
  className?: string
}) {
  return (
    <motion.div
      className={`pointer-events-none rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        border: "1px solid oklch(0.7 0.12 180 / 0.25)",
        boxShadow:
          "inset 0 0 12px oklch(0.6 0.15 170 / 0.2), 0 0 16px oklch(0.6 0.15 170 / 0.15)",
      }}
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.4, 0.8, 0.4],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}