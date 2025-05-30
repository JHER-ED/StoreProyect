import type { Insumo } from '../App';
import  InsumosCard  from './InsumosCard';

interface ProductsListProps {
    insumos: Insumo[];
}

const ProductsList = ({ insumos }: ProductsListProps) => {
    return (
    (<div className="p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Lista de Productos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {insumos.map((insumo:Insumo) =>(
                <InsumosCard insumo={insumo}/>
            ))}
        </div>
    </div>)
)};

export default ProductsList
