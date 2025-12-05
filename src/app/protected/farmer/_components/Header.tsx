import { Bell, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
      <div className="h-full flex items-center justify-between px-4 lg:px-6">
        {/* Left: Logo + Menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#2D7A3E] rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
              </svg>
            </div>
            <div className="hidden sm:block">
              <div className="text-[#2D7A3E]">KrishiNetra</div>
            </div>
          </div>
        </div>

        {/* Center: Title */}
        <div className="hidden md:block">
          <h1 className="text-[#0F1419]">Farmer Dashboard</h1>
        </div>

        {/* Right: Profile & Notification */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#E53935] rounded-full"></span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#E8A314] rounded-full flex items-center justify-center">
              <span className="text-white">R</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-[#0F1419] text-sm">Raju Kumar</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
