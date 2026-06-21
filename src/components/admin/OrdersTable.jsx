import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { formatPrice } from '../../utils/formatPrice';

export default function OrdersTable({ orders, onUpdateStatus }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statusColors = {
    PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    PROCESSING: 'bg-blue-100 text-blue-800 border-blue-200',
    SHIPPED: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    DELIVERED: 'bg-green-100 text-green-800 border-green-200',
    CANCELLED: 'bg-red-100 text-red-800 border-red-200',
  };

  const handleOpenDetails = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="space-y-6">
      <h3 className="font-playfair text-xl font-bold text-mocha">Manage Orders</h3>

      {/* Table */}
      <div className="neo-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-cream-dark/50 border-b border-champagne/20 font-montserrat text-xs font-bold text-mocha-light uppercase tracking-wider">
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Email</th>
                <th className="p-4 text-right">Total</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Date</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="font-montserrat text-sm divide-y divide-champagne/10">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-cream-dark/25 transition-colors duration-250">
                  <td className="p-4 font-bold text-mocha">
                    #{order.id}
                  </td>
                  <td className="p-4 font-semibold text-mocha">
                    {order.customer}
                  </td>
                  <td className="p-4 text-mocha-light">
                    {order.email}
                  </td>
                  <td className="p-4 text-right font-bold text-mocha">
                    {formatPrice(order.total)}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-center text-xs text-mocha-light">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-center space-x-2">
                    <button
                      onClick={() => handleOpenDetails(order)}
                      className="p-2 text-mocha-light hover:text-champagne transition-colors"
                      title="View Details"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    {order.status === 'PENDING' && (
                      <button
                        onClick={() => onUpdateStatus(order.id, 'PROCESSING')}
                        className="p-2 text-green-600 hover:text-green-700 transition-colors"
                        title="Accept Order"
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-mocha/60 backdrop-blur-xs" onClick={() => setSelectedOrder(null)} />
          <div className="relative bg-cream w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl z-10 border border-champagne/20 animate-fade-in p-6">
            <div className="flex justify-between items-center mb-6 border-b border-champagne/10 pb-4">
              <div>
                <h4 className="font-playfair text-xl font-bold text-mocha">
                  Order Details #{selectedOrder.id}
                </h4>
                <p className="font-montserrat text-xs text-mocha-light mt-0.5">
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 rounded-full bg-cream-dark hover:bg-champagne/10 text-mocha-light flex items-center justify-center transition-all duration-300"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {/* Customer Details */}
            <div className="space-y-3 font-montserrat text-sm mb-6">
              <div>
                <span className="text-xs font-bold uppercase text-mocha-light block">Customer Name</span>
                <span className="font-semibold text-mocha">{selectedOrder.customer}</span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase text-mocha-light block">Email Address</span>
                <span className="text-mocha">{selectedOrder.email}</span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase text-mocha-light block">Delivery Address</span>
                <span className="text-mocha leading-relaxed">{selectedOrder.address || 'Not specified (simulated)'}</span>
              </div>
            </div>

            {/* Items */}
            <div className="border-t border-b border-champagne/10 py-4 mb-6">
              <span className="text-xs font-bold uppercase text-mocha-light block mb-3">Order Items</span>
              <div className="divide-y divide-champagne/5 max-h-[200px] overflow-y-auto pr-2">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 text-sm font-montserrat">
                    <div>
                      <span className="font-semibold text-mocha">{item.name}</span>
                      <span className="text-xs text-mocha-light block">Qty: {item.quantity} @ {formatPrice(item.price)}</span>
                    </div>
                    <span className="font-bold text-mocha">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Changer */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs font-bold uppercase text-mocha-light block mb-1">Update Status</span>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => {
                    onUpdateStatus(selectedOrder.id, e.target.value);
                    setSelectedOrder(prev => ({ ...prev, status: e.target.value }));
                  }}
                  className="pr-10 pl-4 py-2.5 rounded-xl border border-champagne/30 bg-cream text-mocha font-montserrat text-sm font-semibold outline-none focus:border-champagne transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="PROCESSING">PROCESSING</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold uppercase text-mocha-light block">Grand Total</span>
                <span className="font-playfair font-bold text-2xl text-champagne-gradient">
                  {formatPrice(selectedOrder.total)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
