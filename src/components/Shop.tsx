import React from "react";

interface Product {
  name: string;
  price: string;
  duration: string;
}

interface ShopProps {
  onBuyClick: (product: Product) => void;
}

const PRODUCTS: Product[] = [
  { name: "Beta", price: "199₽", duration: "навсегда" },
  { name: "Recode", price: "299₽", duration: "3 месяца" },
];

const Shop: React.FC<ShopProps> = ({ onBuyClick }) => {
  return (
    <section id="shop" className="px-4 py-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {PRODUCTS.map((prod) => (
          <div
            key={prod.name}
            className="neon-box flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold mb-2">{prod.name}</h3>
              <p className="text-gray-300">{prod.duration}</p>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold mb-4">{prod.price}</p>
              <button
                onClick={() => onBuyClick(prod)}
                className="neon-button w-full"
              >
                Купить сейчас
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Shop;
