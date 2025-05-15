'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { obtenerMisSubastas, deleteAuction } from './utils';  
import styles from './page.module.css';

const MisSubastas = () => {
  const [subastas, setSubastas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token-jwt');
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const fetchSubastas = async () => {
      if (!token) {
        setCargando(false);
        return;
      }

      try {
        const result = await obtenerMisSubastas(token);
        if (result.success) {
          setSubastas(result.subastas);
        } else {
          setMensaje(result.error);
        }
      } catch (error) {
        setMensaje('Error al obtener las subastas');
      } finally {
        setCargando(false);
      }
    };

    fetchSubastas();
  }, [token]);

  const handleDelete = async (auctionId) => {
    const confirm = window.confirm("¿Estás seguro de que deseas eliminar esta subasta?");
    if (!confirm) return;

    try {
      await deleteAuction(auctionId);
      alert("Subasta eliminada correctamente.");
      router.push("/misSubastas");
    } catch (error) {
      console.error("Error al eliminar subasta:", error);
      alert("No se pudo eliminar la subasta.");
    }
  };

  const handleEditar = (id) => {
    router.push(`/editarSubasta/${id}`);
  };

  if (cargando) return <p>Cargando subastas...</p>;

  return (
    <div>
      <h1>Mis Subastas</h1>
      {mensaje && <p>{mensaje}</p>}
      {subastas.length > 0 ? (
        <ul>
          {subastas.map((subasta) => (
            <p key={subasta.id}>
              <strong>{subasta.title}</strong> - {subasta.starting_price}€
              <br />
              <button onClick={() => handleEditar(subasta.id)} className={styles.formButton}>
                Editar
              </button>
              <button onClick={() => handleDelete(subasta.id)} className={styles.formButtonDelete}>
                Eliminar
              </button>
            </p>
          ))}
        </ul>
      ) : (
        <p>No tienes subastas.</p>
      )}
    </div>
  );
};

export default MisSubastas;
