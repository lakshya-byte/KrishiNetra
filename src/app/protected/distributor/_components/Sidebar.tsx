import { Home, Package, Plus, Gavel, Truck, BarChart3, User, Settings, HelpCircle, X } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'batches', label: 'Batches', icon: Package },
  { id: 'add-batch', label: 'Add Batch', icon: Plus },
  { id: 'bidding', label: 'Ongoing Bidding', icon: Gavel },
//   { id: 'transfers', label: 'Pending Transfers', icon: Truck },
//   { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function Sidebar({ currentView, onNavigate, isOpen, onClose }: SidebarProps) {
  const handleNavigate = (view: string) => {
    onNavigate(view);
    onClose();
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 bottom-0 w-[280px] bg-white border-r border-gray-200 z-40
          transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg lg:hidden"
          aria-label="Close menu"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-150 ease-out
                  ${
                    isActive
                      ? 'bg-[#FFF8E1] text-[#2D7A3E]'
                      : 'text-gray-700 hover:bg-[#E8F5E9]'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
