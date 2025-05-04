import { createSlice } from '@reduxjs/toolkit';

/**
 * Загружает сохранённое состояние корзины из localStorage.
 * @returns {{ items: Array, totalQuantity: number } | null}
 */
const loadCartFromLocalStorage = () => {
  try {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.warn('Ошибка при загрузке корзины из localStorage:', error);
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
    console.warn('Ошибка при сохранении корзины в localStorage:', error);
  }
};

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
      const item = state.items.find(i => i.id === action.payload.id);
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
      const index = state.items.findIndex(i => i.id === action.payload);
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
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        state.totalQuantity += action.payload.quantity - item.quantity;
        item.quantity = action.payload.quantity;
      }
      saveCartToLocalStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
