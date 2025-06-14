"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Instagram, Globe, MessageCircle, Send, Clock, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import Header from "../Header"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      toast.success("Message Sent! 🎉", {
        description: "Rohit Bhaiya will get back to you soon. Keep coding!",
      })
      setFormData({ name: "", email: "", message: "" })
      setIsSubmitting(false)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5 text-purple-400" />,
      label: "Email",
      value: "support@coderarmy.in",
      color: "bg-purple-500/10 border-purple-500/30",
    },
    {
      icon: <Instagram className="w-5 h-5 text-pink-400" />,
      label: "Instagram",
      value: "@rohit_negi9",
      color: "bg-pink-500/10 border-pink-500/30",
    },
    {
      icon: <Globe className="w-5 h-5 text-blue-400" />,
      label: "Website",
      value: "https://www.coderarmy.in/",
      color: "bg-blue-500/10 border-blue-500/30",
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-green-400" />,
      label: "Community",
      value: "Join our Discord/Telegram",
      color: "bg-green-500/10 border-green-500/30",
    },
  ]

  const faqs = [
    {
      question: "How do I join Coder Army?",
      answer:
        "Visit our website and sign up for free. Premium courses and hackathons have separate enrollment processes.",
      color: "bg-purple-500/10 border-purple-500/30",
    },
    {
      question: "Are courses beginner-friendly?",
      answer: "Rohit Bhaiya explains everything from basics. 'Mujhe bhi pehle yahi lagta tha!' - We've all been there.",
      color: "bg-blue-500/10 border-blue-500/30",
    },
    {
      question: "How often are hackathons held?",
      answer:
        "Monthly hackathons with exciting prizes! Follow our social media channels for announcements and updates.",
      color: "bg-green-500/10 border-green-500/30",
    },
    {
      question: "Can I get my code reviewed?",
      answer:
        "Share your GitHub repos or code snippets in our community. Rohit Bhaiya and senior members provide detailed feedback to help you improve. Chamka?",
      color: "bg-yellow-500/10 border-yellow-500/30",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 pt-20">
      <Header />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have questions about DSA, Web Dev, or need career guidance? We'd love to hear from you and help you succeed
            in your coding journey!
          </p>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <Send className="w-6 h-6 text-purple-400" />
                  Send a Message
                </CardTitle>
                <p className="text-gray-400 leading-relaxed">
                  Ask anything about coding, career guidance, or technical doubts. Rohit Bhaiya loves helping students
                  achieve their goals!
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                        className="bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Ask about DSA, Web Dev, Interview prep, or anything coding related..."
                      rows={6}
                      required
                      className="bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-white">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${info.color} border`}>
                    {info.icon}
                    <div>
                      <p className="font-medium text-white">{info.label}</p>
                      <p className="text-sm text-gray-300">{info.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Response Times */}
            <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-400" />
                  Response Times
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">General Queries</span>
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/20">
                    24-48 hours
                  </Badge>
                </div>
                <Separator className="bg-gray-700/50" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Course Support</span>
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/20">
                    12-24 hours
                  </Badge>
                </div>
                <Separator className="bg-gray-700/50" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Urgent Issues</span>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/20">
                    2-6 hours
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Pro Tip */}
            <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">💡</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-yellow-300 mb-2">Pro Tip</h3>
                    <p className="text-yellow-200 text-sm leading-relaxed">
                      For faster responses, mention your specific topic (DSA, Web Dev, Interview Prep) in the subject.
                      Rohit Bhaiya loves detailed questions!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-16">
          <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl text-white flex items-center gap-3">
                <HelpCircle className="w-8 h-8 text-purple-400" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                  <Card key={index} className={`${faq.color} border backdrop-blur-sm`}>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-white mb-3 text-lg">{faq.question}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Additional Contact Methods */}
        <section className="mt-16">
          <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Other Ways to Connect</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join our vibrant community of learners and stay updated with the latest coding trends, hackathons, and
                learning opportunities.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-gray-800/50 border-gray-700/50">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">📺</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">YouTube Channel</h3>
                    <p className="text-gray-400 text-sm mb-4">Watch free tutorials and live coding sessions</p>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Subscribe Now
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700/50">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">🏆</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Hackathons</h3>
                    <p className="text-gray-400 text-sm mb-4">Participate in monthly coding challenges</p>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Join Next Event
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700/50">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">👥</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Community</h3>
                    <p className="text-gray-400 text-sm mb-4">Connect with fellow learners and mentors</p>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Join Discord
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
