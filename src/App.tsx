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
import NotificationToast from "./components/NotificationToast";
import VideoReviews from "./components/VideoReviews";
import FloatingElements from "./components/FloatingElements";
import Dashboard from "./components/Dashboard";
import KeyInputModal from "./components/KeyInputModal";
import Terms from "./components/Terms"; // ✅ Новый импорт

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
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type, isVisible: true });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };
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
    showNotification('Вы успешно вышли из аккаунта', 'success');
  };

  const handleDashboardClick = () => {
    if (currentUser) {
      setShowDashboard(true);
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

  return (
    <Router>
      <NotificationToast
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
      
      <Routes>
        {/* Главная страница */}
        <Route path="/" element={
          showDashboard && currentUser ? (
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
          ) : (
            <div className="relative bg-black text-white font-rajdhani overflow-x-hidden">
              <Header 
                currentUser={currentUser}
                onDashboardClick={handleDashboardClick}
                onLogout={handleLogout}
              />
              <Hero onBuyClick={scrollToShop} />
              <Features />
              <Shop onBuyClick={openOrderModal} />
              <VideoReviews />
              <Footer />
              <FloatingElements />

              {isAuthOpen && (
                <AuthModal 
                  onClose={closeAuthModal} 
                  onLogin={handleLogin}
                  onShowNotification={showNotification}
                />
              )}
              {isSupportOpen && <SupportModal onClose={closeSupportModal} />}
              {isOrderOpen && selectedProductForOrder && (
                <OrderModal
                  onClose={closeOrderModal} 
                  selectedProduct={selectedProductForOrder} 
                  onShowNotification={showNotification}
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
          )
        } />

        {/* Страница условий пользования */}
        <Route path="/terms" element={
          <div className="animate-fade-in bg-black min-h-screen text-white font-rajdhani">
            <Header
              currentUser={currentUser}
              onDashboardClick={handleDashboardClick}
              onLogout={handleLogout}
            />
            <Terms />
            <Footer />
            <FloatingElements />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
