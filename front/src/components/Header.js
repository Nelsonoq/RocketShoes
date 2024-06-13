import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ cartItemCount }) => {
  const location = useLocation();

  return (
    <header className="flex items-center justify-between p-4 text-white">
      <h1 className="text-3xl">RocketShoes</h1>
      <div className="relative">
        {location.pathname === '/cart' ? (
          <Link to="/">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg">
              Voltar para a Página Principal
            </button>
          </Link>
        ) : (
          <Link to="/cart">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg">
              Carrinho ({cartItemCount})
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
