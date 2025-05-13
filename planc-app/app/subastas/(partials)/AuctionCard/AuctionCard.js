'use client';

import React, { useEffect, useState } from "react";
import Card from "@/components/Card/Card";
import styles from "./styles.module.css";
import Button from "@/components/Button/button";
import { useRouter } from "next/navigation";

const AuctionCard = ({ id, nombre, precio, open, descripcion, categoria, imagen }) => {
  const router = useRouter();

  // Construir la URL completa para la imagen
  console.log(imagen);
  const fullImageUrl = imagen ? imagen : null;

  const handleClick = () => {
    router.push(`/detalle?id=${id}`);
  };

  return (
    <Card className={styles.card}>
      <h2>{nombre}</h2>
      {fullImageUrl && <img src={fullImageUrl} alt={`Imagen de ${nombre}`} className={styles.image} />}
      <p>Precio: {precio}€</p>
      <p>Descripción: {descripcion}</p>
      <p>Categoría: {categoria}</p>
      <p>{open ? "Subasta abierta" : "Subasta cerrada"}</p>
      {open && (
        <button className={styles.button} onClick={handleClick}>
          Participar
        </button>
      )}
    </Card>
  );
};

export default AuctionCard;