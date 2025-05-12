"use client";

import { useEffect, useState } from "react";
import {
  fetchAverageRating,
  sendRating,
  deleteUserRating,
  fetchUserRating,
} from "../../utils";
import styles from "./styles.module.css";

const Ratings = ({ auctionId }) => {
  const [userRating, setUserRating] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [rating, setRating] = useState(1);

  const loadRatings = async () => {
    try {
      const avgRating = await fetchAverageRating(auctionId);
      setAverageRating(avgRating);

      const token = localStorage.getItem("token-jwt");
      const userRatingResult = await fetchUserRating(auctionId, token);
      setUserRating(userRatingResult);
    } catch (error) {
      console.error("Error al cargar ratings", error);
    }
  };

  useEffect(() => {
    loadRatings();
  }, [auctionId]);

  const handleRate = async () => {
    const token = localStorage.getItem("token-jwt");
    if (!token) {
      alert("Debes iniciar sesión para calificar");
      return;
    }

    try {
      await sendRating(auctionId, rating, token);
      setUserRating(rating);
      await loadRatings();
    } catch (error) {
      console.error("Error al calificar", error);
    }
  };

  const handleDeleteRating = async () => {
    try {
      const token = localStorage.getItem("token-jwt");
      await deleteUserRating(auctionId, token);
      setUserRating(null);
      await loadRatings();
    } catch (error) {
      console.error("Error al borrar rating", error.message);
    }
  };

  return (
    <>
      <p style={{ textAlign: "center" }}>
        Valoración media:{" "}
        {averageRating !== null ? `${averageRating} / 5` : "Sin valoraciones aún"}
      </p>

      {userRating !== null ? (
        <div style={{ textAlign: "center" }}>
          <p>Tu valoración: {userRating}</p>
          <button className={styles.buttonDelete} onClick={handleDeleteRating}>
            Eliminar valoración
          </button>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <label htmlFor={`rating-${auctionId}`}>Valora la subasta:</label>
          <input
            style={{
              display: "block",
              margin: "0.5rem auto",
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
            type="number"
            id={`rating-${auctionId}`}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min="1"
            max="5"
          />
          <button className={styles.button} onClick={handleRate}>
            Enviar valoración
          </button>
        </div>
      )}
    </>
  );
};

export default Ratings;
