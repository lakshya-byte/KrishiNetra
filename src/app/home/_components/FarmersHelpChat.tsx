"use client"

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Volume2 } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { ScrollArea } from '../../ui/scroll-area';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  language: string;
}

interface FarmersHelpChatProps {
  isOpen: boolean;
  onToggle: () => void;
}

const mockResponses = {
  hindi: [
    "नमस्ते! मैं KrishiNetra सहायक हूं। आपकी क्या मदद कर सकता हूं?",
    "आपकी फसल की गुणवत्ता के लिए हमारे QR कोड सिस्टम का उपयोग करें।",
    "उचित मूल्य पाने के लिए अपने उत्पाद को सत्यापित करवाएं।",
  ],
  english: [
    "Hello! I'm the KrishiNetra assistant. How can I help you today?",
    "Use our QR code system to verify your crop quality and origin.",
    "Get fair prices by registering your products in our transparent system.",
  ],
  tamil: [
    "வணக்கம்! நான் KrishiNetra உதவியாளர். உங்களுக்கு எப்படி உதவ முடியும்?",
    "உங்கள் பயிர் தரத்திற்கு எங்கள் QR குறியீடு அமைப்பைப் பயன்படுத்தவும்.",
  ],
};

export function FarmersHelpChat({ isOpen, onToggle }: FarmersHelpChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('english');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting
      setTimeout(() => {
        const greeting: Message = {
          id: Date.now().toString(),
          text: "नमस्ते! 🙏 Welcome to KrishiNetra Farmer Support. मैं आपकी मदद कर सकता हूं। How can I assist you today?",
          sender: 'bot',
          timestamp: new Date(),
          language: 'mixed'
        };
        setMessages([greeting]);
      }, 500);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      language: currentLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const responses = mockResponses[currentLanguage as keyof typeof mockResponses] || mockResponses.english;
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date(),
        language: currentLanguage
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage === 'hindi' ? 'hi-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    } else {
      toast.error('Text-to-speech not supported on this device');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-2xl border-2 border-gray-200 z-50 flex flex-col animate-in slide-in-from-bottom-5 duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-green to-forest-green-light text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold">किसान सहायता | Farmer Support</h3>
            <p className="text-xs text-green-100">Online now</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="text-white hover:bg-white/20 h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Language Selector */}
      <div className="p-2 border-b border-gray-200 bg-gray-50">
        <div className="flex gap-1">
          {[
            { key: 'english', label: 'English' },
            { key: 'hindi', label: 'हिंदी' },
            { key: 'tamil', label: 'தமிழ்' }
          ].map((lang) => (
            <Button
              key={lang.key}
              variant={currentLanguage === lang.key ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentLanguage(lang.key)}
              className={`text-xs h-6 px-2 ${
                currentLanguage === lang.key 
                  ? 'bg-forest-green text-white' 
                  : 'hover:bg-gray-200'
              }`}
            >
              {lang.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-ashoka-blue text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.sender === 'bot' && (
                    <Bot className="h-4 w-4 mt-1 flex-shrink-0 text-forest-green" />
                  )}
                  {message.sender === 'user' && (
                    <User className="h-4 w-4 mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {message.sender === 'bot' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => speakMessage(message.text)}
                          className="h-6 w-6 p-0 opacity-70 hover:opacity-100"
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4 text-forest-green" />
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <div className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              currentLanguage === 'hindi' 
                ? 'अपना सवाल पूछें...' 
                : currentLanguage === 'tamil'
                ? 'உங்கள் கேள்வியைக் கேளுங்கள்...'
                : 'Ask your question...'
            }
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 border-gray-300 focus:border-forest-green focus:ring-forest-green"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="bg-forest-green hover:bg-forest-green-dark text-white"
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          {currentLanguage === 'hindi' 
            ? 'KrishiNetra द्वारा संचालित AI सहायक' 
            : 'AI Assistant powered by KrishiNetra'}
        </p>
      </div>
    </div>
  );
}