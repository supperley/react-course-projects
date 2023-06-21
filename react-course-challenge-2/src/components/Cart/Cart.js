import React from 'react';
import styles from './Cart.module.css';

const Cart = () => {
    const cartItems = [{}].map((item) => <li>item.name</li>);

    return (
        <Modal>
            <ul className={styles['cart-items']}>{cartItems}</ul>
            <div className={styles.total}>
                <span>Итого</span>
                <span>49.99</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']}>Закрыть</button>
                <button className={styles.button}>Заказать</button>
            </div>
        </Modal>
    );
};

export default Cart;
