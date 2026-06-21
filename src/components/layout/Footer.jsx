import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram, faFacebook, faPinterest, faTiktok,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import {
  faHeart, faEnvelope, faPhone, faMapMarkerAlt,
  faCookie, faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

const socialLinks = [
  { icon: faInstagram, href: '#', label: 'Instagram' },
  { icon: faFacebook, href: '#', label: 'Facebook' },
  { icon: faPinterest, href: '#', label: 'Pinterest' },
  { icon: faTiktok, href: '#', label: 'TikTok' },
  {icon: faWhatsapp, href: 'https://wa.me/+2348104124930', label: 'WhatsApp'},
];

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop All Treats' },
  { to: '/about', label: 'Our Story' },
  { to: '/contact', label: 'Get In Touch' },
  { to: '/admin', label: 'Admin' },
];

const categories = [
  { to: '/shop?cat=cakes', label: 'Cakes & Loaves' },
  { to: '/shop?cat=cupcakes', label: 'Cupcakes' },
  { to: '/shop?cat=cookies', label: 'Cookies' },
  { to: '/shop?cat=puddings', label: 'Puddings & Mousse' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{
      background: 'linear-gradient(145deg, #352620 30%, #5C3A25 50%, #352620 65%)',
    }}>
      {/* Decorative top border */}
      <div className="h-1 w-full" style={{
        background: 'linear-gradient(90deg, #D4AF7A 0%, #E8AFA0 50%, #D4AF7A 100%)',
      }} />

      {/* Floating decorative icons */}
      <div className="absolute top-8 right-12 opacity-5">
        <FontAwesomeIcon icon={faCookie} className="text-champagne text-8xl" />
      </div>
      <div className="absolute bottom-12 left-8 opacity-5">
        <FontAwesomeIcon icon={faHeart} className="text-champagne text-6xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <img src="/img/logo.png" alt="" srcset="" className='w-10 h-10 rounded-full' />
              </div>
              <div>
                <div className="font-playfair font-bold text-2xl text-white">Crave Corner</div>
                <div className="font-cormorant italic text-champagne text-sm -mt-1">
                  Handcrafted Confectionery
                </div>
              </div>
            </Link>
            <p className="font-cormorant text-white/70 text-lg leading-relaxed mb-6">
              Every sweet moment begins with the finest ingredients and a passion for perfection.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: 'rgba(212, 175, 122, 0.15)',
                    border: '1px solid rgba(212, 175, 122, 0.3)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #D4AF7A, #C9876F)';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(212, 175, 122, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 122, 0.3)';
                  }}
                >
                  <FontAwesomeIcon icon={icon} className="text-champagne text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair font-semibold text-white text-lg mb-6 relative">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-champagne-gradient rounded-full" />
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-montserrat text-sm text-white/60 hover:text-champagne transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-xs text-champagne/50 group-hover:translate-x-1 transition-transform duration-300"
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-playfair font-semibold text-white text-lg mb-6 relative">
              Our Treats
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-champagne-gradient rounded-full" />
            </h3>
            <ul className="space-y-3">
              {categories.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-montserrat text-sm text-white/60 hover:text-champagne transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-xs text-champagne/50 group-hover:translate-x-1 transition-transform duration-300"
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-playfair font-semibold text-white text-lg mb-6 relative">
              Find Us
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-champagne-gradient rounded-full" />
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-champagne mt-0.5 w-4" />
                <p className="font-montserrat text-sm text-white/60">
                Unit G-22, Ground Floor,<br />Polo Park Mall<br />Presidential Road, Enugu, <br />Enugu State, Nigeria
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faPhone} className="text-champagne w-4" />
                <a href="tel:+2348104124930" className="font-montserrat text-sm text-white/60 hover:text-champagne transition-colors">
                  +234 810 412 4930
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faEnvelope} className="text-champagne w-4" />
                <a href="mailto:hello@cravecorner.co.uk" className="font-montserrat text-sm text-white/60 hover:text-champagne transition-colors">
                  hello@cravecorner.co.ng
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-montserrat text-sm text-white/40">
            &copy; {new Date().getFullYear()} Crave Corner. All rights reserved.
          </p>
          <p className="font-montserrat text-sm text-white/40 flex items-center gap-1">
            Made with <FontAwesomeIcon icon={faHeart} className="text-champagne text-xs" /> for sweet lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
