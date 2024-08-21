import { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ items }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Crear PaymentIntent cuando el componente se monta
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post(
          "https://motoapibackv3.vercel.app/api/create-payment-intent",
          { items },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          throw new Error("No se recibió clientSecret del servidor.");
        }
      } catch (error) {
        console.error("Error al crear el PaymentIntent:", error);
      }
    };

    createPaymentIntent();
  }, [items]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      console.error("Stripe, Elements, o clientSecret no están disponibles.");
      return;
    }

    // Primero, somete los elementos del formulario
    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.error("Error al someter los elementos:", submitError.message);
      return;
    }

    // Luego, confirma el pago
    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://motoapiv3.vercel.app/Shopping",
      },
      clientSecret, // Asegúrate de pasar el clientSecret aquí
    });

    if (!confirmError) {
      try {
        // Reducción del stock después del pago exitoso
        await Promise.all(
          items.items.map(async (item) => {
            await axios.put(
              `https://motoapibackv3.vercel.app/api/products/${item.id}/reduce-stock`,
              {
                quantity: item.cantidad,
              }
            );
          })
        );
      } catch (error) {
        console.error("Error al reducir el stock:", error);
      }
    } else {
      console.error("Error en el proceso de pago:", confirmError.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="p-2 bg-[#0EFF06] rounded-lg w-full text-black mt-6"
      >
        Pagar
      </button>
    </form>
  );
};

export default CheckoutForm;
