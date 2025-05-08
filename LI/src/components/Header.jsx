import "../styles/Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItemsCount } from "../store/cart/actions";

/**
 * Компонент Header отображает шапку сайта с поиском и навигацией.
 *
 * @param {Function} onSearch Функция для обработки поиска.
 * @returns {JSX.Element} Шапка с названием, поиском и меню навигации.
 */
function Header({ onSearch }) {
  const totalQuantity = useSelector(selectCartItemsCount);

  return (
    <header className="header">
      <h1 className="title">Tanya's Bar</h1>
      <nav className="nav">
        <Link to="/" className="link">Главная</Link>
        <Link to="/cart" className="link">
          Корзина{totalQuantity > 0 ? ` (${totalQuantity})` : ""}
        </Link>
        <Link to="/about" className="link">Найти нас</Link>
        <Link to="/add" className="link">Добавить товар</Link>
      </nav>
    </header>
  );
}

export default Header;
