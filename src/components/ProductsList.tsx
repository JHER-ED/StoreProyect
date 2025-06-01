import type { Insumo } from '../App';
import  InsumosCard  from './InsumosCard';

interface ProductsListProps {
    insumos: Insumo[];
}

const ProductsList = ({ insumos }: ProductsListProps) => {
    return (
    (<div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {insumos.map((insumo:Insumo) =>(
                <InsumosCard key={insumo.id} insumo={insumo}/>
            ))}
        </div>
    </div>)
)};

export default ProductsList
