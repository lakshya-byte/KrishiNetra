"use client"

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import { ImageWithFallback } from './ImageWithFallback';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Scan & Trace', href: '#scan' },
    { name: 'Login/Signup', href: '/auth' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md' 
          : 'bg-white/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and emblem */}
          <div className="flex items-center gap-4">
            {/* Government of India Emblem */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-saffron to-saffron-light flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1739460677746-7aec1b70a3f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwaW5kaWElMjBlbWJsZW18ZW58MXx8fHwxNzU5MDg2MzMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Government of India Emblem"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            
            {/* Brand name and text */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="text-forest-green font-bold text-xl">KrishiNetra</h1>
                <div className="hidden md:flex items-center gap-1 text-xs bg-gradient-to-r from-ashoka-blue to-ashoka-blue-light text-white px-2 py-1 rounded-full">
                  <span>🇮🇳</span>
                  <span>Digital India</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 hidden sm:block">Government of India</p>
            </div>
            
            {/* Digital India Logo */}
            <div className="hidden lg:block w-8 h-8 opacity-80 hover:opacity-100 transition-opacity duration-300">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1642310290551-091541073559?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwaW5kaWElMjBsb2dvJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTkwMDEzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Digital India Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-ashoka-blue font-medium transition-colors duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ashoka-blue focus:ring-offset-2 rounded-md px-2 py-1"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Language Toggle and Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <LanguageToggle />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-ashoka-blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-ashoka-blue focus:ring-offset-2 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-gray-700 hover:text-ashoka-blue hover:bg-gray-50 rounded-md font-medium transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}