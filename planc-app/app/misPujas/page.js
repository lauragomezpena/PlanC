'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { obtenerMisPujas, deleteBid } from './utils';  
import styles from './page.module.css';

const MisPujas = () => {
  const [pujas, setPujas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token-jwt') : null;

  // Fetch para obtener pujas del usuario
  useEffect(() => {
    const fetchPujas = async () => {
      const result = await obtenerMisPujas(token);

      if (result.success) {
        setPujas(result.pujas);
      } else {
        setMensaje(result.error);
      }

      setCargando(false);
    };

    if (token) {
      fetchPujas();
    } else {
      setMensaje('Por favor, inicia sesión para ver tus pujas');
      setCargando(false);
    }
  }, [token]);

  // Manejar la eliminación de una puja
  const handleDelete = async (bidId) => {
    const confirm = window.confirm("¿Estás seguro de que deseas eliminar esta puja?");
    if (!confirm) return;

    try {
      // Llamada a la función de eliminación
      await deleteBid(bidId);

      // Notificación al usuario
      alert("Puja eliminada correctamente.");
      router.push("/misPujas"); // Redirige a la página de mis pujas
    } catch (error) {
      console.error("Error al eliminar puja:", error);
      alert("No se pudo eliminar la puja.");
    }
  };


  if (cargando) return <p>Cargando pujas...</p>;

  return (
    <div>
      <h1>Mis pujas</h1>
      {mensaje && <p>{mensaje}</p>}
      {pujas.length > 0 ? (
        <ul>
          {pujas.map((puja) => (
            <li key={puja.id} className={styles.puja}>
              Has pujado en la subasta <strong>{puja.title}</strong> : {puja.price}€
              <br />
              <button onClick={() => router.push(`/editarPuja/${puja.id}`)} className={styles.formButton}>
                Editar
              </button>
              <button onClick={() => handleDelete(puja.id)} className={styles.formButtonDelete}>
                Eliminar
              </button>

            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes pujas.</p>
      )}
    </div>
  );
};

export default MisPujas;
