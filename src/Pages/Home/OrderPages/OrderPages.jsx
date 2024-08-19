import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../../../Components/SearchInput";
import CardDelivery from "../../../Components/CardModuleDelivery";
import "../OrderPages/styleOrder.css";
import { Link } from "react-router-dom";

function OrderPages() {
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/orders");
        console.log(response.data);
        setOrders(response.data || []);
      } catch (error) {
        console.error("Error al obtener las órdenes", error);
      }
    };

    fetchOrders();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setShowPopup(true);
  };

  const handleConfirmEdit = async () => {
    if (selectedOrder) {
      try {
        await axios.put(
          `http://localhost:3000/api/orders/${selectedOrder._id}`,
          {
            items: selectedOrder.items,
            numero_guia: selectedOrder.numero_guia,
            total: selectedOrder.total,
          }
        );
        setShowPopup(false);
        const response = await axios.get("http://localhost:3000/api/orders");
        setOrders(response.data || []);
      } catch (error) {
        console.error("Error al actualizar la orden", error);
      }
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="orderPages">
      <nav className="navbar">
        <p className="textNav">Pedidos</p>
        <SearchBar onSearch={handleSearch} />
      </nav>
      <main className="mainContent">
        <div className="containerText">
          <p className="textMain">Resultado de la búsqueda: {searchQuery}</p>
        </div>
        {Array.isArray(orders) &&
          orders
            .filter(
              (order) =>
                order.orderId.includes(searchQuery) ||
                order.username_author
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
            )
            .map((order) => (
              <CardDelivery
                key={order._id}
                orderId={order._id}
                deliveryDescription={`Order ID: ${order.orderId}`}
                nameClient={order.username_author}
                priceDelivery={order.total}
                descriptionGuide={order.numero_guia}
                parcelService={order.paqueteria}
                shippingDate={order.fecha_de_envio}
                productName={order.items
                  .map((item) => item.product_name)
                  .join(", ")} // Aquí concatenamos los nombres de los productos
                onEdit={() => handleEditOrder(order)} // Maneja el evento de edición
              />
            ))}
      </main>
      <footer className="footer">
        <Link
          to="/Productos"
          className="buttonProduct border-2 border-[#0eff06] text-[#0eff06] rounded-xl font-bold hover:text-gray-800 hover:bg-gradient-to-r from-orange-300 to-[#0eff06]"
        >
          Ir a productos
        </Link>
      </footer>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold">
              ¿Deseas confirmar la edición de esta orden?
            </p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={handleConfirmEdit}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Confirmar
              </button>
              <button
                onClick={handleClosePopup}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderPages;
