import React, { useContext, useState } from 'react';
import styles from './Cart.module.css';
import Modal from '../UI/Modal.js';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import SubmitOrder from './SubmitOrder';

const Cart = (props) => {
    const cartContext = useContext(CartContext);

    const [isSubmitOrderAvailable, setIsSubmitOrderAvailable] = useState(false);
    const [isDataSubmitting, setIsDataSubmitting] = useState(false);
    const [wasDataSendingSuccessful, setWasDataSendingSuccessful] =
        useState(false);

    const totalAmount = `$${Math.abs(cartContext.totalAmount).toFixed(2)}`;
    const hasItems = cartContext.items.length > 0;

    const removeCartItemHandler = (id) => {
        cartContext.removeItem(id);
    };

    const addCartItemHandler = (item) => {
        cartContext.addItem({ ...item, amount: 1 });
    };

    const orderHandler = () => {
        setIsSubmitOrderAvailable(true);
    };

    const submitOrderHandler = async (userData) => {
        setIsDataSubmitting(false);

        const response = await fetch(
            'https://react-course-http-6e306-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
            {
                method: 'POST',
                body: JSON.stringify({
                    user: userData,
                    orderedMeals: cartContext.items,
                }),
            }
        );

        if (!response.ok) {
            throw new Error('Что-то пошло не так!');
        }

        setIsDataSubmitting(false);
        setWasDataSendingSuccessful(true);
        cartContext.clearCart();
    };

    const cartItems = (
        <ul className={styles['cart-items']}>
            {cartContext.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onAdd={addCartItemHandler.bind(null, item)}
                    onRemove={removeCartItemHandler.bind(null, item.id)}
                />
            ))}
        </ul>
    );

    const modalButtons = (
        <div className={styles.actions}>
            <button
                className={styles['button--alt']}
                onClick={props.onHideCart}
            >
                Закрыть
            </button>
            {hasItems && (
                <button className={styles.button} onClick={orderHandler}>
                    Заказать
                </button>
            )}
        </div>
    );

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={styles.total}>
                <span>Итого</span>
                <span>{totalAmount}</span>
            </div>
            {isSubmitOrderAvailable && (
                <SubmitOrder
                    onSubmit={submitOrderHandler}
                    onCancel={props.onHideCart}
                />
            )}
            {!isSubmitOrderAvailable && modalButtons}
        </React.Fragment>
    );

    const dataSubmittingCartModalContent = <p>Отправка данных заказа...</p>;

    const dataWasSubmittedCartModalContent = (
        <React.Fragment>
            <p>Ваш заказ успешно отправлен!</p>
            <div className={styles.actions}>
                <button
                    className={styles['button--alt']}
                    onClick={props.onHideCart}
                >
                    Закрыть
                </button>
            </div>
        </React.Fragment>
    );

    return (
        <Modal onHideCart={props.onHideCart}>
            {!isDataSubmitting && !wasDataSendingSuccessful && cartModalContent}
            {isDataSubmitting && dataSubmittingCartModalContent}
            {wasDataSendingSuccessful && dataWasSubmittedCartModalContent}
        </Modal>
    );
};

export default Cart;
