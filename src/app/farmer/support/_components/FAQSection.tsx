"use client"

import { useState } from "react";
import { Search, Filter, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp, Link2, TrendingUp } from "lucide-react";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Card, CardContent } from "../../../ui/card";
import { Badge } from "../../../ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select";

export function FAQSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openFAQs, setOpenFAQs] = useState<Set<number>>(new Set());

  const faqs = [
    {
      id: 1,
      question: "How do I create my first batch in KrishiNetra?",
      answer: "To create your first batch, navigate to the 'Batches' section in your dashboard and click 'Add New Batch'. Fill in the required information including crop type, quantity, source location, and harvest date. Once submitted, you'll receive a unique QR code for tracking.",
      category: "getting-started",
      popular: true,
      helpful: 245,
      notHelpful: 12,
      relatedArticles: ["Setting up your account", "Understanding batch tracking", "QR code generation"]
    },
    {
      id: 2,
      question: "Why is my QR code scanner not working?",
      answer: "QR code scanner issues are usually caused by camera permissions or poor lighting. First, ensure your browser has camera access enabled. Try scanning in good lighting conditions and hold the camera steady. If the issue persists, try clearing your browser cache or using a different browser.",
      category: "technical",
      popular: true,
      helpful: 189,
      notHelpful: 23,
      relatedArticles: ["Camera troubleshooting", "Browser compatibility", "Manual batch entry"]
    },
    {
      id: 3,
      question: "How can I transfer batch ownership to another user?",
      answer: "Batch ownership can be transferred through the 'Transfer Ownership' option in your batch details. Click on the specific batch, select 'Transfer', enter the recipient's registered email or phone number, and confirm the transfer. Both parties will receive notifications about the ownership change.",
      category: "batches",
      helpful: 156,
      notHelpful: 8,
      relatedArticles: ["Batch management", "User permissions", "Notification settings"]
    },
    {
      id: 4,
      question: "What are the different pricing plans available?",
      answer: "KrishiNetra offers three pricing plans: Basic (free for up to 50 batches), Professional (₹999/month for unlimited batches and advanced analytics), and Enterprise (custom pricing with dedicated support). All plans include basic traceability features.",
      category: "billing",
      helpful: 134,
      notHelpful: 15,
      relatedArticles: ["Plan comparison", "Payment methods", "Upgrade process"]
    },
    {
      id: 5,
      question: "How do I enable two-factor authentication?",
      answer: "Go to Account Settings > Security > Two-Factor Authentication. Click 'Enable 2FA', scan the QR code with your authenticator app (like Google Authenticator), and enter the verification code. Keep your backup codes in a safe place for account recovery.",
      category: "security",
      helpful: 98,
      notHelpful: 5,
      relatedArticles: ["Account security", "Password management", "Recovery options"]
    },
    {
      id: 6,
      question: "Can I export my batch data?",
      answer: "Yes, you can export batch data in CSV or Excel format. Go to the Batches section, select the batches you want to export, and click 'Export Data'. You can choose to include transaction history, quality reports, and location data in your export.",
      category: "batches",
      helpful: 87,
      notHelpful: 3,
      relatedArticles: ["Data management", "Report generation", "API access"]
    }
  ];

  const popularQuestions = [
    "How to create a batch?",
    "QR scanner not working",
    "Transfer ownership",
    "Pricing plans",
    "Enable 2FA"
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "getting-started", label: "Getting Started" },
    { value: "batches", label: "Batch Management" },
    { value: "technical", label: "Technical Issues" },
    { value: "security", label: "Security" },
    { value: "billing", label: "Billing & Pricing" }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: number) => {
    const newOpenFAQs = new Set(openFAQs);
    if (newOpenFAQs.has(id)) {
      newOpenFAQs.delete(id);
    } else {
      newOpenFAQs.add(id);
    }
    setOpenFAQs(newOpenFAQs);
  };

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600">
            Find quick answers to the most common questions about KrishiNetra
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 bg-slate-50 border-slate-200 focus:bg-white"
              />
            </div>
            <div className="flex gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Sort by Popularity
              </Button>
            </div>
          </div>
        </div>

        {/* Popular Questions Widget */}
        <Card className="mb-8 bg-gradient-to-r from-[#ff6b35]/10 to-[#22c55e]/10 border-[#ff6b35]/20">
          <CardContent className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#ff6b35]" />
              Most Popular Questions
            </h3>
            <div className="flex flex-wrap gap-2">
              {popularQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="secondary"
                  size="sm"
                  className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200"
                >
                  {question}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <Card key={faq.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <Collapsible 
                open={openFAQs.has(faq.id)} 
                onOpenChange={() => toggleFAQ(faq.id)}
              >
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full h-auto p-6 justify-between text-left hover:bg-slate-50"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900 text-base leading-relaxed">
                          {faq.question}
                        </h3>
                        <div className="flex items-center gap-3 mt-2">
                          {faq.popular && (
                            <Badge variant="secondary" className="bg-[#ff6b35]/10 text-[#ff6b35] border-[#ff6b35]/20">
                              Popular
                            </Badge>
                          )}
                          <span className="text-sm text-slate-500">
                            {faq.helpful} people found this helpful
                          </span>
                        </div>
                      </div>
                    </div>
                    {openFAQs.has(faq.id) ? (
                      <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <div className="px-6 pb-6">
                    <div className="border-t border-slate-100 pt-4">
                      <p className="text-slate-700 leading-relaxed mb-6">
                        {faq.answer}
                      </p>

                      {/* Helpful Rating */}
                      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-slate-600">Was this helpful?</span>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex items-center gap-1 hover:bg-green-50 hover:border-green-200">
                              <ThumbsUp className="w-4 h-4" />
                              <span className="text-sm">{faq.helpful}</span>
                            </Button>
                            <Button size="sm" variant="outline" className="flex items-center gap-1 hover:bg-red-50 hover:border-red-200">
                              <ThumbsDown className="w-4 h-4" />
                              <span className="text-sm">{faq.notHelpful}</span>
                            </Button>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="flex items-center gap-1 text-[#ff6b35] hover:text-[#e55a2b]">
                          <Link2 className="w-4 h-4" />
                          Copy Link
                        </Button>
                      </div>

                      {/* Related Articles */}
                      {faq.relatedArticles.length > 0 && (
                        <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                          <h4 className="font-medium text-slate-900 mb-2">Related Articles:</h4>
                          <div className="flex flex-wrap gap-2">
                            {faq.relatedArticles.map((article, index) => (
                              <Button
                                key={index}
                                variant="link"
                                size="sm"
                                className="text-[#2563eb] hover:text-[#1d4ed8] p-0 h-auto"
                              >
                                {article}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No FAQs found matching your search criteria.</p>
            <Button className="mt-4 bg-[#ff6b35] hover:bg-[#e55a2b] text-white">
              Contact Support Instead
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}