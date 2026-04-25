"use client"

import { motion } from "framer-motion"
import { AnimatedPlanet } from "@/components/animated-planet"

/**
 * Works页面主组件
 * 展示作品集（当前为空状态）
 */
export function WorksTab() {
  return (
    <div className="relative pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* 页面头部 */}
        <HeaderSection />

        {/* 空状态提示 */}
        <EmptyState />

        {/* 联系区域 */}
        <ContactSection />
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
      className="flex flex-col md:flex-row items-start md:items-end gap-8 mb-14"
    >
      <div className="flex-1">
        <p className="text-xs text-primary font-mono tracking-widest mb-4">
          WORKS · 试着把想法变成真的
        </p>
        <h1 className="text-5xl md:text-6xl font-semibold leading-tight text-balance mb-4">
          学了好久中文，<br />
          现在学学<span className="text-primary">C语言</span>
        </h1>
        <p className="text-muted-foreground max-w-lg leading-relaxed">
          不是专业的程序员，只是喜欢把脑子里的想法变成看得见的东西。边学边做，边做边改，欢迎来到我的小小心得集。
        </p>
      </div>
      <div className="shrink-0">
        <AnimatedPlanet size={140} />
      </div>
    </motion.div>
  )
}

/**
 * 空状态提示
 */
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-panel-subtle rounded-2xl px-7 py-12 text-center"
    >
      <p className="text-4xl mb-4 opacity-40">◌</p>
      <p className="text-lg text-muted-foreground mb-2">
        还在酝酿中，作品即将上线
      </p>
      <p className="text-sm text-muted-foreground/70">
        学到有意思的东西会慢慢放上来
      </p>
    </motion.div>
  )
}

/**
 * 联系区域
 */
function ContactSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-16 glass-panel rounded-3xl p-8 md:p-10 text-center relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.6 0.15 180 / 0.25), transparent 60%)",
        }}
      />
      <div className="relative">
        <p className="text-xs text-primary font-mono tracking-widest mb-4">
          LET&apos;S TALK
        </p>
        <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-balance">
          有想一起折腾的事？来找我聊聊。
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-7 text-sm leading-relaxed">
          挣钱的、好玩的、或者缺人聊天散步吃火锅都可以，快乐小狗永远在路上。
        </p>
        <div className="flex flex-col items-center gap-4">
          <a
            href="mailto:ytian1251@gmail.com"
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:scale-105 transition-transform inline-flex items-center gap-2"
          >
            <span>✉</span> ytian1251@gmail.com
          </a>
          <p className="text-xs text-muted-foreground">
            点击上方邮箱地址即可发邮件给我
          </p>
        </div>
      </div>
    </motion.div>
  )
}