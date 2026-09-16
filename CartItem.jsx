import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);

  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => {
        const costNum = parseFloat(String(item.cost).replace('$', ''));
        return total + costNum * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const calculateTotalCost = item => {
    const costNum = parseFloat(String(item.cost).replace('$', ''));
    return (costNum * item.quantity).toFixed(2);
  };

  const handleIncrement = item => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = item => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity - 1,
      })
    );
  };

  const handleRemove = item => {
    dispatch(removeItem(item.id));
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img
                className="cart-item-image"
                src={item.image}
                alt={item.name}
              />

              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="unit-price">Unit Price: {item.cost}</p>

                <div className="cart-item-quantity">
                  <button
                    className="quantity-button"
                    onClick={() => handleDecrement(item)}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="quantity-button"
                    onClick={() => handleIncrement(item)}
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    +
                  </button>
                </div>

                <p className="subtotal">
                  Subtotal: ${calculateTotalCost(item)}
                </p>
              </div>

              <button
                className="delete-button"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="cart-actions">
        <button className="continue-button" onClick={onContinueShopping}>
          Continue Shopping
        </button>

        <button className="checkout-button" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
