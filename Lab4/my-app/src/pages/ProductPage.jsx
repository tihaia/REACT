
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import coffeeData from "../data/coffee.json";

/**
 * Страница товара по ID.
 * @component
 * @returns {JSX.Element}
 */
function ProductPage() {
  const { id } = useParams();
  const parsedId = parseInt(id, 10);

  // Проверка на число
  if (isNaN(parsedId)) {
    return <NotFoundPage />;
  }

  // Поиск товара по id
  const product = coffeeData.find((item) => item.id === parsedId);

  // Если не найден — показать 404
  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} style={{ maxWidth: "300px" }} />
      <p>{product.description}</p>
      <p>Цена: {product.price} лей</p>
    </div>
  );
}

export default ProductPage;
