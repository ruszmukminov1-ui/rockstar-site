import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Shop from "./components/Shop";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import SupportModal from "./components/SupportModal";
import OrderModal from "./components/OrderModal";
<<<<<<< HEAD
=======
import NotificationToast from "./components/NotificationToast";
>>>>>>> 57bc86e44039985442a98621c79732284d50d81d
import VideoReviews from "./components/VideoReviews";
import FloatingElements from "./components/FloatingElements";
import Dashboard from "./components/Dashboard";
import Terms from "./components/Terms";

import { AppContextProvider, useApp } from "./context/AppContext";

function AppContent() {
  const { currentUser, isAuthOpen, isSupportOpen, isOrderOpen } = useApp();
  const [showDashboard, setShowDashboard] = useState(false);
<<<<<<< HEAD
=======
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
>>>>>>> 57bc86e44039985442a98621c79732284d50d81d

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
        {/* Main page */}
        <Route path="/" element={
          showDashboard && currentUser ? (
            <div className="relative bg-black text-white font-rajdhani overflow-x-hidden">
              <Header />
              <Dashboard user={currentUser} onBack={() => setShowDashboard(false)} />
              <FloatingElements />
            </div>
          ) : (
            <div className="relative bg-black text-white font-rajdhani overflow-x-hidden">
              <Header />
              <Hero onBuyClick={scrollToShop} />
              <Features />
<<<<<<< HEAD
              <Shop />
              <VideoReviews />
              <Footer />
              <FloatingElements />
=======
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
>>>>>>> 57bc86e44039985442a98621c79732284d50d81d
            </div>
          )
        } />

        {/* Terms page */}
        <Route path="/terms" element={
          <div className="animate-fade-in bg-black min-h-screen text-white font-rajdhani">
            <Header />
            <Terms />
            <Footer />
            <FloatingElements />
          </div>
        } />
      </Routes>

      {/* Modals */}
      {isAuthOpen && <AuthModal />}
      {isSupportOpen && <SupportModal />}
      {isOrderOpen && <OrderModal />}
    </Router>
  );
}

function App() {
  return (
    <AppContextProvider>
      <AppContent />
    </AppContextProvider>
  );
}

export default App;