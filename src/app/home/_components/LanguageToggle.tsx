import { useState, useEffect } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { Button } from '../../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { toast } from 'sonner';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
];

export function LanguageToggle() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isChanging, setIsChanging] = useState(false);

  const handleLanguageChange = (language: typeof languages[0]) => {
    if (language.code === selectedLanguage.code) return;
    
    setIsChanging(true);
    
    // Show toast with language selection
    toast.success(`Language changed to ${language.nativeName}`, {
      description: `Now displaying content in ${language.name}`,
      duration: 3000,
    });
    
    // Simulate language transition with fade effect
    setTimeout(() => {
      setSelectedLanguage(language);
      setIsChanging(false);
      
      // Trigger celebratory animation (floating marigold petals)
      const petals = document.createElement('div');
      petals.className = 'fixed inset-0 pointer-events-none z-50';
      petals.innerHTML = Array.from({ length: 15 }, (_, i) => 
        `<div class="absolute animate-float-petal" style="
          left: ${Math.random() * 100}%; 
          animation-delay: ${i * 100}ms;
          animation-duration: ${3000 + Math.random() * 2000}ms;
        ">🌼</div>`
      ).join('');
      
      document.body.appendChild(petals);
      setTimeout(() => document.body.removeChild(petals), 5000);
    }, 300);
  };

  useEffect(() => {
    // Add floating petal animation to global styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float-petal {
        0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
      }
      .animate-float-petal {
        animation: float-petal 4s linear forwards;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={`gap-2 hover:bg-gray-100 transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-ashoka-blue focus:ring-offset-2 border-2 border-transparent hover:border-gradient-to-r hover:from-saffron hover:via-white hover:to-forest-green rounded-lg relative overflow-hidden ${isChanging ? 'opacity-50' : ''}`}
          style={{
            background: 'linear-gradient(to right, #FF9933 0%, #FFFFFF 50%, #138808 100%)',
            backgroundSize: '200% 2px',
            backgroundPosition: '0 100%',
            backgroundRepeat: 'no-repeat',
          }}
          aria-label="Select language"
        >
          <div className="absolute inset-0 bg-white/90 rounded-lg"></div>
          <div className="relative flex items-center gap-2">
            <Globe className="h-4 w-4 text-ashoka-blue" />
            <span className="hidden sm:inline text-gray-700">{selectedLanguage.nativeName}</span>
            <ChevronDown className="h-4 w-4 text-gray-600" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 max-h-60 overflow-y-auto border-2 border-gray-200 shadow-xl rounded-lg">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className={`flex items-center justify-between cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 focus:bg-gradient-to-r focus:from-blue-50 focus:to-orange-50 transition-all duration-200 py-3 px-4 ${
              selectedLanguage.code === language.code ? 'bg-gradient-to-r from-saffron/10 to-forest-green/10 border-l-4 border-ashoka-blue' : ''
            }`}
          >
            <span className="font-medium">{language.nativeName}</span>
            <span className="text-xs text-gray-500">{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}