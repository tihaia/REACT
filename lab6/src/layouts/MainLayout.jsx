
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

/**
 * Основной layout приложения, включает Header и Footer.
 * @component
 */
function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
