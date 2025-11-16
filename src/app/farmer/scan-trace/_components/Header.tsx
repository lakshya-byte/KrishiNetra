import { HelpCircle, Globe } from "lucide-react";
import { Button } from "../../../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../ui/tooltip";

export function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Tagline */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--krishinetra-saffron)] to-[var(--krishinetra-forest-green)] flex items-center justify-center">
              <span className="text-white font-semibold text-sm">KN</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">KrishiNetra</h1>
              <p className="text-xs text-gray-600">Transparent Agriculture</p>
            </div>
          </div>

          {/* Page Title */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h2 className="text-xl font-medium text-gray-900 hidden sm:block">Trace Your Produce</h2>
            <h2 className="text-lg font-medium text-gray-900 sm:hidden">Trace Produce</h2>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-3">
            {/* Language Toggle */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" disabled className="opacity-50">
                    <Globe className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">EN</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Multiple languages coming soon</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Help Icon */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Need help? Contact support</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </header>
  );
}