import { useState } from "react";
import { motion } from "motion/react";
import { 
  MapPin, Calendar, Truck, Store, CheckCircle, Leaf, 
  Award, Share2, Heart, Flag, ChevronDown, ChevronRight 
} from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import { Button } from "../../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Badge } from "../../../ui/badge";
import { Progress } from "../../../ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../ui/collapsible";

interface TraceResultsProps {
  batchId: string;
}

export function TraceResults({ batchId }: TraceResultsProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Mock data for demonstration
  const productData = {
    name: "Organic Roma Tomatoes",
    image: "https://images.unsplash.com/photo-1710600516542-3725023333e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBwcm9kdWNlJTIwcGFja2FnaW5nfGVufDF8fHx8MTc1OTIwNjc3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    batchId,
    farmName: "Green Valley Organic Farm",
    farmLocation: "Pune, Maharashtra",
    harvestDate: "2024-01-15",
    daysOld: 7,
    grade: "Grade A",
    certifications: ["Organic", "Fair Trade", "Non-GMO"],
    freshness: 85,
    journey: [
      {
        stage: "Farm",
        icon: Leaf,
        date: "2024-01-15",
        location: "Green Valley Farm, Pune",
        stakeholder: "Ramesh Kumar",
        duration: "Harvest"
      },
      {
        stage: "Distribution",
        icon: Truck,
        date: "2024-01-16",
        location: "Regional Hub, Mumbai",
        stakeholder: "AgriLogistics Ltd",
        duration: "1 day"
      },
      {
        stage: "Retail",
        icon: Store,
        date: "2024-01-18",
        location: "Fresh Market, Delhi",
        stakeholder: "FreshMart Store",
        duration: "2 days"
      }
    ],
    farmer: {
      name: "Ramesh Kumar",
      image: "https://images.unsplash.com/photo-1657348734524-501b2236ad85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXIlMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NTkxMzMyMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      practices: "Sustainable organic farming with natural pest control and crop rotation",
      farmSize: "5 acres"
    },
    pricing: {
      farmPrice: "₹40/kg",
      retailPrice: "₹80/kg"
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto space-y-6"
    >
      {/* Product Summary Card */}
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-48 h-48 flex-shrink-0">
              <ImageWithFallback
                src={productData.image}
                alt={productData.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">{productData.name}</h3>
                <p className="text-gray-600">Batch ID: {productData.batchId}</p>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-[var(--krishinetra-forest-green)]" />
                <span>From {productData.farmName}, {productData.farmLocation}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Freshness Score</span>
                  <span className="text-sm font-medium">{productData.freshness}%</span>
                </div>
                <Progress 
                  value={productData.freshness} 
                  className="h-2"
                  style={{
                    backgroundColor: '#f0f0f0'
                  }}
                />
                <p className="text-xs text-gray-500">{productData.daysOld} days since harvest</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-[var(--krishinetra-forest-green)] text-white">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Blockchain Verified
                </Badge>
                {productData.certifications.map((cert) => (
                  <Badge key={cert} variant="secondary">
                    <Award className="w-3 h-3 mr-1" />
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Journey Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Truck className="w-5 h-5 mr-2 text-[var(--krishinetra-ashoka-blue)]" />
            Product Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {productData.journey.map((stage, index) => {
              const Icon = stage.icon;
              const isLast = index === productData.journey.length - 1;
              
              return (
                <motion.div
                  key={stage.stage}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="flex items-start space-x-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 bg-[var(--krishinetra-saffron)] rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      {!isLast && (
                        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-300" />
                      )}
                    </div>
                    
                    <motion.div 
                      className="flex-1 bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{stage.stage}</h4>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Calendar className="w-3 h-3 mr-1" />
                            {stage.date}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {stage.location}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Handled by {stage.stakeholder}</p>
                        </div>
                        <Badge variant="outline">{stage.duration}</Badge>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Farmer Story */}
        <Card>
          <Collapsible>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Leaf className="w-5 h-5 mr-2 text-[var(--krishinetra-forest-green)]" />
                    Farmer Story
                  </CardTitle>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <ImageWithFallback
                    src={productData.farmer.image}
                    alt={productData.farmer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium">{productData.farmer.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{productData.farmer.farmSize} organic farm</p>
                    <p className="text-sm text-gray-700">{productData.farmer.practices}</p>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Price Transparency */}
        <Card>
          <Collapsible>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-[var(--krishinetra-ashoka-blue)]" />
                    Price Transparency
                  </CardTitle>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium">Farm Price</span>
                    <span className="font-semibold text-[var(--krishinetra-forest-green)]">
                      {productData.pricing.farmPrice}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium">Retail Price</span>
                    <span className="font-semibold text-[var(--krishinetra-ashoka-blue)]">
                      {productData.pricing.retailPrice}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Price difference includes processing, packaging, transport, and retail margin
                  </p>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button variant="outline" className="flex items-center">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" className="flex items-center">
              <Heart className="w-4 h-4 mr-2" />
              Save to Favorites
            </Button>
            <Button variant="outline" className="flex items-center">
              <Flag className="w-4 h-4 mr-2" />
              Report Issue
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}