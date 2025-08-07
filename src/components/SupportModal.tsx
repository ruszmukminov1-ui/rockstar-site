
import React from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const SupportModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    emailjs
      .sendForm('service_5ruo6wh', 'template_a9f4xqi', formRef.current, 'yUxe3xhvCjrNB-QNh')
      .then(() => {
        alert('Вы успешно отправили сообщение');
        formRef.current?.reset();
        onClose();
      })
      .catch((error) => {
        console.error('Ошибка отправки:', error.text);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[#0e0e1c] w-[90%] max-w-md rounded-2xl shadow-lg p-4 border border-purple-500"
      >
        <h2 className="text-xl font-bold text-center text-white mb-2">Поддержка</h2>
        <form ref={formRef} onSubmit={sendEmail} className="flex flex-col space-y-2">
          <input name="user_name" required placeholder="Ваше имя" className="p-2 rounded bg-black text-white text-sm" />
          <input name="user_email" type="email" required placeholder="Ваш email" className="p-2 rounded bg-black text-white text-sm" />
          <textarea name="message" required placeholder="Ваше сообщение" className="p-2 rounded bg-black text-white text-sm" />
          <button type="submit" className="bg-purple-700 hover:bg-purple-800 text-white rounded p-2 text-sm transition">Отправить</button>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-white text-sm text-center">Закрыть</button>
        </form>
      </motion.div>
    </div>
  );
};

export default SupportModal;
