import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';

function App() {
    const isCartVisible = useSelector((state) => state.main.isCartVisible);
    const dispatchAction = useDispatch();

    return (
        <Layout>
            {isCartVisible && <Cart />}
            <Products />
        </Layout>
    );
}

export default App;
