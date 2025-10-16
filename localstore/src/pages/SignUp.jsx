import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing users
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user already exists
    const userExists = existingUsers.find((u) => u.email === user.email);
    if (userExists) {
      alert("User already exists! Please sign in.");
      return;
    }

    // Add new user
    existingUsers.push(user);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("Sign up successful! You can now sign in.");
    navigate("/signin");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-80"
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          value={user.name}
          required
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white outline-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={user.email}
          required
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={user.password}
          required
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white outline-none"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
        >
          Sign Up
        </button>
        <p className="mt-3 text-sm">
          Already have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
