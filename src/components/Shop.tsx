import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Product } from "../types/Product";
import { Star, Check } from "lucide-react";

const products: Product[] = [
  {
    id: 1,
    title: "Rockstar Beta",
    price: "3000₽",
    duration: "Навсегда",
    features: [
      "Все функции Beta",
      "Пожизненная лицензия",
      "Приоритетная поддержка",
      "Эксклюзивные обновления"
    ],
    isPopular: true,
  },
  {
    id: 2,
    title: "Rockstar Recode",
    price: "600₽",
    duration: "Навсегда",
    features: [
      "Все функции Recode",
      "Пожизненная лицензия",
      "Техническая поддержка",
      "Регулярные обновления"
    ],
  },
  {
    id: 3,
    title: "Rockstar Recode",
    price: "300₽",
    duration: "3 месяца",
    features: [
      "Все функции Recode",
      "3 месяца доступа",
      "Базовая поддержка",
      "Стандартные обновления"
    ],
  },
];

interface ShopProps {
  onBuyClick: (product: Product) => void;
}

const Shop: React.FC<ShopProps> = ({ onBuyClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="shop" ref={ref} className="py-20 px-4 text-white bg-gradient-to-b from-black to-gray-900">
      <motion.h2 
        className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        Магазин
      </motion.h2>
      
      <motion.p 
        className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Выберите подходящий тариф и получите мгновенный доступ к Rockstar 2.0
      </motion.p>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative border rounded-2xl p-6 backdrop-blur-sm hover:scale-105 transition-all duration-300 ${
              product.isPopular
                ? 'border-purple-500 bg-gradient-to-b from-purple-900/30 to-pink-900/20 shadow-lg shadow-purple-500/25'
                : 'border-gray-700 bg-black/40 hover:border-purple-500/50'
            }`}
          >
            {product.isPopular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>Популярный</span>
                </div>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 text-white">{product.title}</h3>
              <p className="text-lg text-purple-400 font-semibold mb-4">{product.duration}</p>
              <div className="text-3xl font-bold text-white mb-2">{product.price}</div>
            </div>

            <ul className="space-y-3 mb-8">
              {product.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <motion.button
              onClick={() => onBuyClick(product)}
              className={`w-full font-semibold py-3 rounded-full transition-all duration-300 ${
                product.isPopular
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/50'
                  : 'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-purple-600 hover:to-pink-600 text-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Купить сейчас
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Shop;