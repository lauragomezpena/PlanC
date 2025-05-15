'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { obtenerMisRatings, obtenerSubasta } from './utils';  
import styles from './page.module.css';

const MisComentarios = () => {
  const [ratings, setRatings] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token-jwt') : null;

  useEffect(() => {
    const fetchRatings = async () => {
      const result = await obtenerMisRatings(token);

      if (result.success) {

        const ratingsConSubasta = await Promise.all(
          result.pujas.map(async (rating) => {
            const subastaResponse = await obtenerSubasta(rating.auction);
            return {
              ...rating,
              subasta: subastaResponse.success ? subastaResponse.subasta : null,
            };
          })
        );
        setRatings(ratingsConSubasta);
      } else {
        setMensaje(result.error);
      }
      setCargando(false);
    };

    if (token) {
      fetchRatings();
    } else {
      setMensaje('Por favor, inicia sesión para ver tus comentarios');
      setCargando(false);
    }
  }, [token]);

  if (cargando) return <p>Cargando comentarios...</p>;

  return (
    <div>
      <h1>Mis ratings</h1>
      {mensaje && <p>{mensaje}</p>}
      {ratings.length > 0 ? (
        <ul>
          {ratings.map((rating) => (
            <li key={rating.id} className={styles.comentario}>
              {rating.subasta ? (
                <>
                  <p>
                    Has hecho una valoración en la subasta <strong>{rating.subasta.title} </strong> 
                    de precio <strong>{` ${rating.subasta.starting_price}€`}</strong>
                    {`, subasta ${rating.subasta.isOpen ? 'abierta' : 'cerrada'}`}:
                  </p>
                  <p>Tu valoración: <strong>{rating.value}</strong></p>
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
