import { useSelector } from 'react-redux';

import classes from './Counter.module.css';

const Counter = () => {
    const counter = useSelector((state) => state.counter);

    const toggleCounterHandler = () => {};

    return (
        <main className={classes.counter}>
            <h1>Счётчик</h1>
            <div className={classes.value}>{counter}</div>
            <button onClick={toggleCounterHandler}>Спрятать / Показать</button>
        </main>
    );
};

export default Counter;
