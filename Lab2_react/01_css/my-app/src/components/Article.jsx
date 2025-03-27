export default function Article({title, text}) {
    return (
      <article className="article">
        <h2 className="article__title">{title}</h2>
        <p>{text}</p>
      </article>
    );
   }