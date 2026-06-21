import HeroSlider from '../components/home/HeroSlider';
import CategorySection from '../components/home/CategorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import NewsletterSection from '../components/home/NewsletterSection';
import GlassCard from '../components/ui/GlassCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    quote: "The Molten Chocolate Lava Cake is to die for. It arrived warm and was the highlight of our evening!",
    author: "Sophie Jenkins",
    role: "Local Connoisseur",
  },
  {
    quote: "Every single cookie has this incredible buttery crunch. The orange cream cupcakes are like clouds.",
    author: "David Vance",
    role: "Regular Sweet Tooth",
  },
  {
    quote: "I ordered the Rose & Pistachio macarons for an anniversary gift. Elegant packaging and outstanding flavor.",
    author: "Amina Yusuf",
    role: "Artisan Enthusiast",
  },
];

export default function HomePage() {
  const { ref: storyRef, isVisible: storyVisible } = useScrollAnimation();
  const { ref: reviewRef, isVisible: reviewVisible } = useScrollAnimation();

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <HeroSlider />

      {/* Categories */}
      <CategorySection />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Our Story Teaser */}
      <section className="py-24 relative" ref={storyRef}>
        {/* Background gradients */}
        <div className="absolute inset-0 bg-cream-gradient" />
        <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-peach/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Story Image Panel */}
            <div
              className={`relative transition-all duration-1000 ${
                storyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              <div className="neo-card overflow-hidden rounded-3xl aspect-[4/3] relative z-10 border border-champagne/10">
                <img
                  src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80"
                  alt="Pastry Chef baking at Crave Corner"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Floating Overlay Glass Card */}
              <div className="absolute -bottom-6 -right-6 z-20 hidden sm:block max-w-[240px]">
                <GlassCard className="p-5 text-center">
                  <div className="w-10 h-10 rounded-full bg-champagne-gradient flex items-center justify-center mx-auto mb-3 shadow-champagne">
                    <FontAwesomeIcon icon={faHeart} className="text-white text-xs" />
                  </div>
                  <span className="font-playfair font-bold text-mocha block text-sm">100% Artisan</span>
                  <span className="font-cormorant text-xs text-mocha-light italic">Handcrafted Fresh Daily</span>
                </GlassCard>
              </div>
            </div>

            {/* Story Text Column */}
            <div
              className={`space-y-6 transition-all duration-1000 ${
                storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.25em] text-champagne">
                About Crave Corner
              </p>
              <h2 className="section-title">
                Crafted with <span className="text-rose-gradient">Love</span> & Fine Ingredients
              </h2>
              <p className="font-cormorant text-mocha-light text-lg leading-relaxed italic">
                “Our journey began in a tiny kitchen filled with the aroma of caramelized sugar and fresh-baked dough. We set out to create confectionery that does not just taste good, but tells a story of passion.”
              </p>
              <p className="font-montserrat text-sm text-mocha-light/80 leading-relaxed">
                At Crave Corner, we believe premium desserts should be an experience. We source organic dairy, fine single-origin cocoa, and seasonal fruits to create sweet delicacies that bring a spark of magic to your table.
              </p>
              <div className="pt-4">
                <Link
                  to="/about"
                  className="btn-champagne px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide inline-block"
                >
                  Read Our Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-cream-dark/30" ref={reviewRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              reviewVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.25em] text-champagne mb-2">
              Sweet Words
            </p>
            <h2 className="section-title">
              What Our <span className="text-champagne-gradient">Customers</span> Say
            </h2>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={t.author}
                className={`neo-card p-8 flex flex-col justify-between transition-all duration-700 ${
                  reviewVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div>
                  <FontAwesomeIcon icon={faQuoteLeft} className="text-champagne/25 text-3xl mb-4" />
                  <p className="font-cormorant text-mocha-light text-lg leading-relaxed italic mb-6">
                    “{t.quote}”
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-champagne-gradient flex items-center justify-center text-white text-xs font-bold font-montserrat shadow-sm">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-montserrat font-bold text-mocha text-sm">{t.author}</h4>
                    <span className="font-cormorant text-xs text-mocha-light italic">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
}
