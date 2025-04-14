import "../styles/Header.css";
import Search from "./Search";
import { Link } from "react-router-dom"; // ✅ Добавили Link

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
        <Link to="/" className="link">Главная</Link>
        <Link to="/cart" className="link">Корзина</Link>
        <Link to="/about" className="link">Найти нас</Link>
        <Search onSearch={onSearch} />
      </nav>
    </header>
  );
}

export default Header;
