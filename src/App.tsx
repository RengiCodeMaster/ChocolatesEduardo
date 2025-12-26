import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './store/cart';
import { Navbar, Footer, WhatsAppButton } from './components/layout/Layout';
import { Home } from './pages/public/Home';
import { Shop } from './pages/public/Shop';
import { ProductDetail } from './pages/public/ProductDetail';
import { Checkout } from './pages/public/Checkout';
import { ThankYou } from './pages/public/ThankYou';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { Login } from './pages/admin/Login';
import { CartDrawer } from './components/cart/CartDrawer';
import { ComingSoon } from './components/ui/ComingSoon';
import { About } from './pages/public/About';
import ScrollToTopAuto from './components/layout/ScrollToTopAuto';
import { ScrollToTop } from './components/ui/ScrollToTop';

// Wrapper to conditionally render Layout
const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTopAuto />
      {!isAdmin && <Navbar />}
      {!isAdmin && <CartDrawer />}
      <main className="min-h-screen">{children}</main>
      {!isAdmin && <WhatsAppButton />}
      {!isAdmin && <ScrollToTop />}
      {!isAdmin && <Footer />}
    </>
  );
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <HashRouter>
        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tienda" element={<Shop />} />
            <Route path="/producto/:slug" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/gracias" element={<ThankYou />} />

            {/* Pages Info Placeholders */}
            <Route path="/nosotros" element={<About />} />
            <Route path="/contacto" element={<ComingSoon title="Contacto" />} />
            <Route path="/faq" element={<ComingSoon title="Preguntas Frecuentes" />} />
            <Route path="/politicas" element={<ComingSoon title="Políticas y Envíos" />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </LayoutWrapper>
      </HashRouter>
    </CartProvider>
  );
};

export default App;
