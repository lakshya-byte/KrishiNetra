"use client"

import { useState } from 'react';
import { Eye, DollarSign, Shield, Leaf, Users, BarChart3, Wheat, ShoppingCart, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/ui/card';
import { FeatureModal } from './FeatureModal';

const featuresData = [
  {
    icon: Eye,
    title: 'Complete Transparency',
    description: 'Get complete visibility into pricing, origin, and journey of every product from farm to your table.',
    detailedDescription: 'Our blockchain-powered transparency system provides real-time tracking of agricultural products from seed to shelf. Every step of the supply chain is recorded immutably, allowing consumers to verify the authenticity, origin, and quality of their food products.',
    color: 'ashoka-blue',
    bgGradient: 'from-blue-50 to-blue-100',
    benefits: [
      'Real-time tracking of products from farm to consumer',
      'Immutable blockchain records ensure data integrity',
      'QR code verification for instant product information',
      'Detailed journey mapping with timestamps and locations'
    ],
    agriculturalIcon: '🌾'
  },
  {
    icon: DollarSign,
    title: 'Fair Pricing',
    description: 'Empowering farmers with equitable value and ensuring consumers get fair prices through transparent pricing.',
    detailedDescription: 'Our platform eliminates middlemen exploitation by connecting farmers directly with consumers and retailers. Dynamic pricing algorithms ensure fair compensation for farmers while maintaining reasonable prices for consumers.',
    color: 'forest-green',
    bgGradient: 'from-green-50 to-green-100',
    benefits: [
      'Direct farmer-to-consumer pricing without middleman markup',
      'Real-time market price discovery and optimization',
      'Guaranteed minimum support prices for farmers',
      'Transparent cost breakdown for all stakeholders'
    ],
    agriculturalIcon: '🏪'
  },
  {
    icon: Shield,
    title: 'Consumer Trust',
    description: 'Verified produce through blockchain technology ensures authenticity and builds lasting consumer confidence.',
    detailedDescription: 'Advanced verification systems using IoT sensors, blockchain technology, and government certifications ensure that every product meets quality standards and safety requirements.',
    color: 'saffron',
    bgGradient: 'from-orange-50 to-orange-100',
    benefits: [
      'Government-certified quality assurance',
      'Blockchain-verified authenticity certificates',
      'Real-time quality monitoring with IoT sensors',
      'Consumer feedback and rating system integration'
    ],
    agriculturalIcon: '🛡️'
  },
];

const stats = [
  { 
    icon: Users, 
    value: '10,000+', 
    label: 'Verified Farmers',
    color: 'forest-green',
    description: 'Registered farmers across India using our platform'
  },
  { 
    icon: BarChart3, 
    value: '50M+', 
    label: 'Products Tracked',
    color: 'ashoka-blue',
    description: 'Agricultural products tracked from farm to consumer'
  },
  { 
    icon: Leaf, 
    value: '500+', 
    label: 'Supply Chains',
    color: 'saffron',
    description: 'Transparent supply chains across different crops'
  },
];

export function Features() {
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFeatureClick = (feature: any) => {
    setSelectedFeature(feature);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFeature(null);
  };

  return (
    <>
      <section id="features" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Background decorations with Indian motifs */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 text-6xl animate-pulse">🌾</div>
          <div className="absolute top-40 right-20 text-4xl animate-bounce">🚜</div>
          <div className="absolute bottom-20 left-20 text-5xl animate-pulse">🌽</div>
          <div className="absolute bottom-40 right-10 text-4xl animate-bounce">🏪</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced Section header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-forest-green/10 to-saffron/10 border border-forest-green/20 rounded-full px-6 py-3 mb-6">
              <Wheat className="h-5 w-5 text-forest-green" />
              <span className="text-forest-green font-semibold">Future of Indian Agriculture</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Empowering <span className="text-forest-green">Agriculture</span> Through <span className="text-ashoka-blue">Technology</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              KrishiNetra brings transparency to India's agricultural supply chain, ensuring 
              <span className="text-forest-green font-semibold"> fair prices for farmers</span> and 
              <span className="text-ashoka-blue font-semibold"> quality assurance for consumers</span> 
              through cutting-edge blockchain technology.
            </p>
          </div>

          {/* Enhanced Main features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {featuresData.map((feature, index) => (
              <Card 
                key={feature.title}
                onClick={() => handleFeatureClick(feature)}
                className={`group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1 border-0 bg-gradient-to-br ${feature.bgGradient} overflow-hidden cursor-pointer relative`}
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <CardContent className="p-8 relative">
                  {/* Background decoration with Indian motif */}
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-${feature.color}/20 to-transparent rounded-full transform translate-x-10 -translate-y-10`}></div>
                  <div className="absolute top-4 right-4 text-2xl opacity-20">{feature.agriculturalIcon}</div>
                  
                  {/* Enhanced Icon */}
                  <div className={`w-20 h-20 bg-gradient-to-r from-${feature.color} to-${feature.color}-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
                    <feature.icon className="h-10 w-10 text-white relative z-10" />
                  </div>

                  {/* Enhanced Content */}
                  <div className="space-y-3">
                    <h3 className={`text-xl font-bold text-${feature.color} group-hover:text-${feature.color}-dark transition-colors duration-300`}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Click indicator */}
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                      Click to learn more
                    </span>
                    <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-md">
                      <TrendingUp className="h-4 w-4 text-gray-600 group-hover:text-ashoka-blue" />
                    </div>
                  </div>

                  {/* Enhanced Hover effect line */}
                  <div className={`absolute bottom-0 left-0 h-2 bg-gradient-to-r from-${feature.color} to-${feature.color}-light w-0 group-hover:w-full transition-all duration-700 rounded-t-lg`}></div>
                  
                  {/* Slide up overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-${feature.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg`}></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enhanced Stats section */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-t-4 border-gradient-to-r from-saffron via-white to-forest-green relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-saffron via-white to-forest-green"></div>
              <div className="absolute top-10 left-10 text-4xl">🇮🇳</div>
              <div className="absolute bottom-10 right-10 text-4xl">📊</div>
            </div>

            <div className="text-center mb-8 relative z-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Our Impact
              </h3>
              <p className="text-gray-600 text-lg">Transforming agriculture across India</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="text-center group cursor-pointer p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300"
                  style={{
                    animationDelay: `${index * 200}ms`,
                  }}
                >
                  <div className={`w-20 h-20 bg-gradient-to-r from-${stat.color} to-${stat.color}-light rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl`}>
                    <stat.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className={`text-4xl font-bold text-${stat.color} mb-2 group-hover:scale-105 transition-transform duration-300`}>
                    {stat.value}
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                    <div className="text-xs text-gray-500 leading-relaxed">{stat.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FeatureModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        feature={selectedFeature} 
      />
    </>
  );
}