import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Heart, Sun, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    return (
        <div className="w-full bg-cream-50">
            {/* Hero Section */}
            <section className="relative h-[60vh] bg-cacao-900 flex items-center justify-center overflow-hidden pt-32">
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="https://images.unsplash.com/photo-1629158097746-8097d743a60f?q=80&w=1920&auto=format&fit=crop"
                        alt="Valle del Monzón"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-cacao-900 via-cacao-900/60 to-transparent"></div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="relative z-10 text-center px-4 max-w-4xl mx-auto"
                >
                    <span className="text-gold-500 font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Nuestra Esencia</span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
                        El Corazón del <br />
                        <span className="text-gold-500 italic">Monzón</span>
                    </h1>
                </motion.div>
            </section>

            {/* Historia Section */}
            <section className="py-20 px-4 md:px-0">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="prose prose-lg"
                    >
                        <h2 className="text-3xl font-serif font-bold text-cacao-900 mb-6">Nacidos en la Selva Alta</h2>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            En el profundo y fértil <strong>Valle de Monzón, Huánuco</strong>, donde la neblina abraza a las montañas y el sol besa la tierra cada mañana, nace Don Eduardo. Somos más que una marca de chocolates; somos el legado de una tradición cacaotera que ha pasado de generación en generación.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Nuestra historia comienza con la tierra. En un valle recuperado y renacido, nuestros agricultores cultivan cacao fino de aroma con paciencia y respeto por la naturaleza. Cada grano es testigo del esfuerzo y la esperanza de nuestra comunidad.
                        </p>
                        <div className="flex items-center gap-2 text-cacao-900 font-bold mt-4">
                            <MapPin className="text-gold-500" />
                            <span>Monzón, Huánuco, Perú</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative p-4 border-2 border-gold-500 rounded-xl"
                    >
                        <img
                            src="/don-eduarte-campo.jpg"
                            alt="Don Eduardo en el cacaotal"
                            className="relative z-10 rounded-lg shadow-2xl w-full h-[500px] object-cover"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-gold-600 font-bold uppercase tracking-widest text-xs">Nuestros Pilares</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-cacao-900 mt-2">¿Por qué Don Eduardo?</h2>
                    </div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-10"
                    >
                        {[
                            {
                                icon: Heart,
                                title: "Pasión Artesanal",
                                desc: "No usamos máquinas industriales. Nuestros maestros chocolateros supervisan cada lote, asegurando un temperado perfecto y un sabor inigualable."
                            },
                            {
                                icon: Sun,
                                title: "Origen Único",
                                desc: "El microclima del Valle de Monzón otorga a nuestro cacao notas frutales y florales que no encontrarás en ninguna otra parte del mundo."
                            },
                            {
                                icon: Award,
                                title: "Comercio Justo",
                                desc: "Trabajamos directamente con las familias agricultoras, pagando precios justos que honran su trabajo y mejoran su calidad de vida."
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                className="bg-cream-50 p-8 rounded-xl text-center hover:shadow-xl transition-shadow duration-300 border border-transparent hover:border-gold-200"
                            >
                                <div className="w-16 h-16 bg-cacao-900 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-500">
                                    <item.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-cacao-900 mb-4">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Quote / Founder */}
            <section className="py-24 bg-cacao-900 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-gold-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <div className="text-6xl text-gold-500 font-serif opacity-50 mb-6">"</div>
                    <p className="text-2xl md:text-3xl font-light italic leading-relaxed mb-8">
                        Queremos que cada barra de chocolate te transporte a nuestras montañas, que sientas la lluvia, el sol y el cariño de nuestra gente en cada bocado. Don Eduardo es Huánuco para el mundo.
                    </p>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-1 bg-gold-500 mb-4"></div>
                        <h4 className="text-xl font-bold tracking-widest uppercase">Don Eduardo</h4>
                        <span className="text-gold-500 text-sm">Fundador & Maestro Chocolatero</span>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gold-500">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-cacao-900 mb-6">Prueba el sabor de nuestra tierra</h2>
                    <p className="text-cacao-900/80 text-lg mb-8 max-w-2xl mx-auto">
                        Llevamos lo mejor del Valle de Monzón directamente a tu mesa. Descubre nuestra colección exclusiva.
                    </p>
                    <Link to="/tienda">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-cacao-900 text-white px-10 py-4 rounded-sm font-bold tracking-widest hover:bg-cacao-800 transition-colors shadow-2xl"
                        >
                            IR A LA TIENDA
                        </motion.button>
                    </Link>
                </div>
            </section>
        </div>
    );
};
