import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import Loader from "../components/Loader";

const StoryDetails = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/stories/${id}`); // protected backend route
        setStory(res.data);
      } catch (error) {
        setErr(error.response?.data?.message || "Unable to fetch story");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <Loader />;
  if (err) return <div className="error">{err}</div>;
  if (!story) return <div>No story found</div>;

  return (
    <div className="story-full">
      <h1>{story.title}</h1>
      <img
        src={story.image || "/placeholder.png"}
        alt={story.title}
        style={{ maxWidth: "100%", marginTop: 12 }}
      />
      <div className="card-body">
        <p>{story.content}</p>
      </div>
    </div>
  );
};

export default StoryDetails;
