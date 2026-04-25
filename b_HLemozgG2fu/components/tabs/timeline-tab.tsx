"use client"

import { motion } from "framer-motion"
import { AnimatedPlanet } from "@/components/animated-planet"
import { milestones } from "@/lib/constants/timeline"

/**
 * 时间线页面主组件
 * 展示个人经历的时间线
 */
export function TimelineTab() {
  return (
    <div className="relative pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* 顶部标题 */}
        <HeaderSection />

        {/* 时间线主体 */}
        <TimelineBody />
      </div>
    </div>
  )
}

/**
 * 页面头部区域
 */
function HeaderSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col md:flex-row items-start md:items-end gap-8 mb-20"
    >
      <div className="flex-1">
        <p className="text-xs text-primary font-mono tracking-widest mb-4">
          JOURNEY · 一份非线性的年表
        </p>
        <h1 className="text-5xl md:text-6xl font-semibold leading-tight text-balance mb-4">
          时间没有方向
          <br />
          但<span className="text-primary">旅程</span>
          有重量
        </h1>
        <p className="text-muted-foreground max-w-lg leading-relaxed">
          地球online进度已接近1/4，玩家日志已保存soul文档
          <br />
          <motion.span
            className="text-amber-600"
            animate={{
              y: [0, -3, 0, -3, 0],
              opacity: [1, 0.8, 1, 0.8, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ——提醒：过度追逐主线进程，或将削弱冒险的完整体验。遍布世间的支线篇章，才是大世界探索的心跳和灵魂
          </motion.span>
        </p>
      </div>
      <div className="shrink-0 -mb-4">
        <AnimatedPlanet size={160} />
      </div>
    </motion.div>
  )
}

/**
 * 时间线主体
 */
function TimelineBody() {
  return (
    <div className="relative">
      {/* 中央竖线 */}
      <div
        className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.45 0.05 210 / 0.5) 10%, oklch(0.45 0.05 210 / 0.5) 90%, transparent)",
        }}
      />

      <div className="space-y-12">
        {milestones.map((milestone, index) => (
          <MilestoneItem
            key={milestone.year}
            milestone={milestone}
            index={index}
          />
        ))}
      </div>

      {/* 底部起点标记 */}
      <TimelineEndMarker />
    </div>
  )
}

/**
 * 单个里程碑条目
 */
function MilestoneItem({
  milestone,
  index,
}: {
  milestone: typeof milestones[0]
  index: number
}) {
  const isLeft = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* 时间线节点 */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-6 z-10">
        <motion.div
          className="w-4 h-4 rounded-full bg-primary"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: index * 0.3,
          }}
          style={{ boxShadow: "0 0 16px oklch(0.82 0.14 165 / 0.7)" }}
        />
      </div>

      {/* 内容卡片 */}
      <div
        className={`pl-16 md:pl-0 md:w-1/2 ${
          isLeft ? "md:pr-12" : "md:ml-auto md:pl-12"
        }`}
      >
        <motion.div whileHover={{ y: -4 }} className="glass-panel rounded-2xl p-7 group">
          <MilestoneContent milestone={milestone} />
        </motion.div>
      </div>
    </motion.div>
  )
}

/**
 * 里程碑内容
 */
function MilestoneContent({ milestone }: { milestone: typeof milestones[0] }) {
  return (
    <>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs text-primary font-mono tracking-wider">
          {milestone.year}
        </span>
        <div className="h-px flex-1 bg-border/40" />
      </div>

      <h3
        className="text-2xl font-semibold mb-1"
        dangerouslySetInnerHTML={{ __html: milestone.title }}
      />
      <p className="text-sm text-muted-foreground mb-5">
        {milestone.org}
      </p>

      <p className="text-sm leading-relaxed text-foreground/85 mb-5">
        {milestone.desc}
      </p>

      <MilestoneHighlights highlights={milestone.highlights} />

      <div className="flex flex-wrap gap-2">
        {milestone.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1 rounded-full bg-secondary/60 text-muted-foreground border border-border/40"
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  )
}

/**
 * 里程碑亮点列表
 */
function MilestoneHighlights({
  highlights,
}: {
  highlights: (string | { main: string; sub: string[] })[]
}) {
  return (
    <ul className="space-y-2 mb-6">
      {highlights.map((item, index) =>
        typeof item === "string" ? (
          <li key={index} className="flex gap-3 text-sm text-muted-foreground">
            <span className="text-primary mt-[2px] shrink-0">▸</span>
            <span>{item}</span>
          </li>
        ) : (
          <li key={index} className="flex gap-3 text-sm text-muted-foreground flex-col">
            <div className="flex gap-3">
              <span className="text-primary mt-[2px] shrink-0">▸</span>
              <span>{item.main}</span>
            </div>
            <ul className="ml-6 space-y-1 mt-1">
              {item.sub.map((subItem, subIndex) => (
                <li
                  key={subIndex}
                  className="flex gap-2 text-xs text-muted-foreground/70"
                >
                  <span className="text-primary/50 mt-[2px] shrink-0">•</span>
                  <span>{subItem}</span>
                </li>
              ))}
            </ul>
          </li>
        )
      )}
    </ul>
  )
}

/**
 * 时间线终点标记
 */
function TimelineEndMarker() {
  return (
    <div className="relative pt-12 text-center">
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0">
        <motion.div
          className="w-3 h-3 rounded-full border border-primary/60"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
      <p className="text-xs text-muted-foreground font-mono tracking-widest mt-4">
        · 起 · 点 ·
      </p>
    </div>
  )
}