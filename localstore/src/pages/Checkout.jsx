import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      alert("Please sign in first!");
      navigate("/signin");
      return;
    }
    setUser(currentUser);

    // Load current user's cart
    const allCarts = JSON.parse(localStorage.getItem("carts")) || {};
    const userCart = allCarts[currentUser.email] || [];
    setCart(userCart);
  }, [navigate]);

  const totalPrice = cart.reduce((acc, item) => acc + Number(item.price), 0);

  const handleConfirmCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setIsProcessing(true);

    // Simulate payment/checkout delay
    setTimeout(() => {
      // Clear only current user's cart
      const allCarts = JSON.parse(localStorage.getItem("carts")) || {};
      allCarts[user.email] = [];
      localStorage.setItem("carts", JSON.stringify(allCarts));

      setCart([]);
      setIsProcessing(false);
      alert("Checkout successful! Thank you for your purchase.🤝");
      navigate("/products");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty. Go back and add products.</p>
      ) : (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <ul className="mb-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between mb-2">
                <span>{item.name}</span>
                <span>${item.price}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-700 pt-3 flex justify-between font-bold">
            <span>Total:</span>
            <span>${totalPrice}</span>
          </div>
          {user && (
            <p className="mt-4 text-sm text-gray-400">
              Checked out by: <strong>{user.name}</strong>
            </p>
          )}
          <button
            onClick={handleConfirmCheckout}
            disabled={isProcessing}
            className={`mt-6 w-full p-2 rounded font-semibold ${
              isProcessing
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isProcessing ? "Processing..." : "Confirm Checkout"}
          </button>
        </div>
      )}

      <div className="mt-8">
        <button
          onClick={() => navigate("/cart")}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Back to Cart
        </button>
      </div>
    </div>
  );
}
