"use client"

import { useState } from "react";
import { Phone, Mail, MessageCircle, MapPin, Clock, Send, Paperclip, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Textarea } from "../../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select";
import { Badge } from "../../../ui/badge";
import { ImageWithFallback } from "./ImageWithFallback";

export function ContactSupport() {
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our support team",
      contact: "+91 1800-123-4567",
      availability: "Mon-Fri, 9AM-6PM IST",
      responseTime: "Immediate",
      color: "text-[#22c55e]",
      bgColor: "bg-[#22c55e]/10"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us detailed questions or issues",
      contact: "support@krishinetra.com",
      availability: "24/7",
      responseTime: "Within 4 hours",
      color: "text-[#2563eb]",
      bgColor: "bg-[#2563eb]/10"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Support",
      description: "Quick help via WhatsApp",
      contact: "+91 98765-43210",
      availability: "Mon-Sat, 8AM-8PM IST",
      responseTime: "Within 30 minutes",
      color: "text-[#22c55e]",
      bgColor: "bg-[#22c55e]/10"
    }
  ];

  const offices = [
    {
      city: "Mumbai",
      address: "Tech Hub, Bandra-Kurla Complex, Mumbai 400051",
      phone: "+91 22 1234 5678",
      hours: "Mon-Fri: 9AM-6PM"
    },
    {
      city: "Bangalore",
      address: "Innovation Center, Electronic City, Bangalore 560100",
      phone: "+91 80 1234 5678",
      hours: "Mon-Fri: 9AM-6PM"
    },
    {
      city: "Delhi",
      address: "Business District, Connaught Place, New Delhi 110001",
      phone: "+91 11 1234 5678",
      hours: "Mon-Fri: 9AM-6PM"
    }
  ];

  const issueCategories = [
    { value: "account", label: "Account & Login Issues" },
    { value: "technical", label: "Technical Problems" },
    { value: "billing", label: "Billing & Payments" },
    { value: "feature", label: "Feature Request" },
    { value: "bug", label: "Bug Report" },
    { value: "general", label: "General Inquiry" }
  ];

  const priorities = [
    { value: "low", label: "Low - General question", time: "24-48 hours", color: "text-slate-600" },
    { value: "medium", label: "Medium - Account issue", time: "4-8 hours", color: "text-[#f59e0b]" },
    { value: "high", label: "High - System not working", time: "1-2 hours", color: "text-[#ff6b35]" },
    { value: "urgent", label: "Urgent - Business critical", time: "Within 30 minutes", color: "text-[#ef4444]" }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const getResponseTime = () => {
    const priority = priorities.find(p => p.value === selectedPriority);
    return priority ? priority.time : "Response time varies";
  };

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Contact & Support Options
          </h2>
          <p className="text-lg text-slate-600">
            Choose the best way to reach us based on your needs
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {contactMethods.map((method) => {
                const IconComponent = method.icon;
                return (
                  <Card key={method.title} className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6">
                      <div className={`w-16 h-16 ${method.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className={`w-8 h-8 ${method.color}`} />
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-2">{method.title}</h3>
                      <p className="text-sm text-slate-600 mb-4">{method.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="font-medium text-slate-900">{method.contact}</div>
                        <div className="text-slate-600">{method.availability}</div>
                        <Badge variant="secondary" className="bg-[#22c55e]/10 text-[#22c55e]">
                          {method.responseTime}
                        </Badge>
                      </div>
                      <Button className="w-full mt-4" variant="outline">
                        {method.title === "Phone Support" ? "Call Now" :
                         method.title === "Email Support" ? "Send Email" : "Open WhatsApp"}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-[#ff6b35]" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Issue Category *
                    </label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {issueCategories.map(category => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Priority Level *
                    </label>
                    <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map(priority => (
                          <SelectItem key={priority.value} value={priority.value}>
                            <div className="flex items-center justify-between w-full">
                              <span>{priority.label}</span>
                              <span className={`text-xs ${priority.color}`}>{priority.time}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {selectedPriority && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-sm text-blue-800">
                      <Clock className="w-4 h-4" />
                      <span>Expected response time: <strong>{getResponseTime()}</strong></span>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Your Name *" />
                  <Input placeholder="Email Address *" type="email" />
                </div>

                <Input placeholder="Subject *" />

                <Textarea 
                  placeholder="Describe your issue in detail..." 
                  rows={5}
                  className="resize-none"
                />

                {/* File Attachments */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Attachments (Screenshots, logs, etc.)
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf,.txt,.log"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Paperclip className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">
                        Drop files here or <span className="text-[#ff6b35] underline">browse</span>
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        PNG, JPG, PDF, TXT up to 10MB each
                      </p>
                    </label>
                  </div>

                  {attachments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-slate-50 rounded-lg p-3">
                          <span className="text-sm text-slate-700">{file.name}</span>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => removeAttachment(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <input type="checkbox" id="save-draft" className="rounded" />
                  <label htmlFor="save-draft">Auto-save draft as I type</label>
                </div>

                <Button className="w-full bg-[#ff6b35] hover:bg-[#e55a2b] text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Support Team */}
            <Card>
              <CardContent className="p-6 text-center">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1748261500463-d15e624baf8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHN1cHBvcnQlMjB0ZWFtJTIwb2ZmaWNlfGVufDF8fHx8MTc1OTE1NzQ0OHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Support team"
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-slate-900 mb-2">Our Support Team</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Dedicated agricultural technology experts ready to help you succeed
                </p>
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-slate-600 ml-2">4.9/5 rating</span>
                </div>
                <Badge className="bg-[#22c55e] text-white">
                  Average response: 2.5 hours
                </Badge>
              </CardContent>
            </Card>

            {/* Office Locations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#ff6b35]" />
                  Office Locations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {offices.map((office, index) => (
                  <div key={index} className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                    <h4 className="font-medium text-slate-900">{office.city}</h4>
                    <p className="text-sm text-slate-600 mt-1">{office.address}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-sm text-slate-600">
                      <Clock className="w-3 h-3" />
                      <span>{office.hours}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* WhatsApp QR */}
            <Card className="bg-gradient-to-br from-[#22c55e]/10 to-[#22c55e]/5">
              <CardContent className="p-6 text-center">
                <MessageCircle className="w-12 h-12 text-[#22c55e] mx-auto mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">Quick WhatsApp Access</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Scan QR code for instant mobile support
                </p>
                <div className="w-32 h-32 bg-white rounded-lg border-2 border-slate-200 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-xs text-slate-500">QR Code</span>
                </div>
                <Button className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white">
                  Open WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}