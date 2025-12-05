"use client"

import { useState, useEffect } from 'react';
import { QrCode, ArrowRight, Leaf, Shield, Users, Volume2, Play, Pause } from 'lucide-react';
import { Button } from '../../../ui/button';
import { ImageWithFallback } from './ImageWithFallback';
import { QRScannerModal } from './QRScannerModal';
import { toast } from 'sonner';

export function Hero() {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      setParallaxOffset(scrolled * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQRScan = () => {
    setIsQRModalOpen(true);
  };

  const handleLearnMore = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
      
      // Highlight features section briefly
      setTimeout(() => {
        featuresSection.classList.add('animate-pulse');
        setTimeout(() => {
          featuresSection.classList.remove('animate-pulse');
        }, 2000);
      }, 800);
    }
  };

  const handleAudioDescription = () => {
    if ('speechSynthesis' in window) {
      if (isAudioPlaying) {
        speechSynthesis.cancel();
        setIsAudioPlaying(false);
      } else {
        const text = "KrishiNetra is a transparent agricultural supply chain platform. It uses blockchain technology to ensure fair prices for farmers and quality products for consumers.";
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-IN';
        utterance.onstart = () => setIsAudioPlaying(true);
        utterance.onend = () => setIsAudioPlaying(false);
        speechSynthesis.speak(utterance);
      }
    } else {
      toast.error('Audio not supported on this device');
    }
  };

  return (
    <>
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced Background with Indian Farm Imagery */}
        <div className="absolute inset-0">
          {/* Base gradient with Indian colors */}
          <div className="absolute inset-0 bg-gradient-to-br from-saffron/5 via-white to-forest-green/5"></div>
          
          {/* Parallax farm background */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1709572367838-cfe0f258afdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXJzJTIwd2hlYXQlMjBmaWVsZCUyMHN1bnJpc2UlMjB0cmFkaXRpb25hbHxlbnwxfHx8fDE3NTkwODg4OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translateY(${parallaxOffset}px)`,
            }}
          ></div>
          
          {/* Indian motif decorations */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-32 h-32 border-4 border-saffron rounded-full opacity-30 animate-spin-slow"></div>
            <div className="absolute bottom-20 right-10 w-24 h-24 border-4 border-forest-green rounded-full opacity-30 animate-bounce"></div>
            <div className="absolute top-1/2 left-20 w-16 h-16 bg-ashoka-blue/20 rounded-full animate-pulse"></div>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              {/* Enhanced Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-forest-green/10 to-saffron/10 border-2 border-gradient-to-r from-forest-green/20 to-saffron/20 rounded-full px-6 py-3 mb-6 animate-fade-in shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Shield className="h-5 w-5 text-forest-green animate-pulse" />
                <span className="text-forest-green font-semibold">Government Certified</span>
              </div>

              {/* Enhanced Main heading with Indian styling */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="text-ashoka-blue">KrishiNetra</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron to-forest-green">Transparent Agriculture</span>
              </h1>

              {/* Enhanced Subheading */}
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Trace your farm produce from origin to your plate, ensuring 
                <span className="text-forest-green font-semibold"> fair pricing</span> & 
                <span className="text-ashoka-blue font-semibold"> quality assurance</span> through blockchain technology.
              </p>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
                <Button 
                  size="lg" 
                  onClick={handleQRScan}
                  className="bg-gradient-to-r from-saffron to-saffron-dark hover:from-saffron-dark hover:to-saffron text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:glow group px-8 py-4 rounded-xl"
                >
                  <QrCode className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="flex flex-col items-start p-4">
                    <span className="font-semibold">Scan QR Code</span>
                    <span className="text-xs opacity-90">Product Verification</span>
                  </span>
                  <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={handleLearnMore}
                  className="border-3 border-ashoka-blue text-ashoka-blue hover:bg-gradient-to-r hover:from-ashoka-blue hover:to-ashoka-blue-dark hover:text-white transform hover:scale-105 transition-all duration-300 group px-8 py-4 rounded-xl shadow-lg hover:shadow-xl"
                >
                  <span className="flex flex-col items-start p-4 py-6">
                    <span className="font-semibold">Learn More</span>
                    <span className="text-xs opacity-70">About Platform</span>
                  </span>
                  <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>

              {/* Audio Description Button */}
              <div className="flex justify-center lg:justify-start mb-8">
                <Button
                  variant="ghost"
                  onClick={handleAudioDescription}
                  className="text-forest-green hover:bg-forest-green/10 border border-forest-green/30 rounded-full px-6 py-2 transition-all duration-300 hover:scale-105 group"
                >
                  {isAudioPlaying ? (
                    <Pause className="h-4 w-4 mr-2" />
                  ) : (
                    <Volume2 className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                  )}
                  <span className="text-sm">
                    {isAudioPlaying ? 'Stop Audio' : 'Listen Description'}
                  </span>
                </Button>
              </div>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
                <div className="text-center group cursor-pointer">
                  <div className="text-3xl font-bold text-forest-green group-hover:scale-110 transition-transform duration-300">10K+</div>
                  <div className="text-xs text-gray-500">Verified Farmers</div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-3xl font-bold text-ashoka-blue group-hover:scale-110 transition-transform duration-300">50M+</div>
                  <div className="text-xs text-gray-500">Products Tracked</div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-3xl font-bold text-saffron group-hover:scale-110 transition-transform duration-300">100%</div>
                  <div className="text-xs text-gray-500">Transparent</div>
                </div>
              </div>
            </div>

            {/* Enhanced Visual with Indian Agricultural Theme */}
            <div className="relative">
              {/* Main card with market scene */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300 border-4 border-gradient-to-r from-saffron/20 to-forest-green/20">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1704712126497-cb1feac76a34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhZ3JpY3VsdHVyZSUyMG1hcmtldCUyMHZlZ2V0YWJsZXMlMjBzcGljZXN8ZW58MXx8fHwxNzU5MDg4ODk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Indian agriculture market with fresh vegetables and spices"
                  className="w-full h-80 object-cover rounded-2xl"
                />
                
                {/* Floating elements with Indian theme */}
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-saffron to-saffron-dark text-white p-4 rounded-2xl shadow-2xl animate-bounce hover:animate-none hover:scale-110 transition-all duration-300 cursor-pointer">
                  <QrCode className="h-8 w-8" />
                </div>
                
                <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-forest-green to-forest-green-dark text-white p-4 rounded-2xl shadow-2xl animate-pulse hover:animate-none hover:scale-110 transition-all duration-300 cursor-pointer">
                  <Leaf className="h-8 w-8" />
                </div>

                {/* Tractor icon */}
                <div className="absolute top-4 left-4 bg-ashoka-blue/90 text-white p-2 rounded-lg shadow-lg">
                  <span className="text-xl">🚜</span>
                </div>

                {/* Badge overlay */}
                <div className="absolute bottom-4 right-4 bg-white/95 px-3 py-2 rounded-lg shadow-lg border-l-4 border-forest-green">
                  <p className="text-xs text-forest-green font-semibold">Verified Quality</p>
                </div>
              </div>

              {/* Enhanced Background decorations with Indian motifs */}
              <div className="absolute -top-12 -left-12 w-40 h-40 bg-gradient-to-br from-ashoka-blue/20 to-ashoka-blue/5 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-gradient-to-br from-saffron/20 to-saffron/5 rounded-full blur-3xl animate-pulse"></div>
              
              {/* Rangoli pattern decorations */}
              <div className="absolute top-1/4 -left-8 w-6 h-6 border-2 border-forest-green/30 rounded-full animate-spin-slow"></div>
              <div className="absolute bottom-1/4 -right-8 w-8 h-8 border-2 border-saffron/30 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll indicator with Indian styling */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer group">
          <div className="w-8 h-12 border-3 border-gradient-to-b from-saffron to-forest-green rounded-full flex justify-center bg-white/80 backdrop-blur-sm shadow-lg group-hover:shadow-xl transition-all duration-300">
            <div className="w-2 h-4 bg-gradient-to-b from-saffron to-forest-green rounded-full mt-2 animate-pulse"></div>
          </div>
          <p className="text-xs text-center mt-2 text-gray-600 opacity-70 group-hover:opacity-100 transition-opacity">Scroll down</p>
        </div>
      </section>

      <QRScannerModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />
    </>
  );
}