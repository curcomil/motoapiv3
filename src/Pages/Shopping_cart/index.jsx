import { useState, useEffect } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../Components/Checkoutforms";
import CartItem from "../../Components/Cart_item";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Navlink } from "../../Components/Navbar_";
import { Footer } from "../../Components/footer";
import { Link } from "react-router-dom";
import "./styles_cart.css";

const stripePromise = loadStripe(
  "pk_test_51PoIHhRvRsZDGGXQtFoKdaPS4R5wx1JPv6LBB4sxo2VeNNgmGMVxHftnGvFbsCTQzhBxumNoAej9ysuid53PFomE00JEY4rQYf"
);

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentItems, setPaymentItems] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("https://motoapibackv3.vercel.app/api/auth/profile", {
        withCredentials: true,
      })
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del perfil", error);
      });
  }, []);

  const initialCartItems = async () => {
    try {
      const response = await axios.get(
        "https://motoapibackv3.vercel.app/api/pedido",
        {
          withCredentials: true,
        }
      );
      const pedidos = response.data;
      const items = pedidos.flatMap((pedido) =>
        pedido.productos.map((producto) => ({
          id: producto._id,
          name: producto.product_name,
          quantity: producto.cantidad,
          price: producto.precio,
          image: producto.image,
          pedido_delete: pedido._id,
        }))
      );
      setCartItems(items);
    } catch (error) {
      console.error("Error al obtener los pedidos:", error);
    }
  };

  useEffect(() => {
    initialCartItems();
  }, []);

  const handleDelete = async (productoId, pedidoId) => {
    try {
      await axios.delete(
        `https://motoapibackv3.vercel.app/api/pedido/${pedidoId}`,
        {
          withCredentials: true,
        }
      );
      setCartItems(cartItems.filter((item) => item.id !== productoId));
    } catch (error) {
      console.error("Error al eliminar el pedido:", error);
    }
  };

  const handleQuantityChange = (id, newQuantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleCheckout = () => {
    const items = {
      orderId: Math.floor(Math.random() * 1000), // Ejemplo de generación de orderId. Puedes cambiarlo según tu lógica.
      items: cartItems.map((item) => ({
        product_name: item.name,
        amount: item.price,
        cantidad: item.quantity,
      })),
      total: totalFinal, // Usa el total calculado
    };

    setPaymentItems(items);
    setShowPayment(true);
  };

  const handlePurchase = async (success) => {
    if (!success) {
      setMessage("Error en el pago, no se pudo completar la compra.");
      return;
    }

    try {
      for (let item of cartItems) {
        await axios.put(
          `https://motoapibackv3.vercel.app/api/products/${item.id}/reduce-stock`,
          { quantity: item.quantity }
        );
      }

      setMessage("Compra realizada con éxito");
      setCartItems([]); // Limpiar carrito después de la compra
    } catch (error) {
      console.error("Error al procesar la compra:", error);
      setMessage(
        error.response?.data?.message || "Error al procesar la compra"
      );
    }
  };

  const totalPriceProducts = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const shippingCost = 300;
  const totalFinal = totalPriceProducts + shippingCost;

  return (
    <div className="main flex flex-col bg-black min-h-screen">
      <Navlink />
      <br />
      <br />
      <br />
      <div className="flex-grow bg-gradient-to-t from-black via-[#0faf09] p-4 sm:p-12 flex flex-col">
        <div className="relative container mx-auto">
          {cartItems.length > 0 ? (
            <TransitionGroup>
              {cartItems.map((item) => (
                <CSSTransition key={item.id} timeout={500} classNames="fade">
                  <div className="mb-4 flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p>Precio: ${item.price}</p>
                        <p>Cantidad: {item.quantity}</p>
                      </div>
                    </div>
                    <button
                      className="bg-red-500 text-white p-2 rounded-lg"
                      onClick={() => handleDelete(item.id, item.pedido_delete)}
                    >
                      Eliminar
                    </button>
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>
          ) : (
            <div className="text-center text-white">
              No hay artículos en el carrito.
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Resumen del Pedido</h2>
              <p>Total de productos: ${totalPriceProducts.toFixed(2)}</p>
              <p>Envío: ${shippingCost.toFixed(2)}</p>
              <p className="font-semibold">Total: ${totalFinal.toFixed(2)}</p>
              <button
                className="mt-4 bg-blue-500 text-white p-2 rounded-lg"
                onClick={handleCheckout}
              >
                Proceder al Pago
              </button>
            </div>
          )}
        </div>
      </div>
      {showPayment && (
        <div className="flex justify-center items-center">
          <Elements stripe={stripePromise}>
            <CheckoutForm items={paymentItems} onSuccess={handlePurchase} />
          </Elements>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ShoppingCart;
