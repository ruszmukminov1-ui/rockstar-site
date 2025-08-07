import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User } from '../types/User';
import { storageUtils } from '../utils/storage';
import { X } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin }) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors([]);
  };

  const validateForm = (): string[] => {
    const newErrors: string[] = [];
    
    if (!formData.email) {
      newErrors.push('Email обязателен');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.push('Неверный формат email');
    }
    
    if (!formData.password) {
      newErrors.push('Пароль обязателен');
    } else if (formData.password.length < 6) {
      newErrors.push('Пароль должен содержать минимум 6 символов');
    }
    
    if (activeTab === 'register') {
      if (formData.password !== formData.confirmPassword) {
        newErrors.push('Пароли не совпадают');
      }
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }
    
    try {
      if (activeTab === 'login') {
        // Login logic
        const existingUser = storageUtils.getUserByEmail(formData.email);
        
        if (!existingUser) {
          setErrors(['Пользователь не найден']);
          setIsLoading(false);
          return;
        }
        
        if (existingUser.password !== formData.password) {
          setErrors(['Неверный пароль']);
          setIsLoading(false);
          return;
        }
        
        storageUtils.setCurrentUser(existingUser);
        onLogin(existingUser);
        
      } else {
        // Registration logic
        const existingUser = storageUtils.getUserByEmail(formData.email);
        
        if (existingUser) {
          setErrors(['Пользователь с таким email уже существует']);
          setIsLoading(false);
          return;
        }
        
        const newUser: User = {
          id: Date.now().toString(),
          email: formData.email,
          password: formData.password,
          accessKey: '',
          purchasedProducts: [],
          createdAt: new Date().toISOString(),
        };
        
        storageUtils.saveUser(newUser);
        storageUtils.setCurrentUser(newUser);
        
        onLogin(newUser);
      }
    } catch (error) {
      setErrors(['Произошла ошибка. Попробуйте снова.']);
    }
    
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md p-8 bg-gray-900/95 backdrop-blur-md border border-purple-500/50 rounded-2xl shadow-2xl shadow-purple-500/25"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {activeTab === 'login' ? 'Вход' : 'Регистрация'}
          </h2>
        </div>

        <div className="flex mb-6 bg-gray-800/50 rounded-lg p-1">
          <button
            onClick={() => {
              setActiveTab("login");
              setErrors([]);
              setFormData({ email: '', password: '', confirmPassword: '' });
            }}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all ${
              activeTab === "login"
                ? "bg-purple-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Вход
          </button>
          <button
            onClick={() => {
              setActiveTab("register");
              setErrors([]);
              setFormData({ email: '', password: '', confirmPassword: '' });
            }}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all ${
              activeTab === "register"
                ? "bg-purple-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Регистрация
          </button>
        </div>

        {/* Error Messages */}
        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-900/50 border border-red-500/50 rounded-lg"
          >
            {errors.map((error, index) => (
              <p key={index} className="text-red-300 text-sm">{error}</p>
            ))}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              required
            />
          </div>
          
          {activeTab === "register" && (
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Повторите пароль"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                required
              />
            </div>
          )}
          
          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/25"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? 'Загрузка...' : (activeTab === "login" ? "Войти" : "Зарегистрироваться")}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal;