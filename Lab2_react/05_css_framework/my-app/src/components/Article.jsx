export default function Article({title, text}) {
    return (
      <article className="max-w-3xl mx-auto p-3 text-center ">
        <h2 className="text-2xl font-semibold text-red-900">{title}</h2>
        <p className="mt-3 text-black">{text}</p>
      </article>
    );
   }