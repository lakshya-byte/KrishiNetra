"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, Check, X, User, Mail, Lock, UserCheck } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Switch } from '../../ui/switch';
import { ImageWithFallback } from './ImageWithFallback';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  rememberMe: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
}

export default function KrishiNetraAuth() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [validFields, setValidFields] = useState<Set<string>>(new Set());

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /^\d{10}$/.test(email);
  };

  const validateField = (name: string, value: string) => {
    const newErrors: FormErrors = {};
    const newValidFields = new Set(validFields);

    switch (name) {
      case 'fullName':
        if (value.length < 2) {
          newErrors.fullName = 'Full name must be at least 2 characters';
          newValidFields.delete(name);
        } else {
          newValidFields.add(name);
        }
        break;
      case 'email':
        if (!validateEmail(value)) {
          newErrors.email = 'Please enter a valid email or 10-digit mobile number';
          newValidFields.delete(name);
        } else {
          newValidFields.add(name);
        }
        break;
      case 'password':
        if (value.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
          newValidFields.delete(name);
        } else {
          newValidFields.add(name);
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          newErrors.confirmPassword = 'Passwords do not match';
          newValidFields.delete(name);
        } else {
          newValidFields.add(name);
        }
        break;
      case 'role':
        if (!value) {
          newErrors.role = 'Please select a role';
          newValidFields.delete(name);
        } else {
          newValidFields.add(name);
        }
        break;
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    setValidFields(newValidFields);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    // Validate field after a short delay
    setTimeout(() => validateField(name, value), 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate all fields
    let isValid = true;
    const fieldsToValidate = activeTab === 'login' 
      ? ['email', 'password'] 
      : ['fullName', 'email', 'password', 'confirmPassword', 'role'];

    fieldsToValidate.forEach(field => {
      if (!validateField(field, formData[field as keyof FormData] as string)) {
        isValid = false;
      }
    });

    if (!isValid) {
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log(`${activeTab} submitted:`, formData);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Illustration (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-50 to-orange-50 items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-md"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1594179131702-112ff2a880e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhZ3JpY3VsdHVyZSUyMGZhcm1lciUyMGNyb3BzJTIwZmllbGRzfGVufDF8fHx8MTc1OTA5MDgwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Indian Agriculture"
            className="w-full h-auto rounded-2xl shadow-lg"
          />
          <div className="mt-6 text-center">
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Empowering Indian Agriculture
            </h3>
            <p className="text-gray-600">
              Connect farmers, distributors, and retailers in a seamless digital ecosystem
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">KN</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Welcome to KrishiNetra
              </h1>
              <p className="text-gray-600">
                Sign in to manage produce or create a new account
              </p>
            </motion.div>
          </div>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 lg:p-8"
          >
            {/* Tabs */}
            <div className="flex mb-6 relative">
              <div className="flex w-full bg-gray-50 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
                    activeTab === 'login'
                      ? 'bg-white shadow-sm text-orange-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setActiveTab('signup')}
                  className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
                    activeTab === 'signup'
                      ? 'bg-white shadow-sm text-orange-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {activeTab === 'signup' && (
                  <motion.div
                    key="fullName"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Label htmlFor="fullName" className="text-gray-700">
                      Full Name
                    </Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="Enter your full name"
                        className={`pl-10 h-12 border-2 transition-all duration-200 ${
                          errors.fullName
                            ? 'border-red-300 focus:border-red-500'
                            : validFields.has('fullName')
                            ? 'border-green-300 focus:border-green-500'
                            : 'border-gray-200 focus:border-blue-500'
                        } focus:ring-2 focus:ring-opacity-20 ${
                          errors.fullName
                            ? 'focus:ring-red-500'
                            : validFields.has('fullName')
                            ? 'focus:ring-green-500'
                            : 'focus:ring-blue-500'
                        }`}
                      />
                      {validFields.has('fullName') && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          <Check className="w-5 h-5 text-green-500" />
                        </motion.div>
                      )}
                    </div>
                    {errors.fullName && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-red-500 text-sm mt-1 flex items-center"
                      >
                        <X className="w-4 h-4 mr-1" />
                        {errors.fullName}
                      </motion.p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email/Mobile */}
              <div>
                <Label htmlFor="email" className="text-gray-700">
                  Email or Mobile Number
                </Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="text"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter email or 10-digit mobile number"
                    className={`pl-10 h-12 border-2 transition-all duration-200 ${
                      errors.email
                        ? 'border-red-300 focus:border-red-500'
                        : validFields.has('email')
                        ? 'border-green-300 focus:border-green-500'
                        : 'border-gray-200 focus:border-blue-500'
                    } focus:ring-2 focus:ring-opacity-20 ${
                      errors.email
                        ? 'focus:ring-red-500'
                        : validFields.has('email')
                        ? 'focus:ring-green-500'
                        : 'focus:ring-blue-500'
                    }`}
                  />
                  {validFields.has('email') && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <Check className="w-5 h-5 text-green-500" />
                    </motion.div>
                  )}
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-500 text-sm mt-1 flex items-center"
                  >
                    <X className="w-4 h-4 mr-1" />
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter your password"
                    className={`pl-10 pr-10 h-12 border-2 transition-all duration-200 ${
                      errors.password
                        ? 'border-red-300 focus:border-red-500'
                        : validFields.has('password')
                        ? 'border-green-300 focus:border-green-500'
                        : 'border-gray-200 focus:border-blue-500'
                    } focus:ring-2 focus:ring-opacity-20 ${
                      errors.password
                        ? 'focus:ring-red-500'
                        : validFields.has('password')
                        ? 'focus:ring-green-500'
                        : 'focus:ring-blue-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-500 text-sm mt-1 flex items-center"
                  >
                    <X className="w-4 h-4 mr-1" />
                    {errors.password}
                  </motion.p>
                )}
              </div>

              {/* Confirm Password (Signup only) */}
              <AnimatePresence mode="wait">
                {activeTab === 'signup' && (
                  <motion.div
                    key="confirmPassword"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Label htmlFor="confirmPassword" className="text-gray-700">
                      Confirm Password
                    </Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        placeholder="Confirm your password"
                        className={`pl-10 pr-10 h-12 border-2 transition-all duration-200 ${
                          errors.confirmPassword
                            ? 'border-red-300 focus:border-red-500'
                            : validFields.has('confirmPassword')
                            ? 'border-green-300 focus:border-green-500'
                            : 'border-gray-200 focus:border-blue-500'
                        } focus:ring-2 focus:ring-opacity-20 ${
                          errors.confirmPassword
                            ? 'focus:ring-red-500'
                            : validFields.has('confirmPassword')
                            ? 'focus:ring-green-500'
                            : 'focus:ring-blue-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-red-500 text-sm mt-1 flex items-center"
                      >
                        <X className="w-4 h-4 mr-1" />
                        {errors.confirmPassword}
                      </motion.p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Role (Signup only) */}
              <AnimatePresence mode="wait">
                {activeTab === 'signup' && (
                  <motion.div
                    key="role"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Label htmlFor="role" className="text-gray-700">
                      Role
                    </Label>
                    <div className="relative mt-1">
                      <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                      <Select onValueChange={(value) => handleInputChange('role', value)}>
                        <SelectTrigger className={`pl-10 h-12 border-2 transition-all duration-200 ${
                          errors.role
                            ? 'border-red-300 focus:border-red-500'
                            : validFields.has('role')
                            ? 'border-green-300 focus:border-green-500'
                            : 'border-gray-200 focus:border-blue-500'
                        }`}>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="farmer">Farmer</SelectItem>
                          <SelectItem value="distributor">Distributor</SelectItem>
                          <SelectItem value="retailer">Retailer</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      {validFields.has('role') && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute right-10 top-1/2 transform -translate-y-1/2 z-10"
                        >
                          <Check className="w-5 h-5 text-green-500" />
                        </motion.div>
                      )}
                    </div>
                    {errors.role && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-red-500 text-sm mt-1 flex items-center"
                      >
                        <X className="w-4 h-4 mr-1" />
                        {errors.role}
                      </motion.p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Remember Me (Login only) */}
              {activeTab === 'login' && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) =>
                        setFormData(prev => ({ ...prev, rememberMe: checked }))
                      }
                    />
                    <Label htmlFor="rememberMe" className="text-sm text-gray-600">
                      Remember me
                    </Label>
                  </div>
                  <a
                    href="#"
                    className="text-sm text-blue-700 hover:text-blue-800 hover:underline transition-colors duration-200"
                  >
                    Forgot Password?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:scale-100"
              >
                {isLoading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Processing...
                  </motion.div>
                ) : (
                  `${activeTab === 'login' ? 'Sign In' : 'Create Account'}`
                )}
              </Button>
            </form>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-8 text-sm text-gray-500"
          >
            By continuing, you agree to our{' '}
            <a href="#" className="text-blue-700 hover:text-blue-800 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-700 hover:text-blue-800 hover:underline">
              Privacy Policy
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}