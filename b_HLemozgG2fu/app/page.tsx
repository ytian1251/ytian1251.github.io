
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TopNav, type TabId } from "@/components/top-nav";
import { StarfieldBg } from "@/components/starfield-bg";
import { AboutTab } from "@/components/tabs/about-tab";
import { TimelineTab } from "@/components/tabs/timeline-tab";
import { ArticlesTab } from "@/components/tabs/articles-tab";
import { WorksTab } from "@/components/tabs/works-tab";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("about");

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderTab = () => {
    switch (activeTab) {
      case "about":
        return <AboutTab />;
      case "timeline":
        return <TimelineTab />;
      case "articles":
        return <ArticlesTab />;
      case "works":
        return <WorksTab />;
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <StarfieldBg />

      <TopNav activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className="relative z-10 border-t border-border/30 py-8 px-6 text-center text-xs text-muted-foreground">
        <p className="font-mono tracking-wider">
          © {new Date().getFullYear()} 田一 · Eilio · 一个在字节间偷偷生长的时间旅行本
        </p>
      </footer>
    </main>
  );
}

