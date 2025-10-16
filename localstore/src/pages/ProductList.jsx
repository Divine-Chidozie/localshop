import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleAddToCart = (product) => {
    const alreadyInCart = cart.find((item) => item.id === product.id);
    if (alreadyInCart) {
      alert(`${product.name} is already in the cart!`);
      return;
    }

    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.name} added to cart!`);
  };

  // Filter products based on search term
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      {/* Search Input */}
      <div className="mb-6 w-10/12 md:w-8/12">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white outline-none"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products found. Go add one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-10/12 md:w-8/12">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg text-center"
            >
              {p.image && (
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p className="text-gray-400">${p.price}</p>
              <button
                onClick={() => handleAddToCart(p)}
                className="mt-3 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => navigate("/addproduct")}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          Add Product
        </button>
        <button
          onClick={() => navigate("/cart")}
          className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded"
        >
          Go to Cart
        </button>
      </div>
    </div>
  );
}
