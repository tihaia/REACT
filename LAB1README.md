# Лабораторная работа №1
# Цель работы
Познакомиться с библиотекой React, изучить основные концепции, научиться создавать и запускать React-приложение.
# Задание 1. Подготовка рабочего окружения
NodeJS уже был установлен на компьютере после прохождения курса по JavaScript. В командной строке выполнила команду - npm create vite@latest my-app. Выбрала следующие параметры - Framework: React, Variant: JavaScript. Запустила сервер разработки npm run dev.
# Задание 2. Создание компонентов в React. Основа JSX
В файле Header.jsx создаю функциональный компонент Header, который возвращает JSX-разметку с заголовком:
```jsx
export default function Header() {
    return (
      <header>
        <h1>Mini-Blog</h1>
      </header>
    );
   }
```
В файле Footer.jsx создаю функциональный компонент Footer, который возвращает JSX-разметку с подвалом:
```jsx
export default function Footer() {
    return (
      <footer>
        <p>© {(new Date().getFullYear())}</p>
      </footer>
    );
   }
```
В файле Article.jsx создаю функциональный компонент Article, который возвращает JSX-разметку с заголовком и текстом статьи:
```jsx
export default function Article({title, text}) {
    return (
      <article>
        <h2>{title}</h2>
        <p>{text}</p>
      </article>
    );
   }
```
Компонент Article должен принимать пропсы title и text.<br>
В файле ArticleList.jsx создаю функциональный компонент ArticleList, который возвращает JSX-разметку со списком статей:
```jsx
import Article from './Article';

const article1 = {
  title: "День в универе",
  text: "сегодня был плохой день"
};

const article2 = {
  title: "День дома",
  text: "сегодня был хороший день"
};

const article3 = {
  title: "День на море",
  text: "сегодня был отличный день"
};

const article4 = {
  title: "День в школе",
  text: "сегодня был ужасный день"
};

export default function ArticleList() {
  return (
    <>
      <Article
        title={article1.title}
        text={article1.text}
      />
      <Article
        title={article2.title}
        text={article2.text}
      />
      <Article
        title={article3.title}
        text={article3.text}
      />
      <Article
        title={article4.title}
        text={article4.text}
      />
    </>
  );
}
```
Объединяю компоненты Header, Article и ArticleList в компонент App:
```jsx
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Article from './components/Article'
import ArticleList from './components/ArticleList'

export default function App() {

  return (
    <>
      <Header />
      <main>
        <ArticleList />
      </main>
      <Footer />
    </>
  )
}
```
# Задание 3. Тестирование компонентов
Запускаю сервер разработки с помощью команды - npm run dev. Открыв браузер, перешла по ссылке, указанному в консоли. Компоненты Header, ArticleList и Footer отображаются на странице.
# Контрольные вопросы
1. Что такое JSX и зачем он используется в React?<br>
  JSX - расширение языка JavaScript, которое позволяет внедрять HTML-подобный код в код JavaScript. Он служит для описания пользовательских интерфейсов REACT.
2. Чем функциональные компоненты отличаются от классовых?<br>
  Классовые компоненты обязательно должны наследоваться от React.Component и также считается устаревшим методом. Для функциональных компонентов нет нужды в наследовании и это уже современный метод.
3. Как передавать данные в компонент через props?<br>
  Данные передают, ипользуя атрибуты при условии, что он используется внутри родительского компонента.
4. В каком формате принимаются props в функциональном компоненте?<br>
   Props принимаются как объект/аргументы самой функции. Примером случит следующий кусок из нашей работы:
```jsx
export default function Article({title, text}) {
    return (
      <article>
        <h2>{title}</h2>
        <p>{text}</p>
      </article>
    );
   }
``` 
