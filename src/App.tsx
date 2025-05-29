import{ useState,useEffect } from 'react';
import './App.css'
import axios from 'axios';
import Insumos from './components/Insumos';

function App() {
  const [insumosData, setInsumos] = useState([]);


  useEffect(() => {
    const fetchInsumos = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setInsumos(response.data);
      }
      catch (error) {
        console.log('Error al consultar los productos');
      }
    }
    fetchInsumos();
  }, []);

  console.log(insumosData);

  return (
    <>
      <h1>Proyecto Final</h1>
      <Insumos />
    </>
  )
}

export default App;
