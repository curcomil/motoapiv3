import { useNavigate } from "react-router-dom";

//manda un valor a traves de paginas (query params)
export const ProductCard = (product) => {
  const navigate = useNavigate();
  const handleViewMore = () => {
    navigate(`/detail?id=${product.id_product}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-sm h-max mx-5 mb-6 border-gray-300">
      {/* Imagen del producto */}
      <div className="relative">
        <img
          src={product.images || "https://via.placeholder.com/150"} // Reemplaza con la URL de la imagen del producto
          alt="Product"
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      </div>
      {/* Información del producto */}
      <div className="p-4">
        <h2 className="text-lg font-bold">{`Precio: $${product.price} MXN`}</h2>
        <p className="text-gray-600">
          {product.productName || "Nombre del producto"}
        </p>
        <p className="text-red-500">
          {product.stock
            ? `(${product.stock} Disponibles)`
            : "(Stock no disponible)"}
        </p>

        {/* Botón Ver más */}
        <button
          onClick={handleViewMore}
          className="mt-4 w-full bg-gray-900 hover:bg-[#0eff06] text-white hover:text-black py-2 rounded-lg"
        >
          Ver más
        </button>
      </div>
    </div>
  );
};
