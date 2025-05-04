# Лабораторная работа №6. Глобальное состояние и Redux Toolkit

## Цель работы

Познакомиться с концепцией глобального состояния в React и научиться использовать Redux Toolkit для управления общими данными между компонентами. Научиться добавлять, изменять и удалять товары в корзине с использованием глобального хранилища.

## Условия

Продолжаю разработку интернет-магазина. На этом этапе реализую функциональность корзины товаров с использованием Redux Toolkit. Пользователь должен иметь возможность добавлять товары в корзину из карточки товара, просматривать список добавленных товаров, изменять количество и удалять их.

### Задание 1. Установка и настройка Redux Toolkit

1. Устанавливаю необходимые зависимости:

   ```bash
   npm install @reduxjs/toolkit react-redux
   ```

2. Создаю директорию `src/store/` и добавляю в ней следующие файлы:

   - `store.js` — основной файл для настройки Redux Store.
   - `cart/slice.js` — файл для создания среза состояния корзины.

3. В файле `store.js` настраиваю Redux Toolkit Store:

   ```jsx
    import { configureStore } from '@reduxjs/toolkit';
    import cartReducer from './cart/slice';

    /**
     * Redux Store приложения.
     * Здесь объединяются все редьюсеры.
     */
    export const store = configureStore({
      reducer: {
        cart: cartReducer,
      },
    });
   ```

4. Оберачиваю всё приложение в `Provider` в `main.jsx`.
   ```jsx
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </React.StrictMode>
    );
   ```
### Задание 2. Реализация корзины через Redux Toolkit

1. В `cart/slice.js` создаю слайс с начальными значениями:

   ```jsx
   import { createSlice } from '@reduxjs/toolkit';

    const initialState = loadCartFromLocalStorage() || {
      items: [],
      totalQuantity: 0,
    };

    const cartSlice = createSlice({
      name: 'cart',
      initialState,
      reducers: {
        /**
         * Добавление товара в корзину.
         */
        addToCart(state, action) {
          const item = state.items.find(i => i.id === action.   payload.id);
          if (item) {
            item.quantity += 1;
          } else {
            state.items.push({ ...action.payload, quantity: 1 });
          }
          state.totalQuantity += 1;
          saveCartToLocalStorage(state);
        },

        /**
         * Удаление товара из корзины.
         */
        removeFromCart(state, action) {
          const index = state.items.findIndex(i => i.id ===     action.payload);
          if (index !== -1) {
            state.totalQuantity -= state.items[index].quantity;
            state.items.splice(index, 1);
          }
          saveCartToLocalStorage(state);
        },

        /**
         * Изменение количества товара.
         */
        updateQuantity(state, action) {
          const item = state.items.find(i => i.id === action.   payload.id);
          if (item) {
            state.totalQuantity += action.payload.quantity - item.  quantity;
            item.quantity = action.payload.quantity;
          }
          saveCartToLocalStorage(state);
        },
      },
    });

    export const { addToCart, removeFromCart, updateQuantity } =    cartSlice.actions;
    export default cartSlice.reducer;
   ```
2. Реализовала добавление товара в корзину из компонента `ProductCard`.

   1. Использовала `useDispatch` и `addToCart`
   ```jsx
      const dispatch = useDispatch();
   ```
   2. Использовала существующую кнопку `"Добавить в корзину"`
   ```jsx
    addToCart(state, action) {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
      saveCartToLocalStorage(state);
    },
   ```
3. Взяла существующую страницу `CartPage.jsx`, на которой:
   1. Выводится список товаров из `useSelector(state => state.cart.items)`
   2. Можно _увеличить/уменьшить количество_
    ```jsx
     const increaseQuantity = (id, size) => {
    const item = cartItems.find((i) => i.id === id && i.size === size);
    if (item) {
      dispatch(updateQuantity({ id, size, quantity: item.quantity + 1 }));
    }
  };

  const decreaseQuantity = (id, size) => {
    const item = cartItems.find((i) => i.id === id && i.size === size);
    if (item && item.quantity > 1) {
      dispatch(updateQuantity({ id, size, quantity: item.quantity - 1 }));
    }
  };
    ```
   3. Можно _удалить товар_
   ```jsx
    const handleRemove = (id, size) => {
        dispatch(removeFromCart({ id, size }));
    };
   ```
### Задание 3. Отображение количества товаров в шапке

1. Добавляю в `Header` `Корзина (N)`, где `N` — общее количество товаров.
   ```jsx
    import "../styles/Header.css";
    import Search from "./Search";
    import { Link } from "react-router-dom";
    import { useSelector } from "react-redux";
    import { selectCartItemsCount } from "../store/cart/actions";
    /**
     * Компонент Header отображает шапку сайта с поиском и  навигацией.
     *
     * @param {Function} onSearch Функция для обработки поиска.
     * @returns {JSX.Element} Шапка с названием, поиском и меню     навигации.
     */
    function Header({ onSearch }) {
      const totalQuantity = useSelector(selectCartItemsCount); //

      return (
        <header className="header">
          <h1 className="title">Tanya's Coffee</h1>
          <nav className="nav">
            <Link to="/" className="link">Главная</Link>
            <Link to="/cart" className="link">
              Корзина{totalQuantity > 0 ? ` (${totalQuantity})` :   ""}
            </Link>
            <Link to="/about" className="link">Найти нас</Link>
            <Search onSearch={onSearch} />
          </nav>
        </header>
      );
    }

    export default Header;
   ```
2. Используйте `useSelector` и `reduce`, чтобы посчитать общее количество товаров в корзине.
   ```jsx
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
   ```
### Задание 4. Отдельный файл для `actions`

Для лучшей структуры проекта и удобства масштабирования рекомендуется разделять слайсы и дополнительные действия (actions).

1. Создаю файл `actions.js` в папке `cart/`.
2. В этот файл помещаю селекторы (например, `selectCart`, `selectCartItemsCount`).
3. Импортирую эти действия и селекторы в нужных местах, например:
   - в `CartPage.jsx`, чтобы отобразить итоговую сумму. Теперь вместо `useSelector(state => state.cart.items)` используйте `useSelector(selectCart)`.
   - в `Header`, чтобы показать количество товаров. Теперь вместо `useSelector(state => state.cart.totalQuantity)` используйте `useSelector(selectCartItemsCount)`.
   ```jsx
       /**
     * Селектор корзины.
     * @param {Object} state
     * @returns {Object}
     */
    export const selectCart = (state) =>    state.cart;

    /**
     * Селектор общего количества товаров в     корзине.
     * @param {Object} state
     * @returns {number}
     */
    export const selectCartItemsCount =     (state) =>
      state.cart.items.reduce((total, item)     => total + item.quantity, 0);

    /**
     * Селектор всех товаров в корзине.
     * @param {Object} state
     * @returns {Array}
     */
    export const selectCartItems = (state) =>   state.cart.items;
   ```
### Задание 4.Сохранение состояния корзины

1. Использую `localStorage` для сохранения состояния корзины.
2. При загрузке приложения проверяю наличие сохранённого состояния и восстановите его в Redux Store.
3. При изменении состояния корзины обновляю `localStorage`.
   ```jsx
       /**
     * Загружает сохранённое состояние корзины из localStorage.
     * @returns {{ items: Array, totalQuantity: number } | null}
     */
    const loadCartFromLocalStorage = () => {
      try {
        const data = localStorage.getItem('cart');
        return data ? JSON.parse(data) : null;
      } catch (error) {
        console.warn('Ошибка при загрузке корзины из    localStorage:', error);
        return null;
      }
    };

    /**
     * Сохраняет текущее состояние корзины в localStorage.
     * @param {Object} state
     */
    const saveCartToLocalStorage = (state) => {
      try {
        localStorage.setItem('cart', JSON.stringify(state));
      } catch (error) {
        console.warn('Ошибка при сохранении корзины в   localStorage:', error);
      }
    };
   ```
### Задание 6. Документация проекта

Весь код задокументирован в соответствии со стандартами JSDoc.

## Контрольные вопросы

1. Что такое глобальное состояние и зачем оно нужно?
Глобальное состояние — это данные, которые доступны всем компонентам приложения. Оно используется, когда нужно, чтобы разные части интерфейса работали с одними и теми же данными. Глобальное состояние удобно использовать, когда данные важны для нескольких частей интерфейса и могут изменяться в процессе работы приложения. 
2. Что такое Redux Toolkit и как он упрощает работу с глобальным состоянием?
Redux Toolkit — это официальная библиотека для работы с Redux, которая упрощает создание и управление глобальным состоянием. Она предоставляет готовые функции и удобные инструменты, чтобы писать меньше кода и не делать одно и то же вручную. 
3. Что такое слайсы и как они помогают организовать код?
Слайсы (slices) — это части глобального состояния, которые отвечают за конкретную область данных, например, за корзину, пользователя или список товаров. Каждый слайс содержит своё начальное состояние, действия (actions) и функции-обработчики (редьюсеры) в одном месте. Это помогает организовать код по смысловым блокам
