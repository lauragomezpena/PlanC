

import styles from "./componentes.module.css";
export default function Search() {
    return (
      <form action="/subastas" method="get" className = {styles.form}>
        <label htmlFor="busqueda">Búsqueda</label>
        <input id="busqueda" name="q" type="text" />
        <button type="submit" className = {styles.formButton}>Buscar</button>
      </form>
    );
  }
  