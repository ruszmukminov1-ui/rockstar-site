import React from "react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: string;
    duration: string;
  } | null;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-2">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-[#111] border border-purple-500/30 text-white rounded-xl sm:rounded-2xl p-4 sm:p-8 w-full max-w-lg mx-auto animate-slide-up z-50 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl sm:text-2xl font-bold text-purple-400 mb-4 text-center">
          Оформление заказа
        </h2>
        <div className="mb-4 text-gray-300 space-y-2 text-sm sm:text-base">
          <p><strong>Чит:</strong> {product.name}</p>
          <p><strong>Цена:</strong> {product.price}</p>
          <p><strong>Срок:</strong> {product.duration}</p>
        </div>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Ваш Email"
            className="w-full bg-black border border-purple-600 rounded-md p-2 focus:outline-none"
          />
          <button type="submit" className="neon-button w-full">
            Оплатить
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

export default OrderModal;
