import { useState, useEffect } from "react";
import axios from "axios";
import CoffeeCard from "./CoffeeCard";
import "../styles/CoffeeList.css";

/**
 * Компонент отображает список кофейных напитков с фильтрацией и загрузкой с mockapi.io.
 *
 * @param {Object} props
 * @param {string} props.searchQuery - Строка для фильтрации товаров по названию.
 * @returns {JSX.Element}
 */
function CoffeeList({ searchQuery }) {
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://6815f68a32debfe95dbcf4e4.mockapi.io/products")
      .then((res) => {
        setCoffees(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки данных:", err);
        setLoading(false);
      });
  }, []);

  const filteredCoffees = coffees.filter((coffee) =>
    coffee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className="coffee-list">
      {filteredCoffees.map((coffee) => (
        <CoffeeCard key={coffee.id} coffee={coffee} />
      ))}
    </div>
  );
}

export default CoffeeList;
