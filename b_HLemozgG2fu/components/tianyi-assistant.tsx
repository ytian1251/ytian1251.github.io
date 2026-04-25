"use client"

import { createContext, useContext, useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { sendMessage } from "@/lib/coze-api"

interface Message {
  role: string
  content: string
}

interface TianYiContextType {
  isOpen: boolean
  isHovered: boolean
  isClicked: boolean
  toggleChat: () => void
  messages: Message[]
  input: string
  setInput: (value: string) => void
  isTyping: boolean
  handleSend: () => void
  messagesEndRef: React.RefObject<HTMLDivElement | null>
  chatContainerRef: React.RefObject<HTMLDivElement | null>
  inputRef: React.RefObject<HTMLInputElement | null>
  setIsHovered: (value: boolean) => void
}

const TianYiContext = createContext<TianYiContextType | null>(null)

export function TianYiProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const handleSend = async () => {
    if (!input.trim() || isTyping) return

    const userMessage: Message = { role: "user", content: input.trim() }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      let assistantContent = ""
      setMessages((prev) => [...prev, { role: "assistant", content: "" }])

      await sendMessage([...messages, userMessage], (chunk: string) => {
        assistantContent += chunk
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: "assistant", content: assistantContent },
        ])
      })
    } catch (error: unknown) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", content: `抱歉，发生错误，请稍后重试` },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const toggleChat = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 600)
    setIsOpen(!isOpen)
  }

  return (
    <TianYiContext.Provider
      value={{
        isOpen,
        isHovered,
        isClicked,
        toggleChat,
        messages,
        input,
        setInput,
        isTyping,
        handleSend,
        messagesEndRef,
        chatContainerRef,
        inputRef,
        setIsHovered,
      }}
    >
      {children}
    </TianYiContext.Provider>
  )
}

export function useTianYi() {
  const context = useContext(TianYiContext)
  if (!context) {
    throw new Error("useTianYi must be used within a TianYiProvider")
  }
  return context
}

export function TianYiAvatar() {
  const { isOpen, toggleChat, setIsHovered } = useTianYi()

  return (
    <motion.button
      onClick={toggleChat}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="relative">
        {/* 旋转边框 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-primary/30"
        />
        
        {/* 头像容器 - 所有动效都在这里触发 */}
        <motion.div
          className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/50 shadow-lg shadow-primary/20 relative z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, y: 3 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src="/tianyi-avatar.png"
            alt="田一/Elio"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-5"
          whileTap={{ scale: 0.95, opacity: 0.6 }}
        />
      </div>
    </motion.button>
  )
}

export function TianYiChatPanel() {
  const { isOpen, toggleChat, messages, input, setInput, isTyping, handleSend, messagesEndRef, chatContainerRef, inputRef } = useTianYi()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          className="w-96 h-[570px] bg-background/98 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          style={{ pointerEvents: "auto" }}
        >
          <div className="flex items-center gap-5 p-5 border-b border-border bg-gradient-to-r from-primary/10 to-transparent">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30">
              <img
                src="/tianyi-avatar.png"
                alt="田一/Elio"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-sm">田一 <span className="text-muted-foreground font-normal">/ Elio</span></h3>
              <p className="text-[15px] text-muted-foreground">💬 Chat Model · 在线</p>
            </div>
            <button
              onClick={toggleChat}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-5 space-y-5">
            {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30 mx-auto mb-3">
                <img
                  src="/tianyi-avatar.png"
                  alt="田一/Elio"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm">hello，家里难得来人诶，聊会儿？</p>
            </div>
          )}

            {messages.map((msg: Message, idx: number) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-5 py-3 ${
                    msg.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted text-foreground rounded-tl-sm"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-xl rounded-tl-sm px-5 py-3">
                  <div className="flex gap-2">
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                      className="w-2.5 h-2.5 bg-muted-foreground rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0.15 }}
                      className="w-2.5 h-2.5 bg-muted-foreground rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }}
                      className="w-2.5 h-2.5 bg-muted-foreground rounded-full"
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-5 border-t border-border bg-background/50" style={{ pointerEvents: "auto" }}>
            <div className="flex gap-3" style={{ pointerEvents: "auto" }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="发送消息..."
                className="flex-1 bg-muted border-0 rounded-lg px-5 py-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                disabled={isTyping}
                style={{ pointerEvents: "auto" }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-primary text-primary-foreground rounded-lg px-5 py-3 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                style={{ pointerEvents: "auto" }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function TianYiAssistant() {
  return (
    <TianYiProvider>
      <TianYiAvatar />
      <TianYiChatPanel />
    </TianYiProvider>
  )
}