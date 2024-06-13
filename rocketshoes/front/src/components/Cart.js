import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Cart = ({ cart, setCart }) => {

  const getInitialQuantities = () => {
    const savedQuantities = JSON.parse(localStorage.getItem('cartQuantities')) || {};
    return cart.map(item => ({
      id:item.id,
      quantity: savedQuantities[item.id] || 1
    }));
  };
  
  const [quantities, setQuantities] = useState(
    getInitialQuantities());

    useEffect(() => {
      localStorage.setItem('cartQuantities', JSON.stringify(
        quantities.reduce((acc,q) => ({ ...acc, [q.id]: q.quantity}), {})
      ));
    },[quantities]);

  const handleQuantityChange = (id, newQuantity) => {
    const newQuantities = quantities.map((q) =>
      q.id === id ? { ...q, quantity: newQuantity } : q
    );
    setQuantities(newQuantities);
  };

  const handleIncrementQuantity = (id) => {
    const newQuantity = quantities.find((q) => q.id === id).quantity + 1;
    handleQuantityChange(id, newQuantity);
  };

  const handleDecrementQuantity = (id) => {
    const currentQuantity = quantities.find((q) => q.id === id).quantity;
    const newQuantity = currentQuantity > 1 ? currentQuantity - 1 : 1;
    handleQuantityChange(id, newQuantity);
  };

  const handleAddToCart = (newItem) => {
    const existingItem = cart.find((item) => item.id === newItem.id);
    if (existingItem) {
      const newCart = cart.map((item) =>
        item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(newCart);
      const newQuantities = quantities.map((q) =>
        q.id === newItem.id ? { ...q, quantity: q.quantity + 1 } : q
      );
      setQuantities(newQuantities);
    } else {
      setCart([...cart, { ...newItem, quantity: 1 }]);
      setQuantities([...quantities, { id: newItem.id, quantity: 1 }]);
    }
  };

  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    setQuantities(quantities.filter((q) => q.id !== id));
  };

  const getItemSubtotal = (item) => {
    const quantity = quantities.find((q) => q.id === item.id)?.quantity || 1;
    return item.price * quantity;
  };

  const getTotal = () => {
    return cart.reduce((acc, item) => acc + getItemSubtotal(item), 0);
  };

  const handleFinishOrder = () => {
    window.alert('Pedido realizado com sucesso!');

    setCart([]);
    setQuantities([]);
  }

  return (
    <div>
      {cart.length === 0 ? (
        <p>O carrinho está vazio</p>
      ) : (
        <div>
          <ul className="rounded-lg grid grid-cols-1 gap-4 bg-white">

            <li className="p-4 flex items-center justify-between font-bold pl-56">
              <div className="flex items-center w-2/5 text-black">
                <span>Produto</span>
              </div>
              <div className="flex items-center w-1/5 justify-center text-black pl-56">
                <span>Quantidade</span>
              </div>
              <div className="flex items-center w-1/5 justify-end text-black">
                <span>Subtotal</span>
              </div>
              <div className="w-1/5"></div>
            </li>

            {cart.map((item) => (
              <li key={item.id} className="border-b p-4 flex items-center justify-between">
                <div className="flex items-center w-2/5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover mr-20"
                  />
                  <div>
                    <h3 className="text-lg text-black">{item.title}</h3>
                    <p className="text-black">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center w-1/5 justify-center pl-20">
                  <button
                    onClick={() => handleDecrementQuantity(item.id)}
                    className="border border-black rounded-lg text-black px-3 py-1 rounded-lg mr-2"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantities.find((q) => q.id === item.id)?.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    className="w-16 text-center border rounded text-black"
                  />
                  <button
                    onClick={() => handleIncrementQuantity(item.id)}
                    className="border border-black rounded-lg text-black px-3 py-1 rounded-lg ml-2"
                  >
                    +
                  </button>
                </div>
                <p className="text-black pr-28">${getItemSubtotal(item).toFixed(2)}</p>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="ml-2 text-black px-4 py-2 rounded-lg"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            ))}
            <div className="rounded-lg flex justify-between mt-4 bg-white">
              <button onClick={handleFinishOrder} className="bg-green-500 text-black px-4 py-2 rounded-lg ml-40 mb-8">
                Finalizar Pedido
              </button>
              <p className="text-xl text-black mr-80">Total: ${getTotal().toFixed(2)}</p>
            </div>
          </ul>


        </div>
      )}
    </div>
  );
};

export default Cart;
