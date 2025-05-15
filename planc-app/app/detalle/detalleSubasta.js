'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Button from "@/components/Button/button";
import { 
  crearPuja, 
  obtenerSubasta, 
  obtenerPujas, 
  crearComentario, 
  obtenerComentarios, 
  borrarComentario 
} from './utils';
import styles from "./page.module.css";
import Comentario from './(partials)/Comentario/Comentario';
import Pujas from './(partials)/Puja/Puja';
import Ratings from './(partials)/Rating/Rating';

const DetalleSubasta = () => {
  const searchParams = useSearchParams();
  const id = parseInt(searchParams.get('id'), 10);

  const router = useRouter();
  const [subasta, setSubasta] = useState(null);
  const [pujas, setPujas] = useState([]);
  const [precioPuja, setPrecioPuja] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [comentarios, setComentarios] = useState([]);
  const [usuario, setUsuario] = useState("");
  const [loadingComentario, setLoadingComentario] = useState(false);

  useEffect(() => {
    const tokenLocal = localStorage.getItem('token-jwt');
    const userLocal = localStorage.getItem('userName');
    setUsuario(userLocal);

    // if (!tokenLocal) return;

    const fetchSubastaYPujasYComentarios = async () => {
      const subastaResult = await obtenerSubasta(id);
      if (subastaResult.success) {
        setSubasta(subastaResult.subasta);
      } else {
        setMensaje(subastaResult.error);
      }

      if (tokenLocal)
      {
      const pujasResult = await obtenerPujas(id, tokenLocal);
      if (pujasResult.success) {
        const ordenadas = pujasResult.pujas.sort((a, b) => b.price - a.price);
        setPujas(ordenadas);
      }

      const comentariosResult = await obtenerComentarios(id, tokenLocal);
      if (comentariosResult.success) {
        setComentarios(comentariosResult.comentarios);
      }}

      setCargando(false);
    };

    fetchSubastaYPujasYComentarios();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token-jwt');
    const result = await crearPuja({
      token,
      auctionId: id,
      price: parseInt(precioPuja),
    });

    if (result.success) {
      setMensaje('Puja realizada con éxito');
      setPrecioPuja('');
      const pujasResult = await obtenerPujas(id, token);
      if (pujasResult.success) {
        const ordenadas = pujasResult.pujas.sort((a, b) => b.price - a.price);
        setPujas(ordenadas);
      }
    } else {
      setMensaje(`${result.error}`);
    }
  };

  const handleOnSubmitComentario = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token-jwt');
    const formDataRaw = new FormData(event.target);
    setLoadingComentario(true);

    const commentData = {
      title: formDataRaw.get('title'),
      text: formDataRaw.get('text'),
    };

    try {
      const result = await crearComentario({
        token,
        auctionId: id,
        title: commentData.title,
        text: commentData.text,
      });

      if (result.success) {
        setMensaje('Comentario enviado con éxito');
        const comentariosResult = await obtenerComentarios(id, token);
        if (comentariosResult.success) {
          setComentarios(comentariosResult.comentarios);
        }
      } else {
        setMensaje(`${result.error}`);
      }
    } catch (error) {
      setMensaje(`Error al enviar el comentario: ${error.message}`);
    } finally {
      setLoadingComentario(false);
    }
  };

  const handleBorrarComentario = async (comentarioId) => {
    const confirmacion = window.confirm('¿Seguro que quieres borrar este comentario?');
    if (!confirmacion) return;

    const token = localStorage.getItem('token-jwt');
    try {
      const result = await borrarComentario({ token, auctionId: id, comentarioId });

      if (result.success) {
        alert('Comentario borrado correctamente.');
        const comentariosResult = await obtenerComentarios(id, token);
        if (comentariosResult.success) {
          setComentarios(comentariosResult.comentarios);
        }
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error(error);
      alert('Error inesperado al borrar el comentario.');
    }
  };

  const handleEditarComentario = (comentario) => {
    router.push(`/editarComentario/${comentario.id}?auctionId=${id}`);
  };

  if (cargando) return <p>Cargando subasta...</p>;
  if (!subasta) return <p>Subasta no encontrada</p>;

  const token = localStorage.getItem('token-jwt');

  return (
    <div className={styles.container}>
      <h1>{subasta.title}</h1>
      <p><strong>Precio inicial:</strong> {subasta.starting_price}€</p>
      <p><strong>Descripción: </strong>{subasta.description}</p>
      <p><strong>Brand:</strong> {subasta.brand}</p>
      <p><strong>Stock:</strong> {subasta.stock}</p>
      <p>{subasta.isOpen ? 'Subasta abierta' : 'Subasta cerrada'}</p>

      <Pujas pujas={pujas} />

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
          <Button type="submit" label="Pujar" />
          {mensaje && <p>{mensaje}</p>}
        </form>
      )}

      {!token && <p>Inicia sesión para poder pujar.</p>}
      <Ratings
      auctionId={id}
      />
      <Comentario
        comentarios={comentarios}
        usuario={usuario}
        handleEditarComentario={handleEditarComentario}
        handleBorrarComentario={handleBorrarComentario}
      />

      {token && subasta.isOpen && (
        <form onSubmit={handleOnSubmitComentario}>
          <h2>Dejar un comentario</h2>
          <div className={styles.inputs}>
            <input
              name="title"
              type="text"
              placeholder="Título del comentario"
              required
            />
            <br />
            <input
              name="text"
              type="text"
              placeholder="Escribe tu comentario"
              required
            />
            <br />
          </div>
          <Button
            type="submit"
            className={styles.btn}
            label={loadingComentario ? 'Enviando...' : 'Enviar comentario'}
          />
        </form>
      )}
    </div>
  );
};

export default DetalleSubasta;
