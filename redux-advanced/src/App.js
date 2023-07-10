import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { mainActions } from './store/main-slice';
import StatusBarMessage from './components/UI/StatusBarMessage';

let isInitialRunning = true;

function App() {
    const isCartVisible = useSelector((state) => state.main.isCartVisible);
    const cart = useSelector((state) => state.cart);
    const statusMessage = useSelector((state) => state.main.statusMessage);

    const dispatchFunction = useDispatch();

    useEffect(() => {
        const sendCartData = async () => {
            dispatchFunction(
                mainActions.showStatusMessage({
                    status: 'pending',
                    title: 'Отправка Данных',
                    message: 'Данные корзины отправляются на сервер...',
                })
            );
            const response = await fetch(
                'https://react-course-http-6e306-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify(cart),
                }
            );

            if (!response.ok) {
                throw new Error('Ошибка при отправке данных корзины');
            }

            dispatchFunction(
                mainActions.showStatusMessage({
                    status: 'success',
                    title: 'Отправка Данных Успешна',
                    message: 'Данные корзины успешно отправлены на сервер!',
                })
            );
        };

        if (isInitialRunning) {
            isInitialRunning = false;
            return;
        }

        sendCartData().catch((e) => {
            dispatchFunction(
                mainActions.showStatusMessage({
                    status: 'error',
                    title: 'Ошибка Запроса',
                    message: 'Ошибка при отправке данных корзины!',
                })
            );
        });
    }, [cart]);

    return (
        <Fragment>
            {statusMessage && (
                <StatusBarMessage
                    status={statusMessage.status}
                    title={statusMessage.title}
                    message={statusMessage.message}
                />
            )}
            <Layout>
                {isCartVisible && <Cart />}
                <Products />
            </Layout>
        </Fragment>
    );
}

export default App;
