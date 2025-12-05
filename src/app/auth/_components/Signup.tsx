import { AnimatePresence, motion } from 'motion/react'
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Switch } from '@/ui/switch';
import { Check, Eye, EyeOff, Lock, Mail, Phone, User, UserCheck, X } from 'lucide-react';
import { useState } from 'react';

import { apiClient, POST_REGISTER_BUYER, POST_REGISTER_FARMER } from '@/service/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    aadharNumber: string;
    farmLocation?: string;
    farmName?: string;
    crops?: string[];
    govtId?: string;
    gstNumber?: string;
    panNumber?: string;
    tradeLicenseNumber?: string;
    businessName?: string;
    warehouseAddress?: string;
    storeName?: string;
    storeAddress?: string;
    role: string;
    rememberMe: boolean;
}

interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    phone?: string;
    aadharNumber?: string;
    farmLocation?: string;
    farmName?: string;
    crops?: string;
    govtId?: string;
    gstNumber?: string;
    panNumber?: string;
    tradeLicenseNumber?: string;
    businessName?: string;
    warehouseAddress?: string;
    storeName?: string;
    storeAddress?: string;
}

const Signup = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tab, setTab] = useState<'Farmer' | 'Distributor' | 'Retailer'>('Farmer');
    const [errors, setErrors] = useState<FormErrors>({});
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        aadharNumber: '',
        role: 'Farmer',
        rememberMe: false
    });
    const [validFields, setValidFields] = useState<Set<string>>(new Set());
    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /^\d{10}$/.test(email);
    };

    const validateField = (name: string, value: string) => {
        const newErrors: FormErrors = {};
        const newValidFields = new Set(validFields);

        switch (name) {
            case 'name':
                if (value.length < 2) {
                    newErrors.name = 'Full name must be at least 2 characters';
                    newValidFields.delete(name);
                } else {
                    newValidFields.add(name);
                }
                break;
            case 'phone':
                if (!/^\d{10}$/.test(value)) {
                    newErrors.phone = 'Please enter a valid 10-digit mobile number';
                    newValidFields.delete(name);
                } else {
                    newValidFields.add(name);
                }
                break;
            case 'aadharNumber':
                if (!/^\d{12}$/.test(value)) {
                    newErrors.aadharNumber = 'Please enter a valid 12-digit Aadhar number';
                    newValidFields.delete(name);
                } else {
                    newValidFields.add(name);
                }
                break;
            case 'farmLocation':
                if (value.trim() === '') {
                    newErrors.farmLocation = 'Farm location cannot be empty';
                    newValidFields.delete(name);
                } else {
                    newValidFields.add(name);
                }
                break;
            case 'farmName':
                if (value.trim() === '') {
                    newErrors.farmName = 'Farm name cannot be empty';
                    newValidFields.delete(name);
                } else {
                    newValidFields.add(name);
                }
                break;
            case 'crops':
                if (value.trim() === '') {
                    newErrors.crops = 'Please specify at least one crop';
                    newValidFields.delete(name);
                } else {
                    newValidFields.add(name);
                }
                break;
            case 'govtId':
                if (value.trim() === '') {
                    newErrors.govtId = 'Government ID cannot be empty';
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
                if (value.length < 2) {
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
        }

        setErrors(prev => ({ ...prev, ...newErrors }));
        setValidFields(newValidFields);
        return Object.keys(newErrors).length === 0;
    };


    const handleInputChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }

        setTimeout(() => validateField(name, value), 300);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Validate all fields
        let isValid = true;
        const fieldsToValidate = ['name', 'email', 'password', 'confirmPassword', 'role'];

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
        try {
            console.log("Submitting data:", formData);
            if(tab === "Farmer"){
                const payload = {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    aadharNumber: formData.aadharNumber,
                    phone: formData.phone,
                    role: tab,
                    farmLocation: {
                        address: formData.farmLocation,
                    },
                    farmName: formData.farmName,
                    govtId: formData.govtId
                };
                const res = await apiClient.post(POST_REGISTER_FARMER, payload);
                router.push('/protected/farmer');
                console.log("Signup successful:", res.data);
            }else if (tab === "Distributor") {
                // Handle Distributor signup
                const payload = {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    aadharNumber: formData.aadharNumber,
                    phone: formData.phone,
                    role: tab,
                    gstNumber: formData.gstNumber,
                    panNumber: formData.panNumber,
                    tradeLicenseNumber: formData.tradeLicenseNumber,
                    businessName: formData.businessName,
                    warehouseAddress: formData.warehouseAddress
                };
                const res = await apiClient.post(POST_REGISTER_BUYER, payload);
                router.push('/protected/distributor');
                console.log("Signup successful:", res.data);
            }else if (tab === "Retailer") {
                const payload ={
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    aadharNumber: formData.aadharNumber,
                    phone: formData.phone,
                    role: tab,
                    gstNumber: formData.gstNumber,
                    panNumber: formData.panNumber,
                    tradeLicenseNumber: formData.tradeLicenseNumber,
                    storeName: formData.storeName,
                    storeAddress: formData.storeAddress
                };
                const res = await apiClient.post(POST_REGISTER_BUYER, payload);
                router.push('/protected/retailer');
                console.log("Signup successful:", res.data);
            }
            toast.success("Signup successful!");
        } catch (error) {
            console.error("Error during signup:", error);
            toast.error("Signup failed. Please try again.");
        }
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="role" className="text-gray-700">
                    Select Role
                </Label>
                <div className="mt-2 flex space-x-4">
                    {['Farmer', 'Distributor', 'Retailer'].map((roleOption) => ( 
                        <button
                            type="button"
                            key={roleOption}
                            onClick={() => {
                                setTab(roleOption as 'Farmer' | 'Distributor' | 'Retailer');
                            }}
                            className={`px-4 py-2 rounded-md focus:outline-none ${tab === roleOption ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            {roleOption}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <Label htmlFor="name" className="text-gray-700">
                    Name
                </Label>
                <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        className={`pl-10 h-12 border-2 transition-all duration-200 ${errors.name
                            ? 'border-red-300 focus:border-red-500'
                            : validFields.has('fullName')
                                ? 'border-green-300 focus:border-green-500'
                                : 'border-gray-200 focus:border-blue-500'
                            } focus:ring-2 focus:ring-opacity-20 ${errors.name
                                ? 'focus:ring-red-500'
                                : validFields.has('fullName')
                                    ? 'focus:ring-green-500'
                                    : 'focus:ring-blue-500'
                            }`}
                    />
                    {validFields.has('name') && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                            <Check className="w-5 h-5 text-green-500" />
                        </motion.div>
                    )}
                </div>
                {errors.name && (
                    <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-red-500 text-sm mt-1 flex items-center"
                    >
                        <X className="w-4 h-4 mr-1" />
                        {errors.name}
                    </motion.p>
                )}
            </div>

            {/* Phone */}
            <div>
                <Label htmlFor="phone" className="text-gray-700">
                    Phone
                </Label>
                <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                        id="email"
                        type="text"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter your 10-digit mobile number"
                        className={`pl-10 h-12 border-2 transition-all duration-200 ${errors.phone
                            ? 'border-red-300 focus:border-red-500'
                            : validFields.has('phone')
                                ? 'border-green-300 focus:border-green-500'
                                : 'border-gray-200 focus:border-blue-500'
                            } focus:ring-2 focus:ring-opacity-20 ${errors.phone
                                ? 'focus:ring-red-500'
                                : validFields.has('phone')
                                    ? 'focus:ring-green-500'
                                    : 'focus:ring-blue-500'
                            }`}
                    />
                    {validFields.has('phone') && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                            <Check className="w-5 h-5 text-green-500" />
                        </motion.div>
                    )}
                </div>
                {errors.phone && (
                    <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-red-500 text-sm mt-1 flex items-center"
                    >
                        <X className="w-4 h-4 mr-1" />
                        {errors.phone}
                    </motion.p>
                )}
            </div>

            {/* Aadhar number */}
            <div>
                <Label htmlFor="aadharNumber" className="text-gray-700">
                    Aadhar Number
                </Label>
                <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                        id="aadharNumber"
                        type="text"
                        value={formData.aadharNumber}
                        onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
                        placeholder="Enter your Aadhar number"
                        className={`pl-10 h-12 border-2 transition-all duration-200 ${errors.aadharNumber
                            ? 'border-red-300 focus:border-red-500'
                            : validFields.has('aadharNumber')
                                ? 'border-green-300 focus:border-green-500'
                                : 'border-gray-200 focus:border-blue-500'
                            } focus:ring-2 focus:ring-opacity-20 ${errors.aadharNumber
                                ? 'focus:ring-red-500'
                                : validFields.has('aadharNumber')
                                    ? 'focus:ring-green-500'
                                    : 'focus:ring-blue-500'
                            }`}
                    />
                    {validFields.has('aadharNumber') && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                            <Check className="w-5 h-5 text-green-500" />
                        </motion.div>
                    )}
                </div>
                {errors.farmLocation && (
                    <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-red-500 text-sm mt-1 flex items-center"
                    >
                        <X className="w-4 h-4 mr-1" />
                        {errors.aadharNumber}
                    </motion.p>
                )}
            </div>

            {/*  Farm location */}
            {tab === "Farmer" &&
                <>
                    <div>
                        <Label htmlFor="farmLocation" className="text-gray-700">
                            Farm location
                        </Label>
                        <div className="relative mt-1">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                id="farmLocation"
                                type="text"
                                value={formData.farmLocation}
                                onChange={(e) => handleInputChange('farmLocation', e.target.value)}
                                placeholder="Enter email or 10-digit mobile number"
                                className={`pl-10 h-12 border-2 transition-all duration-200 ${errors.farmLocation
                                    ? 'border-red-300 focus:border-red-500'
                                    : validFields.has('farmLocation')
                                        ? 'border-green-300 focus:border-green-500'
                                        : 'border-gray-200 focus:border-blue-500'
                                    } focus:ring-2 focus:ring-opacity-20 ${errors.farmLocation
                                        ? 'focus:ring-red-500'
                                        : validFields.has('farmLocation')
                                            ? 'focus:ring-green-500'
                                            : 'focus:ring-blue-500'
                                    }`}
                            />
                            {validFields.has('farmLocation') && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    <Check className="w-5 h-5 text-green-500" />
                                </motion.div>
                            )}
                        </div>
                        {errors.farmLocation && (
                            <motion.p
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-red-500 text-sm mt-1 flex items-center"
                            >
                                <X className="w-4 h-4 mr-1" />
                                {errors.farmLocation}
                            </motion.p>
                        )}
                    </div>

                    {/* Farm Name  */}
                    <div>
                        <Label htmlFor="farmName" className="text-gray-700">
                            Farm Name
                        </Label>
                        <div className="relative mt-1">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                id="farmName"
                                type="text"
                                value={formData.farmName}
                                onChange={(e) => handleInputChange('farmName', e.target.value)}
                                placeholder="Enter email or 10-digit mobile number"
                                className={`pl-10 h-12 border-2 transition-all duration-200 ${errors.farmName
                                    ? 'border-red-300 focus:border-red-500'
                                    : validFields.has('farmName')
                                        ? 'border-green-300 focus:border-green-500'
                                        : 'border-gray-200 focus:border-blue-500'
                                    } focus:ring-2 focus:ring-opacity-20 ${errors.farmName
                                        ? 'focus:ring-red-500'
                                        : validFields.has('farmName')
                                            ? 'focus:ring-green-500'
                                            : 'focus:ring-blue-500'
                                    }`}
                            />
                            {validFields.has('farmName') && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    <Check className="w-5 h-5 text-green-500" />
                                </motion.div>
                            )}
                        </div>
                        {errors.farmName && (
                            <motion.p
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-red-500 text-sm mt-1 flex items-center"
                            >
                                <X className="w-4 h-4 mr-1" />
                                {errors.farmName}
                            </motion.p>
                        )}
                    </div>

                    {/* Crops */}
                    <div>
                        <Label htmlFor="crops" className="text-gray-700">
                            Crops
                        </Label>
                        <div className="relative mt-1">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                id="crops"
                                type="text"
                                value={formData.crops}
                                onChange={(e) => handleInputChange('crops', e.target.value)}
                                placeholder="Enter email or 10-digit mobile number"
                                className={`pl-10 h-12 border-2 transition-all duration-200 ${errors.crops
                                    ? 'border-red-300 focus:border-red-500'
                                    : validFields.has('crops')
                                        ? 'border-green-300 focus:border-green-500'
                                        : 'border-gray-200 focus:border-blue-500'
                                    } focus:ring-2 focus:ring-opacity-20 ${errors.crops
                                        ? 'focus:ring-red-500'
                                        : validFields.has('crops')
                                            ? 'focus:ring-green-500'
                                            : 'focus:ring-blue-500'
                                    }`}
                            />
                            {validFields.has('crops') && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    <Check className="w-5 h-5 text-green-500" />
                                </motion.div>
                            )}
                        </div>
                        {errors.crops && (
                            <motion.p
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-red-500 text-sm mt-1 flex items-center"
                            >
                                <X className="w-4 h-4 mr-1" />
                                {errors.crops}
                            </motion.p>
                        )}
                    </div>

                    {/* Govt Id  */}
                    <div>
                        <Label htmlFor="govtId" className="text-gray-700">
                            Government ID
                        </Label>
                        <div className="relative mt-1">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                id="govtId"
                                type="text"
                                value={formData.govtId}
                                onChange={(e) => handleInputChange('govtId', e.target.value)}
                                placeholder="Enter email or 10-digit mobile number"
                                className={`pl-10 h-12 border-2 transition-all duration-200 ${errors.govtId
                                    ? 'border-red-300 focus:border-red-500'
                                    : validFields.has('govtId')
                                        ? 'border-green-300 focus:border-green-500'
                                        : 'border-gray-200 focus:border-blue-500'
                                    } focus:ring-2 focus:ring-opacity-20 ${errors.govtId
                                        ? 'focus:ring-red-500'
                                        : validFields.has('govtId')
                                            ? 'focus:ring-green-500'
                                            : 'focus:ring-blue-500'
                                    }`}
                            />
                            {validFields.has('govtId') && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    <Check className="w-5 h-5 text-green-500" />
                                </motion.div>
                            )}
                        </div>
                        {errors.govtId && (
                            <motion.p
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-red-500 text-sm mt-1 flex items-center"
                            >
                                <X className="w-4 h-4 mr-1" />
                                {errors.govtId}
                            </motion.p>
                        )}
                    </div>
                </>}

            {((tab === "Distributor") || (tab ==="Retailer"))  &&
                <>
                    {/* GST Number  */}
                    <div>
                        <Label htmlFor="gstNumber" className="text-gray-700">
                            GST Number
                        </Label>
                        <div className="relative mt-1">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                id="gstNumber"
                                type="text"
                                value={formData.gstNumber}
                                onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                                placeholder="Enter email or 10-digit mobile number"
                                className={`pl-10 h-12 border-2 transition-all duration-200 ${errors.gstNumber
                                    ? 'border-red-300 focus:border-red-500'
                                    : validFields.has('gstNumber')
                                        ? 'border-green-300 focus:border-green-500'
                                        : 'border-gray-200 focus:border-blue-500'
                                    } focus:ring-2 focus:ring-opacity-20 ${errors.gstNumber
                                        ? 'focus:ring-red-500'
                                        : validFields.has('gstNumber')
                                            ? 'focus:ring-green-500'
                                            : 'focus:ring-blue-500'
                                    }`}
                            />
                            {validFields.has('gstNumber') && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    <Check className="w-5 h-5 text-green-500" />
                                </motion.div>
                            )}
                        </div>
                        {errors.gstNumber && (
                            <motion.p
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-red-500 text-sm mt-1 flex items-center"
                            >
                                <X className="w-4 h-4 mr-1" />
                                {errors.gstNumber}
                            </motion.p>
                        )}
                    </div>

                    {/* Pan number */}
                    <div>
                        <Label htmlFor="panNumber" className="text-gray-700">
                            Pan Number
                        </Label>
                        <div className="relative mt-1">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                id="panNumber"
                                type="text"
                                value={formData.panNumber}
                                onChange={(e) => handleInputChange('panNumber', e.target.value)}
                                placeholder="Enter email or 10-digit mobile number"
                                className={`pl-10 h-12 border-2 transition-all duration-200 ${errors.panNumber
                                    ? 'border-red-300 focus:border-red-500'
                                    : validFields.has('panNumber')
                                        ? 'border-green-300 focus:border-green-500'
                                        : 'border-gray-200 focus:border-blue-500'
                                    } focus:ring-2 focus:ring-opacity-20 ${errors.panNumber
                                        ? 'focus:ring-red-500'
                                        : validFields.has('panNumber')
                                            ? 'focus:ring-green-500'
                                            : 'focus:ring-blue-500'
                                    }`}
                            />
                            {validFields.has('panNumber') && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    <Check className="w-5 h-5 text-green-500" />
                                </motion.div>
                            )}
                        </div>
                        {errors.panNumber && (
                            <motion.p
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-red-500 text-sm mt-1 flex items-center"
                            >
                                <X className="w-4 h-4 mr-1" />
                                {errors.panNumber}
                            </motion.p>
                        )}
                    </div>

                    {/* tradeLicenseNumber */}
                    <div>
                        <Label htmlFor="tradeLicenseNumber" className="text-gray-700">
                            Trade License Number
                        </Label>
                        <div className="relative mt-1">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                id="tradeLicenseNumber"
                                type="text"
                                value={formData.tradeLicenseNumber}
                                onChange={(e) => handleInputChange('tradeLicenseNumber', e.target.value)}
                                placeholder="Enter trade license number"
                                className={`pl-10 h-12 border-2 transition-all duration-200 ${errors.tradeLicenseNumber
                                    ? 'border-red-300 focus:border-red-500'
                                    : validFields.has('tradeLicenseNumber')
                                        ? 'border-green-300 focus:border-green-500'
                                        : 'border-gray-200 focus:border-blue-500'
                                    } focus:ring-2 focus:ring-opacity-20 ${errors.tradeLicenseNumber
                                        ? 'focus:ring-red-500'
                                        : validFields.has('tradeLicenseNumber')
                                            ? 'focus:ring-green-500'
                                            : 'focus:ring-blue-500'
                                    }`}
                            />
                            {validFields.has('tradeLicenseNumber') && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    <Check className="w-5 h-5 text-green-500" />
                                </motion.div>
                            )}
                        </div>
                        {errors.tradeLicenseNumber && (
                            <motion.p
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-red-500 text-sm mt-1 flex items-center"
                            >
                                <X className="w-4 h-4 mr-1" />
                                {errors.tradeLicenseNumber}
                            </motion.p>
                        )}
                    </div>

                </>}
                {(tab === "Distributor") && <>
                    {/* Business Name */}
                    <div>
                        <Label htmlFor="bus" className="text-gray-700">
                            Business Name 
                        </Label>
                        <div className="relative mt-1">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                id="businessName"
                                type="text"
                                value={formData.businessName}
                                onChange={(e) => handleInputChange('businessName', e.target.value)}
                                placeholder="Enter business name"
                                className={`pl-10 h-12 border-2 transition-all duration-200 ${errors.businessName
                                    ? 'border-red-300 focus:border-red-500'
                                    : validFields.has('businessName')
                                        ? 'border-green-300 focus:border-green-500'
                                        : 'border-gray-200 focus:border-blue-500'
                                    } focus:ring-2 focus:ring-opacity-20 ${errors.businessName
                                        ? 'focus:ring-red-500'
                                        : validFields.has('businessName')
                                            ? 'focus:ring-green-500'
                                            : 'focus:ring-blue-500'
                                    }`}
                            />
                            {validFields.has('businessName') && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    <Check className="w-5 h-5 text-green-500" />
                                </motion.div>
                            )}
                        </div>
                        {errors.businessName && (
                            <motion.p
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-red-500 text-sm mt-1 flex items-center"
                            >
                                <X className="w-4 h-4 mr-1" />
                                {errors.businessName}
                            </motion.p>
                        )}
                    </div>

                    {/* Ware house Address */}
                    <div>
                        <Label htmlFor="warehouseAddress" className="text-gray-700">
                            Ware House Number
                        </Label>
                        <div className="relative mt-1">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                id="warehouseAddress"
                                type="text"
                                value={formData.warehouseAddress}
                                onChange={(e) => handleInputChange('warehouseAddress', e.target.value)}
                                placeholder="Enter warehouse address"
                                className={`pl-10 h-12 border-2 transition-all duration-200 ${errors.warehouseAddress
                                    ? 'border-red-300 focus:border-red-500'
                                    : validFields.has('warehouseAddress')
                                        ? 'border-green-300 focus:border-green-500'
                                        : 'border-gray-200 focus:border-blue-500'
                                    } focus:ring-2 focus:ring-opacity-20 ${errors.warehouseAddress
                                        ? 'focus:ring-red-500'
                                        : validFields.has('warehouseAddress')
                                            ? 'focus:ring-green-500'
                                            : 'focus:ring-blue-500'
                                    }`}
                            />
                            {validFields.has('warehouseAddress') && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    <Check className="w-5 h-5 text-green-500" />
                                </motion.div>
                            )}
                        </div>
                        {errors.warehouseAddress && (
                            <motion.p
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-red-500 text-sm mt-1 flex items-center"
                            >
                                <X className="w-4 h-4 mr-1" />
                                {errors.warehouseAddress}
                            </motion.p>
                        )}
                    </div>
                </>}

                {tab === "Retailer" &&
                    <>
                        {/* Store Name */}
                        <div>
                        <Label htmlFor="storeName" className="text-gray-700">
                            Store Name
                        </Label>
                        <div className="relative mt-1">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                id="storeName"
                                type="text"
                                value={formData.storeName}
                                onChange={(e) => handleInputChange('storeName', e.target.value)}
                                placeholder="Enter store name"
                                className={`pl-10 h-12 border-2 transition-all duration-200 ${errors.storeName
                                    ? 'border-red-300 focus:border-red-500'
                                    : validFields.has('storeName')
                                        ? 'border-green-300 focus:border-green-500'
                                        : 'border-gray-200 focus:border-blue-500'
                                    } focus:ring-2 focus:ring-opacity-20 ${errors.storeName
                                        ? 'focus:ring-red-500'
                                        : validFields.has('storeName')
                                            ? 'focus:ring-green-500'
                                            : 'focus:ring-blue-500'
                                    }`}
                            />
                            {validFields.has('storeName') && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    <Check className="w-5 h-5 text-green-500" />
                                </motion.div>
                            )}
                        </div>
                        {errors.storeName && (
                            <motion.p
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-red-500 text-sm mt-1 flex items-center"
                            >
                                <X className="w-4 h-4 mr-1" />
                                {errors.storeName}
                            </motion.p>
                        )}
                    </div>

                    {/* Store Address */}
                    <div>
                        <Label htmlFor="storeAddress" className="text-gray-700">
                            Store Address
                        </Label>
                        <div className="relative mt-1">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                id="storeAddress"
                                type="text"
                                value={formData.storeAddress}
                                onChange={(e) => handleInputChange('storeAddress', e.target.value)}
                                placeholder="Enter store address"
                                className={`pl-10 h-12 border-2 transition-all duration-200 ${errors.storeAddress
                                    ? 'border-red-300 focus:border-red-500'
                                    : validFields.has('storeAddress')
                                        ? 'border-green-300 focus:border-green-500'
                                        : 'border-gray-200 focus:border-blue-500'
                                    } focus:ring-2 focus:ring-opacity-20 ${errors.storeAddress
                                        ? 'focus:ring-red-500'
                                        : validFields.has('storeAddress')
                                            ? 'focus:ring-green-500'
                                            : 'focus:ring-blue-500'
                                    }`}
                            />
                            {validFields.has('storeAddress') && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    <Check className="w-5 h-5 text-green-500" />
                                </motion.div>
                            )}
                        </div>
                        {errors.storeAddress && (
                            <motion.p
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-red-500 text-sm mt-1 flex items-center"
                            >
                                <X className="w-4 h-4 mr-1" />
                                {errors.storeAddress}
                            </motion.p>
                        )}
                    </div>
                </>}

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
                        className={`pl-10 h-12 border-2 transition-all duration-200 ${errors.panNumber
                            ? 'border-red-300 focus:border-red-500'
                            : validFields.has('panNumber')
                                ? 'border-green-300 focus:border-green-500'
                                : 'border-gray-200 focus:border-blue-500'
                            } focus:ring-2 focus:ring-opacity-20 ${errors.panNumber
                                ? 'focus:ring-red-500'
                                : validFields.has('panNumber')
                                    ? 'focus:ring-green-500'
                                    : 'focus:ring-blue-500'
                            }`}
                    />
                    {validFields.has('panNumber') && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                            <Check className="w-5 h-5 text-green-500" />
                        </motion.div>
                    )}
                </div>
                {errors.panNumber && (
                    <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-red-500 text-sm mt-1 flex items-center"
                    >
                        <X className="w-4 h-4 mr-1" />
                        {errors.panNumber}
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
                        className={`pl-10 pr-10 h-12 border-2 transition-all duration-200 ${errors.password
                            ? 'border-red-300 focus:border-red-500'
                            : validFields.has('password')
                                ? 'border-green-300 focus:border-green-500'
                                : 'border-gray-200 focus:border-blue-500'
                            } focus:ring-2 focus:ring-opacity-20 ${errors.password
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
                            className={`pl-10 pr-10 h-12 border-2 transition-all duration-200 ${errors.confirmPassword
                                ? 'border-red-300 focus:border-red-500'
                                : validFields.has('confirmPassword')
                                    ? 'border-green-300 focus:border-green-500'
                                    : 'border-gray-200 focus:border-blue-500'
                                } focus:ring-2 focus:ring-opacity-20 ${errors.confirmPassword
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
            </AnimatePresence>

            {/* Role (Signup only) */}
            <AnimatePresence mode="wait">
                <motion.div
                    key="role"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* <Label htmlFor="role" className="text-gray-700">
                            Role
                        </Label>
                        <div className="relative mt-1">
                            <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                            <Select onValueChange={(value) => handleInputChange('role', value)}>
                                <SelectTrigger className={`pl-10 h-12 border-2 transition-all duration-200 ${errors.role
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
                        )} */}
                </motion.div>
            </AnimatePresence>

            {/* Remember Me (Login only) */}
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
                    `Create Account`
                )}
            </Button>
        </form>
    )
}

export default Signup