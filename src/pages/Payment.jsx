import React from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

const Payment = () => {
  const { id } = useParams(); // storyId

  const handlePayment = async () => {
    try {
      const { data: order } = await api.post(`/payment/create-order/${id}`);

      const options = {
        key: process.env.VITE_RAZORPAY_KEY_ID, // frontend key from .env
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "StoryStore",
        description: "Purchase Story",
        handler: async function (response) {
          // Verify payment
          await api.post("/payment/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            storyId: id,
          });
          alert("Payment Successful!");
          window.location.href = `/story/${id}`;
        },
        prefill: {
          email: "user@example.com",
        },
        theme: {
          color: "#4f46e5",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handlePayment}
        className="bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-700 transition"
      >
        Pay to Unlock Story
      </button>
    </div>
  );
};

export default Payment;
