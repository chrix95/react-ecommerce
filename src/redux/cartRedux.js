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
            const { _id, price, quantity } = action.payload;
            // tutorial
            // state.quantity += 1;
            // state.products.push(action.payload);
            // state.total += price * quantity;
            // end tutorial
            // mine
            const productExists = state.products.find(p => p._id === _id);
            if (productExists) {
                state.total -= productExists.quantity * price; 
                productExists.quantity = quantity;
                state.total += quantity * price; 
            } else {
                state.products = [...state.products, action.payload];
                state.total += quantity * price;
                state.quantity += 1
            }
        }
    }
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;