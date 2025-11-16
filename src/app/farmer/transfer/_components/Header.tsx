import { useState, useEffect } from 'react';
import { Bell, User, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { Button } from '../../../ui/button';

interface HeaderProps {
  title: string;
  breadcrumbs: string[];
}

export function Header({ title, breadcrumbs }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-white py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--saffron-orange)] to-[var(--saffron-orange-dark)] flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span 
                className="font-bold text-lg"
                style={{ color: 'var(--ashoka-blue)' }}
              >
                KrishiNetra
              </span>
            </div>
          </div>

          {/* Center - Title and Breadcrumbs */}
          <div className="hidden md:flex flex-col items-center">
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            <nav className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center">
                  <span className="hover:text-gray-700 cursor-pointer transition-colors">
                    {crumb}
                  </span>
                  {index < breadcrumbs.length - 1 && (
                    <ChevronRight className="w-4 h-4 mx-1" />
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Right side - Notifications and Profile */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-gray-100"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
              <AvatarFallback className="bg-gray-200">
                <User className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Mobile title and breadcrumbs */}
        <div className="md:hidden mt-3">
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          <nav className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center">
                <span>{crumb}</span>
                {index < breadcrumbs.length - 1 && (
                  <ChevronRight className="w-3 h-3 mx-1" />
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}