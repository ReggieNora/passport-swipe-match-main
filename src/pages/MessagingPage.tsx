
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Phone, Video, MoreHorizontal } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const MessagingPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(0);

  const getThemeStyles = () => {
    switch (theme) {
      case 'dark':
        return "bg-gray-900 text-white";
      case 'job-based':
        return "bg-gradient-to-br from-purple-900/20 to-blue-900/20";
      default:
        return "bg-white";
    }
  };

  const getCardStyles = () => {
    switch (theme) {
      case 'dark':
        return "glassmorphism-dark text-white";
      case 'job-based':
        return "glassmorphism text-gray-900";
      default:
        return "glassmorphism text-gray-900";
    }
  };

  const mockChats = [
    {
      id: 1,
      company: "TechCorp",
      role: "Senior Frontend Developer",
      lastMessage: "We'd love to schedule an interview...",
      time: "2m ago",
      unread: 2,
      avatar: "TC"
    },
    {
      id: 2,
      company: "StartupXYZ",
      role: "Full Stack Developer",
      lastMessage: "Thanks for your interest in our position",
      time: "1h ago",
      unread: 0,
      avatar: "SX"
    },
    {
      id: 3,
      company: "Design Studio",
      role: "UX/UI Designer",
      lastMessage: "Could you share your portfolio?",
      time: "3h ago",
      unread: 1,
      avatar: "DS"
    }
  ];

  const currentChat = mockChats[selectedChat];

  const mockMessages = [
    {
      id: 1,
      sender: "recruiter",
      content: "Hi! Thanks for applying to our Senior Frontend Developer position.",
      time: "10:30 AM"
    },
    {
      id: 2,
      sender: "user",
      content: "Thank you for considering my application. I'm very excited about this opportunity.",
      time: "10:32 AM"
    },
    {
      id: 3,
      sender: "recruiter",
      content: "We'd love to schedule an interview with you. Are you available this week?",
      time: "10:35 AM"
    },
    {
      id: 4,
      sender: "user",
      content: "Yes, I'm available. What time works best for you?",
      time: "10:37 AM"
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className={`min-h-screen relative transition-all duration-300 ${getThemeStyles()}`}>
      {/* Header */}
      <div className={`relative z-10 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/10'} backdrop-blur-xl border-b border-white/20`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/job-seeker")}
              className="p-2 hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className={`font-extralight text-xl tracking-[0.2em] font-mono ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Messages
            </h1>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Chat List */}
        <div className={`w-80 border-r ${theme === 'dark' ? 'border-white/10' : 'border-gray-200/30'} ${getCardStyles()}`}>
          <div className="p-6">
            <h2 className="text-lg font-light mb-4">Conversations</h2>
            <div className="space-y-3">
              {mockChats.map((chat, index) => (
                <Card 
                  key={chat.id}
                  className={`cursor-pointer transition-all duration-300 border-0 ${
                    selectedChat === index 
                      ? theme === 'dark' ? 'bg-white/20' : 'bg-blue-50/50'
                      : 'hover:bg-white/10'
                  } ${getCardStyles()}`}
                  onClick={() => setSelectedChat(index)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-500 text-white text-xs">
                          {chat.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium truncate">{chat.company}</p>
                          <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            {chat.time}
                          </span>
                        </div>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} truncate`}>
                          {chat.role}
                        </p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} truncate mt-1`}>
                          {chat.lastMessage}
                        </p>
                      </div>
                      {chat.unread > 0 && (
                        <div className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {chat.unread}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className={`p-4 border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-200/30'} ${getCardStyles()}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-blue-500 text-white text-sm">
                    {currentChat.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{currentChat.company}</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {currentChat.role}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="p-2">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {mockMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.sender === 'user' 
                    ? 'bg-blue-500 text-white'
                    : theme === 'dark' ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender === 'user' ? 'text-blue-100' : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className={`p-4 border-t ${theme === 'dark' ? 'border-white/10' : 'border-gray-200/30'}`}>
            <div className="flex space-x-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className={`flex-1 px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  theme === 'dark' ? 'bg-white/10 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-900'
                }`}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;
