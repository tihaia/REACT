import React from 'react';

import styles from './Header/Header.module.scss';

export default function Header() {
    return (
      <header className={styles.header}>
        <h1 className={styles.title}>Mini-Blog</h1>
      </header>
    );
   }

