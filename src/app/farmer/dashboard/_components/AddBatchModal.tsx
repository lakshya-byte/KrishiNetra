import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../ui/dialog';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Textarea } from '../../../ui/textarea';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface AddBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BatchFormData {
  cropType: string;
  quantity: string;
  unit: string;
  location: string;
  harvestDate: string;
  qualityGrade: string;
  moistureContent: string;
  description: string;
}

const initialFormData: BatchFormData = {
  cropType: '',
  quantity: '',
  unit: 'kg',
  location: '',
  harvestDate: '',
  qualityGrade: '',
  moistureContent: '',
  description: '',
};

const cropOptions = [
  'Rice', 'Wheat', 'Corn', 'Soybeans', 'Cotton', 'Sugarcane', 
  'Barley', 'Pulses', 'Vegetables', 'Fruits', 'Spices', 'Other'
];

const qualityGrades = ['Grade A', 'Grade B', 'Grade C', 'Premium', 'Standard'];

const units = ['kg', 'tons', 'quintals', 'pounds'];

export function AddBatchModal({ isOpen, onClose }: AddBatchModalProps) {
  const [formData, setFormData] = useState<BatchFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<BatchFormData>>({});

  const handleInputChange = (field: keyof BatchFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<BatchFormData> = {};

    if (!formData.cropType) newErrors.cropType = 'Crop type is required';
    if (!formData.quantity) newErrors.quantity = 'Quantity is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.harvestDate) newErrors.harvestDate = 'Harvest date is required';
    if (!formData.qualityGrade) newErrors.qualityGrade = 'Quality grade is required';

    // Validate quantity is a positive number
    if (formData.quantity && (isNaN(Number(formData.quantity)) || Number(formData.quantity) <= 0)) {
      newErrors.quantity = 'Quantity must be a positive number';
    }

    // Validate moisture content if provided
    if (formData.moistureContent && (isNaN(Number(formData.moistureContent)) || Number(formData.moistureContent) < 0 || Number(formData.moistureContent) > 100)) {
      newErrors.moistureContent = 'Moisture content must be between 0-100%';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate batch ID (in real app, this would come from backend)
      const batchId = `B${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
      
      toast.success(`Batch ${batchId} created successfully!`, {
        description: `${formData.quantity} ${formData.unit} of ${formData.cropType} registered`,
      });
      
      setFormData(initialFormData);
      onClose();
    } catch (error) {
      toast.error('Failed to create batch', {
        description: 'Please try again later',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData(initialFormData);
      setErrors({});
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-ashoka-blue">
            Add New Batch
          </DialogTitle>
        </DialogHeader>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Crop Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 border-b pb-2">Crop Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cropType">Crop Type *</Label>
                <Select value={formData.cropType} onValueChange={(value) => handleInputChange('cropType', value)}>
                  <SelectTrigger className={errors.cropType ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select crop type" />
                  </SelectTrigger>
                  <SelectContent>
                    {cropOptions.map((crop) => (
                      <SelectItem key={crop} value={crop}>
                        {crop}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.cropType && (
                  <p className="text-sm text-red-500">{errors.cropType}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Farm location"
                  className={errors.location ? 'border-red-500' : ''}
                />
                {errors.location && (
                  <p className="text-sm text-red-500">{errors.location}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  placeholder="0"
                  min="0"
                  step="0.01"
                  className={errors.quantity ? 'border-red-500' : ''}
                />
                {errors.quantity && (
                  <p className="text-sm text-red-500">{errors.quantity}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Select value={formData.unit} onValueChange={(value) => handleInputChange('unit', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="harvestDate">Harvest Date *</Label>
                <Input
                  id="harvestDate"
                  type="date"
                  value={formData.harvestDate}
                  onChange={(e) => handleInputChange('harvestDate', e.target.value)}
                  className={errors.harvestDate ? 'border-red-500' : ''}
                />
                {errors.harvestDate && (
                  <p className="text-sm text-red-500">{errors.harvestDate}</p>
                )}
              </div>
            </div>
          </div>

          {/* Quality Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 border-b pb-2">Quality Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="qualityGrade">Quality Grade *</Label>
                <Select value={formData.qualityGrade} onValueChange={(value) => handleInputChange('qualityGrade', value)}>
                  <SelectTrigger className={errors.qualityGrade ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select quality grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {qualityGrades.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.qualityGrade && (
                  <p className="text-sm text-red-500">{errors.qualityGrade}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="moistureContent">Moisture Content (%)</Label>
                <Input
                  id="moistureContent"
                  type="number"
                  value={formData.moistureContent}
                  onChange={(e) => handleInputChange('moistureContent', e.target.value)}
                  placeholder="0.0"
                  min="0"
                  max="100"
                  step="0.1"
                  className={errors.moistureContent ? 'border-red-500' : ''}
                />
                {errors.moistureContent && (
                  <p className="text-sm text-red-500">{errors.moistureContent}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Additional Notes</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Optional notes about the batch..."
                rows={3}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-saffron hover:bg-saffron-light"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Creating...</span>
                </div>
              ) : (
                'Create Batch'
              )}
            </Button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
}