import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action) {
      state.items = action.payload;
    },
    incrementQuantity(state, action) {
      const { id, color } = action.payload;
      const item = state.items.find(i => i.id === id && i.color === color);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity(state, action) {
      const { id, color } = action.payload;
      const item = state.items.find(i => i.id === id && i.color === color);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(i => !(i.id === id && i.color === color));
        }
      }
    },
    addItem(state, action) {
      const { id, color } = action.payload;
      console.log(action.payload);
      const existingItem = state.items.find(item => item.id === id && item.color === color);
      if (existingItem) {
          existingItem.quantity += action.payload.quantity;
      } else {
          state.items.push({ ...action.payload, quantity: action.payload.quantity });
      }
  },  
  },
});

export const { setCart, incrementQuantity, decrementQuantity, addItem } = cartSlice.actions;
export default cartSlice.reducer;