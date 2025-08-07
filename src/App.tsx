import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Shop from "./components/Shop";
import Footer from "./components/Footer";
import Auth from "./components/Auth";
import SupportModal from "./components/SupportModal";
import OrderModal from "./components/OrderModal";
import FloatingElements from "./components/FloatingElements";
import TermsModal from "./components/TermsModal";
import { Product } from "./types/Product";

const App: React.FC = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openAuthModal = () => setIsAuthOpen(true);
  const closeAuthModal = () => setIsAuthOpen(false);

  const openSupportModal = () => setIsSupportOpen(true);
  const closeSupportModal = () => setIsSupportOpen(false);

  const openTermsModal = () => setIsTermsOpen(true);
  const closeTermsModal = () => setIsTermsOpen(false);

  const handleBuyClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeOrderModal = () => {
    setSelectedProduct(null);
  };

  const handleDashboardClick = () => {
    alert("Переход в личный кабинет (ещё не реализовано)");
  };

  const handleLogout = () => {
    alert("Вы вышли из аккаунта.");
  };

  return (
    <div className="relative bg-black text-white min-h-screen overflow-x-hidden">
      <FloatingElements />
      <Header
        currentUser={null}
        onAuthClick={openAuthModal}
        onSupportClick={openSupportModal}
        onDashboardClick={handleDashboardClick}
        onLogout={handleLogout}
      />
      <main className="pt-20">
        <Hero />
        <Features />
        <Shop onBuyClick={handleBuyClick} />
      </main>
      <Footer onTermsClick={openTermsModal} />

      {/* Модальные окна */}
      <Auth isOpen={isAuthOpen} onClose={closeAuthModal} />
      <SupportModal isOpen={isSupportOpen} onClose={closeSupportModal} />
      <TermsModal isOpen={isTermsOpen} onClose={closeTermsModal} />
      {selectedProduct && (
        <OrderModal
          isOpen={!!selectedProduct}
          onClose={closeOrderModal}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default App;
