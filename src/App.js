import React, { useState } from 'react';
import './App.css';
import Category from './components/Category';
import { getCategories, getProduct } from './fetcher';

function App() {

  const [categories, setCategories] = useState({"errorMessage": "", "data": []});
  const [products, setProducts] = useState({"errorMessage": "", "data": []});

  React.useEffect( ()=> {
    const fetchData = async () => {
      const responseObject = await getCategories();
      setCategories(responseObject);
    }
    fetchData();
  }, []);

  const handleCategoryClick = id => {
    const fetchData = async () => {
      const responseObject = await getProduct(id);
      setProducts(responseObject);
    }
    fetchData();
  }

  const renderCategory = () => {
    
    return categories.data.map(result => {
      return <Category key={result.id} id={result.id} title={result.title} onCategoryClick={handleCategoryClick} />
    })
    
  }
// This comment was edited from github website while taking pull lesson
                               
  const renderProducts = () => {
    return products.data.map(product => {
      return <div key={product.id}>{product.title}</div>
    })
  }

  return (
    <>
      <header>My Header</header>
      
      <section>
        <nav>
          {categories.errorMessage && <div>Error: {categories.errorMessage}</div>}
          {categories.data && renderCategory()}
        </nav>
        <article>
          <h1>Products</h1>
          {products.errorMessage && <div>Error: {products.errorMessage}</div>}
          {products.data && renderProducts()}
        </article>
      </section>

      <footer>Footer</footer>
    </>
  );
}

export default App;
