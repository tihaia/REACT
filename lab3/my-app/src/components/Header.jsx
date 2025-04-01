import "../styles/Header.css";

/**
 * Компонент Header отображает шапку сайта с названием кофейни и навигационными ссылками.
 * Включает заголовок и ссылки для перехода к различным разделам страницы.
 *
 * @returns {JSX.Element} Шапка с названием и меню навигации.
 */
function Header() {
    return (
      <header className="header">
        <h1 className="title">Tanya's Coffee</h1>
        <nav className="nav">
          <a href="#" className="link">Главная</a>
          <a href="#menu" className="link">Меню</a>
          <a href="#contacts" className="link">Найти нас</a>
        </nav>
      </header>
    );
  }
  
  export default Header;