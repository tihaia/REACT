import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ProductForm.css";

const API_URL = "https://6815f68a32debfe95dbcf4e4.mockapi.io/products";

/**
 * Форма для добавления/редактирования коктейля.
 */
function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    sizes: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      axios.get(`${API_URL}/${id}`)
        .then((res) => {
          const data = res.data;
          setFormData({
            name: data.name,
            description: data.description,
            price: data.price,
            image: data.image,
            category: data.category || "",
            sizes: Array.isArray(data.sizes) ? data.sizes.join(", ") : ""
          });
        })
        .catch((err) => console.error("Ошибка при загрузке:", err));
    }
  }, [id, isEdit]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Введите название";
    if (!formData.price || isNaN(formData.price)) newErrors.price = "Цена должна быть числом";
    if (!formData.image) newErrors.image = "Введите URL изображения";
    if (!formData.description) newErrors.description = "Введите описание";
    if (!formData.category) newErrors.category = "Введите категорию";
    if (!formData.sizes) newErrors.sizes = "Введите объёмы";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      ...formData,
      price: Number(formData.price),
      sizes: formData.sizes
        .split(",")
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n)),
    };

    try {
      if (isEdit) {
        await axios.put(`${API_URL}/${id}`, payload);
      } else {
        await axios.post(API_URL, payload);
      }
      navigate("/");
    } catch (err) {
      console.error("Ошибка при сохранении:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>{isEdit ? "Редактировать коктейль" : "Добавить коктейль"}</h2>

      <input name="name" placeholder="Название" value={formData.name} onChange={handleChange} />
      {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

      <input name="price" placeholder="Цена" value={formData.price} onChange={handleChange} />
      {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}

      <input name="image" placeholder="URL изображения" value={formData.image} onChange={handleChange} />
      {errors.image && <p style={{ color: "red" }}>{errors.image}</p>}

      <input name="category" placeholder="Категория" value={formData.category} onChange={handleChange} />
      <input name="sizes" placeholder="Объёмы (через запятую)" value={formData.sizes} onChange={handleChange} />
      {errors.sizes && <p style={{ color: "red" }}>{errors.sizes}</p>}

      <textarea name="description" placeholder="Описание" value={formData.description} onChange={handleChange} />
      <button type="submit">{isEdit ? "Сохранить" : "Добавить"}</button>
    </form>
  );
}

export default ProductForm;
