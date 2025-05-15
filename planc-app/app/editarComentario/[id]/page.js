'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { modificarComentario, obtenerComentario } from './utils';
import styles from './page.module.css';
import Button from '@/components/Button/button';

const ModificarComentario = () => {
  const { id } = useParams();  // comentarioId
  const router = useRouter();
  const searchParams = useSearchParams();
  const auctionIdFromQuery = searchParams.get('auctionId');

  const [token, setToken] = useState(null);
  const [comentario, setComentario] = useState(null);
  const [auctionId, setAuctionId] = useState(auctionIdFromQuery); // Inicializar con el query param
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem('token-jwt');
    setToken(t);
  }, []);

  useEffect(() => {
    const fetchComentario = async () => {
      if (!token || !id || !auctionIdFromQuery) return;

      try {
        const result = await obtenerComentario({
          token,
          comentarioId: id,
          auctionId: auctionIdFromQuery
        });

        if (!result.success) {
          setMensaje(result.error);
        } else {
          const c = result.comentario;
          setComentario(c);
          setTitle(c.title);
          setText(c.text);
        }
      } catch (e) {
        setMensaje('Error al cargar el comentario');
      } finally {
        setCargando(false);
      }
    };

    fetchComentario();
  }, [token, id, auctionIdFromQuery]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token || !auctionId || !id) return;

    const result = await modificarComentario({
      token,
      auctionId,
      comentarioId: id,
      title,
      text,
    });

    if (result.success) {
      alert('Comentario modificado correctamente');
      router.push(`/detalle?id=${auctionId}`);
    } else {
      alert(result.error);
    }
  };

  if (cargando) return <p>Cargando comentario...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Modificar Comentario</h1>
      {mensaje && <p>{mensaje}</p>}
      {comentario && (
        <form onSubmit={handleSubmit}>
          <div  className={styles.formGroup}>
            <label className= {styles.label}>Título:</label>
            <br />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={styles.input}
            />
          <br />
            <label className= {styles.label}>Texto:</label>
            <br />
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              cols={40}
              required
              className={styles.textarea}
            />
          </div>
          <Button type="submit" label ="Guardar"
          />
          <Button
            type="button"
            onClick={() => router.push(`/detalle?id=${auctionId}`)}
            label = "Cancelar"
          />
        </form>
      )}
    </div>
  );
};

export default ModificarComentario;
