'use client';

import styles from './styles.module.css'; 

const Pujas= ({pujas})=> { 
    return (
        <div>
        <h2>Pujas actuales</h2>

      {pujas.length > 0 ? (
        <ul className={styles.pujaList}>
          {pujas.map((puja) => (
            <li key={puja.id} className={styles.pujaItem}>
              <strong>{puja.user ? puja.username : 'Usuario desconocido'} </strong> : {puja.price}€
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay pujas aún.</p>
      )}
      </div>)
}

export default Pujas;