import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../../ui/breadcrumb';
import { Download, Menu, Home } from 'lucide-react';

interface ReportsHeaderProps {
  onToggleSidebar: () => void;
}

export function ReportsHeader({ onToggleSidebar }: ReportsHeaderProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportAll = async () => {
    setIsExporting(true);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsExporting(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--saffron-orange)] to-[var(--forest-green)] flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="hidden sm:block font-bold text-xl" style={{ color: 'var(--ashoka-blue)' }}>
                KrishiNetra
              </span>
            </div>
            
            <div className="hidden md:block h-6 w-px bg-gray-300" />
            
            <div className="hidden md:block">
              <h1 className="text-xl" style={{ color: 'var(--ashoka-blue)' }}>
                Reports & Analytics
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Breadcrumb className="hidden sm:block">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" className="flex items-center space-x-1">
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Reports</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Button
            onClick={handleExportAll}
            disabled={isExporting}
            className="bg-[var(--saffron-orange)] hover:bg-[var(--saffron-orange-dark)] text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            {isExporting ? 'Exporting...' : 'Export All'}
          </Button>
        </div>
      </div>
    </header>
  );
}