import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";

/**
 * Страница товара по ID.
 * Загружает товар с сервера и отображает.
 * @component
 * @returns {JSX.Element}
 */
function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setNotFound(true);
      return;
    }

    axios.get(`https://6815f68a32debfe95dbcf4e4.mockapi.io/products/${id}`)
      .then((res) => {
        if (res.data) setProduct(res.data);
        else setNotFound(true);
      })
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound) return <NotFoundPage />;
  if (!product) return <p>Загрузка...</p>;

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
