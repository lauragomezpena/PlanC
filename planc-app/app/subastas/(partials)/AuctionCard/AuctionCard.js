'use client';
import React from 'react';
import Card from '@/components/Card/Card';
import styles from './styles.module.css';
import Button  from '@/components/Button/button';
import { useRouter } from 'next/navigation';

const AuctionCard = ({ id, nombre,precio, open, descripcion, categoria }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/detalle?id=${id}`);
  };

  return (
    <Card className={styles.card}>
      <h2>{nombre}</h2>
      <p>Precio: {precio}€</p>
      <p>Descripción: {descripcion}</p>
      <p>Categoría: {categoria}</p>
      <p>{open ? 'Subasta abierta' : 'Subasta cerrada'}</p>
      {open && <Button label= 'Participar' onClick={handleClick} />}
    </Card>
  );
}

export default AuctionCard;