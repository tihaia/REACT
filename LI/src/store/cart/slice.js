import { createSlice } from '@reduxjs/toolkit';

/**
 * Загружает корзину из localStorage.
 * @returns {{ items: Array, totalQuantity: number }}
 */
const loadCartFromLocalStorage = () => {
  try {
    const data = localStorage.getItem('cart');
    const parsed = data ? JSON.parse(data) : null;
    if (parsed && Array.isArray(parsed.items)) {
      return parsed;
    }
    return { items: [], totalQuantity: 0 };
  } catch (error) {
    console.warn('Ошибка при загрузке корзины из localStorage:', error);
    return { items: [], totalQuantity: 0 };
  }
};

/**
 * Сохраняет корзину в localStorage.
 * @param {Object} state
 */
const saveCartToLocalStorage = (state) => {
  try {
    localStorage.setItem('cart', JSON.stringify(state));
  } catch (error) {
    console.warn('Ошибка при сохранении корзины в localStorage:', error);
  }
};

const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = state.items.find(
        (i) => i.id === action.payload.id && i.size === action.payload.size
      );

      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.totalQuantity = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      saveCartToLocalStorage(state);
    },

    removeFromCart(state, action) {
      const { id, size } = action.payload;
      const index = state.items.findIndex(
        (i) => i.id === id && i.size === size
      );
      if (index !== -1) {
        state.totalQuantity -= state.items[index].quantity;
        state.items.splice(index, 1);
      }

      saveCartToLocalStorage(state);
    },

    updateQuantity(state, action) {
      const { id, size, quantity } = action.payload;
      const item = state.items.find(
        (i) => i.id === id && i.size === size
      );
      if (item) {
        state.totalQuantity += quantity - item.quantity;
        item.quantity = quantity;
      }

      saveCartToLocalStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
