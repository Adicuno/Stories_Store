import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate("/");
    } catch (error) {
      setErr(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <AuthCard
      title="Register"
      error={err}
      footer={
        <>
          Already have an account?{" "}
          <Link
            className="text-purple-600 font-semibold hover:underline"
            to="/login"
          >
            Login
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-5">
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Enter Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
        >
          Register
        </button>
      </form>
    </AuthCard>
  );
};

export default Register;
