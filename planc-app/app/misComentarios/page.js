'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { obtenerMisComentarios } from './utils';  
import styles from './page.module.css';

const MisComentarios = () => {
  const [comentarios, setComentarios] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token-jwt') : null;

  useEffect(() => {
    const fetchComentarios = async () => {
      const result = await obtenerMisComentarios(token);

      if (result.success) {
        setComentarios(result.pujas);
      } else {
        setMensaje(result.error);
      }

      setCargando(false);
    };

    if (token) {
      fetchComentarios();
    } else {
      setMensaje('Por favor, inicia sesión para ver tus comentarios');
      setCargando(false);
    }
  }, [token]);



  if (cargando) return <p>Cargando comentarios...</p>;

  return (
    <div>
      <h1>Mis comentarios</h1>
      {mensaje && <p>{mensaje}</p>}
      {comentarios.length > 0 ? (
        <ul>
          {comentarios.map((comentario) => (
            <li key={comentario.id} style={{ marginBottom: '1rem' }}>
              Has comentado en la subasta <strong>{comentario.auction}</strong>  {comentario.title}: {comentario.text}
              {/* <br />
              <button onClick={() => router.push(`/editarPuja/${puja.id}`)} className={styles.formButton}>
                Editar
              </button>
              <button onClick={() => handleDelete(puja.id)} className={styles.formButtonDelete}>
                Eliminar
              </button> */}

            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes comentarios.</p>
      )}
    </div>
  );
};

export default MisComentarios;
