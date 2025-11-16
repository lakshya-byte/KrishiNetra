import { useState } from "react";
import { ChevronDown, ChevronRight, Camera, Smartphone, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../ui/collapsible";
import { Alert, AlertDescription } from "../../../ui/alert";

export function ScanningInstructions() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    instructions: false,
    troubleshooting: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const scanningSteps = [
    {
      icon: Camera,
      title: "Point camera at QR code",
      description: "Look for the QR code on your produce packaging"
    },
    {
      icon: Smartphone,
      title: "Keep code within frame",
      description: "Ensure the entire QR code fits within the scanning frame"
    },
    {
      icon: CheckCircle,
      title: "Wait for detection",
      description: "The app will automatically detect and process the code"
    }
  ];

  const troubleshootingTips = [
    {
      problem: "QR code not scanning",
      solutions: [
        "Ensure good lighting - move to a brighter area",
        "Clean your camera lens",
        "Hold the device steady",
        "Try adjusting the distance from the code"
      ]
    },
    {
      problem: "Camera not working",
      solutions: [
        "Allow camera permissions in your browser",
        "Close other apps using the camera",
        "Refresh the page and try again",
        "Check if your browser supports camera access"
      ]
    },
    {
      problem: "Invalid batch ID",
      solutions: [
        "Double-check the batch ID for typos",
        "Ensure you're entering the complete ID",
        "Look for alternative QR codes on the packaging",
        "Contact the retailer if the code appears damaged"
      ]
    }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* How to Scan Instructions */}
      <Card>
        <Collapsible 
          open={expandedSections.instructions}
          onOpenChange={() => toggleSection('instructions')}
        >
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Camera className="w-5 h-5 mr-2 text-[var(--krishinetra-saffron)]" />
                  How to Scan
                </CardTitle>
                {expandedSections.instructions ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <div className="space-y-6">
                {scanningSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-[var(--krishinetra-saffron)] bg-opacity-10 rounded-full flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[var(--krishinetra-saffron)]" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">
                          {index + 1}. {step.title}
                        </h4>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
                
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Pro tip:</strong> For best results, scan in good lighting and hold your device steady. 
                    The scanner works with QR codes, barcodes, and Data Matrix codes.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Troubleshooting Tips */}
      <Card>
        <Collapsible 
          open={expandedSections.troubleshooting}
          onOpenChange={() => toggleSection('troubleshooting')}
        >
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-[var(--krishinetra-ashoka-blue)]" />
                  Troubleshooting
                </CardTitle>
                {expandedSections.troubleshooting ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <div className="space-y-6">
                {troubleshootingTips.map((tip, index) => (
                  <div key={index} className="border-l-4 border-[var(--krishinetra-ashoka-blue)] pl-4">
                    <h4 className="font-medium text-gray-900 mb-2">{tip.problem}</h4>
                    <ul className="space-y-1">
                      {tip.solutions.map((solution, solutionIndex) => (
                        <li key={solutionIndex} className="text-sm text-gray-600 flex items-start">
                          <span className="w-1.5 h-1.5 bg-[var(--krishinetra-ashoka-blue)] rounded-full mt-2 mr-2 flex-shrink-0" />
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Still having issues? Contact our support team for assistance. 
                    We're here to help ensure you can trace your produce successfully.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
}