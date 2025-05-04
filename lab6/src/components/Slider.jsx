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
  "Скидка 10% на кофе до 9:00!",
  "Бесплатный вайфай в кафе",
  "Новинка: Айс Латте с карамелью!"
];

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  /**
   * Функция для перехода к следующему слайду.
   * Переходит к следующему слайду, используя цикличность (возвращается к первому слайду после последнего).
   */
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  /**
   * Функция для перехода к предыдущему слайду.
   * Переходит к предыдущему слайду, используя цикличность (возвращается к последнему слайду после первого).
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
