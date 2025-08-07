import React, { useState } from "react";
import { User } from "../types/User";
import { useModal } from "../context/ModalContext";
import { Star } from "lucide-react";

interface HeaderProps {
  currentUser: User | null;
  onDashboardClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  currentUser, 
  onDashboardClick, 
  onLogout 
}) => {
  const { openAuthModal, openSupportModal } = useModal();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="fixed top-0 w-full flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-md z-50 border-b border-purple-900/30">
      {/* Left side - Logo */}
      <div 
        className="relative group flex items-center space-x-3 cursor-pointer"
        onMouseEnter={() => currentUser && setShowUserMenu(true)}
        onMouseLeave={() => setShowUserMenu(false)}
      >
        <div className="relative">
          <Star className="w-10 h-10 text-purple-500 transition-all duration-300 group-hover:text-pink-500 group-hover:rotate-12" />
          <div className="absolute inset-0 w-10 h-10 bg-purple-500 rounded-full opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300" />
        </div>
        <div className="text-white font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
          Rockstar 2.0
        </div>

        {/* User dropdown menu */}
        {currentUser && showUserMenu && (
          <div className="absolute top-full left-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-md border border-purple-500/50 rounded-xl shadow-2xl shadow-purple-500/20 overflow-hidden">
            <div className="p-4 border-b border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
              <p className="text-white font-semibold">{currentUser.email}</p>
              <p className="text-gray-400 text-sm">Пользователь</p>
            </div>
            <div 
              onClick={onDashboardClick}
              className="px-4 py-3 text-purple-300 hover:bg-purple-800/50 hover:text-white cursor-pointer transition-all duration-200 flex items-center space-x-2"
            >
              <Star className="w-4 h-4" />
              <span>Личный кабинет</span>
            </div>
            <div 
              onClick={onLogout}
              className="px-4 py-3 text-red-400 hover:bg-red-800/50 hover:text-red-300 cursor-pointer transition-all duration-200"
            >
              Выйти
            </div>
          </div>
        )}
      </div>

      {/* Right side - Buttons */}
      <div className="flex items-center space-x-4">
        <button
          onClick={openSupportModal}
          className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-4 py-2 rounded-full shadow-md hover:scale-105 transition-all duration-300 text-sm font-semibold"
        >
          Поддержка
        </button>
        
        {!currentUser && (
          <button
            onClick={openAuthModal}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-4 py-2 rounded-full shadow-md hover:scale-105 transition-all duration-300 text-sm font-semibold"
          >
            Авторизация
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;