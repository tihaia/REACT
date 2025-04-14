# Лабораторная работа №3
## Цель работы
Освоить использование хуков в React, научиться управлять состоянием компонентов с помощью `useState`, а также
реализовать динамическое рендеринг списка элементов.
## Условия
Разработать приложение "интернет-магазин", где пользователи могут заказать товары. 
Я выбрала тему:
- кофейня
### Задание 1. Подготовка среды
1. Создала новое React-приложение
    - Инициализировала его с помощью `Vite`.
    - В проекте должно быть реализовано минимум четыре компонента:
        - `Header` – отображает название приложения и навигацию.
        - `Footer` – отображает копирайт и ссылку на репозиторий.
        - `CoffeeCard` – отображает карточку компонента с товарами.
        - `CoffeeList` – отображает список товаров, используя компонент ComponentCard  (где `Component` – название товара. Например `PizzaList`).
        - `Search` – осуществляет поиск среди товара.
        - `Slider` – показывает слайдер на странице.
### Задание 2. Создание мок-данных
1. Создала файл `coffee.json` в папке `src/data/`.
2. Заполниkf его тестовыми данными, включающими следующие
   свойства: `id`, `name`, `description`, `price`, `image`, `category`, `sizes`.
```json
  [
    {
        "id": 1,
        "name": "Капучино",
        "description": "Эспрессо с равными частями молока и молочной пены.",
        "price": 30,
        "image": "https://st.depositphotos.com/2363887/2571/i/450/depositphotos_25717699-stock-photo-cappuccino-mug-close-up-with.jpg",
        "category": "Молочный",
        "sizes": [150, 250]
    },
    {
        "id": 2,
        "name": "Мокачино",
        "description": "Капучино с добавлением шоколадного сиропа.",
        "price": 35,
        "image": "https://st.depositphotos.com/1000184/4955/i/450/depositphotos_49553123-stock-photo-coffee-mocha.jpg",
        "category": "Шоколадный",
        "sizes": [200, 300]
    },
    {
        "id": 3,
        "name": "Раф-кофе",
        "description": "Эспрессо с взбитыми сливками, сахаром и ванилью.",
        "price": 45,
        "image": "https://st.depositphotos.com/24643676/53762/i/950/depositphotos_537622278-stock-photo-cappuccino-coffee-lavender-syrup-glass.jpg",
        "category": "Десертный",
        "sizes": [200, 300]
    },
    {
        "id": 7,
        "name": "Карамельный Латте",
        "description": "Мягкий латте с карамельным сиропом и взбитыми сливками.",
        "price": 36,
        "image": "https://st5.depositphotos.com/78064378/70423/i/380/depositphotos_704238822-stock-photo-coffee-einstein-cold-buru-latte.jpg",
        "sizes": [250, 350, 450]
    },
    {
        "id": 8,
        "name": "Кофе Гляссе",
        "description": "Холодный эспрессо с шариком ванильного мороженого.",
        "price": 50,
        "image": "https://st3.depositphotos.com/22341038/36854/i/380/depositphotos_368542664-stock-photo-iced-coffee-poured-cream-isolated.jpg",
        "sizes": [200, 300]
    },
    {
        "id": 9,
        "name": "Айриш Кофе",
        "description": "Крепкий кофе с ирландским виски, сахаром и сливками.",
        "price": 70,
        "image": "https://st3.depositphotos.com/13349494/18499/i/380/depositphotos_184994372-stock-photo-pouring-milk-cup-coffee-isolated.jpg",
        "sizes": [200, 300]
    }
]
```
### Задание 3. Создание базовых компонентов
1. Создала компонент `Header.jsx`, который будет отображать название приложения и навигацию.
2. Создала компонент `Footer.jsx`, который будет отображать копирайт и ссылку на репозиторий.
### Задание 4. Создание компонента списка пицц и рендеринг списка
1. Разработала компонент `CoffeeCard.jsx`, который будет отображать карточку пиццы, включая название, изображение,
   описание, цену и доступные размеры.
```jsx
import React, { useState } from "react";
import "../styles/CoffeeCard.css";

/**
 * Компонент отображает карточку кофейного напитка с возможностью выбора размера.
 *
 * @param {Object} coffee - Кофейный напиток.
 * @param {string} coffee.name - Название напитка.
 * @param {string} coffee.description - Описание напитка.
 * @param {number} coffee.price - Цена напитка.
 * @param {Array} coffee.sizes - Размеры напитка.
 * @param {string} coffee.image - Изображение напитка.
 * 
 * @returns {JSX.Element} Карточка напитка.
 */
function CoffeeCard({ coffee }) {
    const [selectedSize, setSelectedSize] = useState(coffee.sizes[0]);
  
    const handleSizeChange = (size) => {
      setSelectedSize(size);
    };
  
    return (
      <div className="coffee-card">
        <img src={coffee.image} alt={coffee.name} />
        <h2>{coffee.name}</h2>
        <p>{coffee.description}</p>
        <p>{coffee.price} лей</p>
        <div>
          {coffee.sizes.map((size) => (
            <button key={size} onClick={() => handleSizeChange(size)} style={{ backgroundColor: selectedSize === size ? "lightblue" : "" }}>
              {size} мл
            </button>
          ))}
        </div>
        <button>Добавить в корзину</button>
      </div>
    );
  }
  
  export default CoffeeCard;
```

3. Разработала компонент `PizzaList.jsx`, который будет загружать данные из `pizza.json` и отображать список пицц.
```jsx
import { useState, useEffect } from "react";
import coffeeData from "../data/coffee.json";
import CoffeeCard from "./CoffeeCard";
import "../styles/CoffeeList.css";

/**
 * Компонент отображает список кофейных напитков с фильтрацией по названию.
 *
 * @param {string} searchQuery - Текст для поиска.
 * @returns {JSX.Element} Список карточек кофейных напитков.
 */
function CoffeeList({ searchQuery }) {
  const [coffees, setCoffees] = useState([]);

  useEffect(() => {
    setCoffees(coffeeData);
  }, []);

  // Фильтрация списка кофе
  const filteredCoffees = coffees.filter((coffee) =>
    coffee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
### Задание 5. Использование хуков
1. В компоненте `CooffeeCard` добавляю состояние `selectedSize` и метод `handleSizeChange`, который будет обновлять
   выбранный размер кофе. При нажатии на кнопку размера кофе `selectedSize` должен изменятся.
2. Реализую логику выделения активного размера кофе при выборе соответствующей кнопки.
```jsx
function CoffeeCard({ coffee }) {
    const [selectedSize, setSelectedSize] = useState(coffee.sizes[0]);
  
    const handleSizeChange = (size) => {
      setSelectedSize(size);
    };
...
<div>
  {coffee.sizes.map((size) => (
    <button key={size} onClick={() => handleSizeChange(size)} style={{ backgroundColor: selectedSize === size ? "lightblue" : "" }}>
      {size} мл
    </button>
  ))}
</div>
```
3. В` CoffeeList.jsx` добавляю состояние `coffees`, в которое с помощью `useEffect` заносятся данные о пиццах
   из `coffee.json`.
```jsx
import { useState, useEffect } from "react";
import coffeeData from "../data/coffee.json";
import CoffeeCard from "./CoffeeCard";
import "../styles/CoffeeList.css";

function CoffeeList({ searchQuery }) {
  const [coffees, setCoffees] = useState([]);

  useEffect(() => {
    setCoffees(coffeeData);
  }, []);

  // Фильтрация списка кофе
  const filteredCoffees = coffees.filter((coffee) =>
    coffee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
### Задание 6. Реализация слайдера

1. Создаю компонент `Slider.jsx`, который будет находиться сразу под `Header`.
2. Добавляю состояние `currentSlide`, которое будет хранить текущий активный слайд.
3. Реализую кнопки "Назад" и "Вперед" для переключения между слайдами.
4. _Дополнительное задание_. В `useEffect` добавьте автоматическое переключение слайдов каждые **3 секунды**.
```jsx
import { useState, useEffect } from "react";
import "../styles/Slider.css";

/**
 * Компонент Slider отображает слайды с актуальными акциями.
 * Каждые 4 секунды происходит автоматический переход к следующему слайду.
 * Также можно переключать слайды вручную с помощью кнопок "←" и "→".
 *
 * @component
 * @example
 * return <Slider />
 */
const slides = [
  "Скидка 10% на кофе до 9:00!",
  "Бесплатный вайфай в кафе",
  "Новинка: Айс Латте с карамелью!"
];

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  /**
   * Функция для перехода к следующему слайду.
   * Переходит к следующему слайду, используя цикличность (возвращается к первому слайду после последнего).
   */
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  /**
   * Функция для перехода к предыдущему слайду.
   * Переходит к предыдущему слайду, используя цикличность (возвращается к последнему слайду после первого).
   */
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slider">
      <button onClick={prevSlide}>←</button>
      <span>{slides[currentSlide]}</span>
      <button onClick={nextSlide}>→</button>
    </div>
  );
}

export default Slider;
```
### Задание 6. _Дополнительное задание_. Реализация поиска пиццы

1. Создаю компонент `Search.jsx`, который будет содержать поле ввода для поиска.
2. Передаю в `Search` функцию обработчик `onSearch`, которая будет обновлять состояние списка пицц в `PizzaList`.
```jsx
/**
 * Компонент Search предоставляет поле ввода для поиска кофейных напитков.
 * При изменении текста в поле вызывает функцию обратного вызова `onSearch`, передавая введённое значение.
 *
 * @param {Function} onSearch Функция для обработки изменения текста поиска.
 *
 * @returns {JSX.Element} Поле ввода для поиска с placeholder.
 */
function Search({ onSearch }) {
    const handleSearchChange = (e) => {
      onSearch(e.target.value);
    };
  
    return (
      <input type="text" placeholder="Поиск...🔍" onChange={handleSearchChange}/>
    );
  }
  
  export default Search;
```
### Задание 7. Документация проекта
Код задоументирован в соответствии со стандартами JSDoc.
## Контрольные вопросы
1. Как использовать `useState` для управления состоянием?
Чтобы использовать `useState`, нужно импортировать его из React и вызвать внутри функционального компонента. Он принимает начальное значение и возвращает массив с текущим значением и функцией для его обновления. Например: `const [count, setCount] = useState(0);`. Здесь `count` — это состояние, а `setCount` позволяет изменить его, например: `setCount(count + 1)`.
2. Как работает `useEffect`?
useEffect — это хук в React, который позволяет выполнять побочные эффекты в функциональных компонентах, например, запросы к серверу, подписки или изменение заголовка страницы. Он запускается после рендера компонента.
Хук принимает два аргумента: функцию с эффектом и необязательный массив зависимостей. Если массив пустой, эффект выполнится один раз при монтировании. Если указать зависимости, эффект будет запускаться при их изменении.
3. С помощью какого метода можно рендерить списки элементов в React?
В React для рендеринга списков элементов используется метод map(). Он позволяет пройти по массиву данных и для каждого элемента создать компонент или элемент JSX.
