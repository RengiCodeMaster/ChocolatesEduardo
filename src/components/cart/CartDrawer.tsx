import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../store/cart';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black"
            onClick={toggleCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-y-0 right-0 max-w-md w-full flex"
          >
            <div className="w-full h-full bg-white shadow-xl flex flex-col">
              <div className="flex items-center justify-between p-4 border-b bg-cream-50">
                <h2 className="text-lg font-serif font-bold text-cacao-900">Tu Carrito</h2>
                <button onClick={toggleCart} className="hover:rotate-90 transition-transform duration-300"><X size={24} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <p className="text-gray-500 mb-4">Tu carrito está vacío.</p>
                    <button onClick={toggleCart} className="text-gold-600 underline font-bold">Seguir comprando</button>
                  </div>
                ) : (
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                        className="flex gap-4 border-b pb-4"
                      >
                        <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover rounded bg-gray-100" />
                        <div className="flex-1">
                          <h3 className="font-bold text-cacao-900">{item.name}</h3>
                          <p className="text-gold-600 font-bold">S/ {item.price.toFixed(2)}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 bg-gray-100 rounded hover:bg-gray-200"><Minus size={14} /></button>
                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 bg-gray-100 rounded hover:bg-gray-200"><Plus size={14} /></button>
                          </div>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 h-fit transition-colors"><Trash2 size={18} /></button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-4 border-t bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-gray-700">Total</span>
                    <span className="font-bold text-2xl text-cacao-900">S/ {cartTotal.toFixed(2)}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      toggleCart();
                      navigate('/checkout');
                    }}
                    className="w-full bg-cacao-900 text-white py-3 rounded-sm font-bold uppercase tracking-wide hover:bg-gold-500 transition-colors shadow-lg"
                  >
                    Ir a Pagar
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};