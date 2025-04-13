'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { crearPuja, obtenerSubasta } from './utils';

const DetalleSubasta = () => {
  const searchParams = useSearchParams();
  const id = parseInt(searchParams.get('id'), 10);

  const [token, setToken] = useState(null);
  const [subasta, setSubasta] = useState(null);
  const [precioPuja, setPrecioPuja] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setToken(localStorage.getItem('token-jwt'));

    const fetchSubasta = async () => {
      const result = await obtenerSubasta(id);
      if (result.success) {
        setSubasta(result.subasta);
      } else {
        setMensaje(result.error);
      }
      setCargando(false);
    };

    fetchSubasta();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await crearPuja({
      token,
      auctionId: id,
      price: parseInt(precioPuja),
    });

    if (result.success) {
      setMensaje('Puja realizada con éxito');
      setPrecioPuja('');
    } else {
      setMensaje(`${result.error}`);
    }
  };

  if (cargando) return <p>Cargando subasta...</p>;
  if (!subasta) return <p>Subasta no encontrada</p>;

  return (
    <div>
      <h1>{subasta.title}</h1>
      <p><strong>Precio inicial:</strong> {subasta.starting_price}€</p>
      <p><strong>Descripción: </strong>{subasta.description}</p>
      <p><strong>Brand:</strong> {subasta.brand}</p>
      <p><strong>Stock:</strong> {subasta.stock}</p>
      <p>{subasta.isOpen ? 'Subasta abierta' : 'Subasta cerrada'}</p>

      {token && subasta.isOpen && (
        <form onSubmit={handleSubmit}>
          <h2>Realizar una puja</h2>
          <input
            type="number"
            value={precioPuja}
            onChange={(e) => setPrecioPuja(e.target.value)}
            placeholder="Introduce tu puja"
            required
          />
          <button type="submit">Pujar</button>
          {mensaje && <p>{mensaje}</p>}
        </form>
      )}

      {!token && <p>Inicia sesión para poder pujar.</p>}
    </div>
  );
};

export default DetalleSubasta;
