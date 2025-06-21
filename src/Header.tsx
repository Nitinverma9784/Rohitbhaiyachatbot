
import { useState } from "react"
import {Link,useLocation} from "react-router-dom"

import { Menu, X, Code, Moon, Sun, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true) // Default to dark mode
  const pathname = useLocation().pathname

  const navigation = [
    { name: "Home", to: "/" },
    { name: "Chat", to: "/chat" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
  ]
  
  const isActive = (to: string) => pathname === to

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <div className="bg-gray-900/90 backdrop-blur-md border border-purple-500/30 rounded-2xl shadow-2xl">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo - Remove "Rohit Bhaiya Chatbot" text */}
            <Link to="/" className="flex items-center gap-3 font-bold text-xl group">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <Code className="w-5 h-5 text-white" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-purple-500/20 ${
                    isActive(item.to)
                      ? "bg-purple-500/20 text-purple-300 shadow-sm"
                      : "text-gray-300 hover:text-purple-300"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="text-gray-400 hover:text-purple-400 hover:bg-purple-500/20"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Link to="https://www.coderarmy.in/">
              
             
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Join Coder Army
              </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden hover:bg-purple-500/20 text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pt-4 border-t border-purple-500/20 mt-3">
              <nav className="flex flex-col gap-2 mb-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive(item.to)
                        ? "bg-purple-500/20 text-purple-300"
                        : "text-gray-300 hover:bg-purple-500/20 hover:text-purple-300"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-3 pt-3 border-t border-purple-500/20">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="text-gray-400 hover:text-purple-400 hover:bg-purple-500/20"
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Join Coder Army
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
