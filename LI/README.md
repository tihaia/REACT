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

1. Установка зависимости

```bash
npm install
```
2. Установленные библиотеки

- react
- react-dom
- react-router-dom
- redux
- @reduxjs/toolkit
- react-redux
- axios
- lodash.debounce

3.  Запустить проект в режиме разработки

```bash
npm run dev
```

4. Открыть в браузере
```bash
http://localhost:5173
```
---
## Визуал
1. Главная страница 
![image](https://github.com/user-attachments/assets/4be58d92-3a37-4d9b-9b4f-acffa9e0bfa8)
2. Карточки товара
![image](https://github.com/user-attachments/assets/126ae268-e7a6-428a-8958-44e948b94f6a)
3. Корзина
![image](https://github.com/user-attachments/assets/aea7c4c9-64cf-4e7a-a155-d6ba04324cc6)
4. Форма добавления
![image](https://github.com/user-attachments/assets/c3ec14cc-19fe-4cc2-b761-8e3bdd9e3ca5)
5. Адаптивность под меньшие форматы 
![image](https://github.com/user-attachments/assets/a716da67-bbd2-4bcc-9e02-00ea994bb138)


##  Источники

* [https://reactjs.org/](https://reactjs.org/)
* [https://redux-toolkit.js.org/](https://redux-toolkit.js.org/)
* [https://mockapi.io](https://mockapi.io)

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

* Адаптивный дизайн — сайт удобно использовать на компьютере, планшете и смартфоне.
* Сохранение корзины в localStorage — товары не пропадают при перезагрузке страницы.
* Структура проекта разделена по компонентам и страницам для удобства поддержки.
* Обработка ошибок при загрузке данных и отправке форм.
* MockAPI используется как фейковый бэкенд с возможностью визуального редактирования данных.
