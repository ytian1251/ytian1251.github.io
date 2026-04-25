"use client"

import { motion } from "framer-motion"

export type TabId = "about" | "timeline" | "articles" | "works"

interface TopNavProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

const tabs: { id: TabId; label: string; en: string }[] = [
  { id: "about", label: "关于我", en: "About" },
  { id: "timeline", label: "我的时间旅程", en: "Timeline" },
  { id: "articles", label: "我的文章", en: "Articles" },
  { id: "works", label: "我的作品", en: "Works" },
]

export function TopNav({ activeTab, onTabChange }: TopNavProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-6 pt-5"
    >
      <nav className="glass-panel rounded-full px-3 py-2 flex items-center justify-between gap-2 max-w-full overflow-visible">
        {/* 品牌标识 - 左侧 */}
        <div className="flex items-center gap-2 pl-3 pr-2 shrink-0">
          <motion.div
            className="w-6 h-6 rounded-full relative"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.85 0.15 165), oklch(0.7 0.12 210))",
              boxShadow: "0 0 8px oklch(0.6 0.14 170 / 0.5), inset 0 2px 4px oklch(1 0 0 / 0.1)",
            }}
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -3, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <span className="text-sm font-medium tracking-wide whitespace-nowrap">
            田一
          </span>
        </div>

        {/* Tab按钮 - 右侧 */}
        <div className="flex items-center gap-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative px-3 py-1.5 text-sm rounded-full transition-colors whitespace-nowrap flex flex-col items-center justify-center gap-0.5 ${
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-tab-bg"
                    className="absolute inset-0 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 font-medium leading-tight">{tab.label}</span>
                <span className="relative z-10 text-xs opacity-70 font-light leading-none">{tab.en}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </motion.header>
  )
}
