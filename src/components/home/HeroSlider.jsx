import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';

const slides = [
  {
    id: 1,
    image: '/img/dish12.jpeg',
    tag: 'Bestseller',
    title: 'Molten Chocolate\nLava Cake',
    subtitle: 'Warm. Decadent. Irresistible.',
    cta: 'Shop Now',
    ctaLink: '/shop',
    accent: 'linear-gradient(135deg, rgba(61,35,20,0.75) 0%, rgba(201,135,111,0.45) 100%)',
  },
  {
    id: 2,
    image: '/img/dish14.jpeg',
    tag: 'Fresh Today',
    title: 'Orange Cream\nCupcakes',
    subtitle: 'A citrus cloud in every bite.',
    cta: 'Explore Cupcakes',
    ctaLink: '/shop',
    accent: 'linear-gradient(135deg, rgba(61,35,20,0.7) 0%, rgba(245,197,163,0.4) 100%)',
  },
  {
    id: 3,
    image: '/img/dish16.jpeg',
    tag: 'Luxury Collection',
    title: 'Rose & Pistachio\nMacarons',
    subtitle: 'French elegance, handcrafted with love.',
    cta: 'View Collection',
    ctaLink: '/shop',
    accent: 'linear-gradient(135deg, rgba(61,35,20,0.72) 0%, rgba(212,175,122,0.4) 100%)',
  },
  {
    id: 4,
    image: '/img/dish5.jpeg',
    tag: 'New Arrival',
    title: 'Matcha\nCheesecake',
    subtitle: 'The perfect fusion of East meets West.',
    cta: 'Discover More',
    ctaLink: '/shop',
    accent: 'linear-gradient(135deg, rgba(61,35,20,0.72) 0%, rgba(184,216,232,0.4) 100%)',
  },
];

export default function HeroSlider() {
  return (
    <div className="relative w-full h-screen min-h-[600px] max-h-[900px]">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative overflow-hidden">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-out"
              style={{
                backgroundImage: `url(${slide.image})`,
                animation: 'kenBurns 8s ease-out forwards',
              }}
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{ background: slide.accent }}
            />

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full">
                <div
                  className="max-w-2xl"
                  style={{ animation: 'slideHeroIn 0.8s ease-out forwards' }}
                >
                  {/* Tag */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-0.5 bg-champagne" />
                    <span className="font-montserrat text-champagne text-xs font-semibold uppercase tracking-[0.25em]">
                      {slide.tag}
                    </span>
                    <FontAwesomeIcon icon={faStar} className="text-champagne text-xs" />
                  </div>

                  {/* Headline */}
                  <h1 className="font-playfair font-bold text-white leading-none mb-4 hero-text-shadow"
                    style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', whiteSpace: 'pre-line' }}>
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="font-cormorant text-white/85 italic mb-8 hero-text-shadow"
                    style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)' }}>
                    {slide.subtitle}
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to={slide.ctaLink}
                      className="btn-champagne px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide flex items-center gap-2 group"
                    >
                      {slide.cta}
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="text-xs group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </Link>
                    <Link
                      to="/about"
                      className="px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide font-montserrat border-2 border-white/50 text-white hover:bg-white/10 transition-all duration-300"
                    >
                      Our Story
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        @keyframes kenBurns {
          0% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes slideHeroIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
