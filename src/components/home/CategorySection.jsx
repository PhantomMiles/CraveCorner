import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCakeCandles, faCookie, faIceCream, faMugHot, faGift,
} from '@fortawesome/free-solid-svg-icons';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const cats = [
  {
    id: 'cakes',
    label: 'Cakes & Loaves',
    icon: faCakeCandles,
    description: 'Celebration & everyday cakes',
    color: 'from-rose-gold/20 to-peach/30',
    iconBg: 'bg-rose-gold/15',
    iconColor: 'text-rose-gold',
    count: 6,
  },
  {
    id: 'cupcakes',
    label: 'Cupcakes',
    icon: faMugHot,
    description: 'Individual frosted perfection',
    color: 'from-peach/20 to-champagne-light/30',
    iconBg: 'bg-peach/30',
    iconColor: 'text-mocha',
    count: 2,
  },
  {
    id: 'cookies',
    label: 'Cookies',
    icon: faCookie,
    description: 'Crispy, chewy & irresistible',
    color: 'from-champagne/15 to-peach/20',
    iconBg: 'bg-champagne/20',
    iconColor: 'text-champagne',
    count: 3,
  },
  {
    id: 'puddings',
    label: 'Puddings & Mousse',
    icon: faIceCream,
    description: 'Silky, elegant indulgences',
    color: 'from-pastel-blue/20 to-cream-dark/30',
    iconBg: 'bg-pastel-blue/30',
    iconColor: 'text-pastel-blue-dark',
    count: 4,
  },
];

export default function CategorySection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      className="py-20"
      style={{ background: 'linear-gradient(180deg, #FDF8F5 0%, #F5EDE6 100%)' }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.25em] text-champagne mb-3">
            Explore our range
          </p>
          <h2 className="section-title mb-3">
            Sweet <span className="text-champagne-gradient">Categories</span>
          </h2>
          <p className="font-cormorant text-mocha-light text-xl italic max-w-xl mx-auto">
            From cloud-light cupcakes to silky mousses — there's a sweet corner for everyone.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {cats.map((cat, index) => (
            <Link
              key={cat.id}
              to={`/shop?cat=${cat.id}`}
              className={`group neo-card p-6 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-3 hover:shadow-neomorphism-hover ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl ${cat.iconBg} flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
              >
                <FontAwesomeIcon icon={cat.icon} className={`text-2xl ${cat.iconColor}`} />
              </div>

              {/* Label */}
              <h3 className="font-playfair font-semibold text-mocha text-base mb-1 group-hover:text-champagne transition-colors duration-300">
                {cat.label}
              </h3>
              <p className="font-cormorant text-mocha-light text-sm mb-2">
                {cat.description}
              </p>
              <span className="font-montserrat text-xs text-champagne/70">
                {cat.count} items
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
