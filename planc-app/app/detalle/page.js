'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { crearPuja, obtenerSubasta, obtenerPujas } from './utils';

const DetalleSubasta = () => {
  const searchParams = useSearchParams();
  const id = parseInt(searchParams.get('id'), 10);

  const [token, setToken] = useState(null);
  const [subasta, setSubasta] = useState(null);
  const [pujas, setPujas] = useState([]);
  const [precioPuja, setPrecioPuja] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setToken(localStorage.getItem('token-jwt'));

    const fetchSubastaYpPujas = async () => {
      const subastaResult = await obtenerSubasta(id);
      if (subastaResult.success) {
        setSubasta(subastaResult.subasta);
      } else {
        setMensaje(subastaResult.error);
      }

      const pujasResult = await obtenerPujas(id, token);
      if (pujasResult.success) {
        // Ordenar de mayor a menor por precio
        const ordenadas = pujasResult.pujas.sort((a, b) => b.price - a.price);
        setPujas(ordenadas);
      }

      setCargando(false);
    };

    fetchSubastaYpPujas();
  }, [id, token]);

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
      // Recargar pujas después de hacer una nueva
      const pujasResult = await obtenerPujas(id, token);
      if (pujasResult.success) {
        const ordenadas = pujasResult.pujas.sort((a, b) => b.price - a.price);
        setPujas(ordenadas);
      }
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

      <h2>Pujas actuales</h2>
      {pujas.length > 0 ? (
        <ul>
          {pujas.map((puja) => (
            < p key={puja.id}>
              {puja.user? puja.username : 'Usuario desconocido'} : {puja.price}€
            </p>
          ))}
        </ul>
      ) : (
        <p>No hay pujas aún.</p>
      )}

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
