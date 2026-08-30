import { useState } from "react";
import { FaShoppingCart, FaTimes } from "react-icons/fa";

function Product({ product, addToCart }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Product Card */}
      <div className="bg-white rounded-2xl shadow-lg p-5">

        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-56 object-contain"
        />

        <h2 className="text-xl font-bold mt-4">
          {product.title}
        </h2>

        <p className="text-gray-600 mt-2">
          {product.description.slice(0, 70)}...
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="text-pink-500 font-bold mt-2 cursor-pointer"
        >
          More
        </button>

        <p className="text-xl font-bold mt-4">
          ${product.price}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full flex justify-center items-center gap-2 bg-pink-500 text-white py-3 rounded-xl cursor-pointer"
        >
          <FaShoppingCart />
          Add to Cart
        </button>

      </div>


      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md relative">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-xl cursor-pointer"
            >
              <FaTimes />
            </button>

            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-contain"
            />

            <h2 className="text-2xl font-bold mt-4">
              {product.title}
            </h2>

            <p className="text-gray-600 mt-3">
              {product.description}
            </p>

            <p className="text-xl font-bold mt-4">
              ${product.price}
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="mt-5 bg-gray-800 text-white px-5 py-2 rounded-lg cursor-pointer"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </>
  );
}

export default Product;