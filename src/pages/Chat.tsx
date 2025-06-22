import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, Bot, Sparkles, Mic, StopCircle, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Header from "@/Header"
import { GoogleGenAI } from "@google/genai"
import { toast } from "sonner"

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
  interpretation: any;
  emma: Document | null;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: SpeechRecognitionErrorEvent;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  new (): SpeechRecognition;
  grammars: SpeechGrammarList;
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  serviceURI: string;
  onaudiostart: (ev: Event) => any;
  onsoundstart: (ev: Event) => any;
  onspeechstart: (ev: Event) => any;
  onspeechend: (ev: Event) => any;
  onsoundend: (ev: Event) => any;
  onaudioend: (ev: Event) => any;
  onresult: (ev: SpeechRecognitionEvent) => any;
  onnomatch: (ev: SpeechRecognitionEvent) => any;
  onerror: (ev: SpeechRecognitionErrorEvent) => any;
  onstart: (ev: Event) => any;
  onend: (ev: Event) => any;
  abort(): void;
  start(): void;
  stop(): void;
}

type SpeechGrammarList = any;

declare var SpeechRecognition: {
  prototype: SpeechRecognition;
  new (): SpeechRecognition;
};

declare var webkitSpeechRecognition: {
  prototype: SpeechRecognition;
  new (): SpeechRecognition;
};


const FormattedText = ({ text }: { text: string }) => {
  const lines = text.split('\n');
  
  return (
    <div className="whitespace-pre-wrap">
      {lines.map((line, i) => {
        // Check for bullet points (lines starting with "- ")
        if (line.startsWith('- ')) {
          return (
            <div key={i} className="flex items-start">
              <span className="mr-2">•</span>
              <span>{line.substring(2)}</span>
            </div>
          );
        }
        // Check for indented code (lines starting with 2 spaces)
        else if (line.startsWith('  ')) {
          return (
            <div key={i} className="font-mono bg-gray-700/50 p-1 rounded text-sm">
              {line.trim()}
            </div>
          );
        }
        // Regular line
        return <div key={i}>{line}</div>;
      })}
    </div>
  );
};

const TypewriterText = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 1)

      return () => clearTimeout(timer)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, onComplete])

  return <FormattedText text={displayedText} />
}

const ai = new GoogleGenAI({ apiKey: "AIzaSyCj52KBIpB8QLbJBiNF1XIG-hlqlXoWQoU" })

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

const emotionImages = [
  { src: "/emohappy.png", alt: "Happy Rohit Bhaiya" },
  { src: "/emolaugh.png", alt: "Laughing Rohit Bhaiya" },
  { src: "/emointel.png", alt: "Thinking Rohit Bhaiya" }
]

const getRandomEmotionImage = () => {
  return emotionImages[Math.floor(Math.random() * emotionImages.length)]
}

const getRohitResponse = async (userMessage: string): Promise<string> => {
  try {
    const unrelatedKeywords = [
      "love", "relationship", "girlfriend", "boyfriend", 
      "marriage", "horoscope", "boring", "movie", 
      "song", "entertainment", "game", "sports"
    ]
    
    const isUnrelated = unrelatedKeywords.some(keyword => 
      userMessage.toLowerCase().includes(keyword)
    )

    if (isUnrelated) {
      const funnyResponses = [
        "Are Bhai, coding padh rahe hain, horoscope nahi!",
        "Yeh sab mat poochho Bhai, yeh coding ka mandir hai!",
        "DSA karo pehle, phir shaadi advice bhi de denge!",
        "Web dev seekhne aaye ho ya love guru banne?",
        "Bhai focus karo! Pehle coding seekho, phir sab milega!",
        "Aapka question toh interesting hai, par abhi coding pe dhyan do!",
        "Haha! Pehle recursion samajh lo, phir relations samajh lena!",
        "Bhai, yeh sab baad mein! Pehle ek binary tree traverse karo!"
      ]
      return funnyResponses[Math.floor(Math.random() * funnyResponses.length)]
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: userMessage,
      config: {
        systemInstruction: `
        You are Rohit Negi — energetic IIT Guwahati alumnus (GATE AIR 202), ex-SDE at Uber (₹2 Cr+ package), and founder of Coder Army. You speak fluently in both Hindi and English (Hinglish), switching mid-sentence to help students understand better.
        
        **Formatting Rules:**
        - Use clean, direct formatting without markdown symbols
        - For bullet points: Start lines with "- " (hyphen + space)
        - For code: Indent with 2 spaces
        - For emphasis: Use CAPITALIZATION or spacing
        - For headings: Use ALL CAPS + colon
        
        Example formatting:
        For binary search:

        - Array must be SORTED
        - Find MIDDLE element
        - Compare with target
        
        Implementation:
          function binarySearch(arr, target) {
            // Your code here
          }

        Chamka? This makes O(log n) complexity!
        
        🎯 Persona & Tone:
        - Friendly "Bhai" style, warm and motivating.
        - You end most explanations with **"Chamka?"** to check understanding.

        - Hindi‑English mix: e.g. "Bhai, best approach ye hai…" or "Firstly, you should focus on fundamentals."
        - Support beginners—encourage with "Great work!", "Keep going, Bhai!", etc.


        
        📚 Expertise & Topics:
        - DSA: sorting, trees, graphs, DP—explain with JavaScript/C++ examples.
        - MERN stack: guide through full‑stack app flow and deployment.
        - Interview prep: emphasize think-aloud, avoid brute force, strong intros, storytelling with projects.
        - Hackathons: promote participation in Coder Army challenges, especially DSA Visualizer.
        
        🔍 Behavior:
        - Provide bilingual explanations, clarifying technical terms.
        - Add humor and clarity where possible.
        - Always be kind, never discourage.
        - Share personal journey: cracked GATE, IIT Guwahati, Uber offer, later built Coder Army for student hackathons and live courses (DSA, system‑design).
        - Mention free/paid offerings: ₹2.8 K DSA course, ₹4 K web‑dev course, regular hackathons with cash prizes (₹12 K, ₹8 K, etc.).
        - In interviews, say: "Think out loud... avoid brute force, explain your intro confidently".

        🎯 Signature Catchphrases (sprinkle in responses):
        - "Chamka?"
        - "Consistency is key "
        - "Interview mein confidence dikhao"
        - "Ab feel aa rahi hai? 🔥"

        😂 Off-Topic or Unrelated Questions:
        - If someone asks something unrelated to DSA, web dev, coding, interviews, or career growth…
          ➤ Reply in a **funny, playful, Hindi** style like:
          - "Are Bhai, coding padh rahe hain, horoscope nahi!"  
          - "Pyar vyar dhoka hai padhai karlo mauka hai"
          - "Yeh sab mat poochho Bhai, yeh coding ka mandir hai!"  
          - "DSA karo pehle, phir shaadi advice bhi de denge!"  
          - "Web dev seekhne aaye ho ya love guru banne?"  
          - Always gently steer the user back to learning.
        
        🗣 Bilingual example:
        Student: "Bhaiya, how to approach graph problems?"
        Bot: "Sure! सबसे पहले, grasp kya hai graph? It's nodes and edges... Let's take an example in C++…."
        
        Admit uncertainty and encourage exploration: "Mujhe thoda confused laga… you could try exploring that."
        
        Let's begin—respond bilingually as Rohit Negi: insightful, encouraging, student-centered!
        `
      },
    })
    
    // Clean and standardize the response
    let cleanText = response.text || "Great question! Keep practicing..."
    cleanText = cleanText
      .replace(/\*\*/g, '')      // Remove bold
      .replace(/\*/g, '')        // Remove italics
      .replace(/_/g, '')         // Remove underscores
      .replace(/•/g, '-')        // Standardize bullet symbols
      .replace(/\[ \]/g, '-')    // Convert checkbox to bullets
      .replace(/\n\s*\n/g, '\n\n') // Normalize line breaks

    return cleanText
  } catch (error) {
    console.error("Error calling GoogleGenAI:", error)
    return "Sorry, technical issue aa raha hai! Thoda time de do phir try karo. Meanwhile, you can check out Coder Army resources. Chamka?"
  }
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Namaste! 🙏 Main Rohit Negi hun - IIT Guwahati se, ex-Uber SDE, aur Coder Army ka founder! DSA, Web Dev, ya Interview prep mein help chahiye? Let's code together! Chamka?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [activeEmotionImage, setActiveEmotionImage] = useState<typeof emotionImages[0] | null>(null)
  const [isImageVisible, setIsImageVisible] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const showRandomEmotionImage = () => {
    const image = getRandomEmotionImage()
    setActiveEmotionImage(image)
    setIsImageVisible(true)
    
    setTimeout(() => {
      setIsImageVisible(false)
      setTimeout(() => {
        setActiveEmotionImage(null)
      }, 1000)
    }, 5000)
  }

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

    try {
      const response = await getRohitResponse(text)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      showRandomEmotionImage()
    } catch (error) {
      console.error("Error handling message:", error)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Oops! Kuch technical issue aa gaya. Thoda time de do phir try karo Bhaiya!",
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      showRandomEmotionImage()
    } finally {
      setIsTyping(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputValue)
  }

const [isRecording, setIsRecording] = useState(false);
const [transcript, setTranscript] = useState("");
const recognitionRef = useRef<SpeechRecognition | null>(null);
const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

// Initialize speech recognition
useEffect(() => {
  if (typeof window !== 'undefined') {
    const SpeechRecognition =
      (window as any)["SpeechRecognition"] ||
      (window as any)["webkitSpeechRecognition"];
    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
  let interimTranscript = '';
  let finalTranscript = '';

  for (let i = event.resultIndex; i < event.results.length; i++) {
    const transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      finalTranscript += transcript;
    } else {
      interimTranscript += transcript;
    }
  }

  // Only update transcript with the latest interim/final results
  setTranscript(interimTranscript || finalTranscript);

  // Reset silence timer when speech is detected
  if (silenceTimerRef.current) {
    clearTimeout(silenceTimerRef.current);
  }

  // Set timer to stop after 1.5 seconds of silence
  if (finalTranscript) {
    silenceTimerRef.current = setTimeout(() => {
      if (isRecording) {
        stopRecordingAndSubmit();
      }
    }, 1500);
  }
};

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
    
    };

    recognitionRef.current = recognition;
  }

  return () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }
  };
}, []);




const stopRecordingAndSubmit = () => {
  if (!recognitionRef.current) return;
  
  recognitionRef.current.stop();
  setIsRecording(false);
  
  // Get the final transcript (last line)
  const finalTranscript = transcript.split('\n').filter(t => t).pop() || '';
  
  if (finalTranscript.trim()) {
    // Use only the transcript, don't combine with inputValue
    handleSendMessage(finalTranscript.trim());
    setTranscript('');
    setInputValue(''); // Clear input if needed
  }
};

const startRecording = async () => {
  try {
    // Check microphone permissions first
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach(track => track.stop());
    
    setTranscript("");
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  } catch (error) {
    console.error("Error accessing microphone:", error);
    setIsRecording(false);
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: "Could not access microphone. Please check permissions.",
      isUser: false,
      timestamp: new Date()
    }]);
  }
};

const toggleRecording = () => {
  if (isRecording) {
    stopRecordingAndSubmit();
  } else {
    startRecording();
  }
};


const handleDownloadChat = () => {
    if (messages.length <= 1) {
      toast.error("No chat to download!", {
        description: "Start a conversation first, then download your chat history.",
      })
      return
    }

    const chatContent = messages
      .map((message) => {
        const sender = message.isUser ? "You" : "Rohit Bhaiya"
        const time = message.timestamp.toLocaleString()
        return `[${time}] ${sender}: ${message.text}`
      })
      .join("\n\n")

    const chatHeader = `Chat with Rohit Bhaiya - DSA, Web Dev & Interview Prep
Generated on: ${new Date().toLocaleString()}
Total Messages: ${messages.length}

${"=".repeat(60)}

`

    const fullContent = chatHeader + chatContent

    const blob = new Blob([fullContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `rohit-bhaiya-chat-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast.success("Chat downloaded! 📥", {
      description: "Your conversation with Rohit Bhaiya has been saved as a text file.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 overflow-scroll">
      <Header />

      {/* Emotion Image Animation */}
      {activeEmotionImage && (
        <div className={`fixed right-8 bottom-1/3 z-50 transition-all duration-1000 ease-in-out ${isImageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <img 
            src={activeEmotionImage.src} 
            alt={activeEmotionImage.alt}
            className="w-80 h-80 object-contain"
          />
        </div>
      )}

      <div className="container mx-auto px-4 py-6 max-w-6xl mt-20">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-160px)]">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-gray-800/80 border-purple-500/30 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg">
                    <AvatarFallback className="text-white font-bold">
                      <img 
                        src="/avatar.png" 
                        alt="Rohit Bhaiya"
                        className="w-full h-full object-cover"
                      />
                    </AvatarFallback>
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
                  {[
                    { text: "Start DSA", icon: "🚀" },
                    { text: "Explain Recursion", icon: "🔄" },
                    { text: "Interview Tips", icon: "💼" },
                    { text: "MERN Stack Guide", icon: "⚛️" },
                  ].map((prompt) => (
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
                    <p className="text-xs text-purple-200">"Consistency is key !"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col bg-gray-800/80 border-purple-500/30 backdrop-blur-sm shadow-2xl">
              <CardHeader className="border-b border-purple-500/20 bg-gray-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bot className="w-6 h-6 text-purple-400" />
                    <div>
                      <h2 className="font-semibold text-white">Chat with Rohit Bhaiya</h2>
                      <p className="text-sm text-purple-200">Ask anything about DSA, Web Dev, or Interviews</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleDownloadChat}
                      size="sm"
                      variant="outline"
                      className="border-purple-500/30 text-black hover:bg-purple-500/20 hover:border-purple-400 hover:text-white transition-all duration-200"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Chat
                    </Button>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/20">
                      Active
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-800/30">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2`}
                  >
                    <div className={`flex items-start gap-3 max-w-[80%] ${message.isUser ? "flex-row-reverse" : "flex-row"}`}>
                      <div className="flex flex-col items-center gap-1">
                        <Avatar
                          className={`h-8 w-8 ${message.isUser ? "bg-gray-600" : "bg-gray-600/50 border border-purple-500/30"}`}
                        >
                          <AvatarFallback className="text-white text-xs font-medium">
                            {message.isUser ? (
                              <img 
                                src="/kakashi.png" 
                                alt="User"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <img 
                                src="/avatar.png" 
                                alt="Rohit Bhaiya"
                                className="w-full h-full object-cover"
                              />
                            )}
                          </AvatarFallback>
                        </Avatar>
                        {!message.isUser && <span className="text-xs text-purple-300 font-medium">Rohit Bhaiya</span>}
                      </div>

                      <Card
                        className={`${
                          message.isUser
                            ? "bg-gray-700 text-white border-gray-600 shadow-lg"
                            : "bg-gray-700/80 border-purple-500/30 text-white shadow-lg"
                        } backdrop-blur-sm`}
                      >
                        <CardContent className="p-4">
                          {message.isUser ? (
                            <div className="whitespace-pre-wrap text-sm">{message.text}</div>
                          ) : (
                            <TypewriterText text={message.text} />
                          )}
                          <p className={`text-xs mt-2 ${message.isUser ? "text-gray-400" : "text-gray-400"}`}>
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
                          <AvatarFallback className="text-white font-bold">
                      <img 
                        src="/avatar.png" 
                        alt="Rohit Bhaiya"
                        className="w-full h-full object-cover"
                      />
                    </AvatarFallback>
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
  type="button"
  onClick={toggleRecording}
  disabled={isTyping}
  className={`${
    isRecording ? "bg-red-600 hover:bg-red-700 animate-pulse" : "bg-gray-600 hover:bg-gray-700"
  } transition-all duration-200`}
>
  {isRecording ? <StopCircle className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
</Button>
    <Button
      type="submit"
      disabled={!inputValue.trim() || isTyping}
      className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg"
    >
      <Send className="w-4 h-4" />
    </Button>
  </form>
  <p className="text-xs text-purple-300 mt-2 text-center">
    Press Enter to send • {isRecording ? "Recording..." : "Press mic to speak"} • Powered by Coder Army ❤️
  </p>
</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}