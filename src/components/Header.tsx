import React from "react";
import { FaTelegramPlane, FaUser } from "react-icons/fa";

interface HeaderProps {
  currentUser: any;
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
  onLogout
}) => {
  return (
    <header className="w-full px-4 py-6 flex justify-between items-center bg-black border-b border-purple-800">
      <div className="text-2xl font-bold text-purple-400">Rockstar 2.0</div>
      <nav className="flex items-center gap-4">
        {!currentUser && (
          <button
            onClick={onAuthClick}
            className="neon-button px-4 py-2 text-sm"
          >
            Авторизация
          </button>
        )}
        <button
          onClick={onSupportClick}
          className="transition-transform transform hover:-translate-y-1"
        >
          <FaTelegramPlane size={24} />
        </button>
        {currentUser && (
          <>
            <button
              onClick={onDashboardClick}
              className="neon-button px-4 py-2 text-sm"
            >
              Кабинет
            </button>
            <button
              onClick={onLogout}
              className="neon-button px-4 py-2 text-sm"
            >
              Выйти
            </button>
          </>
        )}
      </nav>
    </header>
);

export default Header;
