import React, { useState, useEffect } from "react";
import AddStoryModal from "../components/AddStoryModal";
import AddStoryButton from "../components/AddStoryButton";
import StoryCard from "../components/StoryCard";
import api from "../utils/api";

const Home = () => {
  const [stories, setStories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch stories
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const { data } = await api.get("/stories");
        setStories(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStories();
  }, []);

  const handleAddStoryClick = () => setModalOpen(true);

  const handleStoryAdded = (newStory) => {
    setStories([newStory, ...stories]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-purple-700 mb-10">
          Explore Stories
        </h1>

        {/* Stories Grid */}
        {stories.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No stories available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {stories.map((story) => (
              <StoryCard key={story._id} story={story} />
            ))}
          </div>
        )}

        {/* Add Story Button */}
        <div className="fixed bottom-8 right-8">
          <AddStoryButton
            onClick={handleAddStoryClick}
            className="bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-700 transition duration-300"
          />
        </div>

        {/* Add Story Modal */}
        <AddStoryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onStoryAdded={handleStoryAdded}
        />
      </div>
    </div>
  );
};

export default Home;
