import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Auth: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-sm sm:max-w-md md:max-w-lg bg-glass rounded-xl shadow-lg perspective"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-xl hover:text-pink-400 transition"
        >
          ✕
        </button>

        <div className={`flip-container ${isLogin ? '' : 'rotate'}`}>
          {/* ВОЙТИ */}
          <div className="flip-front p-6">
            <h2 className="text-2xl mb-4 text-neon-pink font-bold text-center">Войти</h2>
            <input type="text" placeholder="Email" className="auth-input w-full mb-3" />
            <input type="password" placeholder="Пароль" className="auth-input w-full mb-4" />
            <button className="auth-button w-full mb-4">Авторизоваться</button>
            <p className="text-sm text-center">
              Нет аккаунта?{' '}
              <button onClick={toggleForm} className="text-purple-400 hover:underline">
                Зарегистрироваться
              </button>
            </p>
          </div>

          {/* РЕГИСТРАЦИЯ */}
          <div className="flip-back p-6">
            <h2 className="text-2xl mb-4 text-neon-purple font-bold text-center">Регистрация</h2>
            <input type="text" placeholder="Email" className="auth-input w-full mb-3" />
            <input type="password" placeholder="Пароль" className="auth-input w-full mb-3" />
            <input type="password" placeholder="Повторите пароль" className="auth-input w-full mb-4" />
            <button className="auth-button w-full mb-4">Зарегистрироваться</button>
            <p className="text-sm text-center">
              Уже есть аккаунт?{' '}
              <button onClick={toggleForm} className="text-pink-400 hover:underline">
                Войти
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
