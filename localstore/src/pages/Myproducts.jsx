import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyProducts() {
  const [myProducts, setMyProducts] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      navigate("/signin");
      return;
    }

    setUser(currentUser);

    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    const filtered = allProducts.filter(
      (item) => item.ownerEmail === currentUser.email
    );
    setMyProducts(filtered);
  }, [navigate]);

  const handleDelete = (id) => {
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updated = allProducts.filter((item) => item.id !== id);
    localStorage.setItem("products", JSON.stringify(updated));
    setMyProducts(myProducts.filter((item) => item.id !== id));
    alert("Product deleted!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">My Products</h1>

      {myProducts.length === 0 ? (
        <p className="text-center text-gray-400">
          You haven't added any products yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {myProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col"
            >
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-400 mb-2">{product.description}</p>
              <p className="text-green-400 font-bold mb-3">${product.price}</p>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-600 hover:bg-red-700 text-white py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate("/addproduct")}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Add New Product
        </button>
      </div>
    </div>
  );
}
  