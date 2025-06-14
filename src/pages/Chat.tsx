

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Header from "@/Header"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  emotion?: "happy" | "sad" | "laugh" | "intelligent"
}

const suggestedPrompts = [
  { text: "Start DSA", icon: "🚀" },
  { text: "Explain Recursion", icon: "🔄" },
  { text: "Interview Tips", icon: "💼" },
  { text: "MERN Stack Guide", icon: "⚛️" },
]

const getEmotionFromMessage = (message: string): "happy" | "sad" | "laugh" | "intelligent" => {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("love advice") || lowerMessage.includes("bored") || lowerMessage.includes("funny")) {
    return "laugh"
  }
  if (
    lowerMessage.includes("system design") ||
    lowerMessage.includes("algorithm") ||
    lowerMessage.includes("complexity")
  ) {
    return "intelligent"
  }
  if (
    lowerMessage.includes("dsa") ||
    lowerMessage.includes("mern") ||
    lowerMessage.includes("interview") ||
    lowerMessage.includes("coding")
  ) {
    return "happy"
  }
  return "sad"
}

const getRohitResponse = (userMessage: string, emotion: string): string => {
  const lowerMessage = userMessage.toLowerCase()

  if (lowerMessage.includes("love advice")) {
    return "Are Bhaiya, coding padh rahe hain, horoscope nahi! 😂 DSA karo pehle, phir shaadi advice bhi de denge! Chamka?"
  }

  if (lowerMessage.includes("bored")) {
    return "Ek graph question de du? 😄 Boredom ka best cure hai - coding practice! Let's solve some problems together. Chamka?"
  }

  if (lowerMessage.includes("dsa") || lowerMessage.includes("start dsa")) {
    return "Perfect choice Bhaiya! DSA is the foundation of everything. Start with arrays and strings, then move to recursion. Consistency is key Bhaiya - daily practice karo! Chamka?"
  }

  if (lowerMessage.includes("recursion")) {
    return "Recursion ka matlab hai function khud ko call karta hai! Think of it like this - agar tumhe stairs climb karni hai, tum ek step lete ho, then same process repeat karte ho. Base case zaruri hai warna infinite loop! Chamka?"
  }

  if (lowerMessage.includes("interview")) {
    return "Interview mein confidence dikhao Bhaiya! Think out loud, avoid brute force approach, and explain your intro confidently. Tell them about your projects with passion. Ab feel aa rahi hai? 🔥 Chamka?"
  }

  if (lowerMessage.includes("mern")) {
    return "MERN stack is amazing! MongoDB for database, Express for backend, React for frontend, Node.js for runtime. Full-stack developer ban jaoge! Start with React basics, then backend integration. Chamka?"
  }

  if (
    !lowerMessage.includes("dsa") &&
    !lowerMessage.includes("coding") &&
    !lowerMessage.includes("interview") &&
    !lowerMessage.includes("mern") &&
    !lowerMessage.includes("web")
  ) {
    return "Yeh sab mat poochho Bhaiya, yeh coding ka mandir hai! 😅 Web dev seekhne aaye ho ya love guru banne? Let's focus on your coding journey. Chamka?"
  }

  return "Great question Bhaiya! Keep exploring and practicing. Consistency is key - daily thoda thoda karo, but regularly! Mujhe bhi pehle yahi lagta tha, but practice se sab clear ho jata hai. Chamka?"
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Namaste Bhaiya! 🙏 Main Rohit Negi hun - IIT Guwahati se, ex-Uber SDE, aur Coder Army ka founder! DSA, Web Dev, ya Interview prep mein help chahiye? Let's code together! Chamka?",
      isUser: false,
      timestamp: new Date(),
      emotion: "happy",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    setTimeout(() => {
      const emotion = getEmotionFromMessage(text)
      const response = getRohitResponse(text, emotion)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
        emotion,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputValue)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      <Header />

      <div className="container mx-auto px-4 py-6 max-w-6xl mt-20">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-160px)]">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-gray-800/80 border-purple-500/30 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg">
                    <AvatarFallback className="text-white font-bold">RN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-white">Rohit Bhaiya</h3>
                    <Badge className="text-xs bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/20">
                      Online
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm text-purple-200">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span>IIT Guwahati Alumni</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                    <span>Ex-Uber SDE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                    <span>Coder Army Founder</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/80 border-purple-500/30 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-3">
                <h3 className="font-semibold text-white">Quick Start</h3>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <div className="space-y-2">
                  {suggestedPrompts.map((prompt) => (
                    <Button
                      key={prompt.text}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSendMessage(prompt.text)}
                      className="w-full justify-start text-left hover:bg-purple-500/20 hover:text-white text-purple-200 border border-transparent hover:border-purple-500/30 transition-all duration-200"
                    >
                      <span className="mr-2">{prompt.icon}</span>
                      {prompt.text}
                    </Button>
                  ))}
                </div>

                <div className="border-t border-purple-500/20 pt-4">
                  <div className="text-center bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-lg p-3 border border-purple-500/20">
                    <Sparkles className="w-6 h-6 mx-auto mb-2 text-purple-300 animate-pulse" />
                    <p className="text-sm font-medium mb-1 text-white">Daily Motivation</p>
                    <p className="text-xs text-purple-200">"Consistency is key Bhaiya!"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col bg-gray-800/80 border-purple-500/30 backdrop-blur-sm shadow-2xl">
              {/* Chat Header */}
              <CardHeader className="border-b border-purple-500/20 bg-gray-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bot className="w-6 h-6 text-purple-400" />
                    <div>
                      <h2 className="font-semibold text-white">Chat with Rohit Bhaiya</h2>
                      <p className="text-sm text-purple-200">Ask anything about DSA, Web Dev, or Interviews</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/20">
                    Active
                  </Badge>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-800/30">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2`}
                  >
                    <div
                      className={`flex items-start gap-3 max-w-[80%] ${message.isUser ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <Avatar
                          className={`h-8 w-8 ${message.isUser ? "bg-purple-600" : "bg-gray-600/50 border border-purple-500/30"}`}
                        >
                          <AvatarFallback className="text-white text-xs font-medium">
                            {message.isUser ? <User className="w-4 h-4" /> : "RN"}
                          </AvatarFallback>
                        </Avatar>
                        {!message.isUser && <span className="text-xs text-purple-300 font-medium">Rohit Bhaiya</span>}
                      </div>

                      <Card
                        className={`${
                          message.isUser
                            ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white border-purple-400/50 shadow-lg"
                            : "bg-gray-700/80 border-purple-500/30 text-white shadow-lg"
                        } backdrop-blur-sm`}
                      >
                        <CardContent className="p-4">
                          <p className="text-sm leading-relaxed">{message.text}</p>
                          <p className={`text-xs mt-2 ${message.isUser ? "text-purple-200" : "text-gray-400"}`}>
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start animate-in slide-in-from-bottom-2">
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center gap-1">
                        <Avatar className="h-8 w-8 bg-gray-600/50 border border-purple-500/30">
                          <AvatarFallback className="text-white text-xs font-medium">RN</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-purple-300 font-medium">Rohit Bhaiya</span>
                      </div>
                      <Card className="bg-gray-700/80 border-purple-500/30 backdrop-blur-sm shadow-lg">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                              <div
                                className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-400">typing...</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              <Separator className="bg-gray-700/50" />

              {/* Input */}
              <CardContent className="p-6 bg-gray-800/50 border-t border-purple-500/20">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask Rohit Bhaiya about DSA, Web Dev, or Interview prep..."
                    className="flex-1 bg-gray-700/80 border-purple-500/30 text-white placeholder:text-purple-200 focus:border-purple-400 focus:ring-purple-400/50"
                    disabled={isTyping}
                  />
                  <Button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
                <p className="text-xs text-purple-300 mt-2 text-center">
                  Press Enter to send • Powered by Coder Army ❤️
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
