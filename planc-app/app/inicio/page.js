'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';  // Si estás usando Next.js
import Header from '../../components/Header';  
import Footer from '../../components/Footer';
import styles from '../page.module.css'

export default function Login() {
  const [user, setUser] = useState('');
  const [passwd, setPasswd] = useState('');
  const router = useRouter();  // Para redirigir a otras páginas

  // Manejar cambios en los inputs
  const handleUserChange = (e) => setUser(e.target.value);
  const handlePasswdChange = (e) => setPasswd(e.target.value);

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de inicio de sesión (aquí solo redirigimos como ejemplo)
    router.push('/dashboard');  // Redirigir a una página de usuario después de iniciar sesión
  };

  // Limpiar formulario
  const handleClear = () => {
    setUser('');
    setPasswd('');
  };

  return (
    <>
      <Header /> 
      <main className={styles.main}>
        <h1>Inicia sesión en tu cuenta</h1>
        <h2>Si no tienes cuenta, Regístrate</h2>

        <form onSubmit={handleSubmit} className = {styles.form}>
          <label htmlFor="user">Usuario</label>
          <input
            id="user"
            type="text"
            value={user}
            onChange={handleUserChange}
          />

          <label htmlFor="passwd">Contraseña</label>
          <input
            id="passwd"
            type="password"
            value={passwd}
            onChange={handlePasswdChange}
          />

          <button type="submit" className ={styles.formButton} >Iniciar sesión</button>

          <div className="formButtons">
            <button type="reset" className = {styles.formButton} onClick={handleClear}>Limpiar Formulario</button>
            <button type="button" className = {styles.formButton} onClick={() => router.push('/register')}>Register</button>
          </div>
        </form>
      </main>

      <Footer /> 
    </>
  );
}
