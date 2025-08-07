import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Shop from "./components/Shop";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import SupportModal from "./components/SupportModal";
import OrderModal from "./components/OrderModal";
import FloatingElements from "./components/FloatingElements";
import Dashboard from "./components/Dashboard";
import KeyInputModal from "./components/KeyInputModal";

import { useModal } from "./context/ModalContext";
import { User } from "./types/User";
import { storageUtils } from "./utils/storage";

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
    currentUser,
    setCurrentUser
  } = useModal();

  const [showDashboard, setShowDashboard] = useState(false);
  const [showKeyInput, setShowKeyInput] = useState(false);

  // Check for existing session on load
  useEffect(() => {
    const existingUser = storageUtils.getCurrentUser();
    if (existingUser) {
      setCurrentUser(existingUser);
    }
  }, [setCurrentUser]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    closeAuthModal();
  };

  const handleLogout = () => {
    storageUtils.clearCurrentUser();
    setCurrentUser(null);
    setShowDashboard(false);
  };

  const handleDashboardClick = () => {
    if (currentUser) {
      // Check if user has any purchased products
      if (currentUser.purchasedProducts.length === 0) {
        setShowKeyInput(true);
      } else {
        setShowDashboard(true);
      }
    }
  };

  const scrollToShop = () => {
    const shopElement = document.getElementById('shop');
    if (shopElement) {
      shopElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (showDashboard && currentUser) {
    return (
      <div className="relative bg-black text-white font-rajdhani overflow-x-hidden">
        <Header 
          currentUser={currentUser}
          onDashboardClick={handleDashboardClick}
          onLogout={handleLogout}
        />
        <Dashboard user={currentUser} onBack={() => setShowDashboard(false)} />
        <FloatingElements />
        {isSupportOpen && <SupportModal onClose={closeSupportModal} />}
      </div>
    );
  }

  return (
    <div className="relative bg-black text-white font-rajdhani overflow-x-hidden">
      <Header 
        currentUser={currentUser}
        onDashboardClick={handleDashboardClick}
        onLogout={handleLogout}
      />
      <Hero onBuyClick={scrollToShop} />
      <Features />
      <Shop onBuyClick={openOrderModal} />
      <Footer />
      <FloatingElements />
      
      {isAuthOpen && <AuthModal onClose={closeAuthModal} onLogin={handleLogin} />}
      {isSupportOpen && <SupportModal onClose={closeSupportModal} />}
      {isOrderOpen && selectedProductForOrder && (
        <OrderModal
          onClose={closeOrderModal} 
          selectedProduct={selectedProductForOrder} 
        />
      )}
      {showKeyInput && (
        <KeyInputModal 
          onClose={() => setShowKeyInput(false)}
          onSuccess={() => {
            setShowKeyInput(false);
            setShowDashboard(true);
          }}
        />
      )}
    </div>
  );
}

export default App;