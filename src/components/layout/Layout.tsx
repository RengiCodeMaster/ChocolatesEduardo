import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Instagram, Facebook } from 'lucide-react';
import { useCart } from '../../store/cart';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { cartCount, toggleCart } = useCart();
  const location = useLocation();

  const isHome = location.pathname === '/';

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-cream-50 text-cacao-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="/" className="font-serif text-2xl font-bold tracking-wider flex flex-col leading-none">
            <span>DON</span>
            <span className="text-gold-500">EDUARDO</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center font-medium">
            <Link to="/" className="hover:text-gold-500 transition-colors">Inicio</Link>
            <Link to="/tienda" className="hover:text-gold-500 transition-colors">Tienda</Link>
            <Link to="/nosotros" className="hover:text-gold-500 transition-colors">Historia</Link>
            <button onClick={toggleCart} className="relative p-2 hover:text-gold-500 transition-colors">
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-gold-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={toggleCart} className="relative p-2">
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-gold-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-cream-50 text-cacao-900 absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-lg hover:text-gold-500">Inicio</Link>
            <Link to="/tienda" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-lg hover:text-gold-500">Tienda</Link>
            <Link to="/nosotros" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-lg hover:text-gold-500">Historia</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-cacao-900 text-cream-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1">
          <h3 className="font-serif text-2xl font-bold mb-4">DON <span className="text-gold-500">EDUARDO</span></h3>
          <p className="text-sm text-cream-200 leading-relaxed">
            Chocolate con alma. Cultivado, procesado y moldeado por manos expertas que conocen el secreto del verdadero cacao peruano.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-gold-500">Enlaces</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/tienda" className="hover:text-white transition-colors">Tienda</Link></li>
            <li><Link to="/nosotros" className="hover:text-white transition-colors">Nuestra Historia</Link></li>
            <li><Link to="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
            <li><Link to="/admin" className="hover:text-white transition-colors opacity-50">Admin</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-gold-500">Ayuda</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/faq" className="hover:text-white transition-colors">Preguntas Frecuentes</Link></li>
            <li><Link to="/politicas" className="hover:text-white transition-colors">Políticas de Envío</Link></li>
            <li><Link to="/politicas" className="hover:text-white transition-colors">Términos y Condiciones</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-gold-500">Síguenos</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gold-500 transition-colors"><Instagram size={24} /></a>
            <a href="#" className="hover:text-gold-500 transition-colors"><Facebook size={24} /></a>
          </div>
          <p className="mt-4 text-xs text-cream-200">
            © {new Date().getFullYear()} Don Eduardo. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export const WhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/51947442007?text=Hola%20Don%20Eduardo!%20Tengo%20una%20consulta%20o%20necesito%20soporte%20con%20mi%20pedido."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all transform hover:scale-105 flex items-center gap-2 group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="fill-current"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
      <span className="hidden group-hover:inline font-medium whitespace-nowrap">
        ¿Te ayudo?
      </span>
    </a>
  );
};