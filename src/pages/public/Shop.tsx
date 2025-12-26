import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Product, ProductCategory, Category } from '../../types';
import { useCart } from '../../store/cart';
import { motion, AnimatePresence } from 'framer-motion';

export const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Fetch Categories
      const { data: cats } = await supabase.from('categories').select('*').order('created_at', { ascending: true });
      if (cats) setCategories(cats);

      // Fetch Products
      let query = supabase.from('products').select('*');
      if (filter !== 'all') {
        query = query.eq('category', filter);
      }
      const { data, error } = await query;
      if (data) setProducts(data);
      setLoading(false);
    };
    fetchData();
  }, [filter]);

  return (
    <div className="pt-32 pb-16 min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-serif font-bold text-cacao-900 mb-4">La Tienda de Don Eduardo</h1>
          <p className="text-gray-600 text-lg">Selecciona tus chocolates favoritos, hechos con pasión.</p>
        </motion.div>

        {/* Filters */}
        <div className="flex justify-center mb-12 space-x-2 md:space-x-4 flex-wrap gap-y-2">
          {/* Static 'All' Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter('all')}
            className={`px-4 md:px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${filter === 'all'
              ? 'bg-cacao-900 text-white shadow-lg'
              : 'bg-white text-cacao-900 border border-cacao-200 hover:border-cacao-900 hover:bg-gray-50'
              }`}
          >
            Todos
          </motion.button>

          {/* Dynamic Category Buttons */}
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(cat.slug)}
              className={`px-4 md:px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${filter === cat.slug
                ? 'bg-cacao-900 text-white shadow-lg'
                : 'bg-white text-cacao-900 border border-cacao-200 hover:border-cacao-900 hover:bg-gray-50'
                }`}
            >
              {cat.name}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center h-64 items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cacao-900"></div>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {products.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col border border-gray-100"
                >
                  <Link to={`/producto/${product.slug}`} className="relative aspect-[4/3] overflow-hidden bg-gray-100 rounded-t-lg block group-hover:opacity-90 transition-opacity">
                    {product.images?.[0] ? (
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <span className="text-xs uppercase font-bold tracking-widest">Sin Imagen</span>
                      </div>
                    )}
                    {product.stock <= 0 && (
                      <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
                        <span className="bg-gray-800 text-white px-3 py-1 text-sm font-bold uppercase">Agotado</span>
                      </div>
                    )}
                  </Link>
                  <div className="p-6 flex flex-col flex-grow relative">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">{product.origin}</span>
                    </div>
                    <Link to={`/producto/${product.slug}`}>
                      <h3 className="text-xl font-serif font-bold text-cacao-900 mb-2 hover:text-gold-600 transition-colors">{product.name}</h3>
                    </Link>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-2xl font-bold text-cacao-900">S/ {product.price.toFixed(2)}</span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => addToCart(product)}
                        disabled={product.stock <= 0}
                        className="bg-cacao-900 text-white px-4 py-2 rounded-sm text-sm font-bold hover:bg-gold-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                      >
                        {product.stock > 0 ? 'AGREGAR' : 'AGOTADO'}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};