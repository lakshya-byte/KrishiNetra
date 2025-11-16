"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Header } from "./_components/Header";
import { ScannerInterface } from "./_components/ScannerInterface";
import { TraceResults } from "./_components/TraceResults";
import { ScanningInstructions } from "./_components/ScanningInstructions";

export default function App() {
    const [traceResults, setTraceResults] = useState<string | null>(null);

    const handleScanSuccess = (batchId: string) => {
        setTraceResults(batchId);
    };

    const handleNewScan = () => {
        setTraceResults(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[var(--krishinetra-cream)] to-white">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <AnimatePresence mode="wait">
                    {!traceResults ? (
                        <motion.div
                            key="scanner"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-8"
                        >
                            {/* Main Scanner Section */}
                            <div className="text-center mb-8">
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    Trace Your Produce
                                </h1>
                                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                    Scan the QR code on your produce packaging or enter the batch ID manually
                                    to discover its complete journey from farm to your table.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                                <div className="order-2 lg:order-1">
                                    <ScanningInstructions />
                                </div>

                                <div className="order-1 lg:order-2">
                                    <ScannerInterface onScanSuccess={handleScanSuccess} />
                                </div>
                            </div>

                            {/* Trust Indicators */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/50"
                            >
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Trusted by Thousands of Consumers
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="text-center">
                                            <div className="w-12 h-12 bg-[var(--krishinetra-saffron)] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <svg className="w-6 h-6 text-[var(--krishinetra-saffron)]" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <h4 className="font-medium text-gray-900">Blockchain Verified</h4>
                                            <p className="text-sm text-gray-600">Immutable traceability records</p>
                                        </div>

                                        <div className="text-center">
                                            <div className="w-12 h-12 bg-[var(--krishinetra-forest-green)] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <svg className="w-6 h-6 text-[var(--krishinetra-forest-green)]" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <h4 className="font-medium text-gray-900">Farmer Direct</h4>
                                            <p className="text-sm text-gray-600">Supporting local agriculture</p>
                                        </div>

                                        <div className="text-center">
                                            <div className="w-12 h-12 bg-[var(--krishinetra-ashoka-blue)] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <svg className="w-6 h-6 text-[var(--krishinetra-ashoka-blue)]" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <h4 className="font-medium text-gray-900">Quality Assured</h4>
                                            <p className="text-sm text-gray-600">Certified organic produce</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            {/* Back to Scanner Button */}
                            <div className="flex justify-between items-center">
                                <button
                                    onClick={handleNewScan}
                                    className="text-[var(--krishinetra-ashoka-blue)] hover:text-[var(--krishinetra-ashoka-blue-light)] font-medium flex items-center space-x-2 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    <span>Scan Another Product</span>
                                </button>

                                <div className="text-right">
                                    <p className="text-sm text-gray-600">Scan successful!</p>
                                    <p className="text-xs text-gray-500">Results verified on blockchain</p>
                                </div>
                            </div>

                            <TraceResults batchId={traceResults} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Footer */}
            <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-200 mt-16">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <div className="w-6 h-6 rounded bg-gradient-to-br from-[var(--krishinetra-saffron)] to-[var(--krishinetra-forest-green)] flex items-center justify-center">
                                <span className="text-white font-semibold text-xs">KN</span>
                            </div>
                            <span className="font-semibold text-gray-900">KrishiNetra</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                            Empowering consumers with transparent agriculture through blockchain technology
                        </p>
                        <div className="flex justify-center space-x-6 text-sm text-gray-500">
                            <a href="#" className="hover:text-gray-700 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-gray-700 transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-gray-700 transition-colors">Contact Support</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}