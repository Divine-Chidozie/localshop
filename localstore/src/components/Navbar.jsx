import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/signin");
  };

  return (
    <nav className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <div className="text-2xl font-bold text-green-400">LocalShop 🛒</div>

      <ul className="flex space-x-6 items-center">
        <li>
          <Link to="/products" className="hover:text-green-400">
            Products
          </Link>
        </li>
        <li>
          <Link to="/addproduct" className="hover:text-green-400">
            Add Product
          </Link>
        </li>
        <li>
          <Link to="/myproducts" className="hover:text-green-400">
            My products
          </Link>
        </li>
        <li>
          <Link to="/cart" className="hover:text-green-400">
            Cart
          </Link>
        </li>
        <li>
          <Link to="/checkout" className="hover:text-green-400">
            Checkout
          </Link>
        </li>

        {user ? (
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
            >
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link
              to="/signin"
              className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
            >
              Sign In
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
