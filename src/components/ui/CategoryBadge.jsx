const colorMap = {
  cakes: 'bg-rose-gold/10 text-rose-gold border border-rose-gold/20',
  cupcakes: 'bg-peach/30 text-mocha border border-peach/40',
  cookies: 'bg-champagne/20 text-mocha border border-champagne/30',
  puddings: 'bg-pastel-blue/30 text-mocha border border-pastel-blue/40',
  all: 'bg-champagne/15 text-champagne border border-champagne/30',
};

export default function CategoryBadge({ category, label, className = '' }) {
  const colors = colorMap[category] || colorMap.all;
  return (
    <span className={`category-badge ${colors} ${className}`}>
      {label}
    </span>
  );
}
