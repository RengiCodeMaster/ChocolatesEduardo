import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Award, ShieldCheck, Truck, MessageCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { Product } from '../../types';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = React.useState<Product[]>([]);
  const [imageError, setImageError] = useState(false);

  React.useEffect(() => {
    const fetchFeatured = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .limit(4);
      if (data) setFeaturedProducts(data);
    };
    fetchFeatured();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] bg-cacao-900 flex items-center pt-32 pb-12 overflow-hidden">
        {/* Background decorative elements with motion */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 2 }}
          className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-cacao-800 to-transparent"
        />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gold-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cacao-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left order-2 md:order-1 md:pr-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="inline-block border-b-2 border-gold-500 mb-4 pb-1"
            >
              <span className="text-gold-500 font-bold tracking-widest uppercase text-sm">Auténtico Cacao Peruano</span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              El Secreto de <br />
              <span className="text-gold-500">Don Eduardo</span>
            </h1>
            <p className="text-lg md:text-xl text-cream-100 mb-8 max-w-lg leading-relaxed font-light">
              "Aquí no hay máquinas, solo manos trabajadoras y amor por la tierra". <br />
              <span className="text-gold-500 italic text-base mt-2 block">- Don Eduardo, Maestro Chocolatero.</span>
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            >
              <Link
                to="/tienda"
                className="bg-gold-500 text-cacao-900 px-8 py-4 rounded-sm font-bold tracking-wide hover:bg-gold-400 transition-colors text-center shadow-lg shadow-gold-500/20 transform hover:-translate-y-1"
              >
                PROBAR CHOCOLATE
              </Link>
              <Link
                to="/nosotros"
                className="border-2 border-cream-200 text-cream-100 px-8 py-4 rounded-sm font-bold tracking-wide hover:bg-white/10 transition-colors text-center transform hover:-translate-y-1"
              >
                CONOCER HISTORIA
              </Link>
            </motion.div>
          </motion.div>

          {/* Don Eduarte Image */}
          <div className="relative h-full min-h-[400px] md:min-h-[600px] flex items-end justify-center order-1 md:order-2">
            <div className="relative z-10 w-full flex justify-center items-end">
              <motion.img
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                // Breathing effect
                style={{ y: 0 }}
                whileHover={{ scale: 1.02 }}
                src="/don-eduarte.png"
                alt="Don Eduardo en su finca"
                className={`object-contain w-auto max-h-[450px] md:max-h-[600px] drop-shadow-2xl z-20 ${imageError ? 'hidden' : 'block'}`}
                onError={() => setImageError(true)}
              />

              {/* Fallback */}
              {imageError && (
                <div className="flex flex-col items-center justify-center w-full h-[400px] bg-white/10 backdrop-blur-sm border-2 border-dashed border-gold-500 rounded-xl p-8 text-center">
                  <AlertCircle className="text-gold-500 mb-2" size={32} />
                  <h3 className="text-white font-bold text-lg mb-2">Falta la imagen</h3>
                  <code className="bg-black/30 px-2 py-1 rounded text-gold-400 font-mono mt-1 block">public/don-eduarte.png</code>
                </div>
              )}
            </div>
            {/* Decorative circle behind head */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 w-[80%] aspect-square bg-gradient-to-t from-gold-500/30 to-transparent rounded-full filter blur-3xl z-0"
            />
          </div>
        </div>
      </section>

      {/* Benefits / Trust - Scroll Reveal */}
      <section className="py-16 bg-cream-50 relative z-20 -mt-10 rounded-t-[3rem] shadow-xl shadow-cacao-900/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { icon: Leaf, title: "100% Natural", desc: "Cacao puro, sin mezclas." },
              { icon: Award, title: "Calidad de Autor", desc: "Selección personal." },
              { icon: Truck, title: "Envío Seguro", desc: "Empaquetado con cuidado." },
              { icon: MessageCircle, title: "Trato Directo", desc: "Te atendemos nosotros." }
            ].map((item, idx) => (
              <motion.div key={idx} variants={itemVariants} className="flex flex-col items-center group cursor-default">
                <div className="bg-white p-5 rounded-full mb-4 text-cacao-900 shadow-md group-hover:bg-gold-500 group-hover:text-white transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3">
                  <item.icon size={32} />
                </div>
                <h3 className="font-bold mb-2 text-cacao-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold-600 font-bold uppercase tracking-widest text-xs">Colección Especial</span>
            <h2 className="text-3xl font-serif font-bold text-cacao-900 mt-2">Los Favoritos de la Casa</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.length > 0 ? featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link to={`/producto/${product.slug}`} className="group block h-full">
                  <div className="bg-white rounded-sm shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 h-full flex flex-col">
                    <div className="aspect-square overflow-hidden bg-gray-100 relative flex items-center justify-center">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        src={product.images[0] || ''}
                        alt={product.name}
                        className={`w-full h-full object-cover ${!product.images[0] ? 'hidden' : ''}`}
                      />
                      {!product.images[0] && (
                        <span className="text-gray-300 font-bold uppercase tracking-widest text-xs">Sin Imagen</span>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <ArrowRight className="text-cacao-900" size={20} />
                      </div>
                    </div>
                    <div className="p-5 text-center flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-cacao-900 mb-1 group-hover:text-gold-600 transition-colors">{product.name}</h3>
                      </div>
                      <p className="text-gold-600 font-bold mt-2">S/ {product.price.toFixed(2)}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )) : (
              <p className="text-center col-span-4 text-gray-500 italic">Cargando...</p>
            )}
          </div>

          <div className="text-center mt-12">
            <Link to="/tienda">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block border-2 border-cacao-900 text-cacao-900 px-10 py-3 font-bold hover:bg-cacao-900 hover:text-white transition-all duration-300 rounded-sm tracking-wide"
              >
                VER TIENDA COMPLETA
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-cacao-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold"><span className="text-gold-500">Nuestro Proceso</span> Artesanal</h2>
            <p className="text-cream-200 mt-4 max-w-2xl mx-auto">Cada barra pasa por un riguroso control de calidad personal.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "Cosecha Selecta", desc: "Don Eduardo selecciona personalmente las mazorcas." },
              { title: "Fermentación", desc: "El tiempo justo en cajones de madera." },
              { title: "Secado al Sol", desc: "Secado lento, removiendo los granos a mano." },
              { title: "Tostado Suave", desc: "Notas de nuez y flores sin quemar el grano." }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="relative p-8 border border-gold-500/20 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-cacao-800 border border-gold-500 px-4 py-1 rounded-full text-gold-500 font-serif font-bold shadow-lg">Paso {idx + 1}</div>
                <h3 className="text-xl font-bold mb-3 mt-4 text-center">{step.title}</h3>
                <p className="text-cream-200 text-sm text-center leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Origin Section - Parallax Feel */}
      <section className="py-24 flex flex-col md:flex-row items-stretch overflow-hidden">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="md:w-1/2 min-h-[400px] relative"
        >
          <img src="/cacao-frutos.jpg" alt="Frutos de Cacao - Don Eduardo" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gold-900/20"></div>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="md:w-1/2 p-12 md:p-20 bg-cream-100 flex flex-col justify-center"
        >
          <span className="text-gold-600 font-bold uppercase tracking-widest text-xs mb-2">Nuestras Raíces</span>
          <h2 className="text-4xl font-serif font-bold text-cacao-900 mb-6">El Valle de los Incas</h2>
          <p className="text-gray-700 mb-6 leading-relaxed text-lg italic border-l-4 border-gold-500 pl-4">
            "El cacao no miente. Si lo tratas con respeto, te devuelve un sabor inolvidable".
          </p>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Nuestros cultivos se encuentran en tierras privilegiadas, donde el clima y la altura se unen para crear perfiles de sabor únicos.
          </p>
          <Link to="/nosotros" className="text-cacao-900 font-bold hover:text-gold-600 transition-colors flex items-center gap-2 group">
            Leer la historia completa <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};