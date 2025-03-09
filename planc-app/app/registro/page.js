'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../page.module.css';

export default function Registro() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    direccion: '',
    comunidad: '',
    ciudad: '',
    email: '',
    usuario: '',
    passwd: '',
    repeatPasswd: '',
    imagen: null,
  });

  const [comunidades, setComunidades] = useState({});
  const [ciudades, setCiudades] = useState([]);
  const [mensajeError, setMensajeError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    fetch('/ciudades.json')
      .then(response => response.json())
      .then(data => setComunidades(data))
      .catch(error => console.error("Error cargando ciudades:", error));
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({ ...prevState, [id]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prevState => ({ ...prevState, imagen: e.target.files[0] }));
  };

  const handleComunidadChange = (e) => {
    const comunidadSeleccionada = e.target.value;
    setFormData(prevState => ({ ...prevState, comunidad: comunidadSeleccionada }));
    setCiudades(comunidades[comunidadSeleccionada] || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.passwd !== formData.repeatPasswd) {
      setMensajeError('Las contraseñas no coinciden');
      return;
    }

    const payload = {
      username: formData.usuario,
      email: formData.email,
      password: formData.passwd,
      first_name: formData.nombre,
      last_name: formData.apellido,
      locality: formData.ciudad,
      municipality: formData.comunidad,
    };

    try {
      const response = await fetch('https://das-p2-backend.onrender.com/api/users/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Este usuario ya existe. ¿Quieres iniciar sesión?');
      }

      setMensajeExito('Registro exitoso, redirigiendo...');
      setTimeout(() => router.push('/inicio'), 2000); // Redirige tras 2 segundos
    } catch (error) {
      setMensajeError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <h1>Regístrate en Plan C</h1>
        <br />
        <h2>Si ya tienes cuenta, Inicia Sesión</h2>

        <form onSubmit={handleSubmit} id="registro" className={styles.form}>
          <label htmlFor="nombre" className={styles.label}>Nombre</label>
          <input id="nombre" type="text" value={formData.nombre} onChange={handleChange} required />

          <label htmlFor="apellido" className={styles.label}>Apellido</label>
          <input id="apellido" type="text" value={formData.apellido} onChange={handleChange} required />

          <label htmlFor="dni" className={styles.label}>DNI</label>
          <input id="dni" type="text" value={formData.dni} onChange={handleChange} required />

          <label htmlFor="direccion" className={styles.label}>Dirección</label>
          <input id="direccion" type="text" value={formData.direccion} onChange={handleChange} required />

          <label htmlFor="comunidad" className={styles.label}>Comunidad</label>
          <select id="comunidad" value={formData.comunidad} onChange={handleComunidadChange} required>
            <option value="">Selecciona una comunidad</option>
            {Object.keys(comunidades).map((comunidad) => (
              <option key={comunidad} value={comunidad}>{comunidad}</option>
            ))}
          </select>

          <label htmlFor="ciudad" className={styles.label}>Ciudad</label>
          <select id="ciudad" value={formData.ciudad} onChange={handleChange} required>
            <option value="">Selecciona una ciudad</option>
            {ciudades.map((ciudad) => (
              <option key={ciudad} value={ciudad}>{ciudad}</option>
            ))}
          </select>

          <label htmlFor="email" className={styles.label}>Correo Electrónico</label>
          <input id="email" type="email" value={formData.email} onChange={handleChange} required />

          <label htmlFor="usuario" className={styles.label}>Usuario</label>
          <input id="usuario" type="text" value={formData.usuario} onChange={handleChange} required />

          <label htmlFor="passwd" className={styles.label}>Contraseña</label>
          <input id="passwd" type="password" value={formData.passwd} onChange={handleChange} required />

          <label htmlFor="repeatPasswd" className={styles.label}>Repetir contraseña</label>
          <input id="repeatPasswd" type="password" value={formData.repeatPasswd} onChange={handleChange} required />

          <label htmlFor="imagen" className={styles.label}>Imagen</label>
          <input id="imagen" type="file" onChange={handleFileChange} />

          {mensajeError && <p style={{ color: 'red' }}>{mensajeError}</p>}
          {mensajeExito && <p style={{ color: 'green' }}>{mensajeExito}</p>}

          <button className={styles.formButtonSubmit} type="submit">Registrar</button>

          <div className={styles.formButtons}>
            <button className={styles.formButton} type="reset">Limpiar Formulario</button>
            <button className={styles.formButton} type="button" onClick={() => router.push('/inicio')}>
              Inicio de Sesión
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
