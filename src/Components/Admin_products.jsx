import { useState } from "react";
import EditProductForm from "./Edit_product_form";
import Swal from "sweetalert2";
import axios from "axios";

const Admin_products = ({
  id,
  name,
  price,
  stock,
  description,
  images,
  onDelete,
  questions,
}) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProductId, setDeletingProductId] = useState(null);

  const handleEdit = () => {
    setEditingProduct({
      id,
      name,
      price,
      stock,
      description,
      questions,
    });
  };

  const handleDelete = (productId) => {
    setDeletingProductId(productId);

    Swal.fire({
      title: "¿Estás seguro de eliminar este producto?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0EFF06",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://motocicle-mongoapi-production.up.railway.app/api/products/${productId}`
          );
          // Si tienes una función para actualizar la lista de productos, llámala aquí.
          if (onDelete) {
            onDelete(productId);
          }
          Swal.fire("Eliminado", "El producto ha sido eliminado.", "success");
        } catch (error) {
          console.error("Error al eliminar el producto:", error);
          Swal.fire(
            "Error",
            "No se pudo eliminar el producto. Intenta de nuevo.",
            "error"
          );
        }
      }
    });
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="p-4 flex flex-col lg:flex-row lg:justify-between mb-3 rounded-lg bg-[#3F3F3F] text-white text-base lg:text-lg">
      <div className="avatar mb-4 lg:mb-0 flex justify-center lg:justify-start">
        <div className="w-32 h-32 rounded-lg overflow-hidden">
          <img
            src={images}
            alt="Product"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="card_info flex flex-col lg:flex-row justify-between w-full">
        <div className="info flex flex-col justify-center mb-4 lg:mb-0 lg:ml-6">
          <h2 className="text-center lg:text-left text-[#0EFF06]">
            {truncateText(name, 20)}
          </h2>
          <h2 className="font-thin text-center lg:text-left">Id: {id}</h2>
        </div>
        <div className="price_container flex flex-col justify-center items-center mb-4 lg:mb-0 lg:ml-6">
          <p>Precio:</p>
          <h2 className="price">${price}</h2>
        </div>
        <div className="stock_container flex flex-col justify-center items-center mb-4 lg:mb-0 lg:ml-6">
          <p>Stock:</p>
          <h2 className="stock">{stock}</h2>
        </div>
        <div className="description_container flex flex-col justify-center items-center mb-4 lg:mb-0 lg:ml-6">
          <p>Preguntas:</p>
          <div className="container text-black text-justify font-bold bg-gray-300 rounded-lg p-2 max-w-xs lg:max-w-full">
            <h2 className="description font-thin">
              {truncateText(questions, 100)}
            </h2>
          </div>
        </div>
        <div className="crud_container flex justify-center items-center lg:ml-6 space-x-3">
          <button
            className="btn text-white hover:bg-[#0EFF06] hover:text-black px-4 py-2 rounded-lg"
            onClick={handleEdit}
          >
            Editar
          </button>
          <button
            className="btn text-white hover:bg-[#0EFF06] hover:text-black px-4 py-2 rounded-lg"
            onClick={() => handleDelete(id)}
          >
            Eliminar
          </button>
        </div>
      </div>

      {editingProduct && (
        <dialog
          open
          className="modal bg-[#000000c7] fixed inset-0 flex justify-center items-center z-50"
        >
          <div className="modal-action p-4 bg-transparent rounded-lg shadow-lg">
            <EditProductForm
              product={editingProduct}
              closeModal={() => setEditingProduct(null)}
            />
            <button
              className="btn border-2 border-[#0EFF06] rounded-lg p-3 mt-4"
              onClick={() => setEditingProduct(null)}
            >
              Cancelar
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Admin_products;
