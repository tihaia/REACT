# Лабораторная работа №5. Формы, валидация и работа с API

## Цель работы

Освоить создание форм в React, научиться управлять вводом пользователя и выполнять валидацию. Получить навыки взаимодействия с REST API: отправка и получение данных с сервера. Перейти от использования локальных данных к работе с внешним API.

## Условия

Продолжаю разработку интернет-магазина из предыдущих лабораторных работ. На этом этапе данные о товарах должны загружаться с удалённого сервера (mockapi.io), а новые товары должны добавляться через форму и сохраняться на сервере. Локальное хранение товаров больше не используется.

### Задание 1. Подготовка среды

1. Зарегистрировалась на https://mockapi.io и создала новый проект.
2. Создала ресурс `products` (где `products` — это название моих товаров).
3. Заполнила API начальными данными следующим способом:
   - Скопировала структуру из моего локального JSON-файла, использованного ранее.
4. Скопировала базовый URL моего API.

### Задание 2. Загрузка данных с сервера и отображение товаров

1. Обновляю компонент, отображающий список товаров, чтобы данные загружались с `mockapi.io`.
   ```jsx
    import { useState, useEffect } from "react";
    import axios from "axios";
    import CoffeeCard from "./CoffeeCard";
    import "../styles/CoffeeList.css";

    /**
     * Компонент отображает список кофейных напитков с  фильтрацией и загрузкой с mockapi.io.
     *
     * @param {Object} props
     * @param {string} props.searchQuery - Строка для фильтрации    товаров по названию.
     * @returns {JSX.Element}
     */
    function CoffeeList({ searchQuery }) {
      const [coffees, setCoffees] = useState([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        axios
          .get("https://6815f68a32debfe95dbcf4e4.mockapi.io/    products")
          .then((res) => {
            setCoffees(res.data);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Ошибка загрузки данных:", err);
            setLoading(false);
          });
      }, []);

      const filteredCoffees = coffees.filter((coffee) =>
        coffee.name.toLowerCase().includes(searchQuery.toLowerCase  ())
      );

      if (loading) {
        return <p>Загрузка...</p>;
      }

      return (
        <div className="coffee-list">
          {filteredCoffees.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </div>
      );
    }

    export default CoffeeList;
   ```
2. Использую хук `useEffect` для выполнения `GET-запроса` при монтировании компонента.
   ```jsx
      useEffect(() => {
        axios
          .get("https://6815f68a32debfe95dbcf4e4.mockapi.io/    products")
          .then((res) => {
            setCoffees(res.data);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Ошибка загрузки данных:", err);
            setLoading(false);
          });
      }, []);
   ```
3. Храню полученные данные в состоянии через `useState`.
   ```jsx
    const [coffees, setCoffees] = useState([]);
   ```
4. Отображаю список товаров, полученных с сервера.
   ```jsx
      const filteredCoffees = coffees.filter((coffee) =>
        coffee.name.toLowerCase().includes(searchQuery.toLowerCase  ())
      );

      return (
        <div className="coffee-list">
          {filteredCoffees.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </div>
      );
   ```
5. Добавляю индикатор загрузки, чтобы пользователь видел, что данные загружаются.
   - Использую состояние `loading` для отслеживания процесса загрузки.
   - Отображаю сообщение "Загрузка..." или индикатор загрузки, пока данные не будут получены.
    ```jsx
    const [loading, setLoading] = useState(true);

    if (loading) {
        return <p>Загрузка...</p>;
    }
    ```
### Задание 3. Создание формы добавления товара с валидацией

1. Создаю новый компонент `ProductForm.jsx.`, который будет содержать форму для добавления нового товара.
   1. Форма может быть на той же странице, что и список товаров, или на отдельной странице.
2. Реализую валидацию формы.
3. Отображаю сообщения об ошибках под соответствующими полями при некорректном вводе.
   ```jsx
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
          axios.get(`https://6815f68a32debfe95dbcf4e4.mockapi.io/   products/${id}`).then((res) => {
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
        if (!formData.price || isNaN(formData.price)) newErrors.    price = "Цена должна быть числом";
        if (!formData.image) newErrors.image = "Введите URL     изображения";
        return newErrors;
      };

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.   value });
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
          sizes: formData.sizes.split(",").map(s => parseInt(s. trim(), 10))
        };

        if (isEdit) {
          await axios.put(`https://6815f68a32debfe95dbcf4e4.    mockapi.io/products/${id}`, payload);
        } else {
          await axios.post("https://6815f68a32debfe95dbcf4e4.   mockapi.io/products", payload);
        }

        navigate("/");
      };

      return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "500px",   margin: "0 auto" }}>
          <h2>{isEdit ? "Редактировать товар" : "Добавить товар"}   </h2>
          <input name="name" placeholder="Название" value=  {formData.name} onChange={handleChange} />
          {errors.name && <p style={{ color: "red" }}>{errors.  name}</p>}

          <input name="price" placeholder="Цена" value={formData.   price} onChange={handleChange} />
          {errors.price && <p style={{ color: "red" }}>{errors. price}</p>}

          <input name="image" placeholder="URL изображения" value=  {formData.image} onChange={handleChange} />
          {errors.image && <p style={{ color: "red" }}>{errors. image}</p>}

          <input name="category" placeholder="Категория" value= {formData.category} onChange={handleChange} />
          <input name="sizes" placeholder="Размеры (через запятую)  " value={formData.sizes} onChange={handleChange} />

          <textarea name="description" placeholder="Описание"   value={formData.description} onChange={handleChange} />
          <button type="submit">{isEdit ? "Сохранить" :     "Добавить"}</button>
        </form>
      );
    }

    export default ProductForm;
   ```
### Задание 4. Отправка данных на сервер

1. При отправке формы:
   1. Выполняю POST-запрос на `https://<your-project>.mockapi.io/products`, с введёнными данными.
   2. Использую библиотеку `axios` для выполнения запроса.
   ```jsx
    import axios from "axios";
   ```
   ```jsx
    await axios.post("https://6815f68a32debfe95dbcf4e4.mockapi.io/products", payload);
   ```
2. После успешного добавления товара:
   Перенаправляю пользователя на страницу со списком товаров
   ```jsx
    navigate("/");
   ```
3. После обновления пользователь видит добавленный товар.

### Задание 6. _Дополнительное задание_. Редактирование товара

Редактирование товара:

   1. Для каждого товара добавила кнопку Редактировать.
   ```jsx
      <div style={{ marginTop: "10px" }}>
        <Link to={`/edit/${coffee.id}`}>
          <button>✏️ Редактировать</button>
        </Link>
      </div>
   ```
   2. При нажатии отображаю форму, в которую подставляются текущие значения товара.
   ```jsx
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
   ```
   3. При сохранении выполняю `PUT-запрос` к API.
   ```jsx
        if (isEdit) {
        await axios.put(`https://6815f68a32debfe95dbcf4e4.mockapi.io/products/${id}`, payload);
        }
   ```
   4. После успешного изменения — обновляю отображение товара в списке.
   5. Реализую проверку, чтобы форма редактирования имела ту же валидацию, что и форма добавления.
   ```jsx
    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Введите название";
        if (!formData.price || isNaN(formData.price)) newErrors.price = "Цена должна быть числом";
        if (!formData.image) newErrors.image = "Введите URL изображения";
        return newErrors;
    };
   ```
### Задание 7. Документация проекта

1. Код задокументирован в соответствии со стандартами JSDoc.

## Контрольные вопросы

1. Что такое клиентская валидация и какова её роль в веб-приложениях?<br>
Клиентская валидация — это проверка данных прямо в браузере пользователя до отправки формы на сервер. Её роль — предотвратить отправку пустых или неверных полей, улучшить удобство для пользователя и снизить нагрузку на сервер.
2. Что такое API и как он работает?<br>
API это способ, с помощью которого разные программы обмениваются данными. API позволяет клиенту отправлять запросы на сервер и получать ответы. API работает по определённым правилам, чаще всего через HTTP-запросы: GET — чтобы получить данные, POST — чтобы добавить, PUT — обновить, DELETE — удалить.
3. Что такое REST API. В чём разница между понятием API и REST API?<br>
REST API — это вид API, который работает по принципам REST (определённые правила архитектуры). Он использует стандартные HTTP-запросы (GET, POST, PUT, DELETE) и работает с ресурсами, представленными как URL-адреса. Разница в том, что API — это общее понятие любого интерфейса для взаимодействия программ, а REST API — это конкретный способ построения такого интерфейса с помощью правил REST.
4. Как организовать загрузку данных с сервера при монтировании компонента?<br>
Чтобы загрузить данные с сервера при монтировании компонента, используют хук useEffect. Внутри него делают GET-запрос с помощью axios или fetch, и полученные данные сохраняют в useState. 
