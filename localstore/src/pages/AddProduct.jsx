import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState({ name: "", price: "", image: "" });
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Check if a user is logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      alert("Please sign in first!");
      navigate("/signin");
    } else {
      setCurrentUser(user);
    }
  }, [navigate]);

  // Load products
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setProducts(savedProducts.filter((p) => p.addedBy === user.email));
    }
  }, []);

  // Check if we came here to edit a product
  useEffect(() => {
    if (location.state && location.state.productToEdit) {
      const p = location.state.productToEdit;
      setProduct({ name: p.name, price: p.price, image: p.image });
      setIsEditing(true);
      setEditingId(p.id);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      alert("Please sign in again!");
      navigate("/signin");
      return;
    }

    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    if (isEditing) {
      // Update existing product
      const updatedProducts = existingProducts.map((p) =>
        p.id === editingId ? { ...p, ...product } : p
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setProducts(updatedProducts.filter((p) => p.addedBy === user.email));
      alert("Product updated successfully!");
    } else {
      // Add new product
      const newProduct = {
        id: Date.now(),
        ...product,
        addedBy: user.email,
      };
      existingProducts.push(newProduct);
      localStorage.setItem("products", JSON.stringify(existingProducts));
      setProducts(existingProducts.filter((p) => p.addedBy === user.email));
      alert("Product added successfully!");
    }

    // Reset form
    setProduct({ name: "", price: "", image: "" });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">
        {isEditing ? "Edit Product" : "Add Product"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-96"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white outline-none"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white outline-none"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white outline-none"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
        >
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div className="mt-10 w-10/12 md:w-8/12">
        <h2 className="text-2xl font-semibold mb-4">Your Products</h2>
        {products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg text-center"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <h3 className="text-lg font-bold">{p.name}</h3>
                <p className="text-gray-400">${p.price}</p>
                <p className="text-xs text-gray-500">
                  Added by: {p.addedBy.split("@")[0]}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="mt-8 bg-red-600 hover:bg-red-700 p-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
