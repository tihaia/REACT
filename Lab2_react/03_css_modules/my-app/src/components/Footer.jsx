import React from 'react';

import styles from './Footer/Footer.module.scss';

export default function Footer() {
    return (
      <footer className={styles.footer}>
        <p>© {(new Date().getFullYear())}</p>
      </footer>
    );
   }