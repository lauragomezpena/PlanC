import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Search from "@/components/Search";
import styles from "./page.module.css";


export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <main className= {styles.main}>
        <h1>Bienvenido a Plan C</h1>
        <h2>¡El mejor sitio para comprar al mejor precio!</h2>
        <p>Haz una búsqueda</p>
        <Search />
      </main>
      <Footer />
    </div>
  );
}
