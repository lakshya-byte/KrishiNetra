"use client"

import { useState, useMemo } from 'react';
import { Calendar, IndianRupee, Truck, FileText, Save, RotateCcw, Send, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

// Components
import { Header } from './_components/Header';
import { ProgressIndicator } from './_components/ProgressIndicator';
import { BatchSelector } from './_components/BatchSelector';
import { RecipientSelector } from './_components/RecipientSelector';
import { TransferHistory } from './_components/TransferHistory';
import { ConfirmationModal } from './_components/ConfirmationModal';

// UI Components
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Toaster } from '../../ui/sonner';

interface Batch {
    id: string;
    cropType: string;
    quantity: string;
    status: 'Available' | 'In Transit' | 'Processing';
    harvestDate: string;
    currentOwner: string;
}

interface Recipient {
    id: string;
    name: string;
    company: string;
    location: string;
    type: 'Distributor' | 'Retailer';
}

export default function App() {
    // Form state
    const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
    const [selectedRole, setSelectedRole] = useState<'Distributor' | 'Retailer' | null>(null);
    const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(null);
    const [transferDate, setTransferDate] = useState(new Date().toISOString().split('T')[0]);
    const [price, setPrice] = useState('');
    const [transportMethod, setTransportMethod] = useState('');
    const [notes, setNotes] = useState('');

    // UI state
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Calculate current step for progress indicator
    const currentStep = useMemo(() => {
        if (!selectedBatch) return 0;
        if (!selectedRecipient) return 1;
        return 2;
    }, [selectedBatch, selectedRecipient]);

    const transportMethods = [
        'Truck',
        'Rail',
        'Air Cargo',
        'Ship',
        'Multi-modal',
        'Other'
    ];

    // Form validation
    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!selectedBatch) {
            errors.batch = 'Please select a batch';
        }
        if (!selectedRecipient) {
            errors.recipient = 'Please select a recipient';
        }
        if (!transferDate) {
            errors.transferDate = 'Please select a transfer date';
        }
        if (!transportMethod) {
            errors.transportMethod = 'Please select a transport method';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fill in all required fields');
            return;
        }

        setShowConfirmation(true);
    };

    const handleConfirmTransfer = async () => {
        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            toast.success('Transfer initiated successfully!', {
                description: `Batch ${selectedBatch?.id} has been transferred to ${selectedRecipient?.name}`,
                duration: 5000,
            });

            // Reset form
            resetForm();
            setShowConfirmation(false);

        } catch (error) {
            toast.error('Transfer failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setSelectedBatch(null);
        setSelectedRole(null);
        setSelectedRecipient(null);
        setTransferDate(new Date().toISOString().split('T')[0]);
        setPrice('');
        setTransportMethod('');
        setNotes('');
        setFormErrors({});
    };

    const saveAsDraft = () => {
        toast.success('Transfer saved as draft', {
            description: 'You can continue editing later',
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header
                title="Transfer Ownership"
                breadcrumbs={['Dashboard', 'Transfer Ownership']}
            />

            <main className="container mx-auto px-4 py-8">
                <ProgressIndicator currentStep={currentStep} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Transfer Form */}
                    <div className="lg:col-span-2">
                        <Card className="p-8 shadow-lg">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Batch Selection */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <BatchSelector
                                        selectedBatch={selectedBatch}
                                        onBatchSelect={setSelectedBatch}
                                    />
                                    {formErrors.batch && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1, x: [0, -5, 5, 0] }}
                                            className="text-red-500 text-sm mt-2"
                                        >
                                            {formErrors.batch}
                                        </motion.p>
                                    )}
                                </motion.div>

                                {/* Recipient Selection */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                    <RecipientSelector
                                        selectedRole={selectedRole}
                                        selectedRecipient={selectedRecipient}
                                        onRoleSelect={setSelectedRole}
                                        onRecipientSelect={setSelectedRecipient}
                                    />
                                    {formErrors.recipient && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1, x: [0, -5, 5, 0] }}
                                            className="text-red-500 text-sm mt-2"
                                        >
                                            {formErrors.recipient}
                                        </motion.p>
                                    )}
                                </motion.div>

                                {/* Transfer Details */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                    className="space-y-6"
                                >
                                    <h3 className="text-lg font-semibold">Transfer Details</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Transfer Date */}
                                        <div className="space-y-2">
                                            <Label htmlFor="transferDate" className="flex items-center space-x-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>Transfer Date *</span>
                                            </Label>
                                            <Input
                                                id="transferDate"
                                                type="date"
                                                value={transferDate}
                                                onChange={(e) => setTransferDate(e.target.value)}
                                                className={`transition-all ${formErrors.transferDate ? 'border-red-500' : ''}`}
                                                aria-describedby={formErrors.transferDate ? 'transferDate-error' : undefined}
                                            />
                                            {formErrors.transferDate && (
                                                <p id="transferDate-error" className="text-red-500 text-sm">
                                                    {formErrors.transferDate}
                                                </p>
                                            )}
                                        </div>

                                        {/* Price */}
                                        <div className="space-y-2">
                                            <Label htmlFor="price" className="flex items-center space-x-2">
                                                <IndianRupee className="w-4 h-4" />
                                                <span>Value (Optional)</span>
                                            </Label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                                                <Input
                                                    id="price"
                                                    type="number"
                                                    placeholder="0.00"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                    className="pl-8"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Transport Method */}
                                    <div className="space-y-2">
                                        <Label className="flex items-center space-x-2">
                                            <Truck className="w-4 h-4" />
                                            <span>Transportation Method *</span>
                                        </Label>
                                        <Select value={transportMethod} onValueChange={setTransportMethod}>
                                            <SelectTrigger className={`transition-all ${formErrors.transportMethod ? 'border-red-500' : ''}`}>
                                                <SelectValue placeholder="Select transportation method" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {transportMethods.map((method) => (
                                                    <SelectItem key={method} value={method}>
                                                        {method}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {formErrors.transportMethod && (
                                            <p className="text-red-500 text-sm">{formErrors.transportMethod}</p>
                                        )}
                                    </div>

                                    {/* Notes */}
                                    <div className="space-y-2">
                                        <Label htmlFor="notes" className="flex items-center space-x-2">
                                            <FileText className="w-4 h-4" />
                                            <span>Additional Notes</span>
                                        </Label>
                                        <Textarea
                                            id="notes"
                                            placeholder="Add transfer notes or special instructions"
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            rows={3}
                                            className="resize-none"
                                        />
                                    </div>
                                </motion.div>

                                {/* Form Actions */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.3 }}
                                    className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 pt-6"
                                >
                                    <Button
                                        type="submit"
                                        className="flex-1 h-12"
                                        style={{ backgroundColor: 'var(--saffron-orange)' }}
                                    >
                                        <Send className="w-5 h-5 mr-2" />
                                        Initiate Transfer
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={saveAsDraft}
                                        className="flex-1 h-12 border-2"
                                        style={{ borderColor: 'var(--ashoka-blue)', color: 'var(--ashoka-blue)' }}
                                    >
                                        <Save className="w-5 h-5 mr-2" />
                                        Save as Draft
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={resetForm}
                                        className="h-12 text-gray-500 hover:text-gray-700"
                                    >
                                        <RotateCcw className="w-5 h-5 mr-2" />
                                        Reset Form
                                    </Button>
                                </motion.div>
                            </form>
                        </Card>
                    </div>

                    {/* Right Column - Transfer History */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                        >
                            <TransferHistory />
                        </motion.div>
                    </div>
                </div>
            </main>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={showConfirmation}
                onClose={() => setShowConfirmation(false)}
                onConfirm={handleConfirmTransfer}
                isSubmitting={isSubmitting}
                transferData={{
                    batch: selectedBatch,
                    recipient: selectedRecipient,
                    transferDate,
                    price,
                    transportMethod,
                    notes
                }}
            />

            <Toaster position="top-right" richColors />
        </div>
    );
}