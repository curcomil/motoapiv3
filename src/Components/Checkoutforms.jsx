import { useEffect, useState } from "react";
import axios from "axios";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export default function CheckoutForm({ items, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (!stripe) return;

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
          throw new Error("Failed to retrieve clientSecret from the server.");
        }
      } catch (error) {
        setMessage("Error al crear el PaymentIntent: " + error.message);
      }
    };

    createPaymentIntent();
  }, [items, stripe]);

  useEffect(() => {
    if (!stripe || !clientSecret) return;

    const clientSecretFromURL = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (clientSecretFromURL) {
      stripe
        .retrievePaymentIntent(clientSecretFromURL)
        .then(({ paymentIntent }) => {
          switch (paymentIntent.status) {
            case "succeeded":
              setMessage("Payment succeeded!");
              if (onSuccess) onSuccess(true);
              break;
            case "processing":
              setMessage("Your payment is processing.");
              if (onSuccess) onSuccess(false);
              break;
            case "requires_payment_method":
              setMessage("Your payment was not successful, please try again.");
              if (onSuccess) onSuccess(false);
              break;
            default:
              setMessage("Something went wrong.");
              if (onSuccess) onSuccess(false);
              break;
          }
        });
    }
  }, [stripe, clientSecret, onSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      setMessage("Stripe, elements, or clientSecret is missing.");
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://motoapiv3.vercel.app/Shopping",
      },
      clientSecret,
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {clientSecret && (
        <>
          <PaymentElement
            id="payment-element"
            options={paymentElementOptions}
          />
          <button
            disabled={isLoading || !stripe || !elements}
            className="mt-3 text-black bg-[#0EFF06] rounded-lg font-medium p-2"
            id="submit"
          >
            <span id="button-text">
              {isLoading ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Pagar ahora"
              )}
            </span>
          </button>
          {message && <div id="payment-message">{message}</div>}
        </>
      )}
    </form>
  );
}
