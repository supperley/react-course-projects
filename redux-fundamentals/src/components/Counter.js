import classes from "./Counter.module.css";

const Counter = () => {
  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Счётчик</h1>
      <div className={classes.value}>0</div>
      <button onClick={toggleCounterHandler}>Спрятать / Показать</button>
    </main>
  );
};

export default Counter;
