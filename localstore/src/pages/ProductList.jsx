import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      navigate("/signin");
      return;
    }
    setUser(currentUser);

    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);

    const allCarts = JSON.parse(localStorage.getItem("carts")) || {};
    const userCart = allCarts[currentUser.email] || [];
    setCart(userCart);
  }, [navigate]);

  const handleAddToCart = (product) => {
    if (!user) return;

    // Prevent adding own product to cart
    if (product.addedBy === user.email) {
      alert("You cannot add your own product to the cart!");
      return;
    }

    const allCarts = JSON.parse(localStorage.getItem("carts")) || {};
    const userCart = allCarts[user.email] || [];

    const alreadyInCart = userCart.find((item) => item.id === product.id);
    if (alreadyInCart) {
      alert(`${product.name} is already in your cart!`);
      return;
    }

    const updatedCart = [...userCart, product];
    allCarts[user.email] = updatedCart;
    localStorage.setItem("carts", JSON.stringify(allCarts));
    setCart(updatedCart);

    alert(`${product.name} added to cart!`);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

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
          {filteredProducts.map((p) => {
            const isOwnProduct = p.addedBy === user?.email;
            return (
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
                <p className="text-xs text-gray-500">
                  Added by: {p.addedBy.split("@")[0]}
                </p>
                <button
                  onClick={() => handleAddToCart(p)}
                  disabled={isOwnProduct}
                  className={`mt-3 px-4 py-2 rounded font-semibold ${
                    isOwnProduct
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isOwnProduct ? "Your Product" : "Add to Cart"}
                </button>
              </div>
            );
          })}
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
