import React from 'react';
import { useApp } from '../context/AppContext';

const Terms = () => {
  const { t } = useApp();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-black text-white font-rajdhani">
<<<<<<< HEAD
      <div className="w-full max-w-4xl bg-[#0f0f0f] p-6 md:p-10 rounded-2xl shadow-lg border border-purple-500/30 backdrop-blur-md animate-slide-up">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-400 mb-6 text-center drop-shadow-md">
          Условия пользования
        </h1>

        <div className="space-y-6 text-gray-300 text-sm md:text-base leading-relaxed">
=======
      <div className="w-full max-w-4xl bg-[#0f0f0f] p-4 md:p-6 lg:p-10 rounded-2xl shadow-lg border border-purple-500/30 backdrop-blur-md animate-slide-up">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-400 mb-4 md:mb-6 text-center drop-shadow-md">
          {t('terms.title')}
        </h1>

        <div className="space-y-4 md:space-y-6 text-gray-300 text-sm md:text-base leading-relaxed">
>>>>>>> 125a53c47bce7d712b5d54a55f33e34a8c3608b0
          <p><strong>1. Общие положения</strong><br />
            Используя данный сайт, вы соглашаетесь соблюдать все условия, изложенные ниже. Если вы не согласны с ними — покиньте сайт.
          </p>

          <p><strong>2. Ответственность</strong><br />
            Администрация не несёт ответственности за использование продуктов на стороне пользователя.
          </p>

          <p><strong>3. Лицензия</strong><br />
            Все продукты предоставляются "как есть". Перепродажа, публикация, распространение без разрешения запрещены.
          </p>

          <p><strong>4. Конфиденциальность</strong><br />
            Мы не передаём личную информацию третьим лицам. Все данные используются только для обработки заказов.
          </p>

          <p><strong>5. Изменения условий</strong><br />
            Администрация оставляет за собой право изменять условия в любое время без предварительного уведомления.
          </p>

<<<<<<< HEAD
          <p className="text-xs text-gray-500 mt-8 text-center">
            Последнее обновление: 07 августа 2025
=======
          <p className="text-xs text-gray-500 mt-6 md:mt-8 text-center">
            {t('terms.updated')}
>>>>>>> 125a53c47bce7d712b5d54a55f33e34a8c3608b0
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;