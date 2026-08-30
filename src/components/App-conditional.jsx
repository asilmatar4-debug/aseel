import Product from "./product.jsx";

function AppConditional({ products }) {
  return (
    <div>
      {products.length > 0 ? (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Product
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <h2 className="text-center text-2xl font-bold">
          Loading...
        </h2>
      )}
    </div>
  );
}

export default AppConditional;