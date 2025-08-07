import React from "react";
import { motion } from "framer-motion";

interface HeaderProps {
  currentUser: string | null;
  onAuthClick: () => void;
  onSupportClick: () => void;
  onDashboardClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentUser,
  onAuthClick,
  onSupportClick,
  onDashboardClick,
  onLogout,
}) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur border-b border-purple-800/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <motion.h1
          className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Rockstar 2.0
        </motion.h1>

        <nav className="flex items-center space-x-4">
          <button
            onClick={onSupportClick}
            className="text-white px-4 py-2 text-sm sm:text-base rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition shadow-lg"
          >
            Поддержка
          </button>

          <a
            href="https://t.me/rockclient"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:scale-110 transition shadow-md"
          >
            <img src="/tg-icon.svg" alt="Telegram" className="w-5 h-5" />
          </a>

          {currentUser ? (
            <>
              <button
                onClick={onDashboardClick}
                className="text-white hover:underline"
              >
                Кабинет
              </button>
              <button
                onClick={onLogout}
                className="text-gray-400 hover:text-white"
              >
                Выйти
              </button>
            </>
          ) : (
            <button
              onClick={onAuthClick}
              className="text-white px-4 py-2 rounded-full border border-purple-500 hover:bg-purple-700 transition"
            >
              Авторизация
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
