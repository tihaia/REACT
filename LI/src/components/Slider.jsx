import { useState, useEffect } from "react";
import "../styles/Slider.css";

/**
 * Компонент Slider отображает слайды с актуальными акциями.
 * Каждые 4 секунды происходит автоматический переход к следующему слайду.
 * Также можно переключать слайды вручную с помощью кнопок "←" и "→".
 *
 * @component
 * @example
 * return <Slider />
 */
const slides = [
  "Скидка 10% на коктейли до 18:00!",
  "Попробуйте наш авторский 'Мохито Бар' 🍃",
  "Новинка: Фруктовый Бум с ананасом и льдом!"
];

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  /**
   * Переход к следующему слайду (циклично).
   */
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  /**
   * Переход к предыдущему слайду (циклично).
   */
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slider">
      <button onClick={prevSlide}>←</button>
      <span>{slides[currentSlide]}</span>
      <button onClick={nextSlide}>→</button>
    </div>
  );
}

export default Slider;
