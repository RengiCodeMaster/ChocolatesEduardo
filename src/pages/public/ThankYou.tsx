import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { MessageCircle } from 'lucide-react';

export const ThankYou: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (orderId) {
      supabase.rpc('get_order_details', { p_order_id: orderId })
        .then(({ data, error }) => {
          if (data && data.order) {
            setOrder(data.order);
            setItems(data.items || []);
          } else {
            console.error("Error fetching order:", error);
          }
        });
    }
  }, [orderId]);

  if (!order) return <div className="pt-32 text-center">Cargando pedido...</div>;

  const productList = items.map(i => `${i.product_name_snapshot} x${i.quantity}`).join('\n');
  const message = `Hola Don Eduardo! Quiero confirmar mi pedido #${order.order_number}
Nombre: ${order.customer_name}
Celular: ${order.customer_phone}
Dirección: ${order.address}, ${order.district}, ${order.city}
Productos:
${productList}
Total a pagar: S/${order.total_amount.toFixed(2)}
Pago por Yape
Adjunto mi comprobante aquí:`;

  const waLink = `https://wa.me/51947442007?text=${encodeURIComponent(message)}`;

  return (
    <div className="pt-32 min-h-screen bg-cream-50 flex flex-col items-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center border-t-4 border-gold-500">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h1 className="text-3xl font-serif font-bold text-cacao-900 mb-2">¡Gracias por tu compra!</h1>
        <p className="text-gray-600 mb-6">Tu pedido <span className="font-bold">#{order.order_number}</span> ha sido registrado.</p>

        <div className="bg-gray-50 p-4 rounded text-left mb-6 text-sm border border-gray-200">
          <p className="mb-2"><strong>Total a pagar:</strong> S/ {order.total_amount.toFixed(2)}</p>
          <p className="mb-2"><strong>Yape a:</strong> 947 442 007</p>
          <p className="text-xs text-gray-500">Recuerda que prepararemos tu pedido una vez verifiquemos el pago.</p>
        </div>

        <p className="text-gray-700 font-medium mb-4">Último paso: Envíanos el comprobante</p>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full bg-green-500 text-white py-4 rounded font-bold hover:bg-green-600 transition-colors gap-2 shadow-md"
        >
          <MessageCircle /> ENVIAR A WHATSAPP
        </a>
      </div>
    </div>
  );
};