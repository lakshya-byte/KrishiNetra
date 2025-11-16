import { BookOpen, Video, MessageCircle, AlertTriangle } from "lucide-react";
import { Button } from "../../../ui/button";
import { ImageWithFallback } from "./ImageWithFallback";

export function HeroSection() {
  const quickActions = [
    {
      icon: BookOpen,
      label: "Browse FAQs",
      description: "Find answers to common questions",
      color: "bg-[#2563eb]",
      hoverColor: "hover:bg-[#1d4ed8]"
    },
    {
      icon: Video,
      label: "Watch Tutorials",
      description: "Learn with step-by-step guides",
      color: "bg-[#22c55e]",
      hoverColor: "hover:bg-[#16a34a]"
    },
    {
      icon: MessageCircle,
      label: "Contact Support",
      description: "Get help from our team",
      color: "bg-[#ff6b35]",
      hoverColor: "hover:bg-[#e55a2b]"
    },
    {
      icon: AlertTriangle,
      label: "Report Issue",
      description: "Report bugs or problems",
      color: "bg-[#f59e0b]",
      hoverColor: "hover:bg-[#d97706]"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-slate-100 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              How can we{" "}
              <span className="bg-gradient-to-r from-[#ff6b35] to-[#22c55e] bg-clip-text text-transparent">
                help you
              </span>{" "}
              today?
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Find answers, get support, or contact our team. We're here to help you make the most of KrishiNetra's agricultural traceability platform.
            </p>

            {/* Quick Action Buttons */}
            <div className="grid sm:grid-cols-2 gap-4">
              {quickActions.map((action) => {
                const IconComponent = action.icon;
                return (
                  <Button
                    key={action.label}
                    className={`${action.color} ${action.hoverColor} text-white p-6 h-auto flex flex-col items-center gap-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 group`}
                  >
                    <IconComponent className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <div className="text-center">
                      <div className="font-medium">{action.label}</div>
                      <div className="text-sm opacity-90">{action.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-[#22c55e]/20 to-[#ff6b35]/20 rounded-3xl p-8 backdrop-blur-sm">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1594179131702-112ff2a880e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXIlMjBoZWxwJTIwc3VwcG9ydCUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NTkyMDcyMjd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Farmer getting help and support"
                className="w-full h-80 object-cover rounded-2xl shadow-xl"
              />
              
              {/* Floating help icons */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#ff6b35] rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-[#2563eb] rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}