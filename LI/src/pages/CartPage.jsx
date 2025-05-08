import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  updateQuantity,
} from '../store/cart/slice';
import { selectCartItems } from '../store/cart/actions';
import '../styles/CartPage.css';

/**
 * Страница корзины.
 *
 * @returns {JSX.Element}
 */
function CartPage() {
  const cartItems = useSelector(selectCartItems) ?? [];
  const dispatch = useDispatch();

  const increaseQuantity = (id, size) => {
    const item = cartItems.find((i) => i.id === id && i.size === size);
    if (item) {
      dispatch(updateQuantity({ id, size, quantity: item.quantity + 1 }));
    }
  };

  const decreaseQuantity = (id, size) => {
    const item = cartItems.find((i) => i.id === id && i.size === size);
    if (item && item.quantity > 1) {
      dispatch(updateQuantity({ id, size, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (id, size) => {
    dispatch(removeFromCart({ id, size }));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h2>Корзина</h2>
      {cartItems.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map((item, index) => (
            <li key={`${item.id}-${item.size}-${index}`} className="cart-item">
              <div className="cart-item-main">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                )}
                <div>
                  <strong>{item.name}</strong> — {item.size} мл
                  <div>
                    Цена: {item.price} лей × {item.quantity} ={' '}
                    {item.price * item.quantity} лей
                  </div>
                </div>
              </div>
              <div className="cart-controls">
                <button onClick={() => decreaseQuantity(item.id, item.size)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id, item.size)}>+</button>
                <button onClick={() => handleRemove(item.id, item.size)}>Удалить</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h3>Общая сумма: {totalPrice} лей</h3>
    </div>
  );
}

export default CartPage;
