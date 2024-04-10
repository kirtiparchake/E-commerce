import React, { useState } from 'react';
import './App.css';
import ItemCard from './ItemCard';
import Snackbar from './Snackbar'; // Import Snackbar component

const productsData = [
  {
    image: '/image/dish1.jpg',
    name: 'Crispy potato',
    price: 150, // Numeric price for calculations
    id: 1,
  },
  {
    image: '/image/dishp.jpg',
    name: 'Idli vada',
    price: 150,
    id: 2,
  },
  {
    image: '/image/dishk.jpg',
    name: 'Sev puri',
    price: 150,
    id: 3,
  },
];

const productsData2 = [
  {
    image: '/image/dishw.jpg',
    name: 'Vegetable idli',
    price: 150,
    id: 4,
  },
  {
    image: '/image/dishj.jpg',
    name: 'Appe',
    price: 150,
    id: 5,
  },
  {
    image: '/image/dishg.jpg',
    name: 'Bread pakoda',
    price: 150,
    id: 6,
  },
];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

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

    setSnackbarMessage(`${product.name} added to cart`);
  };
   // Update body class based on showCart state
   if (showCart) {
    document.body.classList.add('body-no-scroll');
  } else {
    document.body.classList.remove('body-no-scroll');
  }

  const closeSnackbar = () => {
    setSnackbarMessage('');
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalSum = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
      <div className="main">
        <div className="navbar">
          <h2>Header</h2>
          <ul>
            <li>Orders</li>
            <li>Account</li>
            <li onClick={() => setCartItems([])}>Clear Cart</li>
            <li onClick={() => setShowCart(!showCart)}>Cart ({getTotalQuantity()})</li>
          </ul>
        </div>
        <div className="center">
          <div className="up">
            {productsData.map((product) => (
              <ItemCard key={product.id} product={product} addToCart={() => addToCart(product)} />
            ))}
          </div>
          <div className="down">
            {productsData2.map((product) => (
              <ItemCard key={product.id} product={product} addToCart={() => addToCart(product)} />
            ))}
          </div>
        </div>
      </div>

      {/* Cart Modal/Drawer */}
      {showCart && (
        <div className="cart-overlay">
          <div className="cart">
            <div className="item">
              
            <h3>Your Cart</h3>
            <button className="delete" onClick={() => setShowCart(false)}>
              ❌
            </button>
            </div>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                
                <img src={item.image} alt={item.name} />
                <div>{item.name}</div>
                <div>Price: ${item.price}</div>
                <div>Quantity: {item.quantity}</div>
                <button onClick={() => setCartItems(cartItems.filter((i) => i.id !== item.id))}>Delete</button>
                 
              </div>
            ))}
            <div>Total Quantity: {getTotalQuantity()}</div>
            <div>Total Sum: ${getTotalSum()}</div>
            <button className='order'
              onClick={() => {
                // Logic to place order (e.g., send cartItems to backend)
                alert('Order placed successfully!');
                setCartItems([]);
              }}
              disabled={cartItems.length === 0}
            >
              Place Order
            </button>
          </div>
        </div>
      )}

      {/* Snackbar Notification */}
      {snackbarMessage && <Snackbar message={snackbarMessage} onClose={closeSnackbar} />}
    </>
  );
}

export default App;
