import { useState } from "react";
import Search from "../components/Search";
import CocktailList from "../components/CocktailList";
import Slider from "../components/Slider";

/**
 * Главная страница — отображает список коктейлей и поиск.
 * @component
 */
function HomePage() {
  const [query, setQuery] = useState(""); // Стейт для поиска

  // Обновление поискового запроса
  const handleSearch = (newQuery) => {
    setQuery(newQuery);
  };

  return (
    <div>
      <Slider />
      <Search onSearch={handleSearch} />
      <CocktailList searchQuery={query} setSearchQuery={setQuery} />
    </div>
  );
}

export default HomePage;
