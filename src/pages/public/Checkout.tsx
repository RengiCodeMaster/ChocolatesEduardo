import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../store/cart';
import { supabase } from '../../lib/supabaseClient';
import { QrCode } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Lima',
    district: '',
    reference: ''
  });

  if (cart.length === 0) {
    return (
      <div className="pt-32 min-h-screen text-center">
        <h2 className="text-2xl mb-4">Tu carrito está vacío</h2>
        <button onClick={() => navigate('/tienda')} className="text-gold-600 underline">Volver a la tienda</button>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare items for JSONB
      const itemsPayload = cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));

      // Call secure RPC
      const { data: order, error } = await supabase.rpc('create_order', {
        p_customer_name: formData.name,
        p_customer_phone: formData.phone,
        p_address: formData.address,
        p_city: formData.city,
        p_district: formData.district,
        p_reference: formData.reference,
        p_total_amount: cartTotal,
        p_payment_method: 'YAPE',
        p_items: itemsPayload
      });

      if (error) throw error;

      // Clear Cart & Redirect
      clearCart();
      // data returns { id, order_number } directly as an object (if not array) or just the json
      // rpc returns data as `any` usually. 
      // The function returns jsonb, so data will be the object.
      navigate(`/gracias?orderId=${order.id}&number=${order.order_number}`);

    } catch (err) {
      console.error("Error creating order:", err);
      alert('Hubo un error al procesar el pedido. Inténtalo de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-16 min-h-screen bg-cream-50">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-serif font-bold text-cacao-900 mb-8 text-center">Finalizar Compra</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-6 text-cacao-900">Datos de Envío</h2>
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nombre Completo</label>
                <input required name="name" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:border-gold-500 outline-none" placeholder="Juan Pérez" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Celular (WhatsApp)</label>
                <input required name="phone" type="tel" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:border-gold-500 outline-none" placeholder="999888777" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Dirección</label>
                <input required name="address" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:border-gold-500 outline-none" placeholder="Av. Principal 123" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Ciudad</label>
                  <select name="city" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded bg-white">
                    <option value="Lima">Lima</option>
                    <option value="Provincia">Provincia</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Distrito</label>
                  <input required name="district" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:border-gold-500 outline-none" placeholder="Miraflores" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Referencia</label>
                <input name="reference" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:border-gold-500 outline-none" placeholder="Frente al parque..." />
              </div>
            </form>
          </div>

          {/* Summary & Payment */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-cacao-900">Resumen</h2>
              <ul className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {cart.map(item => (
                  <li key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span className="font-bold">S/ {(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t pt-4 flex justify-between text-xl font-bold text-cacao-900">
                <span>Total</span>
                <span>S/ {cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-cacao-900 text-cream-100 p-6 rounded-lg shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><QrCode size={100} /></div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10"><QrCode /> Pago único: YAPE</h2>
              <p className="text-sm mb-4 relative z-10">Escanea el QR o yapea al número indicado. Al confirmar, te redirigiremos a WhatsApp para enviar el comprobante.</p>

              <div className="bg-white p-4 rounded text-center mb-4 relative z-10">
                <div className="w-full max-w-[200px] mx-auto mb-2 rounded border-2 border-dashed border-gray-400 p-1">
                  <img src="/yape-qr.jpg" alt="QR Yape Don Eduardo" className="w-full h-auto rounded" />
                </div>
                <p className="text-cacao-900 font-bold text-lg mt-2">947 442 007</p>
                <p className="text-gray-600 text-sm">Titular: Juan Manuel Rengifo Fretel</p>
              </div>

              <button
                form="checkout-form"
                type="submit"
                disabled={loading}
                className="w-full bg-gold-500 text-cacao-900 py-3 rounded font-bold hover:bg-gold-400 transition-colors disabled:opacity-50 relative z-10 shadow-lg"
              >
                {loading ? 'Procesando...' : 'CONFIRMAR PEDIDO'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};