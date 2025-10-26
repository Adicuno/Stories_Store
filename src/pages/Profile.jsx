import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [purchased, setPurchased] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // Placeholder: fetch purchased stories
        const res = await api.get("/stories");
        setPurchased([]); // Replace with actual purchased stories
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 text-xl">
        Please{" "}
        <Link className="text-purple-600 hover:underline" to="/login">
          login
        </Link>{" "}
        first.
      </div>
    );

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-500 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl">
        {/* User Info */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            {user.name}'s Profile
          </h2>
          <p className="text-gray-600 mt-2">Email: {user.email}</p>
        </div>

        {/* Purchased Stories */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Purchased Stories
          </h3>
          {purchased.length === 0 ? (
            <p className="text-gray-600">No purchases yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {purchased.map((story) => (
                <Link
                  to={`/story/${story._id}`}
                  key={story._id}
                  className="p-4 bg-purple-50 rounded-lg shadow hover:shadow-lg transition duration-300 hover:bg-purple-100"
                >
                  <h4 className="font-semibold text-gray-800">{story.title}</h4>
                  <p className="text-gray-500 text-sm mt-1">
                    {story.description?.slice(0, 60)}...
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
