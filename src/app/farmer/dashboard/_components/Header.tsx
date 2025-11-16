import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, User, Settings, LogOut, Menu, X } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Badge } from '../../../ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../../../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export function Header({ onMenuToggle, isMenuOpen }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Batch #B001 requires attention", time: "5 min ago", unread: true },
    { id: 2, message: "Transfer completed successfully", time: "1 hour ago", unread: true },
    { id: 3, message: "Quality check scheduled for tomorrow", time: "2 hours ago", unread: false },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <motion.header 
      className={`sticky top-0 z-50 w-full border-b bg-white transition-all duration-200 ${
        isScrolled ? 'shadow-md py-2' : 'py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo and Title */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuToggle}
              className="lg:hidden"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-saffron">
                <span className="font-semibold text-white">K</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-ashoka-blue">KrishiNetra</h1>
                <p className="text-sm text-gray-500 hidden sm:block">Farmer Dashboard</p>
              </div>
            </div>
          </div>

          {/* Center Section - Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search batches by ID or crop..."
                className="pl-10 pr-4 w-full border-gray-200 focus:border-saffron focus:ring-saffron"
              />
            </div>
          </div>

          {/* Right Section - Notifications and Profile */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-saffron border-2 border-white p-0 flex items-center justify-center">
                      <span className="text-xs text-white">{unreadCount}</span>
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 animate-fade-in">
                <div className="p-3 border-b">
                  <h3 className="font-medium">Notifications</h3>
                  <p className="text-sm text-gray-500">{unreadCount} unread notifications</p>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="p-3 cursor-pointer">
                      <div className="w-full">
                        <div className="flex items-start justify-between">
                          <p className="text-sm">{notification.message}</p>
                          {notification.unread && (
                            <div className="h-2 w-2 rounded-full bg-saffron ml-2 mt-1 flex-shrink-0"></div>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 px-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/api/placeholder/32/32" alt="Farmer" />
                    <AvatarFallback className="bg-forest-green text-white">FM</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block text-sm">Farmer Name</span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 animate-fade-in">
                <DropdownMenuItem className="cursor-pointer">
                  <User size={16} className="mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings size={16} className="mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600">
                  <LogOut size={16} className="mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search batches by ID or crop..."
              className="pl-10 pr-4 w-full border-gray-200 focus:border-saffron focus:ring-saffron"
            />
          </div>
        </div>
      </div>
    </motion.header>
  );
}