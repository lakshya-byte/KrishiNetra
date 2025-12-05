"use client"

import { useState } from 'react';
import { Sprout, Truck, QrCode, CheckCircle, ArrowRight, Volume2 } from 'lucide-react';
import { Card, CardContent } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { ImageWithFallback } from './ImageWithFallback';

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: Sprout,
      title: 'Farmer Registration',
      subtitle: 'Farm to Platform',
      hindiTitle: 'किसान पंजीकरण',
      hindiSubtitle: 'खेत से प्लेटफ़ॉर्म तक',
      description: 'Farmers register their produce with complete details including origin, cultivation methods, and quality certifications.',
      hindiDescription: 'किसान अपनी उपज का पंजीकरण करते हैं, जिसमें उत्पत्ति, खेती के तरीके और गुणवत्ता प्रमाणपत्रों सहित सभी विवरण शामिल होते हैं।',
      details: [
        'Upload farm and product information',
        'Verify credentials and certifications',
        'Generate unique QR codes for batches',
        'Set fair pricing based on quality'
      ],
      color: 'forest-green',
      bgColor: 'from-green-50 to-green-100',
      agriculturalIcon: '🌾',
      illustration: 'https://images.unsplash.com/photo-1623513548172-60a045643ebf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0cmFjdG9yJTIwZmFybWluZyUyMGZpZWxkc3xlbnwxfHx8fDE3NTkwODg5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      icon: Truck,
      title: 'Supply Chain Tracking',
      subtitle: 'Transportation & Distribution',
      hindiTitle: 'आपूर्ति श्रृंखला ट्रैकिंग',
      hindiSubtitle: 'परिवहन और वितरण',
      description: 'Every transfer and processing step is recorded on blockchain, ensuring complete traceability through the supply chain.',
      hindiDescription: 'प्रत्येक स्थानांतरण और प्रसंस्करण चरण ब्लॉकचेन पर दर्ज किया जाता है, जिससे पूरी आपूर्ति श्रृंखला में पूर्ण ट्रेसबिलिटी सुनिश्चित होती है।',
      details: [
        'Track location and handling conditions',
        'Record distributor and retailer information',
        'Monitor temperature and quality parameters',
        'Update pricing at each stage'
      ],
      color: 'ashoka-blue',
      bgColor: 'from-blue-50 to-blue-100',
      agriculturalIcon: '🚛',
      illustration: 'https://images.unsplash.com/photo-1704712126497-cb1feac76a34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhZ3JpY3VsdHVyZSUyMG1hcmtldCUyMHZlZ2V0YWJsZXMlMjBzcGljZXN8ZW58MXx8fHwxNzU5MDg4ODk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      icon: QrCode,
      title: 'Consumer Verification',
      subtitle: 'Scan & Verify',
      hindiTitle: 'उपभोक्ता सत्यापन',
      hindiSubtitle: 'स्कैन करें और सत्यापित करें',
      description: 'Consumers scan QR codes to instantly access complete product history, pricing breakdown, and quality assurance.',
      hindiDescription: 'उपभोक्ता QR कोड स्कैन करके तुरंत उत्पाद का पूरा इतिहास, कीमत का विवरण और गुणवत्ता आश्वासन देख सकते हैं।',
      details: [
        'Instant QR code scanning',
        'View complete product journey',
        'Verify authenticity and quality',
        'Access farmer and pricing information'
      ],
      color: 'saffron',
      bgColor: 'from-orange-50 to-orange-100',
      agriculturalIcon: '📱',
      illustration: 'https://images.unsplash.com/photo-1709572367838-cfe0f258afdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXJzJTIwd2hlYXQlMjBmaWVsZCUyMHN1bnJpc2UlMjB0cmFkaXRpb25hbHxlbnwxfHx8fDE3NTkwODg4OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
  ];

  const speakStepDescription = (step: any) => {
    if ('speechSynthesis' in window) {
      const text = `${step.hindiTitle}. ${step.hindiDescription}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background decorations with Indian agricultural elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-8xl animate-pulse">🌾</div>
        <div className="absolute top-40 right-20 text-6xl animate-bounce">🚜</div>
        <div className="absolute bottom-20 left-20 text-7xl animate-pulse">🌽</div>
        <div className="absolute bottom-40 right-10 text-5xl animate-bounce">📱</div>
        <div className="absolute top-1/2 left-1/4 text-4xl animate-spin-slow">⚙️</div>
        <div className="absolute top-1/3 right-1/3 text-4xl animate-pulse">🏪</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-forest-green/10 to-saffron/10 border border-ashoka-blue/20 rounded-full px-6 py-3 mb-6">
            <QrCode className="h-5 w-5 text-ashoka-blue animate-pulse" />
            <span className="text-ashoka-blue font-semibold">कैसे काम करता है | How It Works</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-saffron">कृषिनेत्र</span> कैसे काम करता है
          </h2>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            How <span className="text-saffron">KrishiNetra</span> Works
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            एक सरल तीन-चरणीय प्रक्रिया जो खेत से आपकी थाली तक कृषि पारदर्शिता को बदल देती है
            <br />
            <span className="text-lg text-gray-500">A simple three-step process that transforms agricultural transparency from farm to your table</span>
          </p>
        </div>

        {/* Enhanced Interactive Timeline */}
        <div className="mb-16">
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Enhanced Timeline line with Indian flag colors */}
              <div className="absolute top-20 left-0 right-0 h-2 bg-gray-200 rounded-full shadow-inner">
                <div 
                  className={`h-full bg-gradient-to-r from-saffron via-white to-forest-green rounded-full transition-all duration-1000 shadow-lg`}
                  style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>

              {/* Enhanced Steps */}
              <div className="relative grid grid-cols-3 gap-8">
                {steps.map((step, index) => (
                  <div
                    key={step.title}
                    className="text-center cursor-pointer group"
                    onClick={() => setActiveStep(index)}
                  >
                    {/* Enhanced step circle */}
                    <div className="relative mb-6">
                      <div 
                        className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl relative overflow-hidden ${ 
                          index <= activeStep 
                            ? `bg-gradient-to-r from-${step.color} to-${step.color}-light scale-110 animate-pulse` 
                            : 'bg-gray-200 group-hover:bg-gray-300 group-hover:scale-105'
                        }`}
                      >
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="text-3xl absolute top-1 right-1">{step.agriculturalIcon}</div>
                        </div>
                        
                        <step.icon 
                          className={`h-10 w-10 transition-all duration-500 relative z-10 ${
                            index <= activeStep ? 'text-white' : 'text-gray-400'
                          } group-hover:scale-110`} 
                        />
                      </div>
                      
                      {/* Indian language badge */}
                      <div className={`mb-3 px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 ${
                        index === activeStep 
                          ? `bg-${step.color} text-white shadow-lg` 
                          : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                      }`}>
                        {step.hindiTitle}
                      </div>
                    </div>
                    
                    <h3 className={`font-bold mb-2 text-lg transition-colors duration-300 ${
                      index === activeStep ? `text-${step.color}` : 'text-gray-600 group-hover:text-gray-800'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-500">{step.subtitle}</p>
                    <p className="text-xs text-gray-400 mt-1">{step.hindiSubtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Mobile Timeline */}
          <div className="lg:hidden space-y-6">
            {steps.map((step, index) => (
              <div 
                key={step.title}
                className={`flex items-start gap-4 p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer shadow-lg relative overflow-hidden ${ 
                  index === activeStep 
                    ? `border-${step.color} bg-gradient-to-r ${step.bgColor} shadow-xl` 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-xl bg-white'
                }`}
                onClick={() => setActiveStep(index)}
              >
                {/* Background decoration */}
                <div className="absolute top-2 right-2 text-2xl opacity-20">{step.agriculturalIcon}</div>
                
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 relative overflow-hidden ${
                  index === activeStep ? `bg-gradient-to-r from-${step.color} to-${step.color}-light shadow-lg` : 'bg-gray-200'
                }`}>
                  <step.icon className={`h-8 w-8 ${
                    index === activeStep ? 'text-white' : 'text-gray-400'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                    index === activeStep 
                      ? `bg-${step.color} text-white` 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {step.hindiTitle}
                  </div>
                  <h3 className={`font-bold mb-1 text-lg ${
                    index === activeStep ? `text-${step.color}` : 'text-gray-900'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">{step.subtitle}</p>
                  <p className="text-xs text-gray-400">{step.hindiSubtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Active Step Details */}
        <Card className={`bg-gradient-to-r ${steps[activeStep].bgColor} border-0 shadow-2xl relative overflow-hidden`}>
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 right-4 text-6xl">{steps[activeStep].agriculturalIcon}</div>
            <div className="absolute bottom-4 left-4 text-4xl">🇮🇳</div>
          </div>
          
          <CardContent className="p-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-r from-${steps[activeStep].color} to-${steps[activeStep].color}-light rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
                    {(() => {
                      const IconComponent = steps[activeStep].icon;
                      return <IconComponent className="h-10 w-10 text-white relative z-10" />;
                    })()}
                  </div>
                  <div>
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-2 bg-${steps[activeStep].color} text-white shadow-lg`}>
                      {steps[activeStep].hindiTitle}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {steps[activeStep].title}
                    </h3>
                    <p className={`text-${steps[activeStep].color} font-medium text-lg`}>
                      {steps[activeStep].subtitle}
                    </p>
                    <p className="text-gray-600 text-sm">{steps[activeStep].hindiSubtitle}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => speakStepDescription(steps[activeStep])}
                    className="text-gray-600 hover:text-ashoka-blue ml-auto"
                  >
                    <Volume2 className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-4 mb-6">
                  <p className="text-gray-700 text-lg leading-relaxed font-medium">
                    {steps[activeStep].hindiDescription}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {steps[activeStep].description}
                  </p>
                </div>

                <div className="space-y-4">
                  {steps[activeStep].details.map((detail, index) => (
                    <div 
                      key={detail}
                      className="flex items-start gap-3 group p-3 rounded-lg hover:bg-white/50 transition-all duration-200"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CheckCircle className={`h-6 w-6 text-${steps[activeStep].color} flex-shrink-0 group-hover:scale-110 transition-transform duration-200 mt-0.5`} />
                      <span className="text-gray-700 leading-relaxed">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Illustration */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-xl border-4 border-white/50">
                  <ImageWithFallback
                    src={steps[activeStep].illustration}
                    alt={`${steps[activeStep].title} illustration`}
                    className="w-full h-64 object-cover rounded-xl mb-4"
                  />
                  <div className="space-y-3">
                    <div className={`h-4 bg-gradient-to-r from-${steps[activeStep].color}/20 to-${steps[activeStep].color}/10 rounded animate-pulse`}></div>
                    <div className={`h-4 bg-gradient-to-r from-${steps[activeStep].color}/15 to-${steps[activeStep].color}/5 rounded w-3/4 animate-pulse`}></div>
                    <div className={`h-4 bg-gradient-to-r from-${steps[activeStep].color}/10 to-${steps[activeStep].color}/5 rounded w-1/2 animate-pulse`}></div>
                  </div>
                </div>

                {/* Enhanced Floating action button */}
                <div className="absolute -bottom-6 -right-6">
                  <Button 
                    size="lg"
                    className={`bg-gradient-to-r from-${steps[activeStep].color} to-${steps[activeStep].color}-dark hover:from-${steps[activeStep].color}-dark hover:to-${steps[activeStep].color} shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group rounded-2xl px-8 py-4`}
                  >
                    <span className="flex flex-col items-start mr-2">
                      <span className="font-semibold">अभी करें</span>
                      <span className="text-xs opacity-90">Try Now</span>
                    </span>
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Navigation with Indian flag colors */}
        <div className="flex justify-center mt-8 gap-6">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`relative group transition-all duration-300 ${
                index === activeStep ? 'scale-125' : 'hover:scale-110'
              }`}
              aria-label={`Go to step ${index + 1}: ${step.title}`}
            >
              <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === activeStep 
                  ? `bg-${step.color} shadow-lg animate-pulse` 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}></div>
              
              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {step.hindiTitle}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}