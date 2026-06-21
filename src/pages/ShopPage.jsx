import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import FilterBar from '../components/shop/FilterBar';
import ProductGrid from '../components/shop/ProductGrid';
import ProductModal from '../components/shop/ProductModal';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get('cat') || 'all';

  const {
    products,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    totalCount,
  } = useProducts();

  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sync state with URL search param
  useEffect(() => {
    if (activeCategory !== catParam) {
      setActiveCategory(catParam);
    }
  }, [catParam, activeCategory, setActiveCategory]);

  const handleCategoryChange = (newCat) => {
    setActiveCategory(newCat);
    if (newCat === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ cat: newCat });
    }
  };

  return (
    <div className="pt-24 pb-20 bg-cream">
      {/* Decorative top header */}
      <div className="py-12 bg-cream-dark/40 border-b border-champagne/10 mb-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.25em] text-champagne mb-2">
            The Confectionery Shop
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-mocha mb-3">
            Handcrafted <span className="text-champagne-gradient">Sweet Treats</span>
          </h1>
          <p className="font-cormorant text-mocha-light text-lg italic max-w-xl mx-auto leading-relaxed">
            Freshly baked cakes, buttery cookies, airy mousse cups, and individual cupcake delights delivered directly to your doorstep.
          </p>
        </div>
      </div>

      {/* Main Filter & Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <FilterBar
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Counter */}
        <div className="flex justify-between items-center text-xs font-montserrat text-mocha-light/75 border-b border-champagne/10 pb-2">
          <span>Showing {totalCount} gourmet treats</span>
          <span>Free shipping on all items</span>
        </div>

        {/* Grid */}
        <ProductGrid products={products} onViewDetails={setSelectedProduct} />
      </div>

      {/* Details Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
