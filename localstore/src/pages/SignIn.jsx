import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fetch users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check for match
    const validUser = users.find(
      (u) => u.email === loginData.email && u.password === loginData.password
    );

    if (!validUser) {
      alert("Invalid email or password!");
      return;
    }

    // Save logged in user
    localStorage.setItem("currentUser", JSON.stringify(validUser));

    // Ensure this user has their own cart in localStorage
    const userCartKey = `cart_${validUser.email}`;
    if (!localStorage.getItem(userCartKey)) {
      localStorage.setItem(userCartKey, JSON.stringify([]));
    }

    alert(`Welcome back, ${validUser.name}!`);
    navigate("/products"); // redirect to products page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Sign In</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-80"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={loginData.email}
          required
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={loginData.password}
          required
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white outline-none"
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 p-2 rounded font-semibold"
        >
          Sign In
        </button>
        <p className="mt-3 text-sm">
          Don’t have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}
