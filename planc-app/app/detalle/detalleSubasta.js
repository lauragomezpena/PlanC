'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { crearPuja, obtenerSubasta, obtenerPujas, crearComentario, obtenerComentarios, modificarComentario, borrarComentario} from './utils';

const DetalleSubasta = () => {
  const searchParams = useSearchParams();
  const id = parseInt(searchParams.get('id'), 10);

  const [token, setToken] = useState(null);
  const [subasta, setSubasta] = useState(null);
  const [pujas, setPujas] = useState([]);
  const [precioPuja, setPrecioPuja] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [comentarios, setComentarios] = useState([]);
  const [usuario, setUsuario] = useState("");
  const [loadingComentario, setLoadingComentario] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem('token-jwt'));
    setUsuario(localStorage.getItem('userName'));


    const fetchSubastaYPujasYComentarios = async () => {
      const subastaResult = await obtenerSubasta(id);
      if (subastaResult.success) {
        setSubasta(subastaResult.subasta);
      } else {
        setMensaje(subastaResult.error);
      }

      const pujasResult = await obtenerPujas(id, token);
      if (pujasResult.success) {
        const ordenadas = pujasResult.pujas.sort((a, b) => b.price - a.price);
        setPujas(ordenadas);
      }

      const comentariosResult = await obtenerComentarios(id, token);
      if (comentariosResult.success) {
        setComentarios(comentariosResult.comentarios);
      }

          setCargando(false);
        };



    fetchSubastaYPujasYComentarios();
  }, [id, token, usuario]);

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
  
    try {
      const result = await borrarComentario({ token, auctionId: id, comentarioId });
  
      if (result.success) {
        alert('Comentario borrado correctamente.');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error(error);
      alert('Error inesperado al borrar el comentario.');
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
            <li key={puja.id}>
              {puja.user ? puja.username : 'Usuario desconocido'} : {puja.price}€
            </li>
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
      <h2>Comentarios</h2>
      {comentarios.length > 0 ? (
        <ul>
          {comentarios.map((comentario) => (
            <li key={comentario.id}>
              <strong>{comentario.username}</strong>
              <p>{comentario.title}: {comentario.text}</p>
              {usuario === comentario.username && (
              <div style={{ marginTop: '0.5rem' }}>
                {/* <button onClick={() => handleEditarComentario(comentario)}>Editar</button> */}
                <button onClick={() => handleBorrarComentario(comentario.id)}>Borrar</button>
              </div>
                )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay comentarios todavía.</p>
      )}

      
      {token && subasta.isOpen && (
      <form onSubmit={handleOnSubmitComentario}>
        <h2>Dejar un comentario</h2>
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
        <button type="submit" disabled={loadingComentario}>
          {loadingComentario ? 'Enviando...' : 'Enviar comentario'}
        </button>
      </form>)}
    </div>
  );
};

export default DetalleSubasta;
