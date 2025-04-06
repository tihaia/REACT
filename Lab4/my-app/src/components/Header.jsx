import "../styles/Header.css";
import Search from "./Search";

/**
 * Компонент Header отображает шапку сайта с поиском и навигацией.
 *
 * @param {Function} onSearch Функция для обработки поиска.
 * @returns {JSX.Element} Шапка с названием, поиском и меню навигации.
 */
function Header({ onSearch }) {
  return (
    <header className="header">
      <h1 className="title">Tanya's Coffee</h1>
      <nav className="nav">
        <a href="#" className="link">Главная</a>
        <a href="#menu" className="link">Меню</a>
        <a href="#contacts" className="link">Найти нас</a>
        <Search onSearch={onSearch} />
      </nav>
    </header>
  );
}

export default Header;
