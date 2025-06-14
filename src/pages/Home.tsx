import { ArrowRight, Code, Heart, Users, Zap, Star, BookOpen } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import Header from "../Header"
import {Link} from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const features = [
    {
      icon: <Code className="w-8 h-8 text-purple-400" />,
      title: "Hinglish Support",
      description: "Learn in a language you understand - perfect mix of Hindi and English for Indian students.",
    },
    {
      icon: <Heart className="w-8 h-8 text-pink-400" />,
      title: "Motivational Guidance",
      description: "Get inspired with Rohit Bhaiya's signature motivational style and encouraging words.",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-400" />,
      title: "Personalized Learning",
      description: "Tailored responses based on your skill level and learning goals in DSA and Web Dev.",
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Expressive Reactions",
      description: "Experience emotionally intelligent responses with 4 different reaction modes.",
    },
  ]

  const achievements = [
    { icon: "🎓", label: "IIT Guwahati", value: "Alumni" },
    { icon: "🚗", label: "Ex-Uber", value: "SDE" },
    { icon: "🏆", label: "GATE AIR", value: "202" },
    { icon: "👥", label: "Students", value: "100k+" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 pt-20">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 blur-3xl"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/20">
                <Star className="w-4 h-4 mr-2" />
                Trusted by 100k+ Students
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Unlock Your{" "}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Coding Potential
                </span>{" "}
                with Rohit Bhaiya
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                Your AI-Powered Guide to DSA, Web Development, and Interview Prep. Learn in Hinglish with personalized
                guidance from IIT Guwahati alumni and ex-Uber SDE.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/chat">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
                  >
                    Start Chatting with Rohit Bhaiya
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-purple-500/50 text-black hover:bg-purple-500/10 hover:border-purple-400 hover:text-white"
                  >
                    Learn More About Rohit
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
              <Card className="relative bg-gray-800/50 border-purple-500/30 backdrop-blur-sm shadow-2xl">
                <CardContent className="p-8">
                  <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-lg">
  <img 
    src="/img1.jpg" 
    alt="Rohit Bhaiya" 
    className="w-full h-full object-cover"
  />
</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Rohit Negi</h3>
                    <p className="text-purple-300 mb-6">Your Coding Mentor</p>
                    <div className="grid grid-cols-2 gap-4">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="text-center p-3 rounded-lg bg-gray-700/50">
                          <div className="text-2xl mb-1">{achievement.icon}</div>
                          <div className="text-sm text-gray-300">{achievement.label}</div>
                          <div className="text-purple-300 font-semibold">{achievement.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-800/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Rohit Bhaiya?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the perfect blend of technical expertise and motivational guidance designed specifically for
              Indian students.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-800/50 border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group"
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-700/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Rohit Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-2xl opacity-20"></div>
              <Card className="relative bg-gray-800/50 border-purple-500/30 backdrop-blur-sm shadow-2xl">
                <CardContent className="p-8">
                <div className="rounded-2xl overflow-hidden border border-purple-500/30">
      <img 
        src="/img2.jpg" 
        alt="Rohit Bhaiya teaching" 
        className="w-full h-full object-cover"
      />
    </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-white mb-2">Rohit Negi</h3>
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">IIT Guwahati</Badge>
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Ex-Uber</Badge>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Coder Army</Badge>
                    </div>
                    <p className="text-gray-300 italic">"Chamka?"</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Meet Your Coding Mentor</h2>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  From cracking GATE with <strong className="text-purple-300">AIR 202</strong> to working as an SDE at{" "}
                  <strong className="text-blue-300">Uber</strong>, Rohit Negi's journey is nothing short of
                  inspirational.
                </p>
                <p>
                  As an <strong className="text-purple-300">IIT Guwahati alumni</strong>, he understands the struggles
                  of Indian students and has dedicated his life to making coding education accessible through{" "}
                  <strong className="text-green-300">Coder Army</strong>.
                </p>
                <p>
                  With over <strong className="text-yellow-300">100k+ students</strong> mentored across YouTube,
                  LinkedIn, and live sessions, Rohit Bhaiya brings his unique Hinglish teaching style that makes complex
                  concepts simple and engaging.
                </p>
                <div className="bg-gray-800/50 rounded-lg p-6 border border-purple-500/30">
                  <h3 className="text-xl font-semibold text-white mb-3">Signature Teaching Style:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>
                      • <strong>Hinglish explanations</strong> for better understanding
                    </li>
                    <li>
                      • <strong>Real-life analogies</strong> and practical examples
                    </li>
                    <li>
                      • <strong>Motivational guidance</strong> with every lesson
                    </li>
                    <li>
                      • <strong>"Chamka?"</strong> - ensuring you understand before moving forward
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Coding Journey?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers with Rohit Bhaiya's guidance. Your success
            story starts with a single chat!
          </p>
          <Link to="/chat">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 text-lg px-8 py-4"
            >
              <BookOpen className="w-6 h-6 mr-3" />
              Start Learning with Rohit Bhaiya
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Rohit Bhaiya Chatbot</span>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed">
                Empowering Indian developers with personalized guidance in DSA, Web Development, and Interview
                preparation. Your coding success starts here!
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/chat" className="block text-gray-400 hover:text-purple-400 transition-colors">
                  Chat with Rohit
                </Link>
                <Link to="/about" className="block text-gray-400 hover:text-purple-400 transition-colors">
                  About Rohit
                </Link>
                <Link to="/contact" className="block text-gray-400 hover:text-purple-400 transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-purple-400 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="block text-gray-400 hover:text-purple-400 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="block text-gray-400 hover:text-purple-400 transition-colors">
                  Coder Army
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 mb-2">
              Copyright © 2025 Rohit Bhaiya Chatbot. Built with ❤️ for Indian developers.
            </p>
            <p className="text-purple-400 font-medium">"Consistency is key!" - Rohit Negi</p>
          </div>
        </div>
      </footer>
    </div>
  )
}