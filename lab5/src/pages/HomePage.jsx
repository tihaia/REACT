import CoffeeList from "../components/CoffeeList";
import Search from "../components/Search";
import Slider from "../components/Slider";
import { useState } from "react";

/**
 * Главная страница — отображает список товаров и поиск.
 * @component
 */
function HomePage() {
  const [query, setQuery] = useState("");

  return (
    <div>
      <Slider />
      <CoffeeList searchQuery={query} />
    </div>
  );
}

export default HomePage;
