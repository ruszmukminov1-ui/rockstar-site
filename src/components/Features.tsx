// src/components/Features.tsx

import React from "react";
import { useInView } from "react-intersection-observer";

const Features = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className="relative py-12 md:py-20 bg-black text-white px-4 md:px-10 lg:px-20"
    >
      {/* Затемнение фона */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-purple-900/40 pointer-events-none"></div>

      <div
        className={`relative z-10 max-w-7xl mx-auto transition-all duration-1000 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center neon-text">
          Почему выбирают нас
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {/* 1 */}
          <div className="bg-zinc-900 bg-opacity-70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-zinc-700 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-bold mb-2 text-pink-400">
              Безопасность
            </h3>
            <p className="text-sm text-gray-300">
              Наш софт полностью безопасен и проходит постоянные проверки.
            </p>
          </div>

          {/* 2 */}
          <div className="bg-zinc-900 bg-opacity-70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-zinc-700 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-bold mb-2 text-purple-400">
              Частые обновления
            </h3>
            <p className="text-sm text-gray-300">
              Мы регулярно обновляем наши читы, чтобы они всегда были актуальны.
            </p>
          </div>

          {/* 3 */}
          <div className="bg-zinc-900 bg-opacity-70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-zinc-700 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-bold mb-2 text-green-400">
              Поддержка 24/7
            </h3>
            <p className="text-sm text-gray-300">
              Наша команда поддержки всегда готова помочь вам в любое время.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
