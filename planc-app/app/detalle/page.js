import React, { Suspense } from 'react';
import DetalleSubasta from './detalleSubasta';

export default function DetalleSubastaPage() {
  return (
    <Suspense fallback={<div>Cargando subasta...</div>}>
      <DetalleSubasta />
    </Suspense>
  );
}
