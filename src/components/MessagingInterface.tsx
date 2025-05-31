
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Search, MoreVertical, Phone, Video, Paperclip, Smile } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

interface Contact {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
}

const MessagingInterface = () => {
  const { theme } = useTheme();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const getCardStyles = () => {
    switch (theme) {
      case 'dark':
        return "glass-card-dark border-white/10";
      case 'job-based':
        return "glass-card border-white/20";
      default:
        return "glass-card border-white/20";
    }
  };

  const contacts: Contact[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Senior Frontend Developer",
      lastMessage: "Thank you for your interest in the position...",
      timestamp: "2m ago",
      unread: 2,
      avatar: "SJ"
    },
    {
      id: "2",
      name: "Tech Corp Recruiting",
      role: "HR Manager",
      lastMessage: "We'd like to schedule an interview...",
      timestamp: "1h ago",
      unread: 0,
      avatar: "TC"
    },
    {
      id: "3",
      name: "Michael Chen",
      role: "Product Manager",
      lastMessage: "Great profile! Let's connect...",
      timestamp: "3h ago",
      unread: 1,
      avatar: "MC"
    }
  ];

  const messages: Message[] = [
    {
      id: "1",
      sender: "Sarah Johnson",
      content: "Hi! I saw your profile and I'm impressed with your React experience. We have an exciting opportunity at our startup.",
      timestamp: "10:30 AM",
      isOwn: false
    },
    {
      id: "2",
      sender: "You",
      content: "Thank you for reaching out! I'd love to learn more about the opportunity.",
      timestamp: "10:35 AM",
      isOwn: true
    },
    {
      id: "3",
      sender: "Sarah Johnson",
      content: "Great! We're looking for a Senior Frontend Developer to join our team. The role involves working with React, TypeScript, and our design system.",
      timestamp: "10:40 AM",
      isOwn: false
    },
    {
      id: "4",
      sender: "You",
      content: "That sounds perfect! I have 5+ years of experience with React and TypeScript. Could we schedule a call to discuss this further?",
      timestamp: "10:45 AM",
      isOwn: true
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Contacts List */}
      <Card className={`${getCardStyles()} shadow-lg border-0`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle>Messages</CardTitle>
            <Button variant="ghost" size="sm" className="p-2">
              <MoreVertical className="h-4 w-4 icon-modern" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 icon-modern" />
            <input
              type="text"
              placeholder="Search messages..."
              className={`w-full pl-10 pr-4 py-2 rounded-xl border ${
                theme === 'dark' ? 'bg-white/5 border-white/20' : 'bg-white/50 border-white/30'
              } backdrop-blur-sm font-medium`}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-2">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`p-4 cursor-pointer transition-all duration-200 hover:bg-white/10 ${
                  selectedContact?.id === contact.id ? 'bg-white/20' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-blue-600 text-white font-medium">
                        {contact.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {contact.unread > 0 && (
                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {contact.unread}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{contact.name}</p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} truncate`}>
                      {contact.role}
                    </p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} truncate`}>
                      {contact.lastMessage}
                    </p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {contact.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <div className="lg:col-span-2">
        {selectedContact ? (
          <Card className={`${getCardStyles()} shadow-lg border-0 h-full flex flex-col`}>
            {/* Chat Header */}
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-600 text-white font-medium">
                      {selectedContact.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{selectedContact.name}</h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {selectedContact.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="p-2">
                    <Phone className="h-4 w-4 icon-modern" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Video className="h-4 w-4 icon-modern" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <MoreVertical className="h-4 w-4 icon-modern" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.isOwn
                          ? 'bg-blue-600 text-white'
                          : theme === 'dark'
                          ? 'bg-gray-700 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm font-medium">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.isOwn ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>

            {/* Message Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="p-2">
                  <Paperclip className="h-4 w-4 icon-modern" />
                </Button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className={`w-full px-4 py-2 pr-12 rounded-xl border ${
                      theme === 'dark' ? 'bg-white/5 border-white/20' : 'bg-white/50 border-white/30'
                    } backdrop-blur-sm font-medium`}
                  />
                  <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1">
                    <Smile className="h-4 w-4 icon-modern" />
                  </Button>
                </div>
                <Button 
                  onClick={handleSendMessage}
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2"
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4 icon-modern" />
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card className={`${getCardStyles()} shadow-lg border-0 h-full flex items-center justify-center`}>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Send className="h-8 w-8 text-blue-600 icon-modern" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Choose a contact to start messaging
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MessagingInterface;
