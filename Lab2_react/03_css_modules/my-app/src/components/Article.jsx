import React from 'react';

import styles from './Article/Article.module.scss';

export default function Article({title, text}) {
    return (
      <article className={styles.article}>
        <h2 className={styles.title}>{title}</h2>
        <p>{text}</p>
      </article>
    );
   }