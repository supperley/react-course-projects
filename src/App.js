import React from 'react';
import Header from './components/Layout/Header.js';

const App = () => {
    return (
        <React.Fragment>
            <Header />
            <main>
                <Meals></Meals>
            </main>
        </React.Fragment>
    );
};

export default App;
