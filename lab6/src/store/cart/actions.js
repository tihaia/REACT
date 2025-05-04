/**
 * Селектор корзины.
 * @param {Object} state
 * @returns {Object}
 */
export const selectCart = (state) => state.cart;

/**
 * Селектор общего количества товаров в корзине.
 * @param {Object} state
 * @returns {number}
 */
export const selectCartItemsCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

/**
 * Селектор всех товаров в корзине.
 * @param {Object} state
 * @returns {Array}
 */
export const selectCartItems = (state) => state.cart.items;
