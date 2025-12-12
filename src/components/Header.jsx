import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, User, X, Minus, Plus, Trash2 } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';

function Header() {
  const navigate = useNavigate();
  const [showCatalog, setShowCatalog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [categories, setCategories] = useState([]);

  const { favorites, totalFavorites, toggleFavorite } = useFavorites();
  const { cart, totalItems, removeFromCart, updateQuantity, clearCart, getTotalPrice, addToCart } = useCart();

  useEffect(() => {
    console.log('🔄 Mahsulotlarni yuklashga harakat qilinmoqda...');
    setLoading(true);

    Promise.all([
      fetch('http://localhost:3000/products').then(res => res.json()),
      fetch('http://localhost:3000/categories').then(res => res.json())
    ])
      .then(([productsData, categoriesData]) => {
        console.log('✅ Mahsulotlar muvaffaqiyatli yuklandi:', productsData);
        setAllProducts(productsData);
        setCategories(categoriesData);
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Xatolik yuz berdi:', err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);

    if (value.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    if (allProducts.length === 0) {
      return;
    }

    const searchLower = value.toLowerCase();
    const filtered = allProducts.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(searchLower);
      const descMatch = product.description?.toLowerCase().includes(searchLower);
      const categoryMatch = product.category?.toLowerCase().includes(searchLower);

      return nameMatch || descMatch || categoryMatch;
    });

    setSearchResults(filtered);
    setShowResults(true);
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-8">
              <h1
                onClick={() => navigate('/')}
                className="text-3xl font-bold text-blue-600 cursor-pointer hover:text-blue-700 transition"
              >
                NEXT
              </h1>
              <button
                onClick={() => setShowCatalog(true)}
                className="bg-yellow-400 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
              >
                KATALOG
              </button>

              {showCatalog && (
                <div
                  onClick={() => setShowCatalog(false)}
                  className='fixed z-[60] flex justify-center items-center w-full h-screen top-0 left-0 backdrop-blur-sm bg-[rgba(0,0,0,0.7)]'
                >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className='border-2 border-gray-300 bg-white w-[1100px] h-[700px] rounded-lg relative overflow-y-auto'
                  >
                    <button
                      className='absolute top-4 right-4 text-2xl hover:text-red-500 z-10'
                      onClick={() => setShowCatalog(false)}
                    >
                      ❌
                    </button>
                    <div className="p-6">
                      <h1 className='text-2xl font-bold mb-6'>Katalog</h1>

                      {loading ? (
                        <div className="text-center py-12">
                          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-xl font-bold mb-4">Kategoriyalar</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {categories.map(category => (
                              <div
                                key={category.id}
                                className="border rounded-lg p-4 hover:shadow-lg cursor-pointer transition text-center"
                              >
                                <div className="text-4xl mb-2">{category.icon}</div>
                                <h4 className="font-semibold">{category.name}</h4>
                              </div>
                            ))}
                          </div>

                          <h3 className="text-xl font-bold mb-4">Mahsulotlar ({allProducts.length} ta)</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {allProducts.slice(0, 12).map(product => (
                              <div
                                key={product.id}
                                className="border rounded-lg p-4 hover:shadow-xl transition"
                              >
                                <div className="relative mb-3">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    onClick={() => {
                                      navigate(`/product/${product.id}`);
                                      setShowCatalog(false);
                                    }}
                                    className="w-full h-40 object-cover rounded cursor-pointer hover:opacity-75 transition"
                                  />
                                  <button
                                    onClick={() => toggleFavorite(product)}
                                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
                                  >
                                    <Heart className={`w-5 h-5 ${favorites.some(f => f.id === product.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                                  </button>
                                </div>
                                <h4
                                  onClick={() => {
                                    navigate(`/product/${product.id}`);
                                    setShowCatalog(false);
                                  }}
                                  className="font-semibold text-sm mb-2 line-clamp-2 cursor-pointer hover:text-blue-600"
                                >
                                  {product.name}
                                </h4>
                                <p className="text-lg font-bold text-blue-600 mb-3">
                                  {(product.price / 1000).toFixed(0)} 000 so'm
                                </p>
                                <button
                                  onClick={() => addToCart(product)}
                                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                                >
                                  <ShoppingCart className="w-4 h-4" />
                                  Savatga
                                </button>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 max-w-xl mx-8 relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Mahsulotlarni qidirish"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => searchQuery && setShowResults(true)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />

                {loading && (
                  <div className="absolute right-14 top-1/2 -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                {searchQuery && !loading && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSearchResults([]);
                      setShowResults(false);
                    }}
                    className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}

                <button
                  onClick={() => handleSearch(searchQuery)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>

              {showResults && searchQuery && allProducts.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-2xl border border-gray-200 max-h-[500px] overflow-y-auto z-[70]">
                  {searchResults.length > 0 ? (
                    <>
                      <div className="p-3 bg-gray-50 border-b sticky top-0">
                        <p className="text-sm text-gray-600 font-medium">
                          ✅ {searchResults.length} ta natija topildi
                        </p>
                      </div>
                      <div className="p-2">
                        {searchResults.map(product => (
                          <div
                            key={product.id}
                            onClick={() => {
                              navigate(`/product/${product.id}`);
                              setShowResults(false);
                              setSearchQuery('');
                            }}
                            className="flex items-center gap-4 p-3 hover:bg-blue-50 rounded-lg cursor-pointer transition"
                          >
                            <div className="w-20 h-20 bg-gray-100 rounded border flex items-center justify-center overflow-hidden flex-shrink-0">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/80x80/e5e7eb/6b7280?text=No+Image';
                                }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 mb-1 truncate">
                                {product.name}
                              </h4>
                              <p className="text-sm text-gray-500 line-clamp-1 mb-2">
                                {product.description || 'Tavsif yo\'q'}
                              </p>
                              <p className="text-lg font-bold text-blue-600">
                                {(product.price / 1000).toFixed(0)} 000 so'm
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="p-12 text-center">
                      <div className="text-7xl mb-4">🔍</div>
                      <p className="text-gray-700 font-semibold text-lg mb-2">
                        Hech narsa topilmadi
                      </p>
                      <p className="text-sm text-gray-500">
                        "<span className="font-semibold">{searchQuery}</span>" bo'yicha natija yo'q
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFavorites(true)}
                className="relative flex items-center gap-2 hover:text-red-500 transition"
              >
                <Heart className="w-6 h-6" />
                {totalFavorites > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalFavorites}
                  </span>
                )}
              </button>

              <button
                onClick={() => setShowCart(true)}
                className="relative flex items-center gap-2 hover:text-blue-600 transition"
              >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                <User className="w-5 h-5" />
                <span>Kirish</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {showCart && (
        <div
          onClick={() => setShowCart(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
                Savat ({totalItems})
              </h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-2xl hover:text-red-500"
              >
                ❌
              </button>
            </div>

            <div className="p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-7xl mb-4">🛒</div>
                  <p className="text-xl text-gray-600 font-semibold">Savat bo'sh</p>
                  <p className="text-gray-500 mt-2">Mahsulot qo'shing</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/100x100/e5e7eb/6b7280?text=No+Image';
                            }}
                          />
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                            <p className="text-lg font-bold text-blue-600">
                              {(item.price / 1000).toFixed(0)} 000 so'm
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-3">
                            <div className="flex items-center gap-2 border rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-100 rounded-l-lg transition"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 font-bold">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-100 rounded-r-lg transition"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 hover:bg-red-50 rounded-full transition text-red-500"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-2xl font-bold mb-4">
                      <span>Jami:</span>
                      <span className="text-blue-600">{(getTotalPrice() / 1000).toFixed(0)} 000 so'm</span>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          if (confirm('Savatni tozalamoqchimisiz?')) {
                            clearCart();
                          }
                        }}
                        className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
                      >
                        Tozalash
                      </button>
                      <button
                        onClick={() => {
                          alert(`🎉 Buyurtma qabul qilindi!\n\nJami: ${(getTotalPrice() / 1000).toFixed(0)} 000 so'm\nMahsulotlar soni: ${totalItems} ta`);
                          clearCart();
                          setShowCart(false);
                        }}
                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                      >
                        Buyurtma berish
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {showFavorites && (
        <div
          onClick={() => setShowFavorites(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                Sevimlilar ({totalFavorites})
              </h2>
              <button
                onClick={() => setShowFavorites(false)}
                className="text-2xl hover:text-red-500"
              >
                ❌
              </button>
            </div>

            <div className="p-6">
              {favorites.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-7xl mb-4">💔</div>
                  <p className="text-xl text-gray-600 font-semibold">Sevimlilar bo'sh</p>
                  <p className="text-gray-500 mt-2">Mahsulotga ❤️ bosib qo'shing</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favorites.map(product => (
                    <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg transition">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          onClick={() => {
                            navigate(`/product/${product.id}`);
                            setShowFavorites(false);
                          }}
                          className="w-24 h-24 object-cover rounded cursor-pointer hover:opacity-75 transition"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/100x100/e5e7eb/6b7280?text=No+Image';
                          }}
                        />
                        <div className="flex-1">
                          <h3
                            onClick={() => {
                              navigate(`/product/${product.id}`);
                              setShowFavorites(false);
                            }}
                            className="font-bold text-gray-900 mb-1 cursor-pointer hover:text-blue-600"
                          >
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">{product.description}</p>
                          <p className="text-lg font-bold text-blue-600">
                            {(product.price / 1000).toFixed(0)} 000 so'm
                          </p>
                        </div>
                        <button
                          onClick={() => toggleFavorite(product)}
                          className="p-2 hover:bg-red-50 rounded-full transition"
                        >
                          <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showResults && searchQuery && (
        <div
          className="fixed inset-0 bg-transparent z-[60]"
          onClick={() => setShowResults(false)}
        />
      )}
    </>
  );
}

export default Header;