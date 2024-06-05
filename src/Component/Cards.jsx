import React, { useEffect, useState } from "react";

import "./cards.css";

const Cards = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${count * 20}`
      );
      const result = await response.json();
      if (result && result.products && result.products.length) {
        setProducts(result.products);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [count]);

  if (loading) {
    return <h1>Loading... Please wait</h1>;
  }

  return (
    <div className="container">
      <h1 className="title">Products</h1>
      <div className="cards">
        {products && products.length ? (
          products.map((product) => (
            <div key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <p>{product.title}</p>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
      <div className="buttons">
        <button
          onClick={() => {
            if (count > 0) setCount(count - 1);
          }}
          disabled={count === 0}
        >
          Prev
        </button>
        <button onClick={() => setCount(count + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Cards;
