import{ useState,useEffect,useRef, useMemo, useReducer } from 'react'; //se importaron los hooks necesarios
import './App.css'
import axios from 'axios';
import InsumosCard from './components/InsumosCard';
import ProductsList from './components/ProductsList';
import type { Insumo, FetchState } from './helpers/interfaces'; //importamos el tipo Insumo


const initialState:FetchState= {
  data: [],
  loading: true,
  error: null
};

/* const FetchAction =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: Insumo[] }
  | { type: 'FETCH_ERROR'; payload: string }; */

function fetchReducer(state:FetchState,action:any):FetchState{
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, data: action.payload, loading: false };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function App() {
  const [state,dispatch] = useReducer(fetchReducer,initialState);
  const [searchTerm, setSearchTerm] = useState<string>('');//<- estado para la busqueda
  const searchInputRef = useRef<HTMLInputElement>(null);//referencia para el input de busqueda

  useEffect(() => {
    const fetchInsumos = async (): Promise<void> => {
      dispatch({type:"FETCH_INIT"}); //Inicia la carga de datos
      try {
        const response = await axios.get<Insumo[]>('https://fakestoreapi.com/products');
        dispatch({type:"FETCH_SUCCESS",payload:response.data});
      } catch (error) {
        const message= "Hubo un error al cargar los productos"
        dispatch ({type:"FETCH_ERROR",payload: message});
      } 
    };
    fetchInsumos();
  },[]);

  //los usamos para poner el foco en el input
  useEffect(() => {
    searchInputRef.current?.focus();
  },[state.loading]);

  //Lo usamos para filtrar eficientemente los productos según el término de búsqueda
  const filteredInsumos = useMemo(() => {
    //A continuación en lugar de includes se puede utilizar startsWith.
    return state.data.filter(({title,description}) =>
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||//toLowerCase() para hacer la búsqueda insensible a mayúsculas y minúsculas
      description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [state.data, searchTerm]); //<- dependencias - se recalcula solo si insumosData o searchTerm cambian

  if(state.loading){
    return (<div className="flex justify-center items-center h-screen"><div className="loader"></div></div>)
  }
  if(state.error){
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
