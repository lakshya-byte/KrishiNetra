import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Checkbox } from '../../../ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../../ui/collapsible';
import { 
  ChevronDown, 
  Filter, 
  Calendar,
  Users,
  Wheat,
  RotateCcw,
  Loader2
} from 'lucide-react';

export function FiltersPanel() {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('7days');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);

  const dateRanges = [
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '90days', label: 'Last 90 days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const roles = [
    { value: 'all', label: 'All Roles' },
    { value: 'farmer', label: 'Farmer' },
    { value: 'distributor', label: 'Distributor' },
    { value: 'retailer', label: 'Retailer' }
  ];

  const crops = [
    'Rice', 'Wheat', 'Corn', 'Sugarcane', 'Cotton', 'Soybeans', 'Tea', 'Coffee'
  ];

  const handleCropToggle = (crop: string) => {
    setSelectedCrops(prev => 
      prev.includes(crop) 
        ? prev.filter(c => c !== crop)
        : [...prev, crop]
    );
  };

  const handleApplyFilters = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const handleResetFilters = () => {
    setSelectedDateRange('7days');
    setSelectedRole('all');
    setSelectedCrops([]);
  };

  return (
    <Card className="mb-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5" style={{ color: 'var(--ashoka-blue)' }} />
                <span>Filters & Controls</span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Date Range */}
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Date Range</span>
                </Label>
                <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {dateRanges.map(range => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedDateRange === 'custom' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex space-x-2"
                  >
                    <Input type="date" placeholder="Start Date" />
                    <Input type="date" placeholder="End Date" />
                  </motion.div>
                )}
              </div>

              {/* Role Selector */}
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Role</span>
                </Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Crop Types */}
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Wheat className="h-4 w-4" />
                  <span>Crop Types</span>
                </Label>
                <div className="max-h-32 overflow-y-auto border rounded-md p-2 space-y-2">
                  {crops.map(crop => (
                    <div key={crop} className="flex items-center space-x-2">
                      <Checkbox
                        id={crop}
                        checked={selectedCrops.includes(crop)}
                        onCheckedChange={() => handleCropToggle(crop)}
                      />
                      <Label htmlFor={crop} className="text-sm">
                        {crop}
                      </Label>
                    </div>
                  ))}
                </div>
                {selectedCrops.length > 0 && (
                  <p className="text-xs text-gray-500">
                    {selectedCrops.length} crop{selectedCrops.length !== 1 ? 's' : ''} selected
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Label>Actions</Label>
                <div className="space-y-2">
                  <Button
                    onClick={handleApplyFilters}
                    disabled={isLoading}
                    className="w-full bg-[var(--ashoka-blue)] hover:bg-[var(--ashoka-blue-dark)] text-white"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Applying...
                      </>
                    ) : (
                      'Apply Filters'
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleResetFilters}
                    className="w-full"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}