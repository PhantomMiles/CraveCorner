export default function Button({
  children,
  variant = 'champagne',
  size = 'md',
  className = '',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  id,
}) {
  const variants = {
    champagne: 'btn-champagne text-white',
    rose: 'btn-rose text-white',
    outline: 'border-2 border-champagne text-champagne hover:bg-champagne hover:text-white transition-all duration-300 font-montserrat font-semibold tracking-wide',
    ghost: 'text-champagne hover:bg-champagne/10 transition-all duration-300 font-montserrat font-semibold tracking-wide',
    dark: 'bg-mocha text-cream hover:bg-mocha-light transition-all duration-300 font-montserrat font-semibold tracking-wide',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs rounded-lg',
    md: 'px-6 py-3 text-sm rounded-xl',
    lg: 'px-8 py-4 text-base rounded-xl',
    xl: 'px-10 py-5 text-lg rounded-2xl',
  };

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
        ${className}
        inline-flex items-center justify-center gap-2
      `}
    >
      {children}
    </button>
  );
}
