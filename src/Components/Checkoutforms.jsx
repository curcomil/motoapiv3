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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://your-return-url.com",
      },
    });

    if (!error) {
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
        // Mostrar mensaje de éxito, redirigir, etc.
      } catch (error) {
        console.error("Error al reducir el stock:", error);
      }
    } else {
      console.error("Error en el proceso de pago:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe}
        className="p-2 bg-[#0EFF06] rounded-lg w-full text-black mt-6"
      >
        Pagar
      </button>
    </form>
  );
};

export default CheckoutForm;
