'use client';
import React, { useState } from 'react';
import { saveToken } from '../../utils/auth'; // Importa la función saveToken
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../page.module.css';

export default function Login() {
  const [user, setUser] = useState('');
  const [passwd, setPasswd] = useState('');
  const [error, setError] = useState('');

  const handleUserChange = (e) => setUser(e.target.value);
  const handlePasswdChange = (e) => setPasswd(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://das-p2-backend.onrender.com/api/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user,
          password: passwd,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        saveToken(data.token);  // Guardamos el token en localStorage
        window.location.href = '/';  // Redirige a la página principal
      } else {
        setError(data.detail || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error en login:', error);
      setError('Error de conexión con el servidor');
    }
  };

  const handleClear = () => {
    setUser('');
    setPasswd('');
    setError('');
  };

  return (
    <>

        <h1>Inicia sesión en tu cuenta</h1>
        <br />
        <h2>Si no tienes cuenta, <a href="/registro">Regístrate</a></h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="user" className={styles.label}>Usuario</label>
          <input id="user" type="text" value={user} onChange={handleUserChange} required />

          <label htmlFor="passwd" className={styles.label}>Contraseña</label>
          <input id="passwd" type="password" value={passwd} onChange={handlePasswdChange} required />

          <button type="submit" className={styles.formButtonSubmit}>Iniciar sesión</button>

          <div className={styles.formButtons}>
            <button type="reset" className={styles.formButton} onClick={handleClear}>Limpiar Formulario</button>
            <button type="button" className={styles.formButton} onClick={() => window.location.href = '/registro'}>
              Registrarse
            </button>
          </div>
        </form>

    </>
  );
}
