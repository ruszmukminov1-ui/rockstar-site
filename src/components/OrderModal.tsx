import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Product } from "../types/Product";
import { PurchasedProduct } from "../types/User";
import { storageUtils } from "../utils/storage";
import { generateAccessKey } from "../utils/keyGenerator";
import { X, CreditCard } from "lucide-react";

interface OrderModalProps {
  onClose: () => void;
  selectedProduct: Product;
  onShowNotification: (message: string, type: 'success' | 'error') => void;
}

const OrderModal: React.FC<OrderModalProps> = ({
  onClose,
  selectedProduct,
  onShowNotification,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Имитация бесплатной покупки
    setTimeout(() => {
      const currentUser = storageUtils.getCurrentUser();
      
      if (currentUser) {
        // Генерируем уникальный ключ
        const accessKey = generateAccessKey();
        
        const purchasedProduct: PurchasedProduct = {
          id: selectedProduct.id,
          title: selectedProduct.title,
          version: "2.0.1",
          duration: selectedProduct.duration,
          ramSize: "8 ГБ", 
          minecraftVersion: "1.20.1",
          accessKey: accessKey,
          purchaseDate: new Date().toISOString(),
          expiryDate: selectedProduct.duration !== "Навсегда" 
            ? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
            : undefined
        };
        
        storageUtils.addPurchasedProduct(currentUser.id, purchasedProduct);
        onShowNotification(`Покупка успешна! Ваш ключ: ${accessKey}`, 'success');
      } else {
        onShowNotification('Ошибка: пользователь не найден', 'error');
      }
      
      setIsProcessing(false);
      onClose();
    }, 1500);
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
        initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md p-8 bg-gray-900/95 backdrop-blur-md border border-green-500/50 rounded-2xl shadow-2xl shadow-green-500/25"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)',
          boxShadow: '0 0 50px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4"
          >
            <CreditCard className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Оформление заказа
          </h2>
        </div>

        <div className="space-y-4 mb-6 p-4 bg-gray-800/50 rounded-lg border border-green-500/20">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Товар:</span>
            <span className="text-white font-semibold">{selectedProduct.title}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Срок:</span>
            <span className="text-green-400">{selectedProduct.duration}</span>
          </div>
          <div className="border-t border-gray-700 pt-2">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Итого:</span>
              <span className="text-2xl font-bold text-green-400">БЕСПЛАТНО</span>
            </div>
          </div>
        </div>

        <div className="mb-6 p-4 bg-green-900/30 border border-green-500/30 rounded-lg">
          <p className="text-green-300 text-center font-semibold">
            🎉 Специальное предложение: получите чит бесплатно!
          </p>
        </div>

        <form onSubmit={handlePurchase}>
          <motion.button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-green-500/25"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Получение чита...</span>
              </div>
            ) : (
              'Получить бесплатно'
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default OrderModal;