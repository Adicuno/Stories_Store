import React, { useState } from "react";
import api from "../utils/api";

const AddStoryModal = ({ isOpen, onClose, onStoryAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [isPremium, setIsPremium] = useState(true);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newStory = {
        title,
        description,
        content,
        image,
        price: Number(price),
        isPremium,
      };
      const { data } = await api.post("/stories", newStory);
      onStoryAdded(data);
      onClose();
      setTitle("");
      setDescription("");
      setContent("");
      setImage("");
      setPrice(0);
      setIsPremium(true);
    } catch (err) {
      console.error(err);
      alert("Error adding story!");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 font-bold text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Add New Story</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="w-full border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <textarea
            placeholder="Content"
            className="w-full border p-2 rounded"
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            className="w-full border p-2 rounded"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            className="w-full border p-2 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isPremium}
              onChange={(e) => setIsPremium(e.target.checked)}
            />
            <span>Premium Story?</span>
          </label>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Story"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStoryModal;
