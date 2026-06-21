import ProductCard from '../ui/ProductCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';

export default function ProductGrid({ products, onViewDetails }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="w-16 h-16 rounded-full bg-champagne/10 flex items-center justify-center mx-auto mb-4">
          <FontAwesomeIcon icon={faHeartBroken} className="text-champagne text-2xl" />
        </div>
        <h3 className="font-playfair font-semibold text-mocha text-xl mb-1">
          No Sweet Treats Found
        </h3>
        <p className="font-cormorant text-mocha-light text-base italic max-w-sm mx-auto">
          We couldn't find any products matching your search or filter. Try a different keyword!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <ProductCard product={product} onViewDetails={onViewDetails} />
        </div>
      ))}
    </div>
  );
}
