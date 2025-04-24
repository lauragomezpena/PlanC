'use client';

import React, { useEffect, useState } from "react";
import Card from "@/components/Card/Card";
import styles from "./styles.module.css";
import Button from "@/components/Button/button";
import { useRouter } from "next/navigation";
import { fetchAverageRating, sendRating } from "../../../subastas/utils.js";

const AuctionCard = ({ id, nombre, precio, open, descripcion, categoria }) => {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [averageRating, setAverageRating] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadAverageRating = async () => {
      try {
        const avgRating = await fetchAverageRating(id);
        setAverageRating(avgRating);
      } catch (error) {
        console.error("Error al obtener la valoración promedio:", error);
      }
    };

    loadAverageRating();
  }, [id]);

  const handleRate = async () => {
    const token = localStorage.getItem("token-jwt");
    if (!token) {
      setMessage("Debes iniciar sesión para calificar.");
      return;
    }

    try {
      await sendRating(id, value, token);
      setMessage("Valoración enviada correctamente");
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
      {open && <Button label="Participar" onClick={handleClick} />}

      {/* Calificación */}
      <div className={styles.ratingContainer}>
        <p>
          Valoración media:{" "}
          {averageRating !== null ? `${averageRating} / 5` : "Sin valoraciones aún"}
        </p>
        <label htmlFor={`rating-${id}`}>Valora la subasta:</label>
        <input
          type="number"
          id={`rating-${id}`}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          min="1"
          max="5"
        />
        <Button label="Enviar valoración" onClick={handleRate} />
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </Card>
  );
};

export default AuctionCard;