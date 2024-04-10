import React, { useState } from 'react';
import './App.css';
import ItemCard from './ItemCard';

const productsData = [
  {
    image: './image/dish1.jpg',
    name: 'crispy potato',
    price: '$150',
    id: 1,
  },
  {
    image: './image/dishp.jpg',
    name: 'idli vada',
    price: '$150',
    id: 2,
  },
  {
    image: '/image/dishk.jpg',
    name: 'sev puri',
    price: '$150',
    id: 3,
  },
];

const productsData2 = [
  {
    image: '/image/dishw.jpg',
    name: 'vegetable idli',
    price: '$150',
    id: 4,
  },
  {
    image: '/image/dishj.jpg',
    name: 'appe',
    price: '$150',
    id: 5,
  },
  {
    image: '/image/dishg.jpg',
    name: 'bread pakoda',
    price: '$150',
    id: 6,
  },
];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const placeOrder = () => {
    // Logic to place order (e.g., send cartItems to backend)
    alert('Order placed successfully!');
    clearCart();
  };
  const toggleCart = () => {
    setShowCart(!showCart);
    if (!showCart) {
      // Clear cart when hiding the cart modal
      clearCart();
    }
  };

  return (
    <>
      <div className="main">
        <div className="navbar">
          <h2>Header</h2>
          <ul>
            <li>Orders</li>
            <li>Account</li>
            <li onClick={clearCart}>Clear Cart</li>
            <li onClick={() => setShowCart(!showCart)}>Cart ({cartItems.length})</li>
          </ul>
        </div>
        <div className="center">
          <div className="up">
            {productsData.map((product) => (
              <ItemCard
                key={product.id}
                product={product}
                addToCart={() => addToCart(product)}
              />
            ))}
          </div>
          <div className="down">
            {productsData2.map((product) => (
              <ItemCard
                key={product.id}
                product={product}
                addToCart={() => addToCart(product)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Cart Modal/Drawer */}
      {showCart && (
        <div className="cart-overlay">
          <div className="cart">
            <h3>Your Cart</h3>
            <button className='delete' onClick={toggleCart}>❌</button>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div>{item.name}</div>
                <div>{item.price}</div>
                <button onClick={() => removeFromCart(item.id)}>Delete</button>
                <button onClick={placeOrder}> Order</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
