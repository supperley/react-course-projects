import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <h1>Redux</h1>
      <nav>
        <ul>
          <li>
            <a href="/">Главная</a>
          </li>
          <li>
            <a href="/">О нас</a>
          </li>
          <li>
            <a href="/">Контакты</a>
          </li>
          <li>
            <button>Выйти</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
