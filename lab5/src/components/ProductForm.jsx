import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

/**
 * Компонент формы для добавления и редактирования товара.
 * @returns {JSX.Element}
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
      axios.get(`https://6815f68a32debfe95dbcf4e4.mockapi.io/products/${id}`).then((res) => {
        const data = res.data;
        setFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          image: data.image,
          category: data.category || "",
          sizes: data.sizes.join(", ")
        });
      });
    }
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Введите название";
    if (!formData.price || isNaN(formData.price)) newErrors.price = "Цена должна быть числом";
    if (!formData.image) newErrors.image = "Введите URL изображения";
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
      sizes: formData.sizes.split(",").map(s => parseInt(s.trim(), 10))
    };

    if (isEdit) {
      await axios.put(`https://6815f68a32debfe95dbcf4e4.mockapi.io/products/${id}`, payload);
    } else {
      await axios.post("https://6815f68a32debfe95dbcf4e4.mockapi.io/products", payload);
    }

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>{isEdit ? "Редактировать товар" : "Добавить товар"}</h2>
      <input name="name" placeholder="Название" value={formData.name} onChange={handleChange} />
      {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

      <input name="price" placeholder="Цена" value={formData.price} onChange={handleChange} />
      {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}

      <input name="image" placeholder="URL изображения" value={formData.image} onChange={handleChange} />
      {errors.image && <p style={{ color: "red" }}>{errors.image}</p>}

      <input name="category" placeholder="Категория" value={formData.category} onChange={handleChange} />
      <input name="sizes" placeholder="Размеры (через запятую)" value={formData.sizes} onChange={handleChange} />

      <textarea name="description" placeholder="Описание" value={formData.description} onChange={handleChange} />
      <button type="submit">{isEdit ? "Сохранить" : "Добавить"}</button>
    </form>
  );
}

export default ProductForm;
