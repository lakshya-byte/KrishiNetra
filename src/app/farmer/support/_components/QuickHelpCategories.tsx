import { Sprout, Package, QrCode, Wrench, Shield, IndianRupee, ChevronRight, Play, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Badge } from "../../../ui/badge";
import { Button } from "../../../ui/button";
import { Progress } from "../../../ui/progress";

export function QuickHelpCategories() {
  const categories = [
    {
      icon: Sprout,
      title: "Getting Started",
      description: "New to KrishiNetra? Start here for setup guides and basic navigation.",
      color: "text-[#22c55e]",
      bgColor: "bg-[#22c55e]/10",
      links: [
        { title: "Account Setup Guide", type: "tutorial", popular: true },
        { title: "Creating Your First Batch", type: "video" },
        { title: "Platform Navigation Basics", type: "article" }
      ],
      progress: 65,
      badge: "Popular"
    },
    {
      icon: Package,
      title: "Managing Batches",
      description: "Learn how to create, track, and manage your agricultural batches effectively.",
      color: "text-[#ff6b35]",
      bgColor: "bg-[#ff6b35]/10",
      links: [
        { title: "Add New Batch", type: "tutorial", popular: true },
        { title: "Transfer Batch Ownership", type: "article" },
        { title: "Batch Status Tracking", type: "video", popular: true }
      ],
      progress: 80,
      badge: "Essential"
    },
    {
      icon: QrCode,
      title: "Scanning & Tracing",
      description: "Master QR code scanning and product traceability features.",
      color: "text-[#2563eb]",
      bgColor: "bg-[#2563eb]/10",
      links: [
        { title: "How to Scan QR Codes", type: "video", popular: true },
        { title: "Troubleshooting Scanner Issues", type: "article" },
        { title: "Manual Batch Entry", type: "tutorial" }
      ],
      progress: 45,
      badge: "Updated"
    },
    {
      icon: Wrench,
      title: "Technical Issues",
      description: "Resolve common technical problems and system issues.",
      color: "text-[#f59e0b]",
      bgColor: "bg-[#f59e0b]/10",
      links: [
        { title: "Login Problems", type: "troubleshoot", popular: true },
        { title: "Camera Access Issues", type: "article" },
        { title: "Browser Compatibility", type: "guide" }
      ],
      systemStatus: "operational",
      badge: "System OK"
    },
    {
      icon: Shield,
      title: "Account & Security",
      description: "Secure your account and manage privacy settings.",
      color: "text-[#8b5cf6]",
      bgColor: "bg-[#8b5cf6]/10",
      links: [
        { title: "Password Reset Guide", type: "tutorial" },
        { title: "Two-Factor Authentication", type: "security", popular: true },
        { title: "Privacy Settings", type: "article" }
      ],
      securityTips: 3,
      badge: "Secure"
    },
    {
      icon: IndianRupee,
      title: "Billing & Pricing",
      description: "Understand pricing plans, payments, and billing questions.",
      color: "text-[#059669]",
      bgColor: "bg-[#059669]/10",
      links: [
        { title: "Pricing Plans Overview", type: "pricing" },
        { title: "Payment Issues", type: "billing" },
        { title: "Refund Process", type: "article" }
      ],
      calculator: true,
      badge: "Transparent"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-3 h-3" />;
      case 'tutorial': return <CheckCircle className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Quick Help Categories
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Browse by category to find the help you need quickly and efficiently
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.title}
                className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-slate-200 hover:border-slate-300"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 rounded-xl ${category.bgColor} flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 ${category.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-slate-800 transition-colors">
                    {category.title}
                  </CardTitle>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {category.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progress bar for tutorials */}
                  {category.progress && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-600">
                        <span>Tutorial Progress</span>
                        <span>{category.progress}%</span>
                      </div>
                      <Progress value={category.progress} className="h-2" />
                    </div>
                  )}

                  {/* System status indicator */}
                  {category.systemStatus && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse"></div>
                      <span className="text-slate-600">System Status: </span>
                      <span className="text-[#22c55e] font-medium capitalize">
                        {category.systemStatus}
                      </span>
                    </div>
                  )}

                  {/* Security tips counter */}
                  {category.securityTips && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Shield className="w-4 h-4 text-[#8b5cf6]" />
                      <span>{category.securityTips} new security tips available</span>
                    </div>
                  )}

                  {/* Pricing calculator indicator */}
                  {category.calculator && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <IndianRupee className="w-4 h-4 text-[#059669]" />
                      <span>Interactive pricing calculator available</span>
                    </div>
                  )}

                  {/* Quick Links */}
                  <div className="space-y-2">
                    {category.links.map((link, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-between text-left h-auto p-3 hover:bg-slate-50 group/link"
                      >
                        <div className="flex items-center gap-2">
                          {getTypeIcon(link.type)}
                          <span className="text-sm">{link.title}</span>
                          {link.popular && (
                            <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                              Popular
                            </Badge>
                          )}
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover/link:text-slate-600 transition-colors" />
                      </Button>
                    ))}
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full mt-4 group-hover:border-slate-400 transition-colors"
                  >
                    View All in {category.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}