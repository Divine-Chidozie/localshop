import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

  const totalPrice = cart.reduce((acc, item) => acc + Number(item.price), 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="w-10/12 md:w-8/12">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 flex justify-between items-center p-4 mb-3 rounded-lg shadow-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-gray-400">${item.price}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="bg-gray-800 p-4 rounded-lg mt-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total: ${totalPrice}</h2>
            <button
              onClick={handleCheckout}
              className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded font-semibold"
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => navigate("/products")}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Back to Products
        </button>
        <button
          onClick={() => navigate("/addproduct")}
          className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded"
        >
          Add More Products
        </button>
      </div>
    </div>
  );
}
