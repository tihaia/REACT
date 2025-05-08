import { useState, useEffect } from "react";
import axios from "axios";
import CocktailCard from "./CocktailCard";
import "../styles/CocktailList.css";

const API_URL = "https://6815f68a32debfe95dbcf4e4.mockapi.io/products";

/**
 * Компонент списка коктейлей с фильтрацией, сортировкой и поиском.
 */
function CocktailList({ searchQuery, setSearchQuery }) {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [category, setCategory] = useState("");

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setCocktails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки данных:", err);
        setLoading(false);
      });
  }, []);

  const filteredCocktails = cocktails
    .filter(
      (cocktail) =>
        cocktail.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (category ? cocktail.category.toLowerCase() === category.toLowerCase() : true)
    )
    .sort((a, b) => {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div>
      {/* Контейнер для фильтров, поиска и сортировки */}
      <div className="controls">
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Сортировать по возрастанию</option>
          <option value="desc">Сортировать по убыванию</option>
        </select>

        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="">Все категории</option>
          <option value="Безалкогольный">Безалкогольный</option>
          <option value="Фруктовый">Фруктовый</option>
          <option value="Экзотический">Экзотический</option>
          <option value="Алкогольный">Алкогольный</option>
          <option value="Десертный">Десертный</option>
        </select>

        <button
          onClick={() => {
            setSortOrder("asc");
            setCategory("");
            setSearchQuery("");
          }}
        >
          Очистить фильтры
        </button>
      </div>

      <div className="cocktail-list">
        {filteredCocktails.map((cocktail) => (
          <CocktailCard key={cocktail.id} cocktail={cocktail} />
        ))}
      </div>
    </div>
  );
}

export default CocktailList;
