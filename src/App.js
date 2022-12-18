import React, { useState } from 'react';
import './App.css';
import Category from './components/Category';
import { fetcher } from './fetcher';

function App() {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  React.useEffect( ()=> {

    const fetchData = async () => {
      const data = await fetcher("/categories");
      setCategories(data);
    }
    fetchData();

  }, []);

  const handleCategoryClick = id => {
    alert("id: " + id);
    fetch(`http://localhost:3001/products?catId=${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setProducts(data);
      })
  }

  const renderCategory = () => {
    
    return categories.map(result => {
      return <Category key={result.id} id={result.id} title={result.title} onCategoryClick={handleCategoryClick} />
    })
    
  }

  const renderProducts = () => {
    return products.map(product => {
      return <div key={product.id}>{product.title}</div>
    })
  }

  return (
    <>
      <header>My Header</header>
      
      <section>
        <nav>
          {categories && renderCategory()}
        </nav>
        <article>
          <h1>Products</h1>
          {products && renderProducts()}
        </article>
      </section>

      <footer>Footer</footer>
    </>
  );
}

export default App;
