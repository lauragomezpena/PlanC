'use client';
import React from 'react';
import Card from '@/components/Card/Card';
import styles from './styles.module.css';
import Button  from '@/components/Button/button';
const AuctionCard = ({ nombre,precio,open, descripcion, categoria }) => {
  return (
    <Card className={styles.card}>
      <h2>{nombre}</h2>
      <p>Precio: {precio}€</p>
      <p>Descripción: {descripcion}</p>
      <p>Categoría: {categoria}</p>
      <p>{open ? 'Subasta abierta' : 'Subasta cerrada'}</p>
      {open && <Button label= 'Participar' onClick={()=>{}} />}
    </Card>
  );
}

export default AuctionCard;