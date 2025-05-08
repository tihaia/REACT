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

###  Добавление нового телефона

```js
await axios.post(API_URL, payload);
```

###  Редактирование и удаление существующего телефона

```js
await axios.put(`${API_URL}/${id}`, payload); 
await axios.delete(`${API_URL}/${id}`); 
```

### ↕ Сортировка (по цене, по имени)

```js
sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)); 
sorted.sort((a, b) => a.name.localeCompare(b.name)); 
```

###  Фильтрация по категориям (Флагман, Бюджетный, Складной)

```js
const filtered = phones.filter((p) => p.category === selected);
```

###  Поиск по названию и описанию

```js
const filtered = phones.filter(
  (phone) =>
    phone.name.toLowerCase().includes(lower) ||
    phone.description.toLowerCase().includes(lower)
);
```

###  Корзина с подсчетом общей суммы (Redux)

```js
const total = cart.reduce((sum, p) => sum + parseFloat(p.price), 0).toFixed(2);
```

###  Страница отзывов с формой добавления

```js
<form onSubmit={handleSubmit} className="review-form">...
```

###  Адаптивная сетка и приятный интерфейс

```css
.phone-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}
```

---

## ℹ️ Технологии

* React 18
* React Router DOM
* Redux Toolkit
* Axios
* Lodash.debounce
* MockAPI ([https://mockapi.io](https://mockapi.io))
* CSS (ручная стилизация, без фреймворков)

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

## 🌐 Примеры интерфейса

* Главная страница:
  ![alt text](image.png)
* Форма добавления:
  ![alt text](image-1.png)
* Корзина:
 ![alt text](image-2.png)
* Отзывы:
![alt text](image-3.png)
---


##  Источники и ресурсы

* [https://reactjs.org/](https://reactjs.org/)
* [https://redux-toolkit.js.org/](https://redux-toolkit.js.org/)
* [https://axios-http.com](https://axios-http.com)
* [https://mockapi.io](https://mockapi.io)
* [https://lodash.com/docs/4.17.15#debounce](https://lodash.com/docs/4.17.15#debounce)

---

##  Дополнительно

* Корзина реализована через Redux Toolkit с сохранением в localStorage
* Все данные загружаются и синхронизируются с MockAPI
* Приложение оптимизировано для настольных и мобильных устройств
* Код снабжен JSDoc для лучшего понимания