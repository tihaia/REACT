import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cart/slice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/CocktailCard.css';

/**
 * Карточка коктейля с выбором объёма.
 * @param {Object} props
 * @param {Object} props.cocktail
 * @returns {JSX.Element}
 */
function CocktailCard({ cocktail }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState(null);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    dispatch(addToCart({
      id: cocktail.id,
      name: cocktail.name,
      price: cocktail.price,
      image: cocktail.image,
      size: selectedSize,
      quantity: 1
    }));
  };

  const handleEdit = () => {
    navigate(`/edit/${cocktail.id}`);
  };

  const handleRemove = async () => {
    if (window.confirm("Удалить этот коктейль?")) {
      try {
        await axios.delete(`https://6815f68a32debfe95dbcf4e4.mockapi.io/products/${cocktail.id}`);
        alert("Коктейль удалён!");
        window.location.reload(); // временно, для обновления списка
      } catch (error) {
        alert("Ошибка при удалении.");
        console.error(error);
      }
    }
  };

  return (
    <div className="cocktail-card">
      <h3>{cocktail.name}</h3>
      <img src={cocktail.image} alt={cocktail.name} className="cocktail-image" />
      <p>{cocktail.description}</p>
      <p><strong>Цена:</strong> {cocktail.price} лей</p>

      <p><strong>Выберите объём:</strong></p>
      <div className="volume-buttons">
        {cocktail.sizes?.map((size) => (
          <button
            key={size}
            className={`volume-button ${selectedSize === size ? 'active' : ''}`}
            onClick={() => setSelectedSize(size)}
          >
            {size} мл
          </button>
        ))}
      </div>

      <button
        className="add-to-cart-btn"
        onClick={handleAddToCart}
        disabled={!selectedSize}
      >
        🛒 В корзину
      </button>

      <div className="action-buttons">
        <button className="edit-btn" onClick={handleEdit}>
          Редактировать
        </button>
        <button className="remove-btn" onClick={handleRemove}>
          Удалить
        </button>
      </div>
    </div>
  );
}

export default CocktailCard;
