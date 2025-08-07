import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';

const SupportModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', message: '', email: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs.send(
      'Rockstar Client',
      'template_hczc8ys',
      formData,
      'yUxe3xhvCjrNB-QNh'
    )
    .then(() => {
      setSuccessMessage('Вы успешно отправили сообщение!');
      setFormData({ name: '', message: '', email: '' });

      // Убираем сообщение через 4 секунды
      setTimeout(() => setSuccessMessage(''), 4000);
    })
    .catch((error) => {
      console.error('Ошибка отправки:', error);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-[#0b0b0b] p-6 rounded-2xl border border-purple-500 shadow-xl w-[90%] max-w-md text-white font-rajdhani"
      >
        <h2 className="text-2xl font-bold mb-4 text-purple-400">Поддержка</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Ваше имя"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-black border border-purple-700"
          />
          <input
            type="email"
            name="email"
            placeholder="Ваш Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-black border border-purple-700"
          />
          <textarea
            name="message"
            placeholder="Ваше сообщение"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-black border border-purple-700"
            rows={4}
          />
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded hover:opacity-90 transition"
          >
            Отправить
          </button>

          {successMessage && (
            <p className="text-green-400 text-center text-sm mt-2">{successMessage}</p>
          )}
        </form>

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-xl hover:text-red-500"
        >
          ×
        </button>
      </motion.div>
    </div>
  );
};

export default SupportModal;
