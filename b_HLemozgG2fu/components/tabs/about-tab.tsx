"use client"

import { motion } from "framer-motion"
import { AnimatedPlanet } from "@/components/animated-planet"
import { TianYiProvider, TianYiAvatar, TianYiChatPanel, useTianYi } from "@/components/tianyi-assistant"
import { profileTraits, ikigaiPillars, hobbies } from "@/lib/constants/profile"

/**
 * About页面主组件
 * 展示个人档案、IKIGAI四象限和兴趣爱好
 */
export function AboutTab() {
  return (
    <div className="relative">
      {/* Hero区域 */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-32 pb-32">
        <HeroSection />
      </section>

      {/* 详细介绍 */}
      <ProfileSection />

      {/* 爱好网格 */}
      <HobbiesSection />
    </div>
  )
}

/**
 * Hero区域组件
 */
function HeroSection() {
  return (
    <TianYiProvider>
      <HeroContent />
    </TianYiProvider>
  )
}

function HeroContent() {
  const { isHovered, isClicked } = useTianYi()
  
  return (
    <div className="relative w-full max-w-6xl mx-auto flex items-center justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative flex-shrink-0"
          style={{ left: "455px" }}
        >
          {/* 欢迎语 - 诱导用户点击 */}
          <motion.div
            className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: [0.6, 1, 0.6],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">🚀</span>
              <span className="text-sm font-medium text-foreground bg-background/60 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 shadow-sm">
                欢迎你旅行者，要和我聊聊吗？
              </span>
            </div>
          </motion.div>
          
          <AnimatedPlanet 
            size={260} 
            centerAvatar={<TianYiAvatar />} 
            isHovered={isHovered}
            isClicked={isClicked}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-shrink-0 ml-24"
        >
          <TianYiChatPanel />
        </motion.div>
      </div>
  )
}

/**
 * 个人档案和IKIGAI四象限区域
 */
function ProfileSection() {
  return (
    <section className="relative max-w-5xl mx-auto px-6 py-20">
      <div className="grid md:grid-cols-5 gap-8">
        {/* 左侧个人卡片 */}
        <ProfileCard />

        {/* 右侧四象限 */}
        <IkigaiQuadrant />
      </div>
    </section>
  )
}

/**
 * 个人档案卡片
 */
function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="md:col-span-2 glass-panel rounded-2xl p-8 space-y-6"
    >
      <div>
        <p className="text-xs text-muted-foreground font-mono tracking-widest mb-3">
          PROFILE
        </p>
        <h2 className="text-2xl font-semibold">档案</h2>
      </div>

      <div className="space-y-4">
        {profileTraits.map((trait, index) => (
          <motion.div
            key={trait.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * index }}
            className="flex items-start gap-4 py-3 border-b border-border/40 last:border-0"
          >
            <span className="text-xs text-muted-foreground font-mono w-10 shrink-0 mt-1">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <div className="text-xs text-muted-foreground mb-1">
                {trait.label}
              </div>
              <div className="text-sm font-medium text-left">{trait.value}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

/**
 * IKIGAI四象限
 */
function IkigaiQuadrant() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="md:col-span-3 space-y-4"
    >
      <div className="mb-6">
        <p className="text-xs text-muted-foreground font-mono tracking-widest mb-3">
          IKIGAI · 四象限
        </p>
        <h2 className="text-2xl font-semibold">我存在的意义</h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {ikigaiPillars.map((pillar) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="glass-panel-subtle rounded-2xl p-6 group cursor-default"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl text-primary group-hover:rotate-12 transition-transform duration-500 inline-block">
                {pillar.icon}
              </span>
              <h3 className="font-semibold">{pillar.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {pillar.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

/**
 * 兴趣爱好网格区域
 */
function HobbiesSection() {
  return (
    <section className="relative max-w-5xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="text-xs text-muted-foreground font-mono tracking-widest mb-3">
          HOBBIES · 生活切片
        </p>
        <h2 className="text-3xl font-semibold">不在工作时，我在……</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {hobbies.map((hobby, index) => (
          <HobbyCard key={hobby.label} hobby={hobby} index={index} />
        ))}
      </div>
    </section>
  )
}

/**
 * 单个爱好卡片
 */
function HobbyCard({ hobby, index }: { hobby: typeof hobbies[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.05 * index, type: "spring" }}
      whileHover={{ y: -6, rotate: -1 }}
      className="glass-panel-subtle rounded-2xl p-5 text-center cursor-default group"
    >
      <div className="text-4xl text-primary mb-3 inline-block group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
        {hobby.icon}
      </div>
      <div className="font-medium text-sm">{hobby.label}</div>
      <div className="text-xs text-muted-foreground mt-1">
        {hobby.sub}
      </div>
    </motion.div>
  )
}