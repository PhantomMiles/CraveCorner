import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartPie, faBoxes, faClipboardList, faSignOutAlt, faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function AdminSidebar({ activeTab, setActiveTab, onLogout }) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: faChartPie },
    { id: 'products', label: 'Products CRUD', icon: faBoxes },
    { id: 'orders', label: 'Orders List', icon: faClipboardList },
  ];

  return (
    <aside className="w-full lg:w-64 bg-mocha text-cream flex flex-col justify-between p-6 lg:min-h-screen border-r border-champagne/20 shrink-0">
      <div className="space-y-8">
        {/* Title */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-champagne-gradient flex items-center justify-center">
            <img src="/img/logo.png" alt="" className='w-8 h-8 rounded-full' />
          </div>
          <div>
            <h2 className="font-playfair font-bold text-lg leading-tight text-white">Crave Admin</h2>
            <p className="font-cormorant italic text-xs text-champagne">Management Console</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-montserrat text-sm font-semibold tracking-wide transition-all duration-300 whitespace-nowrap lg:w-full ${
                  isActive
                    ? 'bg-champagne text-mocha shadow-champagne'
                    : 'text-cream/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className="text-sm shrink-0" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="mt-8 lg:mt-0 pt-4 border-t border-cream/15">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl font-montserrat text-sm font-semibold tracking-wide text-rose-gold-light hover:bg-rose-gold/10 transition-all duration-300 w-full text-left"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="text-sm shrink-0" />
          Log Out Console
        </button>
      </div>
    </aside>
  );
}
