import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "../types/Product";
import { X } from "lucide-react";
import emailjs from "@emailjs/browser";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, product }) => {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      alert("Пожалуйста, введите корректный email.");
      return;
    }

    setSending(true);

    try {
      await emailjs.send("yUxe3xhvCjrNB-QNh", "template_rockstar_order", {
        email,
        product: product.title,
        price: product.price,
        duration: product.duration
      });

      setSuccess(true);
      setEmail("");
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      alert("Произошла ошибка при отправке заказа.");
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-gradient-to-b from-gray-900 to-black border border-purple-600/30 rounded-2xl w-full max-w-md p-6 text-white shadow-lg"
            initial={{ y: 100, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-1">{product.title}</h2>
            <p className="text-purple-400 mb-4">{product.duration}</p>
            <p className="text-3xl font-bold mb-6">{product.price}</p>

            {success ? (
              <div className="text-green-400 text-center text-lg">
                Заказ успешно отправлен! ⛳ Мы скоро свяжемся с вами.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Ваш Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-black border border-purple-600 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <motion.button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3 rounded-md font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50"
                  whileTap={{ scale: 0.97 }}
                >
                  {sending ? "Отправка..." : "Оплатить"}
                </motion.button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderModal;
