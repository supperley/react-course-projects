import React from 'react';
import Header from './components/Layout/Header.js';
import Meals from './components/Meals/Meals.js';
import Cart from './components/Cart/Cart.js';

const App = () => {
    return (
        <React.Fragment>
            <Cart />
            <Header />
            <main>
                <Meals />
            </main>
        </React.Fragment>
    );
};

export default App;
