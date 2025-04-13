'use client';
import React, { useEffect, useState } from 'react';
import { obtenerMisSubastas } from './utils'; 

const MisSubastas = () => {
  const [subastas, setSubastas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const token = localStorage.getItem('token-jwt'); 

  useEffect(() => {
    const fetchSubastas = async () => {
      const result = await obtenerMisSubastas(token);

      if (result.success) {
        setSubastas(result.subastas);
      } else {
        setMensaje(result.error);
      }

      setCargando(false);
    };  

    if (token) {
      fetchSubastas();
    } else {
      setMensaje('Por favor, inicia sesión para ver tus subastas');
      setCargando(false);
    }
  }, [token]);

  if (cargando) return <p>Cargando subastas...</p>;

  return (
    <div>
      <h1>Mis Subastas</h1>
      {mensaje && <p>{mensaje}</p>}
      {subastas.length > 0 ? (
        <ul>
          {subastas.map((subasta) => (
            <li key={subasta.id}>
              {subasta.title} - {subasta.starting_price}€
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes subastas.</p>
      )}
    </div>
  );
};

export default MisSubastas;
