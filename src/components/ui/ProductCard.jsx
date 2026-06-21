import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faStar, faStarHalfAlt, faBolt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { formatPrice } from '../../utils/formatPrice';
import { useCartContext } from '../../context/CartContext';
import { useState } from 'react';

const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {Array(full).fill(0).map((_, i) => (
        <FontAwesomeIcon key={`f${i}`} icon={faStar} className="star-filled text-xs" />
      ))}
      {half && <FontAwesomeIcon icon={faStarHalfAlt} className="star-filled text-xs" />}
      {Array(empty).fill(0).map((_, i) => (
        <FontAwesomeIcon key={`e${i}`} icon={faStarEmpty} className="star-empty text-xs" />
      ))}
    </div>
  );
};

const badgeColors = {
  'Bestseller': 'bg-rose-gold text-white',
  'New': 'bg-pastel-blue text-mocha',
  'Popular': 'bg-peach text-mocha',
  'Healthy': 'bg-green-100 text-green-800',
  'Luxury': 'bg-champagne text-mocha',
  'Fan Favorite': 'bg-rose-gold-light text-mocha',
  'Cultural Gem': 'bg-champagne-light text-mocha',
  'Seasonal': 'bg-peach text-mocha',
};

export default function ProductCard({ product, onViewDetails }) {
  const { addItem } = useCartContext();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="neo-card group cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-neomorphism-hover flex flex-col"
      onClick={() => onViewDetails?.(product)}
    >
      {/* Image */}
      <div className="product-image-wrap relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 category-badge text-xs ${badgeColors[product.badge] || 'bg-champagne text-mocha'}`}>
            {product.badge}
          </span>
        )}
        {/* Stock warning */}
        {product.stock <= 10 && product.stock > 0 && (
          <span className="absolute top-3 right-3 category-badge bg-mocha/80 text-cream text-xs">
            Only {product.stock} left
          </span>
        )}
        {/* Quick add overlay */}
        <div className="absolute inset-0 bg-mocha/0 group-hover:bg-mocha/20 transition-all duration-500 flex items-center justify-center">
          <button
            onClick={handleAdd}
            className={`opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 ${
              added
                ? 'bg-green-500 text-white'
                : 'btn-champagne text-white'
            } px-5 py-2 rounded-full text-sm font-semibold font-montserrat flex items-center gap-2 shadow-lg`}
          >
            <FontAwesomeIcon icon={added ? faBolt : faShoppingBasket} className="text-xs" />
            {added ? 'Added!' : 'Quick Add'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category */}
        <span className="font-montserrat text-xs text-champagne font-semibold uppercase tracking-widest mb-1">
          {product.categoryLabel}
        </span>

        {/* Name */}
        <h3 className="font-playfair font-semibold text-mocha text-lg leading-tight mb-2 group-hover:text-rose-gold transition-colors duration-300">
          {product.name}
        </h3>

        {/* Description */}
        <p className="font-cormorant text-mocha-light text-base leading-relaxed line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <StarRating rating={product.rating} />
          <span className="font-montserrat text-xs text-mocha-light">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-playfair font-bold text-2xl text-champagne-gradient">
              {formatPrice(product.price)}
            </span>
          </div>
          <button
            id={`add-to-cart-${product.id}`}
            onClick={handleAdd}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold font-montserrat transition-all duration-300 ${
              added
                ? 'bg-green-500 text-white scale-95'
                : 'btn-rose text-white'
            }`}
          >
            <FontAwesomeIcon icon={faShoppingBasket} className="text-xs" />
            {added ? '✓ Added' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
