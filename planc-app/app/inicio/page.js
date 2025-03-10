'use client';
import React, { useState } from 'react';
import { saveToken } from '../../utils/auth'; // Si lo necesitas, aunque en esta función se guarda directamente en localStorage
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../page.module.css';

// Función asíncrona de login tal como la proporcionaste
const login = async (username, password) => {
  try {
    const response = await fetch(
      "https://das-p2-backend.onrender.com/api/users/login/",
      {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const tokenData = await response.json();
    localStorage.setItem("accessToken", tokenData.access);
    return tokenData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function Login() {
  const [user, setUser] = useState('');
  const [passwd, setPasswd] = useState('');
  const [error, setError] = useState('');

  const handleUserChange = (e) => setUser(e.target.value);
  const handlePasswdChange = (e) => setPasswd(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const tokenData = await login(user, passwd);
    if (tokenData && tokenData.access) {
      // Login exitoso: redirige a la página principal
      window.location.href = '/';
    } else {
      setError('Error al iniciar sesión');
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
        <h2>
          Si no tienes cuenta, <a href="/registro">Regístrate</a>
        </h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="user" className={styles.label}>Usuario</label>
          <input
            id="user"
            type="text"
            value={user}
            onChange={handleUserChange}
            required
          />

          <label htmlFor="passwd" className={styles.label}>Contraseña</label>
          <input
            id="passwd"
            type="password"
            value={passwd}
            onChange={handlePasswdChange}
            required
          />

          <button type="submit" className={styles.formButtonSubmit}>
            Iniciar sesión
          </button>

          <div className={styles.formButtons}>
            <button
              type="reset"
              className={styles.formButton}
              onClick={handleClear}
            >
              Limpiar Formulario
            </button>
            <button
              type="button"
              className={styles.formButton}
              onClick={() => window.location.href = '/registro'}
            >
              Registrarse
            </button>
          </div>
        </form>
        </>  );
}
