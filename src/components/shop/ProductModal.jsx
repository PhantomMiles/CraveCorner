import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faShoppingCart, faStar, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useCartContext } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import Button from '../ui/Button';

export default function ProductModal({ product, onClose }) {
  const { addItem } = useCartContext();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-mocha/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-cream w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible animate-fade-in z-10 border border-champagne/20">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-mocha/70 hover:bg-mocha text-white flex items-center justify-center transition-all duration-300 shadow-lg"
          aria-label="Close details"
        >
          <FontAwesomeIcon icon={faTimes} className="text-sm" />
        </button>

        {/* Image Column */}
        <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[300px] relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 category-badge bg-champagne text-mocha shadow-md">
              {product.badge}
            </span>
          )}
        </div>

        {/* Info Column */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
          <div>
            {/* Category */}
            <span className="font-montserrat text-xs text-champagne font-bold uppercase tracking-widest block mb-2">
              {product.categoryLabel}
            </span>

            {/* Name */}
            <h2 className="font-playfair font-bold text-2xl md:text-3xl text-mocha mb-3 leading-tight">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center text-champagne text-xs">
                <FontAwesomeIcon icon={faStar} />
                <span className="font-montserrat text-sm font-semibold text-mocha ml-1">
                  {product.rating}
                </span>
              </div>
              <span className="text-mocha-light font-montserrat text-xs">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Description */}
            <p className="font-cormorant text-mocha-light text-lg leading-relaxed mb-6 italic">
              {product.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map(tag => (
                <span
                  key={tag}
                  className="font-montserrat text-xs px-2.5 py-1 rounded-md bg-cream-dark text-mocha-light font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            {/* Price Row */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-champagne/10">
              <span className="font-montserrat text-sm font-semibold text-mocha-light">Price</span>
              <span className="font-playfair font-bold text-3xl text-champagne-gradient">
                {formatPrice(product.price)}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Quantity selectors */}
              <div className="flex items-center gap-3 p-1 border border-champagne/30 rounded-xl bg-cream-dark/50">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg bg-cream hover:bg-champagne/10 text-mocha flex items-center justify-center transition-all duration-300"
                  aria-label="Decrease quantity"
                >
                  <FontAwesomeIcon icon={faMinus} className="text-xs" />
                </button>
                <span className="font-montserrat font-bold text-mocha text-sm w-6 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-8 h-8 rounded-lg bg-cream hover:bg-champagne/10 text-mocha flex items-center justify-center transition-all duration-300"
                  aria-label="Increase quantity"
                >
                  <FontAwesomeIcon icon={faPlus} className="text-xs" />
                </button>
              </div>

              {/* Add to bag button */}
              <Button
                variant={added ? 'champagne' : 'rose'}
                fullWidth
                onClick={handleAdd}
                className="flex items-center justify-center gap-2 py-3.5"
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                {added ? 'Added to Bag!' : 'Add to Bag'}
              </Button>
            </div>

            {/* Stock status */}
            <div className="mt-3 text-center">
              <span className="font-montserrat text-xs text-mocha-light">
                {product.stock > 0 ? (
                  <span className="text-green-600 font-medium">✓ In Stock (only {product.stock} available)</span>
                ) : (
                  <span className="text-rose-gold font-medium">Out of Stock</span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
