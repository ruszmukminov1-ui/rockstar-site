import React from 'react';
import { motion } from 'framer-motion';
import { User, ArrowLeft, Download, Clock, HardDrive, Shield } from 'lucide-react';
import { User as UserType } from '../types/User';

interface DashboardProps {
  user: UserType;
  onBack: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onBack }) => {
  return (
    <div className="min-h-screen bg-black text-white pt-20 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Назад</span>
            </button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Личный кабинет
              </h1>
              <p className="text-gray-400 mt-2">Добро пожаловать, {user.email}</p>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/50 rounded-xl p-6 mb-8 backdrop-blur-sm"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-purple-600 p-3 rounded-full">
              <User size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Информация об аккаунте</h3>
              <p className="text-gray-300">Email: {user.email}</p>
              {user.accessKey && (
                <p className="text-gray-300">Ключ доступа: {user.accessKey}</p>
              )}
              <p className="text-gray-300">Дата регистрации: {new Date(user.createdAt).toLocaleDateString('ru-RU')}</p>
            </div>
          </div>
        </motion.div>

        {/* Products */}
        <div className="grid gap-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Мои продукты
          </h2>
          
          {user.purchasedProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center py-12 bg-gray-900/50 rounded-xl border border-gray-700"
            >
              <Shield size={48} className="mx-auto text-gray-500 mb-4" />
              <p className="text-gray-400 text-lg">У вас пока нет приобретенных продуктов</p>
              <p className="text-gray-500 mt-2">Перейдите в магазин, чтобы купить Rockstar Client</p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.purchasedProducts.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 border border-purple-500/50 rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-purple-400">{product.title}</h3>
                    <div className="bg-green-600 p-2 rounded-full">
                      <Shield size={20} />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Download size={16} className="text-cyan-400" />
                      <span className="text-sm">Версия: {product.version}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock size={16} className="text-cyan-400" />
                      <span className="text-sm">Срок: {product.duration}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <HardDrive size={16} className="text-cyan-400" />
                      <span className="text-sm">ОЗУ: {product.ramSize}</span>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-700">
                      <p className="text-xs text-gray-400">
                        Куплено: {new Date(product.purchaseDate).toLocaleDateString('ru-RU')}
                      </p>
                      {product.expiryDate && (
                        <p className="text-xs text-gray-400">
                          Истекает: {new Date(product.expiryDate).toLocaleDateString('ru-RU')}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-2 rounded-lg transition-all duration-300 hover:scale-105 font-semibold">
                    Скачать
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;