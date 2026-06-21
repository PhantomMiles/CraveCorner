import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faArrowRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section
      className="py-20 relative overflow-hidden"
      ref={ref}
      style={{ background: 'linear-gradient(135deg, #3D2314 0%, #5C3A25 60%, #3D2314 100%)' }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #D4AF7A, transparent)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #E8AFA0, transparent)', transform: 'translate(-30%, 30%)' }} />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center" ref={ref}>
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-champagne/20 flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faEnvelope} className="text-champagne text-2xl" />
          </div>

          <h2 className="font-playfair font-bold text-white mb-3" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Sweet Deals, Delivered
          </h2>
          <p className="font-cormorant text-white/70 text-xl italic mb-10 max-w-lg mx-auto">
            Join our confectionery community and receive exclusive recipes, early access to new treats, and 10% off your first order.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-3 py-5">
              <FontAwesomeIcon icon={faCheckCircle} className="text-champagne text-2xl" />
              <p className="font-montserrat text-white font-semibold text-lg">
                Welcome to Crave Corner! Check your inbox.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <div className="flex-1 relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-champagne/50 text-sm"
                />
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white/10 border border-champagne/30 text-white placeholder-white/40 font-montserrat text-sm outline-none focus:border-champagne transition-all duration-300"
                />
              </div>
              <button
                type="submit"
                className="btn-champagne px-7 py-4 rounded-2xl text-sm font-semibold flex items-center gap-2 whitespace-nowrap group"
              >
                Subscribe
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-xs group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>
            </form>
          )}

          <p className="font-montserrat text-white/30 text-xs mt-5">
            No spam. Unsubscribe anytime. We promise only sweetness.
          </p>
        </div>
      </div>
    </section>
  );
}
