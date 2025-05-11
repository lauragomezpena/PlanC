import styles from "./styles.module.css";

export default function Search() {
    return (
      // <form action="/subastas" method="get" className = {styles.form}>
      //   <label htmlFor="busqueda">Haz una búsqueda</label>
      //   <input className={styles.searchBar} id="busqueda" name="q" type="text" />
      //   <button type="submit" className = {styles.formButton}>Buscar</button>
      // </form>
      <form action="/subastas" method="get" className={styles.form}>
      <label htmlFor="busqueda">Haz una búsqueda</label>
      <input
        className={styles.searchBar}
        id="busqueda"
        name="q"
        type="text"
        placeholder="Buscar..."
      />

      <label htmlFor="category">Categoría</label>
      <select name="category" id="category" className={styles.select}>
        <option value="">Todas</option>
        <option value="1">Electrónica</option>
        <option value="2">Moda</option>
      </select>

      <label htmlFor="open">Estado</label>
      <select name="open" id="open" className={styles.select}>
        <option value="">Todas</option>
        <option value="open">Abiertas</option>
        <option value="closed">Cerradas</option>
      </select>

      {/* <label htmlFor="rating">Valoración mínima</label>
      <select name="rating" id="rating" className={styles.select}>
        <option value="">Cualquiera</option>
        <option value="1">1 estrella o más</option>
        <option value="2">2 estrellas o más</option>
        <option value="3">3 estrellas o más</option>
        <option value="4">4 estrellas o más</option>
        <option value="5">5 estrellas</option>
      </select> */}

      <button type="submit" className={styles.formButton}>Buscar</button>
    </form>
    );
  }
  