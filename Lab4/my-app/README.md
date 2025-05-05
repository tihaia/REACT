# Лабораторная работа №4. Маршрутизация в React

## Цель работы

Освоить использование маршрутизации в React с помощью библиотеки React Router. Научиться создавать статические и динамические маршруты, использовать Layout-компоненты и реализовывать валидацию параметров маршрута.

## Условия

Продолжаю разработку приложения интернет-магазина из предыдущей лабораторной работы. Добавляю маршрутизацию с использованием библиотеки `React Router` (_v7_).

### Задание 1. Подготовка среды

1. Установливаю библиотеку React Router:
   ```jsx
   npm install react-router
   ```
### Задание 2. Настройка основных маршрутов

1. Настраиваю статические маршруты в файле `App.jsx` с использованием компонентов `Routes`
   1. Главная страница (`/`) — отображает список всех товаров.
   2. Страница корзины (`/cart`) — отображает список выбранных товаров.
   3. Страница о нас (`/about`) — краткая информация о магазине.
   ```jsx
    /**
     * Основной компонент приложения с маршрутизацией.
     * @component
     */
    function App() {
      return (
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      );
    }

    export default App;
   ```
### Задание 3. Динамические маршруты

1. Создаю страницу для отображения конкретного товара:

   1. Маршрут: `/product/:id` (где `product` — название вашего товара, например _pizza_, а `id` — идентификатор товара).
    ```jsx
    <Route path="product/:id" element={<ProductPage />} />
    ```
   2. Компонент: `ProductPage.jsx` (где `ProductPage` — компонент для отображения информации о товаре).
   3. Используйте динамический параметр `:id` для получения данных о товаре.
   ```jsx

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

      if (isNaN(parsedId)) {
        return <NotFoundPage />;
      }

      const product = coffeeData.find((item) => item.id ===     parsedId);

      if (!product) {
        return <NotFoundPage />;
      }

      return (
        <div>
          <h2>{product.name}</h2>
          <img src={product.image} alt={product.name} style={{  maxWidth: "300px" }} />
          <p>{product.description}</p>
          <p>Цена: {product.price} лей</p>
        </div>
      );
    }

    export default ProductPage;
   ```
### Задание 4. Использование Layout-компонентов

1. Создаю общий Layout для страниц:

   1. Использую компоненты `Header` и `Footer` из предыдущей работы.
   2. Создаю компонент `MainLayout.jsx`, который включает шапку и подвал.

   ```jsx

    import Header from "../components/Header";
    import Footer from "../components/Footer";
    import { Outlet } from "react-router-dom";

    /**
     * Основной layout приложения, включает Header и Footer.
     * @component
     */
    function MainLayout() {
      return (
        <>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </>
      );
    }

    export default MainLayout;
   ```
2. Настройте маршруты с использованием Layout-а
   ```jsx
      <Route path="/" element={<MainLayout />}>
   ```
### Задание 5. Страница 404

1. Создаю компонент-страницу `NotFoundPage.jsx`, который отображает сообщение **"Страница не найдена"**.
   ```jsx
    /**
     * Страница 404 — отображается при  неправильном маршруте.
     * @component
     */
    function NotFoundPage() {
      return <h2>Страница не найдена</h2>;
    }

    export default NotFoundPage;
   ```
2. Использую этот компонент в маршруте `*`, чтобы перехватывать все неверные маршруты.
   ```jsx
    <Route path="*" element={<NotFoundPage />} />
   ```
### Задание 6. Валидация параметров маршрута

1. Добавляю проверку корректности параметров на странице товара (`/product/:id`)
   1. Проверяю, является ли параметр числом.
   ```jsx
    if (isNaN(parsedId)) {
      return <NotFoundPage />;
    }
   ```
   2. Если параметр некорректный, то отображаю компонент `NotFoundPage`.
   ```jsx
    if (!product) {
      return <NotFoundPage />;
    }
   ```
### Задание 7. Документация проекта

1. Код задокументирован в соответствии со стандартами JSDoc.

## Контрольные вопросы

1. Что такое динамические маршруты в React Router и как их использовать?<br>
Динамические маршруты в React Router — это маршруты, которые содержат переменные части. Чтобы использовать их, в компоненте применяют хук useParams(), который позволяет получить это значение и использовать его, например, для загрузки нужного товара.
2. Как реализовать Layout-компоненты в приложении с маршрутизацией?<br>
Реализуются Layout-компоненты через компонент Layout, в котором размещаются общие элементы и специальный элемент <Outlet />. <Outlet /> отображает текущую вложенную страницу.
3. Какие методы проверки параметров маршрута можно использовать?<br>
Можно убедиться, что параметр является числом с помощью parseInt() и isNaN(), или проверить, существует ли объект с таким id в данных. Если параметр неверный или данные не найдены, можно показать страницу 404.
4. Как настроить отображение страницы 404 при некорректном маршруте?<br>
Чтобы настроить страницу 404, нужно создать отдельный компонент, например NotFoundPage, и в маршрутах добавить путь *, который будет срабатывать при любом несуществующем маршруте. Этот путь обычно указывается в самом конце списка маршрутов. 
