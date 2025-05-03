import { useEffect, useState } from "react";

/**
 * Страница корзины — отображает выбранные товары из localStorage.
 * @component
 */
function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  if (cartItems.length === 0) {
    return <h2>Ваша корзина пуста</h2>;
  }

  return (
    <div>
      <h2>Корзина</h2>
      {cartItems.map((item) => (
        <div key={item.id} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
          <h3>{item.name}</h3>
          <img src={item.image} alt={item.name} style={{ width: "150px" }} />
          <p>{item.description}</p>
          <p><strong>Объём:</strong> {item.size} мл</p>
          <p><strong>Цена:</strong> {item.price} лей</p>
          <button onClick={() => removeFromCart(item.id)}>🗑 Удалить</button>
        </div>
      ))}
    </div>
  );
}

export default CartPage;
