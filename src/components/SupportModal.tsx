// components/SupportModal.tsx
import { useState } from 'react';
import emailjs from 'emailjs-com';

export default function SupportModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs.send(
      'Rockstar Client',
      'template_hczc8ys',
      formData,
      'yUxe3xhvCjrNB-QNh'
    ).then(() => {
      alert('✅ Сообщение успешно отправлено!');
      onClose();
    }).catch((error) => {
      console.error('Ошибка отправки:', error);
      alert('❌ Ошибка при отправке сообщения.');
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0d0d0d] border border-pink-600 rounded-2xl p-6 w-[90%] max-w-md shadow-xl neon-glow">
        <h2 className="text-2xl font-bold text-pink-500 mb-4 text-center">Поддержка</h2>
        <form onSubmit={sendEmail} className="flex flex-col gap-4">
          <input
            name="name"
            type="text"
            placeholder="Ваше имя"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-black border border-pink-500 text-white p-3 rounded outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            name="email"
            type="email"
            placeholder="Ваш email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-black border border-pink-500 text-white p-3 rounded outline-none focus:ring-2 focus:ring-pink-400"
          />
          <textarea
            name="message"
            placeholder="Ваше сообщение"
            value={formData.message}
            onChange={handleChange}
            required
            className="bg-black border border-pink-500 text-white p-3 rounded outline-none resize-none h-28 focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-full transition duration-200 shadow-lg"
          >
            Отправить
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-pink-400 hover:underline w-full text-center"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}
