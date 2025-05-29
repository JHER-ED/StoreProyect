import{ useState,useEffect } from 'react';
import './App.css'
import Products from './components/Products';
import axios from 'axios';

function App() {
  const [Products, setProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      }
      catch (error) {
        console.log('Error al consultar los productos');
      }
    }
    fetchProducts();
  }, []);

  console.log(Products);

  return (
    <>
      <h1>Proyecto Final</h1>
      <Products />
    </>
  )
}

export default App;
