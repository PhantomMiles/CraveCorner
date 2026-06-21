import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlockAlt, faHeart, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import AdminSidebar from '../components/admin/AdminSidebar';
import DashboardStats from '../components/admin/DashboardStats';
import ProductsTable from '../components/admin/ProductsTable';
import OrdersTable from '../components/admin/OrdersTable';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { products as initialProducts } from '../utils/products';

// Mock initial orders
const initialOrders = [
  {
    id: 1001,
    customer: 'Alice Margatroid',
    email: 'alice@toy.org',
    total: 38.97,
    status: 'PENDING',
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    address: '14 Forest lane, London, EC2 3BF',
    items: [
      { name: 'Molten Chocolate Lava Cake', quantity: 3, price: 12.99 },
    ],
  },
  {
    id: 1002,
    customer: 'Patchouli Knowledge',
    email: 'patty@library.net',
    total: 34.46,
    status: 'PROCESSING',
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    address: 'Library Mansion, Room 3, Oxford, OX1 2JD',
    items: [
      { name: 'Matcha Cheesecake', quantity: 1, price: 38.99 },
      { name: 'Orange Cream Cupcakes', quantity: 2, price: 3.99 },
      { name: 'Lemon Frosted Cookies', quantity: 2, price: 2.49 },
    ],
  },
  {
    id: 1003,
    customer: 'Sakuya Izayoi',
    email: 'time@maid.co.uk',
    total: 17.98,
    status: 'DELIVERED',
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    address: 'Scarlet Devil Mansion, Kitchen wing, Bath, BA1 1EE',
    items: [
      { name: 'Decadent Chocolate Mousse', quantity: 2, price: 8.99 },
    ],
  },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview, products, orders

  // Manage mock database state locally
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);

  // Auto-login during development if session is saved
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('crave_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin === '1234') {
      setIsAuthenticated(true);
      setPinError(false);
      sessionStorage.setItem('crave_admin_auth', 'true');
    } else {
      setPinError(true);
      setPin('');
      setTimeout(() => setPinError(false), 2000);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('crave_admin_auth');
  };

  // CRUD actions
  const handleAddProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this sweet treat?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  // Render Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4 pt-24">
        <GlassCard className="w-full max-w-md p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-champagne-gradient flex items-center justify-center mx-auto shadow-champagne">
            <FontAwesomeIcon icon={faLock} className="text-white text-xl" />
          </div>

          <div>
            <h1 className="font-playfair text-2xl font-bold text-mocha">Admin Control Panel</h1>
            <p className="font-cormorant text-mocha-light italic text-base">
              Authorized personnel login only
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div className="relative">
              <input
                id="admin-pin"
                type="password"
                maxLength={4}
                value={pin}
                onChange={e => setPin(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 4-Digit PIN"
                className={`w-full text-center tracking-[1em] font-mono text-2xl py-3 rounded-xl border bg-cream/50 outline-none transition-all duration-300 ${
                  pinError
                    ? 'border-rose-gold focus:ring-2 focus:ring-rose-gold/20'
                    : 'border-champagne/30 focus:border-champagne focus:ring-2 focus:ring-champagne/10'
                }`}
              />
            </div>

            {pinError && (
              <div className="flex items-center justify-center gap-1.5 text-rose-gold font-montserrat text-xs font-semibold animate-pulse">
                <FontAwesomeIcon icon={faExclamationCircle} />
                Access Denied. Incorrect PIN.
              </div>
            )}

            <Button type="submit" variant="champagne" fullWidth size="lg" disabled={pin.length !== 4}>
              <FontAwesomeIcon icon={faUnlockAlt} className="mr-1 text-xs" />
              Verify Credentials
            </Button>
          </form>

          <p className="font-cormorant text-xs text-mocha-light italic">
            Hint: Use PIN <span className="font-bold font-mono">1234</span> to access dashboard
          </p>
        </GlassCard>
      </div>
    );
  }

  // Render Dashboard
  return (
    <div className="min-h-screen bg-cream flex flex-col lg:flex-row pt-20">
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      {/* Main Admin Content */}
      <main className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-champagne/10">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-mocha">
              {activeTab === 'overview' && 'Console Dashboard'}
              {activeTab === 'products' && 'Treat Inventory'}
              {activeTab === 'orders' && 'Customer Orders'}
            </h1>
            <p className="font-cormorant text-mocha-light text-lg italic">
              {activeTab === 'overview' && 'At-a-glance boutique operation statistics'}
              {activeTab === 'products' && 'Create, read, update and delete sweet delicacies'}
              {activeTab === 'orders' && 'Real-time order fulfillment & progress management'}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-montserrat font-bold uppercase tracking-wider text-green-700 bg-green-100 px-3 py-1.5 rounded-full border border-green-200">
            <span className="w-2 h-2 rounded-full bg-green-600 animate-ping" />
            Live Connection
          </div>
        </header>

        {/* Tab Render */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <DashboardStats />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quick Products Overview */}
              <div className="neo-card p-6 space-y-4">
                <h3 className="font-playfair text-lg font-bold text-mocha">Low Stock Warning</h3>
                <div className="divide-y divide-champagne/10">
                  {products.filter(p => p.stock <= 10).slice(0, 4).map(p => (
                    <div key={p.id} className="flex justify-between items-center py-2 text-sm font-montserrat">
                      <span className="text-mocha font-medium">{p.name}</span>
                      <span className="text-rose-gold font-semibold uppercase tracking-wider text-xs">
                        Only {p.stock} left
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Orders Overview */}
              <div className="neo-card p-6 space-y-4">
                <h3 className="font-playfair text-lg font-bold text-mocha">Recent Incoming Orders</h3>
                <div className="divide-y divide-champagne/10">
                  {orders.slice(0, 3).map(o => (
                    <div key={o.id} className="flex justify-between items-center py-2 text-sm font-montserrat">
                      <div>
                        <span className="font-semibold text-mocha">{o.customer}</span>
                        <span className="text-xs text-mocha-light block">{o.items[0]?.name} (and others)</span>
                      </div>
                      <span className="font-bold text-mocha">{o.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <ProductsTable
            products={products}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        )}

        {activeTab === 'orders' && (
          <OrdersTable
            orders={orders}
            onUpdateStatus={handleUpdateOrderStatus}
          />
        )}
      </main>
    </div>
  );
}
