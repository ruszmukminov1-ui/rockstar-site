import React from "react";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-2">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-[#111] border border-purple-500/30 text-white rounded-xl sm:rounded-2xl p-4 sm:p-8 w-full max-w-lg mx-auto animate-slide-up z-50 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-purple-400 mb-4">
          Связаться с нами
        </h2>
        <form
          action="https://formspree.io/f/xwkgykdo"
          method="POST"
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Ваше имя"
            required
            className="w-full bg-black border border-purple-600 rounded-md p-2 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Ваш Email"
            required
            className="w-full bg-black border border-purple-600 rounded-md p-2 focus:outline-none"
          />
          <textarea
            name="message"
            placeholder="Ваше сообщение"
            required
            rows={4}
            className="w-full bg-black border border-purple-600 rounded-md p-2 focus:outline-none resize-none"
          ></textarea>
          <button
            type="submit"
            className="neon-button w-full"
          >
            Отправить
          </button>
        </form>
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-red-400 text-xl"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default SupportModal;
