import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import { formatPrice } from '../../utils/formatPrice';
import Button from '../ui/Button';

export default function ProductsTable({ products, onAddProduct, onEditProduct, onDeleteProduct }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'cakes',
    categoryLabel: 'Cakes',
    image: '',
    stock: '',
    featured: false,
  });

  const categoriesMapping = {
    cakes: 'Cakes',
    cupcakes: 'Cupcakes',
    cookies: 'Cookies',
    puddings: 'Puddings & Mousse',
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'cakes',
      categoryLabel: 'Cakes',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80',
      stock: '15',
      featured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      categoryLabel: product.categoryLabel,
      image: product.image,
      stock: product.stock.toString(),
      featured: product.featured,
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'category') {
      setFormData(prev => ({
        ...prev,
        category: value,
        categoryLabel: categoriesMapping[value],
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      price: parseFloat(formData.price) || 0.0,
      stock: parseInt(formData.stock) || 0,
      rating: editingProduct ? editingProduct.rating : 4.5,
      reviews: editingProduct ? editingProduct.reviews : 0,
      tags: editingProduct ? editingProduct.tags : [formData.category, 'sweet'],
    };

    if (editingProduct) {
      onEditProduct({ ...editingProduct, ...finalData });
    } else {
      onAddProduct({ id: Date.now(), ...finalData });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-playfair text-xl font-bold text-mocha">Manage Products</h3>
        <Button variant="champagne" size="sm" onClick={handleOpenAdd}>
          <FontAwesomeIcon icon={faPlus} className="mr-1 text-xs" />
          Add Sweet Treat
        </Button>
      </div>

      {/* Table Container */}
      <div className="neo-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-cream-dark/50 border-b border-champagne/20 font-montserrat text-xs font-bold text-mocha-light uppercase tracking-wider">
                <th className="p-4">Treat Details</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-right">Price</th>
                <th className="p-4 text-center">Stock</th>
                <th className="p-4 text-center">Featured</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="font-montserrat text-sm divide-y divide-champagne/10">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-cream-dark/25 transition-colors duration-250">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-xl object-cover border border-champagne/10 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-mocha truncate max-w-[200px]">{product.name}</div>
                        <div className="text-xs text-mocha-light truncate max-w-[200px]">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-xs font-semibold uppercase text-champagne tracking-wide">
                    {product.categoryLabel}
                  </td>
                  <td className="p-4 text-right font-bold text-mocha">
                    {formatPrice(product.price)}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      product.stock > 10
                        ? 'bg-green-100 text-green-700'
                        : 'bg-rose-gold/15 text-rose-gold'
                    }`}>
                      {product.stock} pcs
                    </span>
                  </td>
                  <td className="p-4 text-center text-champagne text-xs">
                    {product.featured ? '★ Featured' : '—'}
                  </td>
                  <td className="p-4 text-center space-x-2">
                    <button
                      onClick={() => handleOpenEdit(product)}
                      className="p-2 text-mocha-light hover:text-champagne transition-colors"
                      title="Edit Product"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => onDeleteProduct(product.id)}
                      className="p-2 text-mocha-light hover:text-rose-gold transition-colors"
                      title="Delete Product"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRUD Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-mocha/60 backdrop-blur-xs" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-cream w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl z-10 border border-champagne/20 animate-fade-in p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-playfair text-xl font-bold text-mocha">
                {editingProduct ? 'Edit Sweet Treat' : 'Add Sweet Treat'}
              </h4>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-cream-dark hover:bg-champagne/10 text-mocha-light flex items-center justify-center transition-all duration-300"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-montserrat font-bold text-mocha-light uppercase tracking-wider mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-crave"
                  placeholder="e.g. Red Velvet Cupcake"
                />
              </div>

              <div>
                <label className="block text-xs font-montserrat font-bold text-mocha-light uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  required
                  rows={2}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="input-crave"
                  placeholder="Describe this delicious treat..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-montserrat font-bold text-mocha-light uppercase tracking-wider mb-1">
                    Price (£)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    required
                    value={formData.price}
                    onChange={handleInputChange}
                    className="input-crave"
                    placeholder="3.99"
                  />
                </div>
                <div>
                  <label className="block text-xs font-montserrat font-bold text-mocha-light uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="input-crave cursor-pointer"
                  >
                    <option value="cakes">Cakes</option>
                    <option value="cupcakes">Cupcakes</option>
                    <option value="cookies">Cookies</option>
                    <option value="puddings">Puddings & Mousse</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-montserrat font-bold text-mocha-light uppercase tracking-wider mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    required
                    value={formData.image}
                    onChange={handleInputChange}
                    className="input-crave"
                    placeholder="https://unsplash..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-montserrat font-bold text-mocha-light uppercase tracking-wider mb-1">
                    Stock Level
                  </label>
                  <input
                    type="number"
                    name="stock"
                    required
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="input-crave"
                    placeholder="25"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-champagne border-champagne/30 rounded focus:ring-champagne focus:ring-opacity-20 cursor-pointer"
                />
                <label htmlFor="featured-checkbox" className="font-montserrat text-sm text-mocha font-medium cursor-pointer">
                  Feature this product on homepage carousel
                </label>
              </div>

              <div className="pt-4 flex gap-3">
                <Button type="submit" variant="rose" fullWidth>
                  <FontAwesomeIcon icon={faSave} className="mr-1 text-xs" />
                  Save Treat
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} fullWidth>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
