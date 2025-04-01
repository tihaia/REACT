import { useState, useEffect } from "react";
import coffeeData from "../data/coffee.json";
import CoffeeCard from "./CoffeeCard";
import Search from "./Search";
import "../styles/CoffeeList.css";

/**
 * Компонент отображает список кофейных напитков с фильтрацией по названию.
 * Список обновляется при вводе текста в поле поиска.
 *
 * @returns {JSX.Element} Список карточек кофейных напитков.
 */
function CoffeeList() {
  const [coffees, setCoffees] = useState([]);
  const [filteredCoffees, setFilteredCoffees] = useState([]);

  useEffect(() => {
    setCoffees(coffeeData);
    setFilteredCoffees(coffeeData);
  }, []);

    /**
   * Функция фильтрует напитки по запросу.
   * @param {string} query - Текст для поиска.
   */
  const handleSearch = (query) => {
    const lower = query.toLowerCase();
    const filtered = coffees.filter((coffee) =>
      coffee.name.toLowerCase().includes(lower)
    );
    setFilteredCoffees(filtered);
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      <div className="coffee-list">
        {filteredCoffees.map((coffee) => (
          <CoffeeCard key={coffee.id} coffee={coffee} />
        ))}
      </div>
    </div>
  );
}

export default CoffeeList;
