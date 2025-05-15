'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { obtenerMisComentarios, obtenerSubasta } from './utils';  
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

        const comentariosConSubasta = await Promise.all(
          result.pujas.map(async (comentario) => {
            const subastaResponse = await obtenerSubasta(comentario.auction);
            return {
              ...comentario,
              subasta: subastaResponse.success ? subastaResponse.subasta : null,
            };
          })
        );
        setComentarios(comentariosConSubasta);
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
            <li key={comentario.id} className={styles.comentario}>
              {comentario.subasta ? (
                <>
                  <p>
                    Has hecho un comentario en la subasta <strong>{comentario.subasta.title} </strong> 
                    de precio <strong>{` ${comentario.subasta.starting_price}€`}</strong>
                    {`, subasta ${comentario.subasta.isOpen ? 'abierta' : 'cerrada'}`}:
                  </p>
                  <p><strong>{comentario.title}: </strong><em>{comentario.text}</em></p>
                </>
              ) : (
                <p>No se pudo cargar la subasta asociada a este comentario.</p>
              )}
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
