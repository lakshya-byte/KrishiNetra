import { Header } from "./_components/Header";
import { HeroSection } from "./_components/HeroSection";
import { QuickHelpCategories } from "./_components/QuickHelpCategories";
import { FAQSection } from "./_components/FAQSection";
import { VideoTutorials } from "./_components/VideoTutorials";
import { ContactSupport } from "./_components/ContactSupport";
import { SelfServiceTools } from "./_components/SelfServiceTools";
import { ChatWidget } from "./_components/ChatWidget";

export default function App() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <HeroSection />

            {/* Quick Help Categories */}
            <QuickHelpCategories />

            {/* FAQ Section */}
            <FAQSection />

            {/* Video Tutorials */}
            <VideoTutorials />

            {/* Contact Support */}
            <ContactSupport />

            {/* Self Service Tools */}
            <SelfServiceTools />

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        {/* Company Info */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-[#ff6b35] to-[#22c55e] rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">KN</span>
                                </div>
                                <span className="text-xl font-semibold">KrishiNetra</span>
                            </div>
                            <p className="text-slate-400 leading-relaxed">
                                Empowering Indian agriculture through transparent traceability and blockchain technology.
                            </p>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse"></div>
                                <span className="text-slate-300">All systems operational</span>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-white">Quick Help</h3>
                            <ul className="space-y-2 text-slate-400">
                                <li><a href="#" className="hover:text-white transition-colors">Getting Started</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Batch Management</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">QR Code Scanning</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Technical Issues</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Account Security</a></li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-white">Resources</h3>
                            <ul className="space-y-2 text-slate-400">
                                <li><a href="#" className="hover:text-white transition-colors">Video Tutorials</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">User Manual</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Developer Guide</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-white">Contact Support</h3>
                            <div className="space-y-3 text-slate-400">
                                <div>
                                    <div className="font-medium text-white">Phone Support</div>
                                    <div>+91 1800-123-4567</div>
                                    <div className="text-sm">Mon-Fri, 9AM-6PM IST</div>
                                </div>
                                <div>
                                    <div className="font-medium text-white">Email Support</div>
                                    <div>support@krishinetra.com</div>
                                    <div className="text-sm">24/7 Response</div>
                                </div>
                                <div>
                                    <div className="font-medium text-white">Emergency</div>
                                    <div>+91 98765-43210</div>
                                    <div className="text-sm">WhatsApp Available</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <div className="text-slate-400 text-sm">
                            © 2024 KrishiNetra. All rights reserved. Built for Indian agriculture.
                        </div>
                        <div className="flex items-center gap-6 mt-4 md:mt-0">
                            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Terms of Service</a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-slate-400">Made in</span>
                                <span className="text-[#ff6b35]">🇮🇳</span>
                                <span className="text-slate-400">India</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Floating Chat Widget */}
            <ChatWidget />
        </div>
    );
}