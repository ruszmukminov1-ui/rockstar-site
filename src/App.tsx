// src/App.tsx

import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Shop from "./components/Shop";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import SupportModal from "./components/SupportModal";
import OrderModal from "./components/OrderModal";
import FloatingElements from "./components/FloatingElements";
import NotificationToast from "./components/NotificationToast"; // ✅ добавлено

import { useModal } from "./context/ModalContext";

function App() {
  const {
    isAuthOpen,
    closeAuthModal,
    isSupportOpen,
    closeSupportModal,
    isOrderOpen,
    closeOrderModal,
    selectedProductForOrder,
    openOrderModal,
  } = useModal();

  return (
    <div className="relative bg-black text-white font-rajdhani overflow-x-hidden">
      <Header />
      <Hero />
      <Features />
      <Shop onBuyClick={openOrderModal} />
      <Footer />
      <FloatingElements />

      {/* Модалки */}
      {isAuthOpen && <AuthModal onClose={closeAuthModal} />}
      {isSupportOpen && <SupportModal onClose={closeSupportModal} />}
      {isOrderOpen && selectedProductForOrder && (
        <OrderModal
          onClose={closeOrderModal}
          selectedProduct={selectedProductForOrder}
        />
      )}

      {/* Уведомления */}
      <NotificationToast />
    </div>
  );
}

export default App;

