import React from 'react';

function Stores({ stores }) {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Do'konlarimiz</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stores.map(store => (
            <div
              key={store.id}
              className="bg-white rounded-lg p-4 flex items-center justify-center hover:shadow-lg transition cursor-pointer h-20"
            >
              <img
                src={store.logo}
                alt={store.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Stores;