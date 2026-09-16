import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

function ProductList({ onViewCart, onViewAbout }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalCartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const plantsArray = [
    {
      category: 'Air Purifying Plants',
      plants: [
        {
          id: 'snake-plant',
          name: 'Snake Plant',
          image: 'https://images.unsplash.com/photo-1593482892290-f54927ae2bb3?auto=format&fit=crop&w=600&q=80',
          description: 'A hardy indoor plant known for improving indoor air quality.',
          cost: '$15',
        },
        {
          id: 'spider-plant',
          name: 'Spider Plant',
          image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=600&q=80',
          description: 'An easy-care plant that adds fresh greenery to indoor spaces.',
          cost: '$12',
        },
      ],
    },
    {
      category: 'Aromatic Houseplants',
      plants: [
        {
          id: 'lavender',
          name: 'Lavender',
          image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=600&q=80',
          description: 'A fragrant plant with a calming and refreshing aroma.',
          cost: '$20',
        },
        {
          id: 'jasmine',
          name: 'Jasmine',
          image: 'https://images.unsplash.com/photo-1597848212624-e19f9e5f7f4d?auto=format&fit=crop&w=600&q=80',
          description: 'A beautiful aromatic plant with sweet-smelling flowers.',
          cost: '$18',
        },
      ],
    },
    {
      category: 'Succulent Plants',
      plants: [
        {
          id: 'aloe-vera',
          name: 'Aloe Vera',
          image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8a5d9d7?auto=format&fit=crop&w=600&q=80',
          description: 'A low-maintenance succulent that grows well indoors.',
          cost: '$16',
        },
        {
          id: 'echeveria',
          name: 'Echeveria',
          image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=80',
          description: 'A compact rosette-shaped succulent perfect for small spaces.',
          cost: '$14',
        },
      ],
    },
  ];

  const handleAddToCart = plant => {
    dispatch(addItem(plant));
  };

  return (
    <div className="product-page">
      <nav className="navbar">
        <button className="nav-logo" onClick={onViewAbout}>
          <span className="logo-icon">🌿</span>
          <span>Paradise Nursery</span>
        </button>

        <div className="nav-links">
          <button onClick={onViewAbout}>About Us</button>
          <button className="cart-link" onClick={onViewCart}>
            🛒 Cart
            {totalCartQuantity > 0 && (
              <span className="cart-badge">{totalCartQuantity}</span>
            )}
          </button>
        </div>
      </nav>

      <main className="product-container">
        <h1>Paradise Nursery Plants</h1>
        <p className="product-intro">
          Explore our collection of beautiful indoor plants.
        </p>

        {plantsArray.map(categoryObj => (
          <section key={categoryObj.category} className="category-section">
            <h2 className="category-title">{categoryObj.category}</h2>

            <div className="product-grid">
              {categoryObj.plants.map(plant => {
                const isAdded = cartItems.some(item => item.id === plant.id);

                return (
                  <div key={plant.id} className="product-card">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="product-image"
                    />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <h4>{plant.cost}</h4>

                    <button
                      className={`add-to-cart-btn ${isAdded ? 'disabled' : ''}`}
                      disabled={isAdded}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {isAdded ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default ProductList;
