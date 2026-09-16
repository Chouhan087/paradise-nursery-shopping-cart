import React, { useState } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [view, setView] = useState('landing');

  if (view === 'landing') {
    return (
      <div className="landing-page">
        <h1>Welcome to Paradise Nursery</h1>
        <p>Your one-stop destination for perfect green house companions.</p>
        <button onClick={() => setView('products')}>Get Started</button>
      </div>
    );
  }

  if (view === 'about') {
    return (
      <div className="app-container">
        <AboutUs />
        <div className="simple-nav">
          <button onClick={() => setView('products')}>View Plants</button>
          <button onClick={() => setView('landing')}>Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {view === 'products' ? (
        <ProductList
          onViewCart={() => setView('cart')}
          onViewAbout={() => setView('about')}
        />
      ) : (
        <CartItem onContinueShopping={() => setView('products')} />
      )}
    </div>
  );
}

export default App;
