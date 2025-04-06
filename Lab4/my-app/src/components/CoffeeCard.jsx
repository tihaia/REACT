import React, { useState } from "react";
import "../styles/CoffeeCard.css";

/**
 * Компонент отображает карточку кофейного напитка с возможностью выбора размера.
 *
 * @param {Object} coffee - Кофейный напиток.
 * @param {string} coffee.name - Название напитка.
 * @param {string} coffee.description - Описание напитка.
 * @param {number} coffee.price - Цена напитка.
 * @param {Array} coffee.sizes - Размеры напитка.
 * @param {string} coffee.image - Изображение напитка.
 * 
 * @returns {JSX.Element} Карточка напитка.
 */
function CoffeeCard({ coffee }) {
    const [selectedSize, setSelectedSize] = useState(coffee.sizes[0]);
  
    const handleSizeChange = (size) => {
      setSelectedSize(size);
    };
  
    return (
      <div className="coffee-card">
        <img src={coffee.image} alt={coffee.name} />
        <h2>{coffee.name}</h2>
        <p>{coffee.description}</p>
        <p>{coffee.price} лей</p>
        <div>
          {coffee.sizes.map((size) => (
            <button key={size} onClick={() => handleSizeChange(size)} style={{ backgroundColor: selectedSize === size ? "lightblue" : "" }}>
              {size} мл
            </button>
          ))}
        </div>
        <button>Добавить в корзину</button>
      </div>
    );
  }
  
  export default CoffeeCard;