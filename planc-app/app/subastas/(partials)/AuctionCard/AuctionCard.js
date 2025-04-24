'use client';

import React, { useEffect, useState } from "react";
import Card from "@/components/Card/Card";
import styles from "./styles.module.css";
import Button from "@/components/Button/button";
import { useRouter } from "next/navigation";
import { fetchAverageRating, sendRating, fetchUserRating, deleteUserRating } from "../../../subastas/utils";

const AuctionCard = ({ id, nombre, precio, open, descripcion, categoria }) => {
  const router = useRouter();
  const [rating, setRating] = useState(0); // Valoración del usuario
  const [averageRating, setAverageRating] = useState(null); // Valoración promedio
  const [userRating, setUserRating] = useState(null); // Valoración del usuario actual
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadRatings = async () => {
      try {
        const avgRating = await fetchAverageRating(id);
        setAverageRating(avgRating);

        const token = localStorage.getItem("token-jwt");
        if (token) {
          const userRating = await fetchUserRating(id, token);
          setUserRating(userRating);
        }
      } catch (error) {
        console.error("Error al cargar las valoraciones:", error);
      }
    };

    loadRatings();
  }, [id]);

  const handleRate = async () => {
    const token = localStorage.getItem("token-jwt");
    if (!token) {
      setMessage("Debes iniciar sesión para calificar.");
      return;
    }

    try {
      await sendRating(id, rating, token);
      setMessage("Valoración enviada correctamente");
      setUserRating(rating); // Actualiza la valoración del usuario
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleDeleteRating = async () => {
    const token = localStorage.getItem("token-jwt");
    if (!token) {
      setMessage("Debes iniciar sesión para eliminar tu valoración.");
      return;
    }

    try {
      await deleteUserRating(id, token);
      setMessage("Valoración eliminada correctamente");
      setUserRating(null); // Elimina la valoración del usuario
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleClick = () => {
    router.push(`/detalle?id=${id}`);
  };

  return (
    <Card className={styles.card}>
      <h2>{nombre}</h2>
      <p>Precio: {precio}€</p>
      <p>Descripción: {descripcion}</p>
      <p>Categoría: {categoria}</p>
      <p>{open ? "Subasta abierta" : "Subasta cerrada"}</p>
      {open && (<button className={styles.button} onClick={handleClick}> 
      Participar
      </button>)}

      {/* Calificación */}
      <div className={styles.ratingContainer}>
        <p>
          Valoración media:{" "}
          {averageRating !== null ? `${averageRating} / 5` : "Sin valoraciones aún"}
        </p>

        {userRating !== null ? (
          <div>
            <p>Tu valoración: {userRating}</p>
            <button className={styles.buttonDelete} onClick={handleDeleteRating}>
            Eliminar valoración
          </button>

          </div>
        ) : (
          <div>
            <label htmlFor={`rating-${id}`}>Valora la subasta:</label>
            <input
              type="number"
              id={`rating-${id}`}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              min="1"
              max="5"
            />
            <br />
            <button className={styles.button} onClick={handleRate}>
              Enviar valoración
            </button>
          </div>
        )}

        {message && <p className={styles.message}>{message}</p>}
      </div>
    </Card>
  );
};

export default AuctionCard;