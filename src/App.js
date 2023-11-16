import { useEffect, useState } from 'react';
import './style.css';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import NewProductForm from './components/NewProductForm';
import ProductList from './components/ProductList';
import supabase from './supabase';
import Loader from './components/Loader';
import { initialProducts } from './data';
import { toast } from 'react-toastify';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');

  useEffect(
    function () {
      async function getProducts() {
        setIsLoading(true);

        let query = supabase.from('products').select('*');

        if (currentCategory !== 'all')
          query = query.eq('category', currentCategory);

        const { data: products, error } = await query
          .order('text', {
            ascending: false,
          })
          .limit(1000);

        if (!error) setProducts(products);
        else toast.error('There was a problem getting data');

        setIsLoading(false);
      }
      getProducts();
    },
    [currentCategory]
  );

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewProductForm setProducts={setProducts} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />

        {isLoading ? (
          <Loader />
        ) : (
          <ProductList products={products} setProducts={setProducts} />
        )}
      </main>
    </>
  );
};

export default App;
