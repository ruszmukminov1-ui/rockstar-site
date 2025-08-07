import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

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
import Terms from "./components/Terms";

import { useModal } from "./context/ModalContext";
import { User } from "./types/User";
import { storageUtils } from "./utils/storage";

function App() {
  const {
    isAuthOpen,
    openAuthModal,
    closeAuthModal,
    isSupportOpen,
    openSupportModal,
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
      if (currentUser.purchasedProducts.length === 0) {
        setShowKeyInput(true);
      } else {
        setShowDashboard(true);
      }
    }
  };

  const scrollToShop = () => {
    const shopElement = document.getElementById('shop');
    if (shopElement) shopElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Router>
      <div className="relative bg-black text-white font-rajdhani overflow-x-hidden">
        <Header
          currentUser={currentUser}
          onAuthClick={openAuthModal}
          onSupportClick={openSupportModal}
          onDashboardClick={handleDashboardClick}
          onLogout={handleLogout}
        />

        <Routes>
          <Route path="/" element={
            showDashboard && currentUser ? (
              <>
                <Dashboard user={currentUser} onBack={() => setShowDashboard(false)} />
                <FloatingElements />
                {isSupportOpen && <SupportModal isOpen onClose={closeSupportModal} />}
              </>
            ) : (
              <>
                <Hero onBuyClick={scrollToShop} />
                <Features />
                <Shop onBuyClick={openOrderModal} />
              </>
            )
          } />

          <Route path="/terms" element={<Terms />} />
        </Routes>

        <Footer />
        <FloatingElements />

        {/* Модальные окна */}
        {isAuthOpen && <AuthModal isOpen onClose={closeAuthModal} onLogin={handleLogin} />}
        {isSupportOpen && <SupportModal isOpen onClose={closeSupportModal} />}
        {isOrderOpen && selectedProductForOrder && (
          <OrderModal
            isOpen
            onClose={closeOrderModal}
            product={selectedProductForOrder}
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
    </Router>
  );
}

export default App;
