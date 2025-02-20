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
