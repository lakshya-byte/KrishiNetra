"use client"

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Paperclip, Star, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Card } from "../../../ui/card";
import { Badge } from "../../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";

interface Message {
  id: number;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
  attachments?: string[];
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Priya from KrishiNetra support. How can I help you today?",
      sender: "agent",
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  const [agentStatus, setAgentStatus] = useState<"online" | "away" | "offline">("online");
  const [responseTime, setResponseTime] = useState("< 2 minutes");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: message,
        sender: "user",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newMessage]);
      setMessage("");
      
      // Simulate agent typing
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const agentResponse: Message = {
          id: messages.length + 2,
          text: "Thank you for your message. Let me help you with that. Can you please provide more details about the issue you're experiencing?",
          sender: "agent",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, agentResponse]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-IN", { 
      hour: "2-digit", 
      minute: "2-digit" 
    });
  };

  const getStatusColor = () => {
    switch (agentStatus) {
      case "online": return "bg-[#22c55e]";
      case "away": return "bg-[#f59e0b]";
      case "offline": return "bg-slate-400";
      default: return "bg-slate-400";
    }
  };

  const getStatusText = () => {
    switch (agentStatus) {
      case "online": return "Online";
      case "away": return "Away";
      case "offline": return "Offline";
      default: return "Unknown";
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-[#ff6b35] hover:bg-[#e55a2b] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#22c55e] rounded-full flex items-center justify-center">
            <span className="text-xs text-white">1</span>
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-96 shadow-2xl transition-all duration-300 ${isMinimized ? "h-16" : "h-[500px]"} flex flex-col`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-[#ff6b35] to-[#e55a2b] text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/api/placeholder/32/32" alt="Agent" />
              <AvatarFallback className="bg-white text-[#ff6b35]">P</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">Priya - Support Agent</div>
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
                <span>{getStatusText()}</span>
                {agentStatus === "online" && (
                  <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                    {responseTime}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20 w-8 h-8 p-0"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20 w-8 h-8 p-0"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] ${msg.sender === "user" ? "order-2" : "order-1"}`}>
                    {msg.sender === "agent" && (
                      <div className="flex items-center gap-2 mb-1">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/api/placeholder/24/24" alt="Agent" />
                          <AvatarFallback className="bg-[#ff6b35] text-white text-xs">P</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-slate-600">Priya</span>
                      </div>
                    )}
                    <div
                      className={`rounded-lg p-3 ${
                        msg.sender === "user"
                          ? "bg-[#ff6b35] text-white ml-auto"
                          : "bg-white text-slate-900 shadow-sm border"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      {msg.attachments && (
                        <div className="mt-2 space-y-1">
                          {msg.attachments.map((attachment, index) => (
                            <div key={index} className="text-xs opacity-75">
                              📎 {attachment}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className={`text-xs text-slate-500 mt-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg p-3 shadow-sm border">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="text-slate-400 hover:text-slate-600">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 border-slate-200 focus:border-[#ff6b35]"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!message.trim()}
                  className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white"
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                <span>Press Enter to send</span>
                <div className="flex items-center gap-1">
                  <span>Rate conversation:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3 h-3 text-slate-300 hover:text-yellow-400 cursor-pointer" />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {isMinimized && (
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-600">Chat with Priya</span>
              <Badge variant="secondary" className="bg-[#ff6b35] text-white text-xs">
                1 new
              </Badge>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}