import { X, Play } from 'lucide-react';
import { Button } from '@/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/ui/dialog';

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: {
    title: string;
    description: string;
    hindiTitle: string;
    detailedDescription: string;
    icon: any;
    color: string;
    videoUrl?: string;
    benefits: string[];
  };
}

export function FeatureModal({ isOpen, onClose, feature }: FeatureModalProps) {
  if (!feature) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-white border-2 border-gray-200 shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className={`w-12 h-12 bg-${feature.color} rounded-xl flex items-center justify-center shadow-lg`}>
              <feature.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className={`text-${feature.color} font-bold`}>{feature.hindiTitle}</h3>
              <p className="text-gray-600 text-lg font-normal">{feature.title}</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          {/* Video/Animation Section */}
          <div className="bg-gray-100 rounded-lg p-8 text-center min-h-[200px] flex items-center justify-center">
            <div className="text-center">
              <div className={`w-24 h-24 bg-gradient-to-r from-${feature.color} to-${feature.color}-light rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl animate-pulse`}>
                <feature.icon className="h-12 w-12 text-white" />
              </div>
              <Button
                variant="outline"
                className={`border-${feature.color} text-${feature.color} hover:bg-${feature.color} hover:text-white`}
              >
                <Play className="h-4 w-4 mr-2" />
                Watch Demo Video
              </Button>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="space-y-4">
            <div className={`border-l-4 border-${feature.color} pl-4 bg-${feature.color}/5 p-4 rounded-r-lg`}>
              <p className="text-gray-800 leading-relaxed">{feature.detailedDescription}</p>
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-lg">🌟</span>
              मुख्य लाभ | Key Benefits
            </h4>
            <div className="grid gap-3">
              {feature.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className={`w-6 h-6 bg-${feature.color}/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <div className={`w-3 h-3 bg-${feature.color} rounded-full`}></div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Indian Agricultural Context */}
          <div className="bg-gradient-to-r from-saffron/10 via-white to-forest-green/10 p-6 rounded-lg border-2 border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-lg">🇮🇳</span>
              भारतीय कृषि में प्रभाव | Impact on Indian Agriculture
            </h4>
            <p className="text-gray-700 leading-relaxed">
              This feature specifically addresses the challenges faced by Indian farmers and consumers, 
              ensuring transparency in the agricultural supply chain from rural farms to urban markets 
              across India's diverse agricultural landscape.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button
              className={`flex-1 bg-${feature.color} hover:bg-${feature.color}-dark text-white`}
              onClick={() => {
                onClose();
                // Simulate navigation to feature details
                alert('Redirecting to detailed feature page...');
              }}
            >
              Learn More Details
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-300 hover:bg-gray-50"
            >
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}