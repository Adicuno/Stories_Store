import React, { createContext, useState } from "react";
import api from "../utils/api";

export const StoryContext = createContext();

export const StoryProvider = ({ children }) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStories = async () => {
    setLoading(true);
    try {
      const res = await api.get("/stories");
      setStories(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StoryContext.Provider value={{ stories, fetchStories, loading }}>
      {children}
    </StoryContext.Provider>
  );
};
