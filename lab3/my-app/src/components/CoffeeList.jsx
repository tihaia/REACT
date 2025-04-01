import { useState, useEffect } from "react";
import coffeeData from "../data/coffee.json";
import CoffeeCard from "./CoffeeCard";
import "../styles/CoffeeList.css";

/**
 * Компонент отображает список кофейных напитков с фильтрацией по названию.
 *
 * @param {string} searchQuery - Текст для поиска.
 * @returns {JSX.Element} Список карточек кофейных напитков.
 */
function CoffeeList({ searchQuery }) {
  const [coffees, setCoffees] = useState([]);

  useEffect(() => {
    setCoffees(coffeeData);
  }, []);

  // Фильтрация списка кофе
  const filteredCoffees = coffees.filter((coffee) =>
    coffee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="coffee-list">
      {filteredCoffees.map((coffee) => (
        <CoffeeCard key={coffee.id} coffee={coffee} />
      ))}
    </div>
  );
}

export default CoffeeList;
