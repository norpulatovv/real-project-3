import React from 'react';

function Hero() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-green-500 to-green-400 rounded-2xl p-12 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-2">Mahsulot narxidan</h2>
          <h2 className="text-4xl font-bold mb-4">1% qaytaramiz</h2>
          <p className="text-lg opacity-90">alif nasiya orqali muddatli to'lov</p>
          <p className="text-lg opacity-90">uchun 1% keshbek</p>
        </div>
        <div className="absolute right-10 top-1/2 -translate-y-1/2">
          <div className="text-8xl">💰</div>
          <div className="bg-yellow-400 text-green-600 font-bold px-4 py-2 rounded-full text-sm absolute -top-4 -right-4">
            CASHBACK
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;