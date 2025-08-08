import React, { useState } from "react";
import { useApp } from "../context/AppContext";

const Header: React.FC = () => {
  const { openAuthModal, openSupportModal, currentUser } = useApp();
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <header className="w-full px-4 py-3 flex justify-between items-center bg-black text-white relative z-50">
      <div className="flex items-center space-x-2 cursor-pointer">
        <img src="/avatar.png" alt="logo" className="w-10 h-10 rounded-full" />
        <span className="text-lg font-bold">Rockstar 2.0</span>
      </div>

      <div className="space-x-3 hidden sm:flex">
        <button onClick={openSupportModal} className="px-4 py-2 bg-pink-600 rounded-full hover:scale-105 transition">
          Поддержка
        </button>
        <button onClick={openAuthModal} className="px-4 py-2 bg-purple-600 rounded-full hover:scale-105 transition">
          Авторизация
        </button>
      </div>
    </header>
  );
};

export default Header;
