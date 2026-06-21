export const categories = [
  {
    id: 'all',
    label: 'All Treats',
    icon: 'fa-star',
    color: 'from-champagne to-champagne-light',
    description: 'Everything sweet and wonderful',
  },
  {
    id: 'cakes',
    label: 'Cakes',
    icon: 'fa-birthday-cake',
    color: 'from-rose-gold to-rose-gold-light',
    description: 'Layered, loaf, and celebration cakes',
  },
  {
    id: 'cupcakes',
    label: 'Cupcakes',
    icon: 'fa-cupcake',
    color: 'from-peach to-champagne-light',
    description: 'Individual frosted cupcake delights',
  },
  {
    id: 'cookies',
    label: 'Cookies',
    icon: 'fa-cookie',
    color: 'from-champagne to-peach',
    description: 'Crispy, chewy, and irresistible',
  },
  {
    id: 'puddings',
    label: 'Puddings & Mousse',
    icon: 'fa-ice-cream',
    color: 'from-pastel-blue to-cream',
    description: 'Silky mousses and elegant puddings',
  },
];

export const getCategoryById = (id) => categories.find(c => c.id === id);
