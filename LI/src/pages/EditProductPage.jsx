import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://6815f68a32debfe95dbcf4e4.mockapi.io/products";

/**
 * Страница редактирования коктейля.
 * Загружает данные по ID, позволяет изменить и сохранить.
 * @component
 */
function EditProductPage() {
  const { id } = useParams();           // string!
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    sizes: []
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      console.error("ID не указан");
      return;
    }

    axios
      .get(`${API_URL}/${id}`)
      .then((res) => {
        const data = res.data;
        setProduct({
          name: data.name || "",
          description: data.description || "",
          price: data.price || "",
          image: data.image || "",
          category: data.category || "",
          sizes: Array.isArray(data.sizes) ? data.sizes : []
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке коктейля:", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = {};
    if (!product.name) errors.name = "Введите название коктейля";
    if (!product.price || isNaN(product.price)) errors.price = "Цена должна быть числом";
    if (!product.image) errors.image = "Введите URL изображения";
    if (!product.category) errors.category = "Введите категорию";
    if (!product.sizes.length) errors.sizes = "Укажите хотя бы один объём";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const updatedProduct = {
      ...product,
      price: parseFloat(product.price),
      sizes: product.sizes.map((s) =>
        typeof s === "string" ? parseInt(s.trim(), 10) : s
      ),
    };

    try {
      await axios.put(`${API_URL}/${id}`, updatedProduct);
      navigate(`/product/${id}`);
    } catch (err) {
      console.error("Ошибка при обновлении коктейля:", err);
    }
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <div className="edit-product-page">
      <h2>Редактировать коктейль</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <label>Название:</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <label>Описание:</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
        />
        {errors.description && <p className="error">{errors.description}</p>}

        <label>Цена:</label>
        <input
          type="text"
          name="price"
          value={product.price}
          onChange={handleChange}
        />
        {errors.price && <p className="error">{errors.price}</p>}

        <label>Изображение (URL):</label>
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
        />
        {errors.image && <p className="error">{errors.image}</p>}

        <label>Категория:</label>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
        />
        {errors.category && <p className="error">{errors.category}</p>}

        <label>Объёмы (через запятую):</label>
        <input
          type="text"
          name="sizes"
          value={product.sizes.join(", ")}
          onChange={(e) => {
            const sizes = e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean);
            setProduct({ ...product, sizes });
          }}
        />
        {errors.sizes && <p className="error">{errors.sizes}</p>}

        <button type="submit">Сохранить изменения</button>
      </form>
    </div>
  );
}

export default EditProductPage;
