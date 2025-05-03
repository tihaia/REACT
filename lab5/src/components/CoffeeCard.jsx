import { useState } from "react";
import { Link } from "react-router-dom"; // добавлено для кнопки редактирования
import "../styles/CoffeeCard.css";

/**
 * Карточка одного кофейного напитка с выбором объёма.
 *
 * @param {Object} props
 * @param {Object} props.coffee - Объект кофе
 * @returns {JSX.Element}
 */
function CoffeeCard({ coffee }) {
  const [selectedSize, setSelectedSize] = useState(coffee.sizes[0]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemWithSize = {
      ...coffee,
      size: selectedSize,
      id: coffee.id + "-" + selectedSize // уникальный ID для размера
    };
    const exists = cart.find((item) => item.id === itemWithSize.id);

    if (!exists) {
      cart.push(itemWithSize);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  return (
    <div className="coffee-card">
      <h3>{coffee.name}</h3>
      <img src={coffee.image} alt={coffee.name} />
      <p>{coffee.description}</p>
      <p>Цена: {coffee.price} лей</p>

      <div>
        <p>Выберите объём:</p>
        {coffee.sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            style={{
              margin: "5px",
              background: size === selectedSize ? "#cfa" : "#eee"
            }}
          >
            {size} мл
          </button>
        ))}
      </div>

      <button onClick={addToCart}>🛒 В корзину</button>

      {/* Кнопка редактирования */}
      <div style={{ marginTop: "10px" }}>
        <Link to={`/edit/${coffee.id}`}>
          <button>✏️ Редактировать</button>
        </Link>
      </div>
    </div>
  );
}

export default CoffeeCard;
