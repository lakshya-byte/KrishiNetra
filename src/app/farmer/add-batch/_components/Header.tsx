import { Bell, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--saffron-orange)] to-[var(--forest-green)] flex items-center justify-center">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <span className="text-xl font-semibold text-[var(--ashoka-blue)]">KrishiNetra</span>
        </div>

        {/* Page Title */}
        <div className="hidden md:block">
          <h1 className="text-xl font-semibold text-gray-800">Add New Produce Batch</h1>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-[var(--saffron-orange)] transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          <Avatar>
            <AvatarImage src="/api/placeholder/32/32" alt="User" />
            <AvatarFallback className="bg-[var(--forest-green)] text-white">
              <User size={16} />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}