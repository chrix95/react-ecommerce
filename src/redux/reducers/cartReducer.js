import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            const { _id, price, quantity, size, color } = action.payload;
            const productExists = state.products.find(p => p._id === _id);
            if (productExists) {
                state.total -= productExists.quantity * price; 
                productExists.quantity = quantity;
                productExists.size = size;
                productExists.color = color;
                state.total += quantity * price; 
            } else {
                state.products = [...state.products, action.payload];
                state.total += quantity * price;
                state.quantity += 1
            }
        },
        removeProduct: (state, action) => {
            state.total -= state.products.find(p => p._id === action.payload).quantity * state.products.find(p => p._id === action.payload).price;
            state.products = state.products.filter(p => p._id !== action.payload);
            state.quantity -= 1;
        }
    }
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;