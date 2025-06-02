import type { Insumo } from '../helpers/interfaces';

interface InsumosCardProps {
    insumo: Insumo;
}


const InsumosCard = ({insumo}: InsumosCardProps) => {
    return (
    <div className="border p-4 rounded-lg shadow-xl bg-gray-200">
        <h2 className="text-xl font-semibold text-red-800">{insumo.title}</h2>
        <p className="text-gray-800"><strong>Precio:</strong> ${insumo.price}</p>
        <img src={insumo.image} alt={`Imagen del producto ${insumo.title}`} className="mt-2 w-full h-auto rounded-md" />
        <p className="text-gray-800">{insumo.description}</p>
        <p className="text-gray-800"><strong>Categoria:</strong> {insumo.category}</p>
        <p className="text-gray-800"><strong>Rating:</strong> {insumo.rating.rate} ({insumo.rating.count} votos)</p>
        <p className="text-gray-800"><strong>ID:</strong> {insumo.id}</p>
    </div>
    )
}

export default InsumosCard