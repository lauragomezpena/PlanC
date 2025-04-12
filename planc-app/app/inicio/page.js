'use client';
import styles from "../page.module.css";
import React from "react";
import Link from "next/link";
import { doLogin } from "./utils";
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function LoginPage() {

  const router = useRouter();
  const [error, setError] = useState('');
  const[loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const handleClear = () => {
    setFormData({
      username: '',
      password: ''
    });
  };

  const handleOnSubmit = async(event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const user = formData.get('username');
    const passwd = formData.get('password');

    setLoading(true);
    try {
      const userLogged = await doLogin(user, passwd);

      if (userLogged.error) {
        alert(userLogged.error);
        return; 
    }

    localStorage.setItem("token-jwt", userLogged.access);
    localStorage.setItem("userName", userLogged.username);

    
    router.push('/'); 
    
    }
    catch{ alert("Algo salio mal");
    }
   
    finally {
      setLoading(false);  
      router.refresh();
    }
  };

  

  return (

      <div>
        <h1>Inicia sesión en tu cuenta</h1>
        <br />
        <h2>Si no tienes cuenta, <a href="/registro">Regístrate</a></h2>
        
        
        <form className={styles.form} onSubmit={handleOnSubmit}>
        <label htmlFor="user" className={styles.label}>Usuario</label>
          <input
            type="text"
            required
            name="username"
          />
          <label htmlFor="passwd" className={styles.label}>Contraseña</label>
          <input
            type="password"
            required
            name = "password"
          />
          <button 
            type="submit" 
            className={styles.formButtonSubmit}
            disabled={loading}
          >
            {loading ? 'Procesando...' : 'Iniciar sesión'}
          </button>
          
          <div className={styles.formButtons}>
            <button type="reset" className={styles.formButton} onClick={handleClear}>Limpiar Formulario</button>
            <button type="button" className={styles.formButton} onClick={() => window.location.href = '/registro'}>
              Registrarse
            </button>
          </div>
        </form>
      </div>

  );
}