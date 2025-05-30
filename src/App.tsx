import{ useState,useEffect } from 'react';
import './App.css'
import axios from 'axios';
import InsumosCard from './components/InsumosCard';
import ProductsList from './components/ProductsList';

export interface Rating {
  rate: number;
  count: number;
}

export interface Insumo{
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

function App() {
  const [insumosData, setInsumos] = useState<Insumo[]>([]);
  const [Loading,setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsumos = async (): Promise<void> => {
      try {
        const response = await axios.get<Insumo[]>('https://fakestoreapi.com/products');
        setInsumos(response.data);
        setLoading(false);

      }
      catch (error) {
        if (error instanceof Error) {
          setLoading(false);
          setError(error.message);
        } else {
          setLoading(false);
          setError('Error al cargar los productos');
        }
        console.log('Error al consultar los productos');
      }
    }
    fetchInsumos();
  }, []);

  console.log(insumosData);

  if(Loading){
    return (<div className="flex justify-center items-center h-screen"><div className="loader"></div></div>)
  }
  if(error){
    return <p className="flex justify-center items-center h-screen text-5xl text-red-800 "> ): Error al cargar los productos :(</p>
  }

  return (
    <>
      <h1>Proyecto Final</h1>
      <ProductsList insumos={insumosData} />
    </>
  )
}

export default App;
