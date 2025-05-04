import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cart/slice';
import '../styles/CoffeeCard.css';

/**
 * Карточка кофейного напитка с выбором объёма.
 *
 * @param {Object} props
 * @param {Object} props.coffee
 * @returns {JSX.Element}
 */
function CoffeeCard({ coffee }) {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(null);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    dispatch(addToCart({
      id: coffee.id,
      title: coffee.title,
      price: coffee.price,
      image: coffee.image,
      size: selectedSize,
    }));
  };

  return (
    <div className="coffee-card">
      <h3>{coffee.title}</h3>
      <img src={coffee.image} alt={coffee.title} className="coffee-image" />
      <p>{coffee.description}</p>
      <p><strong>Цена:</strong> {coffee.price} лей</p>

      <p><strong>Выберите объём:</strong></p>
      <div className="volume-buttons">
        {coffee.sizes?.map((size) => (
          <button
            key={size}
            className={`volume-button ${selectedSize === Number(size) ? 'active' : ''}`}
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
    </div>
  );
}

export default CoffeeCard;
