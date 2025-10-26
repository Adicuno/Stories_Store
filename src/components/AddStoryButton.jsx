import React from "react";

const AddStoryButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 text-xl"
    title="Add New Story"
  >
    ➕
  </button>
);

export default AddStoryButton;
