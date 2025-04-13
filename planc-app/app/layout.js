// app/layout.js
'use client';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import styles from "./page.module.css";

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="es">
        <body className={styles.container}>
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
        </body>
      </html>
    </>
  );
}
  