import React from "react";
import { Link } from "react-router-dom";

const StoryCard = ({ story }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
    <img
      src={story.image || "/placeholder.png"}
      alt={story.title}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
      <p className="text-gray-600 mb-3">{story.description}</p>
      {story.isPremium ? (
        <Link
          to={`/story/${story._id}`}
          className="inline-flex items-center px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          <span className="mr-2">🔒</span> Read
        </Link>
      ) : (
        <Link
          to={`/story/${story._id}`}
          className="inline-flex px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Read
        </Link>
      )}
    </div>
  </div>
);

export default StoryCard;
