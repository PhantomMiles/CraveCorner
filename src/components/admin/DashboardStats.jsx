import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faNairaSign, faShoppingBasket, faUsers, faStar, faArrowUp, faArrowDown,
} from '@fortawesome/free-solid-svg-icons';

const stats = [
  {
    label: 'Total Revenue',
    value: '₦2,845.50',
    trend: '+12.4%',
    up: true,
    icon: faNairaSign,
    color: 'bg-green-500/10 text-green-600',
  },
  {
    label: 'Sweet Orders',
    value: '184',
    trend: '+8.1%',
    up: true,
    icon: faShoppingBasket,
    color: 'bg-champagne/10 text-champagne',
  },
  {
    label: 'Active Customers',
    value: '96',
    trend: '-1.2%',
    up: false,
    icon: faUsers,
    color: 'bg-pastel-blue/10 text-pastel-blue-dark',
  },
  {
    label: 'Average Rating',
    value: '4.82',
    trend: '+0.05',
    up: true,
    icon: faStar,
    color: 'bg-rose-gold/10 text-rose-gold',
  },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="neo-card p-6 flex items-center justify-between animate-fade-in"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="space-y-2">
            <span className="font-montserrat text-xs font-bold text-mocha-light uppercase tracking-wider">
              {stat.label}
            </span>
            <div className="font-playfair font-bold text-3xl text-mocha">
              {stat.value}
            </div>
            <div className="flex items-center gap-1.5 font-montserrat text-xs">
              <span className={stat.up ? 'text-green-600' : 'text-rose-600'}>
                <FontAwesomeIcon icon={stat.up ? faArrowUp : faArrowDown} className="mr-0.5" />
                {stat.trend}
              </span>
              <span className="text-mocha-light/60">vs last month</span>
            </div>
          </div>
          <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center text-lg shadow-sm`}>
            <FontAwesomeIcon icon={stat.icon} />
          </div>
        </div>
      ))}
    </div>
  );
}
