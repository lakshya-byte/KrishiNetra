import { CheckCircle, Circle } from 'lucide-react';
import { motion } from 'motion/react';

interface Step {
  id: string;
  label: string;
  completed: boolean;
}

interface ProgressIndicatorProps {
  currentStep: number;
}

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const steps: Step[] = [
    { id: 'batch', label: 'Select Batch', completed: currentStep > 0 },
    { id: 'recipient', label: 'Choose Recipient', completed: currentStep > 1 },
    { id: 'confirm', label: 'Confirm Transfer', completed: currentStep > 2 }
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />
        <motion.div
          className="absolute top-1/2 left-0 h-0.5 -translate-y-1/2 transition-all duration-500"
          style={{ 
            backgroundColor: 'var(--saffron-orange)',
            width: `${(currentStep / (steps.length - 1)) * 100}%`
          }}
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => (
          <div key={step.id} className="relative flex flex-col items-center">
            <motion.div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center bg-white transition-all duration-300 ${
                step.completed
                  ? 'border-[var(--saffron-orange)] text-[var(--saffron-orange)]'
                  : index === currentStep
                  ? 'border-[var(--saffron-orange)] text-[var(--saffron-orange)]'
                  : 'border-gray-300 text-gray-400'
              }`}
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: index === currentStep ? 1.1 : 1,
                backgroundColor: step.completed ? 'var(--saffron-orange)' : 'white'
              }}
              transition={{ duration: 0.2 }}
            >
              {step.completed ? (
                <CheckCircle className="w-5 h-5 text-white" />
              ) : (
                <Circle 
                  className={`w-4 h-4 ${
                    index === currentStep ? 'fill-current' : ''
                  }`}
                />
              )}
            </motion.div>
            
            <motion.span
              className={`mt-2 text-xs font-medium text-center transition-colors duration-300 ${
                step.completed || index === currentStep
                  ? 'text-[var(--saffron-orange)]'
                  : 'text-gray-500'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {step.label}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  );
}