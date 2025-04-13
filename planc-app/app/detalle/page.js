'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { subastas } from '../subastas/constants';

const DetalleSubasta = () => {
  const searchParams = useSearchParams();
  const id = parseInt(searchParams.get('id'), 10);

  const subasta = subastas.find((s) => s.id === id);

  if (!subasta) {
    return <p>Subasta no encontrada</p>;
  }

  return (
    <div>
      <h1>{subasta.nombre}</h1>
      <p>Precio: {subasta.precio}€</p>
      <p>Descripción: {subasta.descripcion}</p>
      <p>Categoría: {subasta.categoria}</p>
      <p>{subasta.open ? 'Subasta abierta' : 'Subasta cerrada'}</p>
    </div>
  );
};

export default DetalleSubasta;
