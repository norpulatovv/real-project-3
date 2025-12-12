import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, ArrowLeft, Minus, Plus } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  const isFavorite = favorites.some(f => f.id === parseInt(id));

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Xatolik:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-2xl font-bold text-gray-700 mb-4">Mahsulot topilmadi</p>
        <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Bosh sahifaga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Orqaga</span>
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="flex items-center justify-center bg-gray-100 rounded-lg p-8">
              <img 
                src={product.image} 
                alt={product.name}
                className="max-w-full max-h-[500px] object-contain"
                onError={(e) => e.target.src = 'https://via.placeholder.com/500/e5e7eb/6b7280?text=No+Image'}
              />
            </div>

            <div className="flex flex-col">
              {product.tag && (
                <span className="inline-block bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold mb-4 w-fit">
                  {product.tag}
                </span>
              )}

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description || 'Bu mahsulot haqida batafsil ma\'lumot mavjud emas.'}
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-blue-600">
                    {(product.price / 1000).toFixed(0)} 000 so'm
                  </span>
                  {product.oldPrice && (
                    <span className="text-xl text-gray-400 line-through">
                      {(product.oldPrice / 1000).toFixed(0)} 000 so'm
                    </span>
                  )}
                </div>
                
                {product.installment && (
                  <p className="text-green-600 font-semibold">
                    💳 Bo'lib to'lash: {product.installment}
                  </p>
                )}
              </div>

              {product.rating && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-xl ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-600 font-semibold">{product.rating}</span>
                </div>
              )}

              {product.category && (
                <div className="mb-6 pb-6 border-b">
                  <p className="text-gray-600">
                    <span className="font-semibold">Kategoriya:</span> {product.category}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-gray-700">Miqdor:</span>
                  <div className="flex items-center border-2 border-gray-300 rounded-lg">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-100 transition"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="px-6 font-bold text-lg">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-gray-100 transition"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      for (let i = 0; i < quantity; i++) {
                        addToCart(product);
                      }
                      alert(`✅ ${quantity} ta mahsulot savatga qo'shildi!`);
                    }}
                    className="flex-1 bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-bold text-lg flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    Savatga qo'shish
                  </button>

                  <button 
                    onClick={() => toggleFavorite(product)}
                    className={`p-4 border-2 rounded-lg transition ${isFavorite ? 'bg-red-50 border-red-500' : 'border-gray-300 hover:border-red-500'}`}
                  >
                    <Heart className={`w-6 h-6 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                  </button>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">📦 Yetkazib berish</h3>
                <p className="text-gray-600 text-sm">
                  Toshkent bo'ylab 1-2 kun ichida bepul yetkazib beriladi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;