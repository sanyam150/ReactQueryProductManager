import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import '../App.css';

const ProductsList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const fetchProducts = async () => {
    const response = await axios.get('https://dummyjson.com/products');
    return response.data;
  };
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
  });
  const {
    data: serverProducts,
    isLoading,
    isError,
  } = useQuery('products', fetchProducts, {
    enabled: !allProducts.length,
  });

  useEffect(() => {
    if (
      serverProducts &&
      serverProducts.products &&
      serverProducts.products.length
    ) {
      setAllProducts(serverProducts.products);
    }
  }, [serverProducts]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.price.trim()
    ) {
      alert('Fill all the fields');
      return;
    }
    try {
      const response = await axios.post('https://dummyjson.com/products/add', {
        title: formData.title,
        description: formData.description,
        price: formData.price,
      });
      const { data } = response;
      const newProduct = {
        title: data.title,
        description: data.description,
        price: data.price,
      };

      setAllProducts((prevProducts) => [newProduct, ...prevProducts]);
      setFormData({ title: '', description: '', price: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div style={{ display: 'flex' }}>
      <h2>Product List</h2>
      <ul>
        {allProducts &&
          allProducts.map((product) => (
            <li
              key={product.id}
              style={{
                margin: '15px',
                boxShadow: '5px 2px 6px 3px grey',
                padding: '10px',
                width: '80%',
              }}
            >
              <strong>{product.title}</strong>
              <p>
                <strong>Description:</strong>
                {product.description}
              </p>
              <p>
                <strong>Price:</strong> ${product.price}
              </p>
            </li>
          ))}
      </ul>
      <div>
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type='text'
              name='title'
              value={formData.title}
              placeholder='Add title'
              onChange={handleChange}
              autoComplete='off'
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type='text'
              name='description'
              value={formData.description}
              placeholder='Add Description'
              onChange={handleChange}
              autoComplete='off'
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type='Number'
              name='price'
              value={formData.price}
              placeholder='Add Price'
              onChange={handleChange}
              autoComplete='off'
            />
          </div>
          <button type='submit' style={{ margin: '10px 0px 10px 0px' }}>
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};
export default ProductsList;
