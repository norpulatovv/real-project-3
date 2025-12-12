import React from 'react';

function Categories({ categories }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Kategoriyalar</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map(category => (
          <div
            key={category.id}
            className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition cursor-pointer"
          >
            <div className="text-4xl mb-2">{category.icon}</div>
            <p className="text-sm font-medium">{category.name}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <button className="text-blue-600 font-semibold hover:underline">
          Barchasi
        </button>
      </div>
    </div>
  );
}

export default Categories;