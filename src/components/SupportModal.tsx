import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import emailjs from "@emailjs/browser";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.includes("@") || message.trim().length < 10) {
      alert("Пожалуйста, введите корректный email и сообщение.");
      return;
    }

    setSending(true);
    try {
      await emailjs.send("yUxe3xhvCjrNB-QNh", "template_support", {
        email,
        message,
      });
      setSuccess(true);
      setEmail("");
      setMessage("");
    } catch (error) {
      alert("Ошибка при отправке. Попробуйте позже.");
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-md bg-gradient-to-b from-gray-900 to-black border border-purple-500/30 rounded-2xl p-6 shadow-lg text-white"
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <X size={22} />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              Связаться с поддержкой
            </h2>

            {success ? (
              <div className="text-green-400 text-center text-lg py-6">
                Сообщение отправлено! Мы скоро свяжемся с вами.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Ваш Email"
                  className="w-full px-4 py-3 bg-black border border-purple-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <textarea
                  placeholder="Ваше сообщение"
                  className="w-full h-32 px-4 py-3 bg-black border border-purple-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>

                <motion.button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3 rounded-md font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50"
                  whileTap={{ scale: 0.97 }}
                >
                  {sending ? "Отправка..." : "Отправить"}
                </motion.button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SupportModal;
