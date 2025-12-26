import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Product } from '../../types';
import { useCart } from '../../store/cart';
import { Truck, ShieldCheck, MessageCircle } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();
      if (data) setProduct(data);
      setLoading(false);
    };
    if (slug) fetchProduct();
  }, [slug]);

  if (loading) return <div className="min-h-screen pt-32 flex justify-center">Cargando...</div>;
  if (!product) return <div className="min-h-screen pt-32 flex justify-center">Producto no encontrado</div>;

  return (
    <div className="pt-32 pb-16 min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md flex items-center justify-center">
              {product.images?.[0] ? (
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="text-gray-300 font-bold uppercase tracking-widest">Sin Imagen</div>
              )}
            </div>
            {/* Thumbnails placeholder */}
          </div>

          {/* Info */}
          <div>
            <span className="text-gold-600 font-bold uppercase tracking-widest text-sm">{product.category === 'bar' ? 'Barra de Origen' : 'Especial'}</span>
            <h1 className="text-4xl font-serif font-bold text-cacao-900 mt-2 mb-4">{product.name}</h1>
            <p className="text-3xl font-bold text-cacao-900 mb-6">S/ {product.price.toFixed(2)}</p>

            <div className="prose text-gray-600 mb-8">
              <p>{product.description}</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex border-b border-gray-200 pb-2">
                <span className="w-32 font-bold text-cacao-900">Origen:</span>
                <span className="text-gray-700">{product.origin}</span>
              </div>
              <div className="flex border-b border-gray-200 pb-2">
                <span className="w-32 font-bold text-cacao-900">Notas:</span>
                <span className="text-gray-700">{product.tasting_notes}</span>
              </div>
              <div className="flex border-b border-gray-200 pb-2">
                <span className="w-32 font-bold text-cacao-900">Ingredientes:</span>
                <span className="text-gray-700">{product.ingredients}</span>
              </div>
              <div className="flex border-b border-gray-200 pb-2">
                <span className="w-32 font-bold text-cacao-900">Peso:</span>
                <span className="text-gray-700">{product.weight_grams}g</span>
              </div>
            </div>

            <div className="flex space-x-4 mb-8">
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock <= 0}
                className="flex-1 bg-cacao-900 text-white py-4 rounded-sm font-bold tracking-wider hover:bg-gold-600 transition-colors shadow-lg disabled:bg-gray-400"
              >
                {product.stock > 0 ? 'AGREGAR AL CARRITO' : 'AGOTADO'}
              </button>
              <a
                href={`https://wa.me/51947442007?text=Hola,%20tengo%20una%20consulta%20sobre%20el%20producto:%20${product.name}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-4 border-2 border-cacao-900 text-cacao-900 rounded-sm hover:bg-cacao-50 transition-colors"
              >
                <MessageCircle />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Truck size={18} /> Envíos a todo el Perú
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} /> Garantía de Calidad
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
