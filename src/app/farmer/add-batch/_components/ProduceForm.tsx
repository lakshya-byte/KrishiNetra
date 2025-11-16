"use client"

import { useState, useCallback } from "react";
import { CalendarDays, Upload, X, MapPin, Info, Wheat, Sprout, Carrot, Leaf, Coffee } from "lucide-react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select";
import { Textarea } from "../../../ui/textarea";
import { Checkbox } from "../../../ui/checkbox";
import { Calendar } from "../../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../ui/tooltip";
import { format } from "date-fns";
import { motion, AnimatePresence } from "motion/react";

const produceTypes = [
  { value: "wheat", label: "Wheat", icon: Wheat },
  { value: "rice", label: "Rice", icon: Sprout },
  { value: "turmeric", label: "Turmeric", icon: Carrot },
  { value: "corn", label: "Corn", icon: Leaf },
  { value: "pulses", label: "Pulses", icon: Coffee },
  { value: "sugarcane", label: "Sugarcane", icon: Sprout },
  { value: "cotton", label: "Cotton", icon: Sprout },
  { value: "tea", label: "Tea", icon: Coffee },
  { value: "coffee", label: "Coffee", icon: Coffee },
  { value: "onion", label: "Onion", icon: Carrot },
  { value: "potato", label: "Potato", icon: Carrot },
  { value: "tomato", label: "Tomato", icon: Carrot },
];

const units = [
  { value: "kg", label: "Kilograms" },
  { value: "quintal", label: "Quintals" },
  { value: "ton", label: "Tons" },
];

const qualityMetrics = [
  { 
    id: "organic", 
    label: "Organic", 
    description: "Grown without synthetic pesticides or fertilizers" 
  },
  { 
    id: "pesticide-free", 
    label: "Pesticide-free", 
    description: "No pesticides used during cultivation" 
  },
  { 
    id: "grade-a", 
    label: "Grade A", 
    description: "Premium quality produce meeting highest standards" 
  },
  { 
    id: "certified", 
    label: "Certified", 
    description: "Government or third-party certified quality" 
  },
];

export function ProduceForm() {
  const [formData, setFormData] = useState({
    produceType: "",
    quantity: "",
    unit: "kg",
    location: "",
    harvestDate: undefined as Date | undefined,
    qualityMetrics: [] as string[],
    notes: "",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: string, value: any) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case "produceType":
        if (!value) newErrors.produceType = "Please select a produce type";
        else delete newErrors.produceType;
        break;
      case "quantity":
        if (!value || parseFloat(value) <= 0) {
          newErrors.quantity = "Please enter a valid quantity";
        } else delete newErrors.quantity;
        break;
      case "location":
        if (!value || value.length < 3) {
          newErrors.location = "Please enter a valid location";
        } else delete newErrors.location;
        break;
      case "harvestDate":
        if (!value) newErrors.harvestDate = "Please select harvest date";
        else if (value > new Date()) {
          newErrors.harvestDate = "Harvest date cannot be in the future";
        } else delete newErrors.harvestDate;
        break;
    }
    
    setErrors(newErrors);
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleQualityMetricChange = (metricId: string, checked: boolean) => {
    const newMetrics = checked 
      ? [...formData.qualityMetrics, metricId]
      : formData.qualityMetrics.filter(id => id !== metricId);
    handleInputChange("qualityMetrics", newMetrics);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => {
      const isValidType = file.type.match(/^(image\/(jpeg|png)|application\/pdf)$/);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      return isValidType && isValidSize;
    });
    
    setFiles(prev => [...prev, ...validFiles]);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    Object.keys(formData).forEach(key => {
      if (key !== "notes" && key !== "qualityMetrics") {
        validateField(key, formData[key as keyof typeof formData]);
      }
    });

    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      produceType: "",
      quantity: "",
      unit: "kg",
      location: "",
      harvestDate: undefined,
      qualityMetrics: [],
      notes: "",
    });
    setFiles([]);
    
    alert("Batch registered successfully!");
  };

  const clearForm = () => {
    setFormData({
      produceType: "",
      quantity: "",
      unit: "kg",
      location: "",
      harvestDate: undefined,
      qualityMetrics: [],
      notes: "",
    });
    setFiles([]);
    setErrors({});
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-[var(--cream-white)] to-white py-8 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-[var(--ashoka-blue)] mb-2">
                Register New Produce Batch
              </h2>
              <p className="text-gray-600">
                Add details about your harvest to track and manage your agricultural produce
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Produce Type */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-2"
              >
                <Label htmlFor="produceType" className="text-gray-700">
                  Produce Type *
                </Label>
                <Select
                  value={formData.produceType}
                  onValueChange={(value) => handleInputChange("produceType", value)}
                >
                  <SelectTrigger 
                    className={`w-full transition-all duration-200 ${
                      errors.produceType 
                        ? "border-red-500 focus:border-red-500 animate-pulse" 
                        : "focus:border-[var(--saffron-orange)] focus:ring-[var(--saffron-orange)]/20"
                    }`}
                  >
                    <SelectValue placeholder="Select produce type" />
                  </SelectTrigger>
                  <SelectContent>
                    {produceTypes.map((produce) => {
                      const Icon = produce.icon;
                      return (
                        <SelectItem key={produce.value} value={produce.value}>
                          <div className="flex items-center space-x-2">
                            <Icon size={16} className="text-[var(--forest-green)]" />
                            <span>{produce.label}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {errors.produceType && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.produceType}
                  </motion.p>
                )}
              </motion.div>

              {/* Quantity and Unit */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <Label htmlFor="quantity" className="text-gray-700">
                  Quantity *
                </Label>
                <div className="flex space-x-2">
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Enter quantity"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange("quantity", e.target.value)}
                    className={`flex-1 transition-all duration-200 ${
                      errors.quantity 
                        ? "border-red-500 focus:border-red-500 animate-pulse" 
                        : "focus:border-[var(--saffron-orange)] focus:ring-[var(--saffron-orange)]/20"
                    }`}
                  />
                  <Select
                    value={formData.unit}
                    onValueChange={(value) => handleInputChange("unit", value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {errors.quantity && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.quantity}
                  </motion.p>
                )}
              </motion.div>

              {/* Farm Location */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="location" className="text-gray-700">
                  Farm Location *
                </Label>
                <div className="relative">
                  <MapPin 
                    size={16} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                  />
                  <Input
                    id="location"
                    type="text"
                    placeholder="Enter farm location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className={`pl-10 transition-all duration-200 ${
                      errors.location 
                        ? "border-red-500 focus:border-red-500 animate-pulse" 
                        : "focus:border-[var(--saffron-orange)] focus:ring-[var(--saffron-orange)]/20"
                    }`}
                  />
                </div>
                {errors.location && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.location}
                  </motion.p>
                )}
              </motion.div>

              {/* Harvest Date */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <Label className="text-gray-700">Harvest Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal transition-all duration-200 ${
                        !formData.harvestDate && "text-muted-foreground"
                      } ${
                        errors.harvestDate 
                          ? "border-red-500 focus:border-red-500 animate-pulse" 
                          : "focus:border-[var(--saffron-orange)] focus:ring-[var(--saffron-orange)]/20"
                      }`}
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {formData.harvestDate ? (
                        format(formData.harvestDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.harvestDate}
                      onSelect={(date) => handleInputChange("harvestDate", date)}
                      disabled={(date) => date > new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.harvestDate && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.harvestDate}
                  </motion.p>
                )}
              </motion.div>

              {/* Quality Metrics */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-3"
              >
                <Label className="text-gray-700">Quality Metrics (Optional)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {qualityMetrics.map((metric) => (
                    <div key={metric.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={metric.id}
                        checked={formData.qualityMetrics.includes(metric.id)}
                        onCheckedChange={(checked) => 
                          handleQualityMetricChange(metric.id, checked as boolean)
                        }
                        className="data-[state=checked]:bg-[var(--forest-green)] data-[state=checked]:border-[var(--forest-green)]"
                      />
                      <Label htmlFor={metric.id} className="flex items-center space-x-1 cursor-pointer">
                        <span>{metric.label}</span>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info size={14} className="text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-64">{metric.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* File Upload */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-3"
              >
                <Label className="text-gray-700">
                  Upload Certifications / Images (Optional)
                </Label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                    isDragging 
                      ? "border-[var(--saffron-orange)] bg-[var(--saffron-orange)]/5" 
                      : "border-gray-300 hover:border-[var(--forest-green)]"
                  }`}
                >
                  <Upload size={24} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-600 mb-2">
                    Drag and drop files here, or{" "}
                    <label className="text-[var(--saffron-orange)] cursor-pointer hover:underline">
                      browse
                      <input
                        type="file"
                        multiple
                        accept="image/jpeg,image/png,application/pdf"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500">
                    JPEG, PNG, PDF up to 5MB each
                  </p>
                </div>
                
                {/* File Preview */}
                <AnimatePresence>
                  {files.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      {files.map((file, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded"
                        >
                          <span className="text-sm text-gray-700 truncate flex-1">
                            {file.name}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                          >
                            <X size={14} />
                          </Button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Additional Notes */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-2"
              >
                <Label htmlFor="notes" className="text-gray-700">
                  Additional Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Add any remarks or special instructions..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  rows={4}
                  className="resize-none focus:border-[var(--saffron-orange)] focus:ring-[var(--saffron-orange)]/20 transition-all duration-200"
                />
              </motion.div>

              {/* Form Actions */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 pt-6"
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[var(--saffron-orange)] hover:bg-[var(--saffron-orange-dark)] text-white py-3 transition-all duration-200 transform hover:scale-105 disabled:scale-100"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : null}
                  {isSubmitting ? "Registering..." : "Register Batch"}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={clearForm}
                  className="sm:w-auto border-[var(--ashoka-blue)] text-[var(--ashoka-blue)] hover:bg-[var(--ashoka-blue)] hover:text-white transition-all duration-200"
                >
                  Clear Form
                </Button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </TooltipProvider>
  );
}