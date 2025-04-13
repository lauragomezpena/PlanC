'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { obtenerMisSubastas, deleteAuction} from './utils';  
import styles from './page.module.css';

const MisSubastas = () => {
  const [subastas, obtenerMisSubastas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token-jwt') : null;

  // Fetch para obtener subastas del usuario
  useEffect(() => {
    const fetchSubastas = async () => {
      const result = await (token);

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

  // Manejar la eliminación de una subasta
  const handleDelete = async (auctionId) => {
    const confirm = window.confirm("¿Estás seguro de que deseas eliminar esta subasta?");
    if (!confirm) return;

    try {
      // Llamada a la función de eliminación
      await deleteAuction(auctionId);

      // Notificación al usuario
      alert("Subasta eliminada correctamente.");
      router.push("/misSubastas"); // Redirige a la página de mis subastas
    } catch (error) {
      console.error("Error al eliminar subasta:", error);
      alert("No se pudo eliminar la subasta.");
    }
  };

  const handleEditar = (id) => {
    router.push(`/editarSubasta/${id}`); // Redirige al formulario de edición
  };

  if (cargando) return <p>Cargando subastas...</p>;

  return (
    <div>
      <h1>Mis Subastas</h1>
      {mensaje && <p>{mensaje}</p>}
      {subastas.length > 0 ? (
        <ul>
          {subastas.map((subasta) => (
            <li key={subasta.id} style={{ marginBottom: '1rem' }}>
              <strong>{subasta.title}</strong> - {subasta.starting_price}€
              <br />
              <button onClick={() => handleEditar(subasta.id)} className={styles.formButton}>
                Editar
              </button>
              <button onClick={() => handleDelete(subasta.id)} className={styles.formButtonDelete}>
                Eliminar
              </button>
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
