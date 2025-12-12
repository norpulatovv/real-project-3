import React, { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';

function ProductGrid({ products }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [showAll, setShowAll] = useState(false);

  const displayedProducts = showAll ? products : products.slice(0, 10);

  const handleAddToCart = (product) => {
    addToCart(product);
    // Toast notification (ixtiyoriy)
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[100] animate-bounce';
    toast.textContent = '✅ Savatga qo\'shildi!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Eng ko'p sotilgan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {displayedProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition group relative">
            {product.tag && (
              <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-bold text-white z-10 ${
                product.tag === 'Yangi' ? 'bg-blue-500' : 
                product.tag === 'Mashhur' ? 'bg-orange-500' : 
                'bg-red-500'
              }`}>
                {product.tag}
              </div>
            )}

            <div className="relative h-48 bg-gray-100 rounded-t-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300/e5e7eb/6b7280?text=No+Image';
                }}
              />
              <button 
                onClick={() => toggleFavorite(product)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:scale-110 transition z-10"
              >
                <Heart 
                  className={`w-5 h-5 transition-all ${
                    isFavorite(product.id) 
                      ? 'text-red-500 fill-red-500' 
                      : 'text-gray-400'
                  }`}
                />
              </button>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 h-12">
                {product.name}
              </h3>
              
              <div className="mb-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {(product.price / 1000).toFixed(0)} 000 so'm
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{product.installment}</p>
              </div>

              <button 
                onClick={() => handleAddToCart(product)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Sotib olish
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length > 10 && (
        <div className="text-center mt-8">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
          >
            {showAll ? `Kamroq ko'rsatish` : `Barchasi (${products.length} ta)`}
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductGrid;