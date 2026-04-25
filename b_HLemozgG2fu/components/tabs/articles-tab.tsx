"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { AnimatedPlanet } from "@/components/animated-planet"
import { articles, articleCategories, type Article } from "@/lib/constants/articles"

/**
 * 文章页面主组件
 * 展示文章列表，支持分类筛选
 */
export function ArticlesTab() {
  const [activeCategory, setActiveCategory] = useState("全部")
  const featured = articles.find((article) => article.featured)
  const filtered =
    activeCategory === "全部"
      ? articles.filter((article) => !article.featured)
      : articles.filter(
          (article) => article.category === activeCategory && !article.featured
        )

  return (
    <div className="max-w-5xl mx-auto">
      {/* 顶部装饰 */}
      <HeaderDecoration />

      {/* 精选文章 */}
      {featured && (
        <FeaturedArticle article={featured} onCategoryClick={setActiveCategory} />
      )}

      {/* 分类筛选 */}
      <CategoryFilter
        categories={articleCategories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* 文章网格 */}
      <div className="grid md:grid-cols-2 gap-5">
        {filtered.map((article, index) => (
          <ArticleCard key={article.id} article={article} index={index} />
        ))}
      </div>
    </div>
  )
}

/**
 * 页面顶部装饰元素
 */
function HeaderDecoration() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <AnimatedPlanet size={180} />
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, oklch(0.7 0.15 180 / 0.4), transparent 70%)",
          pointerEvents: "none",
        }}
      />
    </motion.div>
  )
}

/**
 * 精选文章卡片
 */
function FeaturedArticle({
  article,
  onCategoryClick,
}: {
  article: Article
  onCategoryClick: (category: string) => void
}) {
  const handlePDFOpen = (e: React.MouseEvent) => {
    e.preventDefault()
    window.open("/Graduation_Thesis.pdf", "_blank", "noopener,noreferrer")
  }
  
  return (
    <motion.a
      href={article.href || "#"}
      target={article.href ? "_blank" : "_self"}
      rel={article.href ? "noopener noreferrer" : ""}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      whileHover={{ y: -4 }}
      className="glass-panel-subtle rounded-2xl p-8 mb-12 group block cursor-pointer relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background:
            "radial-gradient(circle, oklch(0.7 0.15 180 / 0.4), transparent 70%)",
        }}
      />

      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs text-primary font-mono tracking-widest">
            ✦ FEATURED
          </span>
          <div className="h-px flex-1 bg-border/40 max-w-24" />
          <button
            onClick={() => onCategoryClick("学术历程")}
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            学术历程
          </button>
        </div>

        <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-5 text-balance group-hover:text-primary transition-colors">
          {article.title}
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mb-6">
          {article.excerpt}
        </p>

        <div className="mb-8">
          <button
            onClick={handlePDFOpen}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors cursor-pointer"
          >
            <span>📄</span>
            <span>查看 PDF 文档</span>
            <span className="inline-block group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>

        <div className="flex items-center gap-5 text-sm text-muted-foreground">
          <span>{article.date}</span>
          <span>·</span>
          <span>{article.readTime}</span>
          <span className="ml-auto text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
            阅读
            <span className="group-hover:translate-x-1 transition-transform inline-block">
              →
            </span>
          </span>
        </div>
      </div>
    </motion.a>
  )
}

/**
 * 分类筛选按钮组
 */
function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: {
  categories: readonly string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-wrap gap-2 mb-8"
    >
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 text-sm rounded-full transition-all ${
            activeCategory === category
              ? "glass-panel text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {category}
        </button>
      ))}
    </motion.div>
  )
}

/**
 * 单个文章卡片
 */
function ArticleCard({ article, index }: { article: Article; index: number }) {
  const handleLinkClick = (e: React.MouseEvent) => {
    if (article.href?.endsWith(".pdf")) {
      e.preventDefault()
      window.open(article.href, "_blank", "noopener,noreferrer")
    }
  }
  
  return (
    <motion.a
      href={article.href || "#"}
      target={article.href ? "_blank" : "_self"}
      rel={article.href ? "noopener noreferrer" : ""}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="glass-panel-subtle rounded-2xl p-7 group block cursor-pointer"
      onClick={handleLinkClick}
    >
      <ArticleCardHeader article={article} />
      <h3 className="text-xl font-semibold mb-3 leading-snug text-balance group-hover:text-primary transition-colors">
        {article.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-2">
        {article.excerpt}
      </p>
      <ArticleCardFooter readTime={article.readTime} />
    </motion.a>
  )
}

/**
 * 文章卡片头部（分类标签和时间）
 */
function ArticleCardHeader({ article }: { article: Article }) {
  const [activeCategory, setActiveCategory] = useState("全部")

  return (
    <div className="flex items-center gap-3 mb-4">
      <button
        onClick={(e) => {
          e.preventDefault()
          setActiveCategory(article.category)
        }}
        className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
      >
        {article.category}
      </button>
      <span className="text-xs text-muted-foreground ml-auto">
        {article.date}
      </span>
    </div>
  )
}

/**
 * 文章卡片底部（阅读时间和展开提示）
 */
function ArticleCardFooter({ readTime }: { readTime: string }) {
  return (
    <div className="flex items-center justify-between text-xs text-muted-foreground">
      <span>{readTime}</span>
      <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
        展开
        <span className="group-hover:translate-x-1 transition-transform inline-block">
          →
        </span>
      </span>
    </div>
  )
}