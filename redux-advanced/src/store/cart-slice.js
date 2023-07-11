import { createSlice } from '@reduxjs/toolkit';
import { mainActions } from './main-slice';

const initialState = {
    items: [],
    itemsQuantity: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(
                (item) => item.id === newItem.id
            );
            state.itemsQuantity++;
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    title: newItem.title,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice =
                    existingItem.price * existingItem.quantity;
            }
        },
        removeItem(state, action) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            state.itemsQuantity--;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter((item) => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice =
                    existingItem.totalPrice - existingItem.price;
            }
        },
        // updateCart(state, action) {
        //   state.items = action.payload.items;
        //   state.itemsQuantity = action.payload.itemsQuantity;
        // },
    },
});

export const sendCartData = (cartData) => {
    return async (dispatchAction) => {
        dispatchAction(
            mainActions.showStatusMessage({
                status: 'pending',
                title: 'Отправка Данных',
                message: 'Данные корзины отправляются на сервер...',
            })
        );

        const sendHttpRequest = async () => {
            const response = await fetch(
                'https://react-course-http-6e306-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify(cartData),
                }
            );

            if (!response.ok) {
                throw new Error('Ошибка при отправке данных корзины');
            }
        };

        try {
            await sendHttpRequest();

            dispatchAction(
                mainActions.showStatusMessage({
                    status: 'success',
                    title: 'Отправка Данных Успешна',
                    message: 'Данные корзины успешно отправлены на сервер!',
                })
            );
        } catch (error) {
            dispatchAction(
                mainActions.showStatusMessage({
                    status: 'error',
                    title: 'Ошибка Запроса',
                    message: 'Ошибка при отправке данных корзины!',
                })
            );
        }
    };
};

export const cartActions = cartSlice.actions;
export default cartSlice;
