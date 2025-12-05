"use client"

import { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart, ExternalLink, Volume2, VolumeX, MessageCircle, Settings } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Separator } from '../../../ui/separator';
import { Switch } from '../../../ui/switch';
import { FarmersHelpChat } from './FarmersHelpChat';
import { toast } from 'sonner';

export function Footer() {
  const [farmSoundsEnabled, setFarmSoundsEnabled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'support@krishinetra.gov.in', href: 'mailto:support@krishinetra.gov.in' },
    { icon: Phone, label: 'Phone', value: '+91-11-2345-6789', href: 'tel:+911123456789' },
    { icon: MapPin, label: 'Address', value: 'Ministry of Agriculture, Krishi Bhawan, New Delhi', href: '#' },
  ];

  const quickLinks = [
    { name: 'About KrishiNetra', hindiName: 'कृषिनेत्र के बारे में', href: '#about' },
    { name: 'How It Works', hindiName: 'कैसे काम करता है', href: '#how-it-works' },
    { name: 'Farmer Registration', hindiName: 'किसान पंजीकरण', href: '#register' },
    { name: 'Consumer Guide', hindiName: 'उपभोक्ता गाइड', href: '#guide' },
    { name: 'Download App', hindiName: 'ऐप डाउनलोड करें', href: '#app' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', hindiName: 'गोपनीयता नीति', href: '#privacy' },
    { name: 'Terms of Service', hindiName: 'सेवा की शर्तें', href: '#terms' },
    { name: 'Data Protection', hindiName: 'डेटा संरक्षण', href: '#data' },
    { name: 'Accessibility', hindiName: 'पहुंच', href: '#accessibility' },
    { name: 'RTI', hindiName: 'सूचना का अधिकार', href: '#rti' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', hoverColor: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', hoverColor: 'hover:text-blue-400' },
    { icon: Instagram, href: '#', label: 'Instagram', hoverColor: 'hover:text-pink-600' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', hoverColor: 'hover:text-blue-700' },
  ];

  const governmentPlatforms = [
    { name: 'UMANG', href: '#', description: 'Unified Mobile App for New-age Governance' },
    { name: 'Digital India', href: '#', description: 'भारत सरकार की डिजिटल पहल' },
    { name: 'PM-KISAN', href: '#', description: 'Pradhan Mantri Kisan Samman Nidhi' },
  ];

  const handleFarmSoundsToggle = () => {
    setFarmSoundsEnabled(!farmSoundsEnabled);
    if (!farmSoundsEnabled) {
      toast.success('Farm ambient sounds enabled 🌾', {
        description: 'You will now hear soothing farm sounds when hovering over buttons',
      });
    } else {
      toast.info('Farm ambient sounds disabled', {
        description: 'Button hover sounds have been turned off',
      });
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Background decorations with Indian agricultural motifs */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-6xl animate-pulse">🌾</div>
          <div className="absolute top-20 right-20 text-4xl animate-bounce">🚜</div>
          <div className="absolute bottom-20 left-20 text-5xl animate-pulse">🌽</div>
          <div className="absolute bottom-10 right-10 text-4xl animate-bounce">🏪</div>
          <div className="absolute top-1/2 left-1/4 text-3xl animate-spin-slow">⚙️</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Settings Bar */}
          <div className="py-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                {/* Farm Sounds Toggle */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {farmSoundsEnabled ? (
                      <Volume2 className="h-5 w-5 text-forest-green" />
                    ) : (
                      <VolumeX className="h-5 w-5 text-gray-400" />
                    )}
                    <span className="text-sm text-gray-300">
                      कृषि ध्वनि | Farm Sounds
                    </span>
                  </div>
                  <Switch
                    checked={farmSoundsEnabled}
                    onCheckedChange={handleFarmSoundsToggle}
                    className="data-[state=checked]:bg-forest-green"
                  />
                </div>

                {/* Language Quick Switch */}
                <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                  <span>🇮🇳</span>
                  <span>भारत की आवाज़ | Voice of India</span>
                </div>
              </div>

              {/* Farmers Help Chat Toggle */}
              <Button
                onClick={toggleChat}
                className={`flex items-center gap-2 transition-all duration-300 ${
                  isChatOpen 
                    ? 'bg-forest-green hover:bg-forest-green-dark' 
                    : 'bg-gradient-to-r from-saffron to-saffron-dark hover:from-saffron-dark hover:to-saffron'
                }`}
              >
                <MessageCircle className="h-4 w-4" />
                <span className="flex flex-col items-start">
                  <span className="text-sm font-semibold">
                    {isChatOpen ? 'चैट बंद करें' : 'किसान सहायता'}
                  </span>
                  <span className="text-xs opacity-90">
                    {isChatOpen ? 'Close Chat' : 'Farmers Help'}
                  </span>
                </span>
              </Button>
            </div>
          </div>

          {/* Main footer content */}
          <div className="py-16">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Enhanced Brand section */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-saffron via-white to-forest-green rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-saffron/80 to-forest-green/80 rounded-2xl"></div>
                    <span className="text-xl font-bold text-white relative z-10">कृ</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">कृषिनेत्र</h3>
                    <h4 className="text-lg font-semibold text-gray-300">KrishiNetra</h4>
                    <p className="text-gray-400 text-sm">भारत सरकार | Government of India</p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  भारत के कृषि पारिस्थितिकी तंत्र को पारदर्शिता, प्रौद्योगिकी और विश्वास के माध्यम से सशक्त बनाना।
                  <br />
                  <span className="text-gray-400 text-sm">
                    Empowering India's agricultural ecosystem through transparency, technology, and trust.
                  </span>
                </p>

                {/* Enhanced Social links with government platforms */}
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-semibold text-gray-400 mb-3">सामाजिक मीडिया | Social Media</h5>
                    <div className="flex gap-3">
                      {socialLinks.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          className={`w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.hoverColor} hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-saffron focus:ring-offset-2 focus:ring-offset-gray-900`}
                          aria-label={social.label}
                          onMouseEnter={() => {
                            if (farmSoundsEnabled) {
                              // Simulate farm sound on hover
                              const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMULIXH8N+HNwcfcsLx3Y0yBSuH2vrDeCI=');
                              audio.volume = 0.1;
                              audio.play().catch(() => {});
                            }
                          }}
                        >
                          <social.icon className="h-5 w-5" />
                        </a>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-gray-400 mb-3">सरकारी प्लेटफॉर्म | Govt Platforms</h5>
                    <div className="space-y-2">
                      {governmentPlatforms.map((platform) => (
                        <a
                          key={platform.name}
                          href={platform.href}
                          className="block text-xs text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1"
                        >
                          <span className="font-medium">{platform.name}</span>
                          <br />
                          <span className="text-gray-500">{platform.description}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6">
                  <span className="text-saffron">त्वरित लिंक</span>
                  <br />
                  <span className="text-sm text-gray-400">Quick Links</span>
                </h4>
                <ul className="space-y-4">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-all duration-200 flex items-center gap-2 group hover:translate-x-2"
                        onMouseEnter={() => {
                          if (farmSoundsEnabled) {
                            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMULIXH8N+HNwcfcsLx3Y0yBSuH2vrDeCI=');
                            audio.volume = 0.05;
                            audio.play().catch(() => {});
                          }
                        }}
                      >
                        <div>
                          <span className="font-medium">{link.hindiName}</span>
                          <br />
                          <span className="text-sm text-gray-400">{link.name}</span>
                        </div>
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Enhanced Legal & Compliance */}
              <div>
                <h4 className="text-lg font-semibold mb-6">
                  <span className="text-ashoka-blue">कानूनी और अनुपालन</span>
                  <br />
                  <span className="text-sm text-gray-400">Legal & Compliance</span>
                </h4>
                <ul className="space-y-4">
                  {legalLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-all duration-200 flex items-center gap-2 group hover:translate-x-2"
                        onMouseEnter={() => {
                          if (farmSoundsEnabled) {
                            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMULIXH8N+HNwcfcsLx3Y0yBSuH2vrDeCI=');
                            audio.volume = 0.05;
                            audio.play().catch(() => {});
                          }
                        }}
                      >
                        <div>
                          <span className="font-medium">{link.hindiName}</span>
                          <br />
                          <span className="text-sm text-gray-400">{link.name}</span>
                        </div>
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Enhanced Contact Info */}
              <div>
                <h4 className="text-lg font-semibold mb-6">
                  <span className="text-forest-green">संपर्क करें</span>
                  <br />
                  <span className="text-sm text-gray-400">Contact Us</span>
                </h4>
                <div className="space-y-4">
                  {contactInfo.map((contact) => (
                    <a
                      key={contact.label}
                      href={contact.href}
                      className="flex items-start gap-3 text-gray-300 hover:text-white transition-all duration-200 group p-3 rounded-lg hover:bg-gray-800/50"
                    >
                      <contact.icon className="h-5 w-5 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-200 text-forest-green" />
                      <div>
                        <p className="font-medium">{contact.label}</p>
                        <p className="text-sm text-gray-400">{contact.value}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Enhanced Emergency Contact */}
                <div className="mt-6 p-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500/30 rounded-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5"></div>
                  <div className="relative z-10">
                    <h5 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                      <Phone className="h-4 w-4 animate-pulse" />
                      किसान हेल्पलाइन | Farmer Helpline
                    </h5>
                    <p className="text-white font-bold text-xl">1800-180-1551</p>
                    <p className="text-xs text-gray-300 mt-1 flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      24/7 निःशुल्क सहायता उपलब्ध | 24/7 Free Support Available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-gray-700" />

          {/* Enhanced Bottom section */}
          <div className="py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span className="text-lg">🇮🇳</span>
                <span>© 2025 कृषिनेत्र - भारत सरकार | KrishiNetra - Government of India. All rights reserved.</span>
              </div>

              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>भारतीय कृषि के लिए</span>
                <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                <span>बनाया गया</span>
                <span className="mx-2">|</span>
                <span>Made with</span>
                <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                <span>for Indian Agriculture</span>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300 hover:scale-105"
                  onMouseEnter={() => {
                    if (farmSoundsEnabled) {
                      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMULIXH8N+HNwcfcsLx3Y0yBSuH2vrDeCI=');
                      audio.volume = 0.1;
                      audio.play().catch(() => {});
                    }
                  }}
                >
                  प्रतिक्रिया | Feedback
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300 hover:scale-105"
                  onMouseEnter={() => {
                    if (farmSoundsEnabled) {
                      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMULIXH8N+HNwcfcsLx3Y0yBSuH2vrDeCI=');
                      audio.volume = 0.1;
                      audio.play().catch(() => {});
                    }
                  }}
                >
                  समस्या रिपोर्ट करें | Report Issue
                </Button>
              </div>
            </div>

            {/* Enhanced Government compliance */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 leading-relaxed">
                यह भारत सरकार की एक आधिकारिक वेबसाइट है। सामग्री का स्वामित्व कृषि और किसान कल्याण मंत्रालय का है।
                <br />
                This is an official website of the Government of India. 
                Content owned by Ministry of Agriculture & Farmers Welfare.
              </p>
              <div className="flex justify-center items-center gap-4 mt-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500">सुरक्षित कनेक्शन | Secure Connection</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500">अंतिम अपडेट | Last updated: January 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Farmers Help Chat Component */}
      <FarmersHelpChat isOpen={isChatOpen} onToggle={toggleChat} />
    </>
  );
}