import{ useState,useEffect,useRef, useMemo } from 'react'; //se importaron los hooks necesarios
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
  const [searchTerm, setSearchTerm] = useState<string>('');//<- estado para la busqueda
  const searchInputRef = useRef<HTMLInputElement>(null);//referencia para el input de busqueda

  useEffect(() => {
    const fetchInsumos = async (): Promise<void> => {
      try {
        const response = await axios.get<Insumo[]>('https://fakestoreapi.com/products');
        setInsumos(response.data);
        /* setLoading(false); */ //Colocado en el finally para asegurar que se ejecute siempre

      }
      catch (error) {
        if (error instanceof Error) {
          /* setLoading(false); */ // Colocado en el finally para asegurar que se ejecute siempre
          setError(error.message);
        } else {
          /* setLoading(false); */ // Colocado en el finally para asegurar que se ejecute siempre 
          setError('Error al cargar los productos');
        }
        console.log('Error al consultar los productos');
      }
      finally {
        setLoading(false); //Se ejecuta siempre, independientemente de si hubo error o no 
      }
    }
    fetchInsumos();
  }, []);

  //los usamos para poner el foco en el input *REVISAR*
  useEffect(() => {
    searchInputRef.current?.focus();
  },[])

  //Lo usamos para filtrar eficientemente los productos según el término de búsqueda
  const filteredInsumos = useMemo(() => {
    console.log("Filtrando insumos...");
    return insumosData.filter((insumo) =>
      insumo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insumo.description.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
  }, [insumosData, searchTerm]); //<- dependencias - se recalcula solo si insumosData o searchTerm cambian

  /* console.log(insumosData); */

  if(Loading){
    return (<div className="flex justify-center items-center h-screen"><div className="loader"></div></div>)
  }
  if(error){
    return <p className="flex justify-center items-center h-screen text-5xl text-red-800 "> ): Error al cargar los productos :(</p>
  }

  return (
    <div className="p-4 container mx-auto">
        <h1 className="text-4xl font-bold text-center my-6 text-gray-900">Lista de Productos</h1>
        <div className="mb-6 flex justify-center">
          <input type="text" className="border border-gray-300 rounded-lg p-2 w-full max-w-lg shadow-lg focus:outline-none focus:ring-2 
          focus:ring-blue-500" 
          placeholder="Buscar productos..."
          ref={searchInputRef}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      <ProductsList insumos={filteredInsumos} />
    </div>
  )
}

export default App;
