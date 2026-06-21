export default function GlassCard({ children, className = '', dark = false, onClick }) {
  const base = dark ? 'glass-dark' : 'glass-card';
  return (
    <div
      className={`${base} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
