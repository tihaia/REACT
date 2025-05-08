#  Меню коктейлей заведения (React + Redux)

##  Описание проекта

Бар с коктейлями — это клиентская часть веб-приложения, разработанная с использованием React. Пользователь может просматривать список коктейлей, фильтровать по категориям, сортировать по цене, выполнять поиск по названию, добавлять новые коктейли, редактировать и удалять существующие. Также реализована корзина с использованием Redux Toolkit и страница с детальной информацией о каждом коктейле.

Цель проекта: Проект создан для отработки навыков разработки на React и включает в себя:

* Работа с REST API (mockapi.io)
* CRUD-операции
* Валидация форм
* Глобальное состояние с Redux
* Адаптивная верстка
*  Маршрутизация через React Router

---

##  Основные функции (с кодом)

###  Просмотр списка телефонов

```js
{filteredPhones.map((phone) => (
  <PhoneCard key={phone.id} phone={phone} onAdd={() => handleAddToCart(phone)} />
))}
```

###  Просмотр списка коктейлей

```js
{filteredCocktails.map((cocktail) => (
  <CocktailCard key={cocktail.id} cocktail={cocktail} />
))}

```

###  Добавление нового коктейля

```js
await axios.post(API_URL, payload);
```

### Редактирование и удаление коктейля

```js
await axios.put(`${API_URL}/${id}`, payload); 
await axios.delete(`${API_URL}/${id}`); 
```

###  Сортировка по цене

```js
sorted.sort((a, b) => a.price - b.price);
```

###  Фильтрация по категориям (Фруктовый, Безалкогольный, Десертный…)

```js
const filtered = cocktails.filter((c) => c.category === selectedCategory);
```

###  Поиск по названию и описанию

```js
const filtered = cocktails.filter(
  (c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.description.toLowerCase().includes(query.toLowerCase())
);
```

###  Корзина с подсчётом суммы (Redux Toolkit)

```js
const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
```

###  Адаптивная сетка

```css
.cocktail-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
---

##  Установка и запуск

1. → Склонировать репозиторий

```bash
git clone https://github.com/your-username/phone-store-react.git
cd my-phone-app
```

2. → Установить зависимости

```bash
npm install
```

3. → Запустить проект локально

```bash
npm run dev
```

4. → Открыть в браузере: `http://localhost:5173`
---


##  Источники и ресурсы

* [https://reactjs.org/](https://reactjs.org/)
* [https://redux-toolkit.js.org/](https://redux-toolkit.js.org/)
* [https://axios-http.com](https://axios-http.com)
* [https://mockapi.io](https://mockapi.io)
* [https://lodash.com/docs/4.17.15#debounce](https://lodash.com/docs/4.17.15#debounce)

---
### Было использовано
1. React 18 — библиотека для создания интерфейсов
2. React Router DOM — маршрутизация между страницами (меню, карточка коктейля, форма и т.д.)
3. Redux Toolkit — управление глобальным состоянием (корзина)
4. Axios — HTTP-запросы к API
5. Lodash.debounce — оптимизация поиска по названию
6. MockAPI (https://mockapi.io) — онлайн-сервис для имитации backend-а
7. CSS — ручная стилизация без фреймворков (адаптивные карточки, сетка, кнопки)

##  Дополнительно

* Корзина реализована через Redux Toolkit с сохранением в localStorage
* Все данные загружаются и синхронизируются с MockAPI
* Приложение оптимизировано для настольных и мобильных устройств
* Код снабжен JSDoc для лучшего понимания
