
import styles from "./styles.module.css";

export default function Search() {
    return (
      <form action="/subastas" method="get" className = {styles.form}>
        <label htmlFor="busqueda">Haz una búsqueda</label>
        <input className={styles.searchBar} id="busqueda" name="q" type="text" />
        <button type="submit" className = {styles.formButton}>Buscar</button>
      </form>
    );
  }
  