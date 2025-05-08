import "../styles/Footer.css"; 

/**
 * Компонент Footer отображает информацию о копирайте и ссылку на репозиторий.
 *
 * @returns {JSX.Element} Футер с текстом и ссылкой на GitHub.
 */
function Footer() {
    return (
      <footer className="footer">
        <p className="text">© 2025 Все права защищены</p>
        <a href="https://github.com/tihaia/REACT" target="_blank" rel="noopener noreferrer" className="footer-link">Ссылка на Github</a>
      </footer>
    );
  }
  
  export default Footer;