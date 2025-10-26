import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const storyId = searchParams.get("storyId");

  useEffect(() => {
    const markStoryPurchased = async () => {
      await api.post(`/user/purchase/${storyId}`); // backend updates user
      navigate(`/story/${storyId}`);
    };
    markStoryPurchased();
  }, [storyId]);

  return <p>Processing your purchase...</p>;
};

export default PaymentSuccess;
