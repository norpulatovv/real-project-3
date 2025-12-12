import React from 'react';
import { Facebook, Instagram, Send, Music } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-purple-100 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Hujjatlar */}
          <div>
            <h3 className="font-bold text-lg mb-4">Hujjatlar</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:text-blue-600">Umumiy shartlar</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600">Ofertalar arxivi</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600">Nizom</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600">Guvohnoma</a></li>
            </ul>
          </div>

          {/* Servis */}
          <div>
            <h3 className="font-bold text-lg mb-4">Servis</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:text-blue-600">Do'konlar</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600">Biz haqimizda</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600">Hamkorlik uchun</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600">Qaytarish</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600">Promokodlar</a></li>
            </ul>
          </div>

          {/* Mahsulotlar katalogi */}
          <div>
            <h3 className="font-bold text-lg mb-4">Mahsulotlar katalogi</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:text-blue-600">Katalog 1</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600">Katalog 1</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600">Katalog 2</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600">Katalog 3</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600">Katalog 3</a></li>
            </ul>
          </div>

          {/* Axborot xizmati */}
          <div>
            <h3 className="font-bold text-lg mb-4">Axborot xizmati</h3>
            <p className="text-gray-700 mb-2">contact@nextstore.uz</p>
            <p className="text-gray-700 mb-2">+998 97 712 96 96</p>
            <p className="text-gray-700 mb-4">+998 95 503 09 09</p>
            <p className="text-sm text-gray-600 mb-4">
              Saqlbon 186, Olmazor tumani, Toshkent, O'zbekiston
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600">
                <Send className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800">
                <Music className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-300 pt-6 text-center">
          <p className="text-gray-600 mb-2">2022. Nextstore.com</p>
          <p className="text-gray-500 text-sm">Powered by</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;