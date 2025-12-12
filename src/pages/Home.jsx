import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import Brands from '../components/Brands';
import ProductGrid from '../components/ProductGrid';
import Stores from '../components/Stores';
import Footer from '../components/Footer';

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3000/products').then(res => res.json()),
      fetch('http://localhost:3000/categories').then(res => res.json()),
      fetch('http://localhost:3000/brands').then(res => res.json()),
      fetch('http://localhost:3000/stores').then(res => res.json())
    ])
      .then(([productsData, categoriesData, brandsData, storesData]) => {
        setProducts(productsData);
        setCategories(categoriesData);
        setBrands(brandsData);
        setStores(storesData);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <Brands brands={brands} />
      <Hero />
      <Categories categories={categories} />
      <Stores stores={stores} />
      <ProductGrid products={products} />
      <Footer />
    </div>
  );
}

export default Home;