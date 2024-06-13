import React from 'react';

const ProductList = ({ products, addToCart }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {products.map(product => (
      <div key={product.id} className="rounded-lg p-4 bg-white">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain"
        />
        <div className="flex-grow p-4 flex flex-col justify-center">
          <h2 className="text-xl mt-2 text-black text-center">{product.title}</h2>
          <p className="text-gray-700 text-center">${product.price}</p>
          <button
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg self-center"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default ProductList;
