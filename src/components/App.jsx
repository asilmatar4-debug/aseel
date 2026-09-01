import { useEffect, useState } from "react";
import Product from "./product.jsx";
import { FaShoppingCart } from "react-icons/fa";

function App() {
  const products = [
    {
      id: 1,
      title: "Essence Mascara Lash Princess",
      description:
        "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects.",
      price: 9.99,
      thumbnail:
        "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
    },
    {
      id: 2,
      title: "Eyeshadow Palette with Mirror",
      description:
        "The Eyeshadow Palette with Mirror offers a versatile range of shades for creating beautiful eye looks.",
      price: 19.99,
      thumbnail:
        "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
    },
    {
      id: 3,
      title: "Powder Canister",
      description:
        "The Powder Canister is a finely milled setting powder designed to set makeup and control shine.",
      price: 14.99,
      thumbnail:
        "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp",
    },
  ];

  // قراءة السلة من localStorage أول ما التطبيق يشتغل
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  // كل ما cart تتغير نحفظها في localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // إضافة المنتج للسلة
  function addToCart(product) {
    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );

      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  }

  // حساب السعر مع الخصم
  function calculatePrice(item) {
    const totalPrice = item.price * item.quantity;

    if (item.quantity > 10) {
      return totalPrice * 0.8;
    }

    return totalPrice;
  }

  // مجموع عدد القطع كلها
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // السعر الكلي للسلة بعد الخصومات
  const cartTotal = cart.reduce(
    (total, item) => total + calculatePrice(item),
    0
  );

  return (
    <div className="min-h-screen bg-pink-50">

      {/* Header */}
      <div className="flex justify-between items-center p-6 bg-white shadow">
        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <div className="flex items-center gap-2 text-lg font-semibold">
          <FaShoppingCart />

          <span>
            Cart: {totalItems}
          </span>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>

      {/* Cart */}
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">
          My Cart
        </h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">
            Your cart is empty
          </p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 mb-3 rounded-lg shadow"
              >
                <h3 className="font-bold text-lg">
                  {item.title}
                </h3>

                <p>
                  Price per item: ${item.price}
                </p>

                <p>
                  Quantity: {item.quantity}
                </p>

                <p className="font-bold">
                  Total: ${calculatePrice(item).toFixed(2)}
                </p>

                {item.quantity > 10 && (
                  <p className="text-green-600 font-bold mt-2">
                    20% Discount Applied
                  </p>
                )}
              </div>
            ))}

            <div className="bg-white p-5 mt-6 rounded-lg shadow">
              <h2 className="text-xl font-bold">
                Cart Total: ${cartTotal.toFixed(2)}
              </h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;