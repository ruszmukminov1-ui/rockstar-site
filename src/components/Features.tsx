import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Shield, Clock, Headphones } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Мгновенная активация',
    description: 'Получите доступ сразу после покупки — без задержек.',
  },
  {
    icon: Headphones,
    title: 'Поддержка 24/7',
    description: 'Мы всегда на связи, чтобы помочь вам.',
  },
  {
    icon: Shield,
    title: 'Безопасность',
    description: 'Обход всех современных систем защиты.',
  },
  {
    icon: Clock,
    title: 'Простота использования',
    description: 'Интуитивно понятный интерфейс и настройка.',
  },
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative py-20 bg-black text-white px-4 md:px-10 lg:px-20">
      {/* Серый фон-затемнение для читаемости */}
      <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm" />
      
      <div className="relative z-10">
      <motion.h2 
        className="text-3xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        Почему выбирают нас?
      </motion.h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-6 rounded-xl border border-purple-600/30 bg-gradient-to-b from-purple-900/40 to-black/60 shadow-md backdrop-blur-md hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 hover:border-purple-400/60 transition-all duration-500"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-purple-400 group-hover:text-purple-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
      </div>
    </section>
  );
}