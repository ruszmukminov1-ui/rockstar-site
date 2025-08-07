import { FaTelegramPlane, FaVk, FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-black text-white py-8 mt-12 border-t border-purple-800">
      {/* Значки */}
      <div className="flex justify-center gap-6 mb-4">
        <a
          href="https://vk.com/rockstarclient"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-500 transform hover:-translate-y-2 relative group"
        >
          <FaVk size={28} className="text-gray-300 group-hover:text-blue-400" />
          <div className="absolute inset-0 blur-md rounded-full opacity-0 group-hover:opacity-100 transition duration-500 bg-blue-400/20 z-[-1]" />
        </a>

        <a
          href="https://t.me/rockclient"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-500 transform hover:-translate-y-2 relative group"
        >
          <FaTelegramPlane size={28} className="text-gray-300 group-hover:text-blue-400" />
          <div className="absolute inset-0 blur-md rounded-full opacity-0 group-hover:opacity-100 transition duration-500 bg-blue-400/20 z-[-1]" />
        </a>

        <a
          href="https://discord.gg/tckhJdnT"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-500 transform hover:-translate-y-2 relative group"
        >
          <FaDiscord size={28} className="text-gray-300 group-hover:text-blue-400" />
          <div className="absolute inset-0 blur-md rounded-full opacity-0 group-hover:opacity-100 transition duration-500 bg-blue-400/20 z-[-1]" />
        </a>
      </div>

      {/* Текст */}
      <div className="flex justify-center gap-6 text-sm text-gray-400">
        <a href="#" className="hover:text-white transition duration-300">
          Условия использования
        </a>
        <a href="#" className="hover:text-white transition duration-300">
          Политика конфиденциальности
        </a>
      </div>
    </footer>
  );
};

export default Footer;
