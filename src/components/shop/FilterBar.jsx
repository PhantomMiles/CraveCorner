import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSlidersH, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import { categories } from '../../utils/categories';

export default function FilterBar({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="space-y-6">
      {/* Category selection bar */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-5 py-2.5 rounded-full font-montserrat text-sm font-semibold tracking-wide border transition-all duration-300 ${
                isActive
                  ? 'bg-champagne text-white border-transparent shadow-champagne scale-105'
                  : 'bg-cream text-mocha border-champagne/20 hover:border-champagne hover:bg-champagne/5'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Search & Sort layout */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between max-w-4xl mx-auto">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-champagne/60 text-sm"
          />
          <input
            id="shop-search"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search cakes, cookies, and sweet treats..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-champagne/30 bg-cream/80 text-mocha placeholder-mocha-light/60 font-montserrat text-sm outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/10 transition-all duration-300 shadow-sm"
          />
        </div>

        {/* Sort drop down */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <label htmlFor="shop-sort" className="font-montserrat text-xs font-bold text-mocha-light uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5">
            <FontAwesomeIcon icon={faSortAmountDown} className="text-champagne" />
            Sort By:
          </label>
          <div className="relative">
            <select
              id="shop-sort"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none pr-10 pl-4 py-3 rounded-2xl border border-champagne/30 bg-cream text-mocha font-montserrat text-sm font-semibold outline-none focus:border-champagne transition-all duration-300 shadow-sm cursor-pointer"
            >
              <option value="featured">Featured Treats</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">New Arrivals</option>
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-champagne">
              <FontAwesomeIcon icon={faSlidersH} className="text-xs" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
