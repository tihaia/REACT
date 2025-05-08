import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";

const API_URL = "https://6815f68a32debfe95dbcf4e4.mockapi.io/products";

/**
 * Страница коктейля по ID.
 */
function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    axios
      .get(`${API_URL}/${id}`)
      .then((res) => {
        if (res.data) {
          setProduct(res.data);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => {
        setError("Ошибка при загрузке коктейля");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Удалить этот коктейль?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        navigate("/");
      } catch {
        alert("Не удалось удалить коктейль.");
      }
    }
  };

  if (notFound) return <NotFoundPage />;
  if (loading) return <p>Загрузка...</p>;

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {product && (
        <>
          <h2>{product.name}</h2>
          <img src={product.image} alt={product.name} style={{ maxWidth: "300px" }} />
          <p>{product.description}</p>
          <p>Цена: {product.price} лей</p>
          <button
            onClick={handleDelete}
            style={{
              marginTop: "20px",
              backgroundColor: "crimson",
              color: "#fff",
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px",
            }}
          >
            Удалить коктейль
          </button>
        </>
      )}
    </div>
  );
}

export default ProductPage;
