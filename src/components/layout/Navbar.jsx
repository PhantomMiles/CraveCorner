import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingBag, faBars, faTimes, faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { useCartContext } from '../../context/CartContext';
import { useNavScroll } from '../../hooks/useScrollAnimation';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'Our Story' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { totalItems, setIsOpen } = useCartContext();
  const scrolled = useNavScroll(60);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-glass py-3' : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-champagne">
                <img src="/img/logo.png" alt="Logo" className="w-9 h-9 rounded-full" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-playfair font-bold text-xl text-champagne tracking-tight">
                  Crave Corner
                </span>
                <span className="font-cormorant font-bold text-sm text-mocha-mid italic -mt-0.5 tracking-normal">
                  Sweet Spot, Every Time
                </span>
              </div>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `font-montserrat text-sm font-medium tracking-wide transition-all duration-300 relative group ${
                      isActive
                        ? 'text-champagne'
                        : scrolled
                        ? 'text-mocha hover:text-champagne'
                        : 'text-mocha/90 hover:text-champagne'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      <span
                        className={`absolute -bottom-1 left-0 h-0.5 bg-champagne-gradient transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Cart button */}
              <button
                id="cart-btn"
                onClick={() => setIsOpen(true)}
                className="relative p-2.5 rounded-full neo-card hover:shadow-neomorphism-hover transition-all duration-300 group"
                aria-label="Open cart"
              >
                <FontAwesomeIcon
                  icon={faShoppingBag}
                  className="text-mocha group-hover:text-champagne transition-colors duration-300"
                />
                {totalItems > 0 && (
                  <span className="cart-badge">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                id="mobile-menu-btn"
                className="md:hidden p-2.5 rounded-full neo-card"
                onClick={() => setMobileOpen(v => !v)}
                aria-label="Toggle mobile menu"
              >
                <FontAwesomeIcon
                  icon={mobileOpen ? faTimes : faBars}
                  className="text-mocha w-4 h-4"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-mocha/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 glass-dark flex flex-col transition-transform duration-500 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-champagne/20">
            <span className="font-playfair text-xl text-white">Menu</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-full bg-champagne/20 text-white"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <nav className="flex-1 flex flex-col p-6 gap-2">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `font-montserrat font-medium text-lg px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-champagne/20 text-champagne'
                      : 'text-white/80 hover:bg-champagne/10 hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="p-6">
            <Link
              to="/shop"
              onClick={() => setMobileOpen(false)}
              className="btn-champagne w-full py-3 rounded-xl text-center font-semibold text-sm tracking-wide block"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
