import React, {  useState } from 'react'
import { motion } from 'motion/react';
import { Eye, EyeOff, Check, X, Mail, Lock } from 'lucide-react';
import { apiClient, POST_LOGIN} from "@/service/api";
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Switch } from '@/ui/switch';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { set } from 'date-fns';

interface FormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

interface FormErrors {
    email?: string;
    password?: string;
}

const Login = ({ setUser }: { setUser: (user: any) => void }) => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
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
        const fieldsToValidate = ['email', 'password'];

        fieldsToValidate.forEach(field => {
            if (!validateField(field, formData[field as keyof FormData] as string)) {
                isValid = false;
            }
        });

        if (!isValid) {
            setIsLoading(false);
            return;
        }
        try{
            const payload = {
                email:formData.email,
                password:formData.password
            }
            const res = await apiClient.post(POST_LOGIN, payload);
            if(res.data.data.user.role === "Farmer"){
                router.replace("/protected/farmer/dashboard");
            }else if(res.data.data.role === "Distributor"){
                router.replace("/protected/distributor/dashboard");
            }else if(res.data.data.role === "Retailer"){
                router.replace("/protected/retailer/dashboard");
            }
            setUser(res.data.data);
            console.log(res.data.data);
            toast.success("Login successful!");
        }catch(err){
            console.error(err?.response?.data || err);
            toast.error("Login failed. Please try again.");
        }
        setIsLoading(false);
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
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
                        className={`pl-10 h-12 border-2 transition-all duration-200 ${errors.email
                                ? 'border-red-300 focus:border-red-500'
                                : validFields.has('email')
                                    ? 'border-green-300 focus:border-green-500'
                                    : 'border-gray-200 focus:border-blue-500'
                            } focus:ring-2 focus:ring-opacity-20 ${errors.email
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
                    `Login`
                )}
            </Button>
        </form>
    )
}

export default Login
