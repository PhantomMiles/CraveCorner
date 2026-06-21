import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faShoppingBag, faCheckCircle, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { useCartContext } from '../../context/CartContext';
import CartItem from './CartItem';
import { formatPrice } from '../../utils/formatPrice';
import Button from '../ui/Button';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, totalPrice, clearCart } = useCartContext();
  const [checkoutStep, setCheckoutStep] = useState('cart'); // cart, checkout, success
  const [formData, setFormData] = useState({ name: '', email: '', address: '' });

  // Reset checkout step when opening/closing
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setCheckoutStep('cart'), 300);
    }
  }, [isOpen]);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    // Simulate order placement
    setCheckoutStep('success');
  };

  const handleSuccessClose = () => {
    clearCart();
    setIsOpen(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-mocha/40 backdrop-blur-sm transition-all duration-300"
        onClick={() => setIsOpen(false)}
      />

      {/* Panel */}
      <div
        className={`absolute top-0 right-0 h-full w-full sm:w-[450px] bg-cream shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-champagne/20 bg-cream-dark/50">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faShoppingBag} className="text-champagne text-lg" />
            <h2 className="font-playfair font-bold text-lg text-mocha">
              {checkoutStep === 'cart' && 'Your Sweet Bag'}
              {checkoutStep === 'checkout' && 'Checkout Details'}
              {checkoutStep === 'success' && 'Order Placed!'}
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-champagne/10 text-mocha-light hover:text-mocha transition-all duration-300"
            aria-label="Close cart"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {checkoutStep === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-champagne/15 flex items-center justify-center mb-6">
                    <FontAwesomeIcon icon={faShoppingBag} className="text-champagne text-3xl" />
                  </div>
                  <h3 className="font-playfair font-semibold text-mocha text-lg mb-2">
                    Your bag is empty
                  </h3>
                  <p className="font-cormorant text-mocha-light text-base italic mb-6">
                    Fill it up with delicious cakes, cookies, and other artisan sweet treats.
                  </p>
                  <Button variant="champagne" onClick={() => setIsOpen(false)}>
                    Browse Sweet Shop
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  {items.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              )}
            </>
          )}

          {checkoutStep === 'checkout' && (
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-montserrat font-semibold text-mocha-light uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-crave"
                  placeholder="e.g. Jane Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-montserrat font-semibold text-mocha-light uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-crave"
                  placeholder="e.g. jane@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-montserrat font-semibold text-mocha-light uppercase tracking-wider mb-1">
                  Delivery Address
                </label>
                <textarea
                  name="address"
                  required
                  rows={3}
                  value={formData.address}
                  onChange={handleInputChange}
                  className="input-crave"
                  placeholder="e.g. 45 Sweet Tooth Lane, London, EC1 2AB"
                />
              </div>

              <div className="p-4 rounded-xl border border-champagne/30 bg-cream-dark/30 space-y-3">
                <h4 className="font-montserrat text-xs font-bold text-mocha uppercase tracking-wider flex items-center gap-2">
                  <FontAwesomeIcon icon={faCreditCard} className="text-champagne" />
                  Mock Payment Method
                </h4>
                <p className="font-cormorant text-sm text-mocha-light italic">
                  Since this is a client-side mockup, payments are simulated instantly. No card details required!
                </p>
              </div>

              <Button type="submit" variant="rose" fullWidth size="lg" className="mt-6">
                Place Order ({formatPrice(totalPrice)})
              </Button>
              <button
                type="button"
                onClick={() => setCheckoutStep('cart')}
                className="w-full text-center font-montserrat text-xs font-semibold text-mocha-light hover:text-champagne transition-colors py-2"
              >
                Back to Bag
              </button>
            </form>
          )}

          {checkoutStep === 'success' && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 text-4xl" />
              </div>
              <h3 className="font-playfair font-bold text-mocha text-2xl mb-2">
                Order Received!
              </h3>
              <p className="font-cormorant text-mocha-light text-lg italic mb-6">
                Thank you for ordering from Crave Corner, {formData.name}. We are preparing your sweet treats now!
              </p>
              <div className="p-4 rounded-2xl bg-cream-dark/50 border border-champagne/20 w-full mb-8 text-left space-y-2">
                <div className="flex justify-between font-montserrat text-xs">
                  <span className="text-mocha-light">Order Total:</span>
                  <span className="font-semibold text-mocha">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between font-montserrat text-xs">
                  <span className="text-mocha-light">Delivery to:</span>
                  <span className="font-semibold text-mocha truncate max-w-[200px]">{formData.address}</span>
                </div>
                <div className="flex justify-between font-montserrat text-xs">
                  <span className="text-mocha-light">Confirmation sent to:</span>
                  <span className="font-semibold text-mocha truncate max-w-[200px]">{formData.email}</span>
                </div>
              </div>
              <Button variant="champagne" fullWidth onClick={handleSuccessClose}>
                Done & Empty Bag
              </Button>
            </div>
          )}
        </div>

        {/* Footer Sum (Cart Step only) */}
        {checkoutStep === 'cart' && items.length > 0 && (
          <div className="p-6 border-t border-champagne/20 bg-cream-dark/50 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-montserrat text-sm font-semibold text-mocha-light uppercase tracking-wider">
                Total Amount:
              </span>
              <span className="font-playfair font-bold text-2xl text-champagne-gradient">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={() => { clearCart(); }}
              >
                Clear All
              </Button>
              <Button
                variant="rose"
                size="md"
                onClick={() => setCheckoutStep('checkout')}
              >
                Proceed
              </Button>
            </div>
            <p className="text-center font-cormorant text-xs text-mocha-light italic">
              Free delivery on all sweet treats!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
