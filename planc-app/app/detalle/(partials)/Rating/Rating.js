'use client';

import { useEffect, useState } from 'react';
import {
  fetchAverageRating,
  sendRating,
  deleteUserRating,
  fetchUserRating,
} from '../../utils';
import Button from '@/components/Button/button';
import styles from './styles.module.css';

const Ratings = ({ auctionId }) => {
  const [userRating, setUserRating] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [rating, setRating] = useState(1);
  const [token, setToken] = useState(null);

  const loadRatings = async () => {
    try {
      // Obtener rating promedio siempre (público)
      const avgRating = await fetchAverageRating(auctionId);
      setAverageRating(avgRating);

      // Obtener rating del usuario solo si hay token
      setToken(localStorage.getItem('token-jwt'));
      if (token) {
        const userRatingResult = await fetchUserRating(auctionId, token);
        setUserRating(userRatingResult);
      } else {
        setUserRating(null); // importante: para evitar valores undefined
      }
    } catch (error) {
      console.error('Error al cargar ratings', error);
    }
  };

  useEffect(() => {
    loadRatings();
  }, [auctionId]);

  const handleRate = async () => {
    const token = localStorage.getItem('token-jwt');
    if (!token) {
      alert('Debes iniciar sesión para calificar');
      return;
    }

    try {
      await sendRating(auctionId, rating, token);
      setUserRating(rating);
      await loadRatings();
    } catch (error) {
      console.error('Error al calificar', error);
    }
  };

  const handleDeleteRating = async () => {
    const token = localStorage.getItem('token-jwt');
    if (!token) {
      alert('Debes iniciar sesión');
      return;
    }

    try {
      await deleteUserRating(auctionId, token);
      setUserRating(null);
      await loadRatings();
    } catch (error) {
      console.error('Error al borrar rating', error.message);
    }
  };

  return (
    <>
      <h2>Valoraciones</h2>
      <p>
        Valoración media:{' '}
        {averageRating !== null ? `${averageRating} / 5` : 'Sin valoraciones aún'}
      </p>

      {userRating !== null ? (
        <div style={{ textAlign: 'center' }}>
          <p>Tu valoración: {userRating}</p>
          <Button
            label="Eliminar valoración"
            onClick={handleDeleteRating}
            className={styles.buttonDelete}
          />
        </div>
      ) : (
        token?
        (<div style={{ textAlign: 'center' }}>
          <label htmlFor={`rating-${auctionId}`}>Valora la subasta:</label>
          <input
            className={styles.inputRating}
            type="number"
            id={`rating-${auctionId}`}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min="1"
            max="5"
          />
          <Button label="Enviar valoración" onClick={handleRate} />
        </div>
        ): null
      )}
    </>
  );
};

export default Ratings;
