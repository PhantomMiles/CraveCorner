import GlassCard from '../components/ui/GlassCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faSeedling, faCookieBite } from '@fortawesome/free-solid-svg-icons';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const values = [
  {
    title: 'Pure Craftsmanship',
    description: 'Every cookie shell, sponge layers, and mouse swirl is carefully finished by hand to guarantee absolute quality.',
    icon: faCookieBite,
  },
  {
    title: 'Premium Ingredients',
    description: 'We use organic butter, single-origin Belgian chocolate, and genuine vanilla pods. Never artificial preservatives.',
    icon: faSeedling,
  },
  {
    title: 'Shared Delight',
    description: 'Dessert is more than food — it is the centerpiece of celebration. We craft stories of joy and nostalgia.',
    icon: faHeart,
  },
];

export default function AboutPage() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: storyRef, isVisible: storyVisible } = useScrollAnimation();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation();

  return (
    <div className="pt-24 pb-20 bg-cream">
      {/* Hero Header */}
      <div className="py-16 bg-cream-dark/40 border-b border-champagne/10 mb-16" ref={headerRef}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.25em] text-champagne mb-2">
            Our Story & Heritage
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-mocha mb-3">
            Welcome to <span className="text-champagne-gradient">Crave Corner</span>
          </h1>
          <p className="font-cormorant text-mocha-light text-lg italic max-w-xl mx-auto leading-relaxed">
            Where premium ingredients, traditional culinary art, and modern sweet designs meet.
          </p>
        </div>
      </div>

      {/* Story Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24" ref={storyRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-playfair text-3xl font-bold text-mocha">
              A Kitchen Born From <span className="text-rose-gradient">Passion</span>
            </h2>
            <p className="font-cormorant text-lg text-mocha-light italic leading-relaxed">
              “We believe that every dessert has a soul. From the crackle of caramelized sugar on a vanilla crème brûlée to the fudgy core of our lava cakes — sweets are moments of pure, unadulterated happiness.”
            </p>
            <p className="font-montserrat text-sm text-mocha-light/80 leading-relaxed">
              Crave Corner was founded in Enugu with one singular goal: to create premium, gourmet confectionery accessible directly to sweet lovers. What started as a tiny kitchen specializing in custom layered cakes has grown into a prestigious online confectionery boutique, shipping daily freshly baked treats.
            </p>
            <p className="font-montserrat text-sm text-mocha-light/80 leading-relaxed">
              Our recipe is simple: we never cut corners. We whip, fold, sift, and bake every item in small batches, ensuring you receive the ultimate texture and depth of flavor in every single bite.
            </p>
          </div>

          <div
            className={`relative transition-all duration-1000 ${
              storyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="neo-card overflow-hidden rounded-3xl aspect-[4/3] border border-champagne/10">
              <img
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80"
                alt="Beautiful cakes and cookies on display"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 z-10 hidden sm:block">
              <GlassCard className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <FontAwesomeIcon icon={faStar} className="text-champagne text-xs" />
                  <span className="font-playfair font-bold text-mocha text-sm">Award-Winning</span>
                </div>
                <span className="font-cormorant text-xs text-mocha-light italic">Artisan Bakery of the Year</span>
              </GlassCard>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-12" ref={valuesRef}>
          <div className="text-center max-w-xl mx-auto">
            <h2 className="section-title mb-3">Our Sweet Values</h2>
            <p className="font-cormorant text-mocha-light text-lg italic">
              These are the foundational beliefs we fold into every recipe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <div
                key={val.title}
                className={`neo-card p-8 text-center transition-all duration-700 ${
                  valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-champagne/15 text-champagne flex items-center justify-center mx-auto mb-5 text-lg shadow-sm">
                  <FontAwesomeIcon icon={val.icon} />
                </div>
                <h3 className="font-playfair font-semibold text-mocha text-lg mb-3">
                  {val.title}
                </h3>
                <p className="font-cormorant text-mocha-light text-base leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
