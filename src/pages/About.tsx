import { ExternalLink, Youtube, Linkedin, Instagram, Trophy, Users, BookOpen, Code2, Star, Heart } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Header from "@/Header"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  const achievements = [
    { icon: <Users className="w-8 h-8 text-purple-400" />, label: "Students Mentored", value: "100k+" },
    { icon: <Trophy className="w-8 h-8 text-yellow-400" />, label: "GATE Rank", value: "AIR 202" },
    { icon: <Code2 className="w-8 h-8 text-blue-400" />, label: "Hackathons Hosted", value: "50+" },
    { icon: <BookOpen className="w-8 h-8 text-green-400" />, label: "YouTube Views", value: "1M+" },
  ]

  const teachingStyle = [
    {
      icon: "🗣️",
      title: "Hinglish Approach",
      description:
        "Explains complex concepts in a perfect mix of Hindi and English, making technical topics accessible to every Indian student.",
    },
    {
      icon: "🧠",
      title: "Real-life Analogies",
      description: "Uses everyday examples and dry runs to make algorithms and data structures crystal clear.",
    },
    {
      icon: "💪",
      title: "Motivational Coaching",
      description:
        "Constantly encourages with phrases like 'Consistency is key Bhaiya' and 'Socho, likho, fir code karo.'",
    },
    {
      icon: "✨",
      title: "Signature Catchphrase",
      description: "Every explanation ends with 'Chamka?' - ensuring complete understanding before moving forward.",
    },
  ]

  const quotes = [
    {
      text: "Consistency is key Bhaiya - daily thoda thoda karo, but regularly!",
      context: "On Building Habits",
      color: "border-purple-400",
    },
    {
      text: "Interview mein confidence dikhao - think out loud, avoid brute force!",
      context: "On Interview Success",
      color: "border-blue-400",
    },
    {
      text: "Mujhe bhi pehle yahi lagta tha, but practice se sab clear ho jata hai.",
      context: "On Learning Journey",
      color: "border-green-400",
    },
    {
      text: "Socho, likho, fir code karo - this is the way!",
      context: "On Problem Solving",
      color: "border-yellow-400",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 pt-20">
      <Header />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <Avatar className="relative w-40 h-40 bg-gradient-to-r from-purple-600 to-blue-600 shadow-2xl">
              <AvatarFallback className="text-white text-6xl font-bold">
              <img 
        src="/img3.png" 
        alt="Rohit Negi"
        className="w-full h-full object-cover"
      />
              </AvatarFallback>
            </Avatar>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">Meet Rohit Negi</h1>
          <p className="text-2xl text-gray-300 mb-6">IIT Guwahati | Ex-Uber | Founder of Coder Army</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/20 px-4 py-2">
              🎓 IIT Guwahati Alumni
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/20 px-4 py-2">
              💼 Ex-Uber SDE
            </Badge>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/20 px-4 py-2">
              🚀 Coder Army Founder
            </Badge>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="grid md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <Card
              key={index}
              className="text-center bg-gray-800/50 border-gray-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group"
            >
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-700/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {achievement.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{achievement.value}</h3>
                <p className="text-gray-400">{achievement.label}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Journey Section */}
        <section className="mb-16">
          <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl text-white flex items-center gap-3">
                <Trophy className="w-8 h-8 text-purple-400" />
                The Inspiring Journey
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/30">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">🎓</span>
                    </div>
                    <h3 className="font-bold text-white mb-3">Academic Excellence</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Cracked GATE with AIR 202 and graduated from IIT Guwahati with a strong foundation in computer
                      science and problem-solving.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/30">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">💼</span>
                    </div>
                    <h3 className="font-bold text-white mb-3">Industry Impact</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Software Engineer at Uber, working on large-scale systems used by millions of users worldwide,
                      gaining invaluable industry experience.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/30">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">🚀</span>
                    </div>
                    <h3 className="font-bold text-white mb-3">Giving Back</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Founded Coder Army to democratize coding education in India, helping students achieve their tech
                      dreams through mentorship.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Teaching Style */}
        <section className="mb-16">
          <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl text-white flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-purple-400" />
                Signature Teaching Style
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {teachingStyle.map((style, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">{style.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2 text-lg">{style.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{style.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Famous Quotes */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-gray-800/80 to-purple-800/80 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl text-white flex items-center gap-3">
                <span className="text-3xl">💬</span>
                Words of Wisdom
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {quotes.map((quote, index) => (
                  <blockquote key={index} className={`border-l-4 ${quote.color} pl-6 py-4`}>
                    <p className="italic text-lg mb-2 text-white leading-relaxed">"{quote.text}"</p>
                    <footer className="text-gray-300 text-sm">- {quote.context}</footer>
                  </blockquote>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Bio Section */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-2xl opacity-20"></div>
              <Card className="relative bg-gray-800/50 border-purple-500/30 backdrop-blur-sm">
                <CardContent className="p-8">
                  <Avatar className="w-48 h-48 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-blue-600 shadow-2xl">
                    <AvatarFallback className="text-white text-6xl font-bold">
                    <img 
            src="/img4.jpg" 
            alt="Interview tips"
            className="w-full h-full object-cover rounded-lg"
          />
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-white mb-4">The Mentor Behind the Magic</h3>
                    <p className="text-purple-300 text-xl italic mb-4">"Chamka?"</p>
                    <div className="flex justify-center">
                      <Star className="w-6 h-6 text-yellow-400 fill-current" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white mb-6">The Story Behind the Success</h2>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  From cracking GATE with <strong className="text-purple-300">AIR 202</strong> to working as an SDE at{" "}
                  <strong className="text-blue-300">Uber</strong>, Rohit Negi's journey is a testament to dedication,
                  hard work, and the power of consistent learning.
                </p>
                <p className="text-lg">
                  As an <strong className="text-purple-300">IIT Guwahati alumni</strong>, he understands the unique
                  challenges faced by Indian students in the competitive tech landscape. This understanding led him to
                  create <strong className="text-green-300">Coder Army</strong> - a platform dedicated to making quality
                  coding education accessible to everyone.
                </p>
                <p className="text-lg">
                  With over <strong className="text-yellow-300">100,000 students</strong> mentored across various
                  platforms, Rohit Bhaiya has revolutionized how Indian students learn programming. His unique Hinglish
                  teaching style breaks down complex concepts into digestible, relatable explanations.
                </p>
              </div>

              <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-400" />
                    Mission & Vision
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    "My mission is simple - to make every Indian student confident in their coding abilities. Whether
                    it's DSA, Web Development, or Interview preparation, I want to be the mentor I wished I had during
                    my journey. Chamka?"
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-12">
              <h2 className="text-4xl font-bold text-white mb-6">Connect with Rohit Bhaiya</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Ready to transform your coding journey? Join thousands of students who have achieved their tech dreams
                with Rohit Bhaiya's guidance.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                  <Youtube className="w-5 h-5 mr-2" />
                  Watch on YouTube
                </Button>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Linkedin className="w-5 h-5 mr-2" />
                  Follow on LinkedIn
                </Button>
                <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white">
                  <Instagram className="w-5 h-5 mr-2" />
                  @rohit_negi9
                </Button>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Join a Hackathon
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
