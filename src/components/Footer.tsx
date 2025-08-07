import React from 'react';
import { Star, MessageCircle, Send, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-8 px-4 border-t border-purple-900">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <Star className="text-purple-500" />
              <span className="tech-font text-xl font-bold">ROCKSTAR CLIENT</span>
            </div>
            <p className="text-sm text-gray-400 mt-2"> </p>
          </div>
          
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <MessageCircle className="text-xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <Send className="text-xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <Twitter className="text-xl" />
            </a>
          </div>
          
          <div className="text-sm text-gray-400">
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="hover:text-purple-400 transition-colors">Условия использования</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Политика конфиденциальности</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;