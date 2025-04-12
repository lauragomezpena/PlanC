'use client';

import styles from "../page.module.css";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProvinceLocalitySelector  from "./(partials)/ProvinceLocalitySelector";  
import { doRegister } from "./utils";


export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    birth_date: '',
    locality: '',
    municipality: ''
  });
  const [province, setProvince] = useState('');
  const [locality, setLocality] = useState(''); 
  const [loading, setLoading] = useState(false);

  const router = useRouter();


  useEffect(() => {
    if (formData.locality) {
      setCiudades(comunidades[formData.locality] || []);
      setFormData(prevState => ({
        ...prevState,
        municipality: '' // Reset municipio when locality changes
      }));
    }
  }, [formData.locality]);


  const validatePassword = (password) => {
    const regEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regEx.test(password);
  };



  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);  
    const userData = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      birth_date: formData.get('birth_date'),
      locality: formData.get('locality'),
      municipality: formData.get('province')
    }; 
    if (userData.password !== userData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    if (!validatePassword(userData.password)) {
      setError('La contraseña debe tener al menos 8 caracteres y contener letras y números');
      return;
    }
    
    delete userData.confirmPassword;

    if (userData.birth_date) {
      const date = new Date(userData.birth_date);
      if (isNaN(date.getTime())) {
        setError('Fecha de nacimiento inválida');
        return;
      }
      userData.birth_date = date.toISOString().split('T')[0];
    }

    try { 
      const userRegistered = await doRegister(userData);
      if (userRegistered.error) {
        alert(userRegistered.error);
        return;
      }
      console.log("Datos que se van a registrar:", userData);
      alert('Usuario registrado correctamente');
      router.push('/inicio')
    } catch { alert('Error al registrar el usuario'); }
  }

  return (
    <div>
      <h1>Regístrate en Plan C</h1>
      <h2>Si ya tienes cuenta, Inicia Sesión</h2>


      <form onSubmit={handleOnSubmit} className={styles.form}>
        <label htmlFor="username" className={styles.label}>Nombre de usuario</label>
        <input
          type="text"
          id="username"
          name="username"
          required      
        />

        <label htmlFor="email" className={styles.label}>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="ejemplo@correo.com"
        />

        <label htmlFor="password" className={styles.label}>Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          placeholder="Mínimo 8 caracteres, letras y números"
        />

        <label htmlFor="confirmPassword" className={styles.label}>Confirmar contraseña</label>
        <input
          type="password" 
          id="confirmPassword"
          name="confirmPassword"
          required
          placeholder="Repite la contraseña"
        />

        <label htmlFor="first_name" className={styles.label}>Nombre</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          required
          placeholder="Tu nombre"
        />

        <label htmlFor="last_name" className={styles.label}>Apellidos</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          required
          placeholder="Tus apellidos"
        />

        <label htmlFor="birth_date" className={styles.label}>Fecha de nacimiento (AAAA-MM-DD)</label>
        <input
          type="date"
          id="birth_date"
          name="birth_date"
          required
        />

        <ProvinceLocalitySelector
        province={province}
        setProvince={setProvince}
        locality={locality}
        setLocality= {setLocality}/>

        <button 
          type="submit" 
          className={styles.formButtonSubmit} 
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
        
        <div className={styles.formButtons}>
          <button className={styles.formButton} type="reset">
            Limpiar Formulario
          </button>
          <button
            className={styles.formButton}
            type="button"
            onClick={() => router.push('/inicio')}
          >
            Inicio de Sesión
          </button>
        </div>
      </form>
    </div>
  );
};
