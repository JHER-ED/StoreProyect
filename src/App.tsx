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
  const [query, setQuery] = useState<string>('');//<- estado para la query
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
  }, [state.data, query]); //<- dependencias - se recalcula solo si insumosData o query cambian

  const handleSearch = ()=>{
    setQuery(searchTerm); //Actualiza la query con el término de búsqueda
  };

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
          <div className="relative w-full max-w-lg">
          <input type="text" className="border border-gray-300 rounded-lg p-2 w-full max-w-lg shadow-lg focus:outline-none focus:ring-2 
          focus:ring-blue-500" 
          placeholder="Buscar productos..."
          ref={searchInputRef}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          {searchTerm && (
    <button
      onClick={() => {
        setSearchTerm('');
        setQuery('');
        searchInputRef.current?.focus();
      }}
      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800">
      ✕
    </button>)}
        </div>

          <button onClick={handleSearch} className="bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 shadow-lg hover:bg-blue-800 transition-colors ml-2">
          Buscar <img src="https://img.icons8.com/ios-filled/50/ffffff/search.png" alt="Buscar" className="inline-block w-5 h-5" />
        </button></div>

        {filteredInsumos.length > 0 ? (
      <ProductsList insumos={filteredInsumos} />
        ): query !== '' ? (
          <p className="text-center text-3xl py-30 text-gray-900">No se encontraron productos para <strong>"{query}"</strong></p>
        ) : null}
    </div>
  );
}

export default App;
