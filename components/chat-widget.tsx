"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, X, Bot, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

type Message = {
  role: "user" | "assistant"
  content: string
}

const EXAMPLE_QUESTIONS = [
  "How do I sell my software license?",
  "What types of licenses do you buy?",
  "How much is my license worth?",
  "How long does the process take?",
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hi there! How can I help you with selling your software licenses today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [messages, isOpen])

  const handleSend = async () => {
    if (input.trim() === "") return

    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Using AI SDK to generate a response
      const { text } = await generateText({
        model: openai("gpt-3.5-turbo"),
        prompt: `You are a helpful assistant for SoftSell, a company that helps businesses sell their unused software licenses. 
        The user asked: ${input}
        Provide a helpful, friendly response about selling software licenses. Keep it concise (max 3 sentences).`,
      })

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: text,
        },
      ])
    } catch (error) {
      console.error("Error generating response:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I'm having trouble connecting right now. Please try again later or contact our support team directly.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleExampleClick = (question: string) => {
    setInput(question)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 z-50 w-80 sm:right-6 sm:w-96 md:right-8"
          >
            <Card className="flex h-96 flex-col overflow-hidden border shadow-lg">
              <div className="flex items-center justify-between border-b bg-primary p-3">
                <div className="flex items-center gap-2 text-primary-foreground">
                  <Bot size={20} />
                  <span className="font-medium">SoftSell Assistant</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 rounded-full text-primary-foreground hover:bg-primary/80"
                >
                  <X size={18} />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-3">
                {messages.map((message, index) => (
                  <div key={index} className={`mb-3 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`flex max-w-[80%] items-start gap-2 rounded-lg px-3 py-2 ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                      }`}
                    >
                      {message.role === "assistant" && <Bot size={16} className="mt-1 flex-shrink-0" />}
                      <p className="text-sm">{message.content}</p>
                      {message.role === "user" && <User size={16} className="mt-1 flex-shrink-0" />}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="mb-3 flex justify-start">
                    <div className="flex max-w-[80%] items-center gap-2 rounded-lg bg-muted px-3 py-2">
                      <Bot size={16} />
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-foreground/50"></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-foreground/50"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-foreground/50"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {messages.length === 1 && (
                <div className="grid grid-cols-2 gap-2 p-3">
                  {EXAMPLE_QUESTIONS.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="h-auto justify-start p-2 text-left text-xs"
                      onClick={() => handleExampleClick(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              )}

              <div className="border-t p-3">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSend()
                      }
                    }}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={input.trim() === "" || isLoading}
                    size="icon"
                    className="h-10 w-10"
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-4 right-4 z-50 sm:right-6 md:right-8"
      >
        <Button onClick={() => setIsOpen(!isOpen)} size="icon" className="h-12 w-12 rounded-full shadow-lg">
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </Button>
      </motion.div>
    </>
  )
}
