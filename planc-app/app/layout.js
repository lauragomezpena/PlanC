import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from "./page.module.css";

export default function Layout({ children }) {
  return (
    <html lang="es">
    <body className={styles.container}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </body>
    </html>
  );
}