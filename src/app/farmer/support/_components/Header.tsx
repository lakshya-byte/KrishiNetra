import { Search, Bell, MessageCircle } from "lucide-react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Page Title */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#ff6b35] to-[#22c55e] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">KN</span>
              </div>
              <span className="text-xl font-semibold text-slate-900">KrishiNetra</span>
            </div>
            <div className="hidden md:block text-slate-500">|</div>
            <h1 className="hidden md:block text-lg text-slate-700">Help & Support Center</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search for help articles..."
                className="pl-10 pr-4 py-2 w-full bg-slate-50 border-slate-200 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <Button 
              className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
            
            <div className="relative">
              <Bell className="w-5 h-5 text-slate-600 hover:text-slate-900 cursor-pointer transition-colors" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#ff6b35] rounded-full flex items-center justify-center">
                <span className="text-xs text-white">2</span>
              </div>
            </div>

            <Avatar className="w-8 h-8 hover:ring-2 hover:ring-[#ff6b35] transition-all cursor-pointer">
              <AvatarImage src="/api/placeholder/32/32" alt="User" />
              <AvatarFallback className="bg-[#2563eb] text-white">U</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="sm:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search for help articles..."
              className="pl-10 pr-4 py-2 w-full bg-slate-50 border-slate-200"
            />
          </div>
        </div>
      </div>
    </header>
  );
}