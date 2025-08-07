import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-gray-900 to-black border border-purple-500/30 rounded-2xl p-6 shadow-xl text-white"
            initial={{ y: 100, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <X size={22} />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              Условия пользования
            </h2>

            <div className="space-y-4 text-sm leading-relaxed text-gray-300">
              <p>
                1. Использование программного обеспечения Rockstar Client
                допускается только с личного разрешения разработчиков.
              </p>
              <p>
                2. Любое распространение, продажа, передача доступа строго
                запрещены.
              </p>
              <p>
                3. Все действия, совершённые с использованием клиента, выполняются на
                ваш страх и риск.
              </p>
              <p>
                4. Мы не несём ответственности за возможные санкции от
                сторонних сервисов или платформ.
              </p>
              <p>
                5. При покупке клиента вы соглашаетесь с данными условиями.
              </p>
              <p className="pt-4 italic text-gray-500">
                Последнее обновление: 8 августа 2025 г.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TermsModal;
