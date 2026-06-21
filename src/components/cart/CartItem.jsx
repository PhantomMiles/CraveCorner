import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { formatPrice } from '../../utils/formatPrice';
import { useCartContext } from '../../context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCartContext();

  return (
    <div className="flex items-center gap-4 py-4 border-b border-champagne/10">
      {/* Product Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 rounded-xl object-cover border border-champagne/20"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-playfair font-semibold text-mocha text-sm truncate">
          {item.name}
        </h4>
        <span className="font-montserrat text-xs text-champagne font-semibold block mt-0.5">
          {formatPrice(item.price)}
        </span>

        {/* Quantity control */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-6 h-6 rounded-full bg-cream-dark hover:bg-champagne/20 text-mocha flex items-center justify-center transition-all duration-300 text-xs"
            aria-label="Decrease quantity"
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span className="font-montserrat text-sm font-semibold text-mocha px-1 min-w-[20px] text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-6 h-6 rounded-full bg-cream-dark hover:bg-champagne/20 text-mocha flex items-center justify-center transition-all duration-300 text-xs"
            aria-label="Increase quantity"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>

      {/* Total & Delete */}
      <div className="flex flex-col items-end gap-2">
        <span className="font-playfair font-bold text-sm text-mocha">
          {formatPrice(item.price * item.quantity)}
        </span>
        <button
          onClick={() => removeItem(item.id)}
          className="text-mocha-light hover:text-rose-gold p-1 transition-colors duration-300"
          aria-label="Remove item"
        >
          <FontAwesomeIcon icon={faTrash} className="text-xs" />
        </button>
      </div>
    </div>
  );
}
