import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ProductCard from '../ui/ProductCard';
import { getFeaturedProducts } from '../../utils/products';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useState } from 'react';
import ProductModal from '../shop/ProductModal';

export default function FeaturedProducts() {
  const featured = getFeaturedProducts();
  const { ref, isVisible } = useScrollAnimation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-20 bg-cream" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.25em] text-champagne mb-2">
              Hand-picked for you
            </p>
            <h2 className="section-title">
              Featured <span className="text-champagne-gradient">Treats</span>
            </h2>
          </div>
          <Link
            to="/shop"
            className="mt-4 sm:mt-0 flex items-center gap-2 font-montserrat text-sm font-semibold text-champagne hover:text-rose-gold transition-colors duration-300 group"
          >
            View All Treats
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-xs group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Swiper carousel */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            slidesPerView={1}
            spaceBetween={24}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-4"
          >
            {featured.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} onViewDetails={setSelectedProduct} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom nav arrows */}
          <button
            ref={prevRef}
            aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md text-champagne hover:bg-champagne hover:text-white transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <button
            ref={nextRef}
            aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md text-champagne hover:bg-champagne hover:text-white transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}