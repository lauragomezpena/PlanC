'use client';

import styles from './styles.module.css'; 

const Comentario= ({comentarios, usuario, handleEditarComentario, handleBorrarComentario})=> { 
    return (
        <div>
    <h2>Comentarios</h2>
      {comentarios.length > 0 ? (
        <ul>
          {comentarios.map((comentario) => (
            <li key={comentario.id} className={styles.comentario}>
              <p><strong>{comentario.username} </strong>
              {comentario.modification_date}</p>
              <div className={styles.contenidoComentario}>

              <p>{comentario.title}: {comentario.text}</p>
              {usuario?.trim().toLowerCase() === comentario.username?.trim().toLowerCase() && (
              <div className={styles.botones}>
                <button  className={styles.formButton} onClick={() => handleEditarComentario(comentario)}>Editar</button>
                <button  className={styles.formButtonDelete} onClick={() => handleBorrarComentario(comentario.id)}>Borrar</button>
              </div>
                )}
                </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay comentarios todavía.</p>
      )}
      </div>)
}

export default Comentario;