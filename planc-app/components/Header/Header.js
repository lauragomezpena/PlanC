'use client';

import React, { useEffect, useState } from 'react';  
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './styles.module.css';
import myImage from '@/public/logo.jpg';

export default function Header() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // Acceder a localStorage solo en el cliente
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem("token-jwt"));
      setUserName(localStorage.getItem("userName"));
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("token-jwt");
      localStorage.removeItem('userName');
    }
    setToken(null);
    setUserName(null);
    window.location.reload();
    router.push('/');
  };

  const handleCuenta = () => {
    router.push('/informacion');
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  const handleInicio = () => {
    router.push('/inicio');
  };

  const handleRegistro = () => {
    router.push('/registro');
  };
  
  const handleCrear = () => {
    router.push('/crearSubasta');
  };
  
  const handleSubastas = () => {
    router.push('/misSubastas');
  };

  const handlePujas = () =>{
    router.push('/misPujas');
  };
  return (
    <header className={styles.header}>
      <Link href="/" passHref>
        <Image
          alt="Logo"
          src={myImage}
          className={styles.logo}
          width={100}
          height={150}
          onClick={handleLogoClick}
        />
      </Link>
      <nav className={styles.navLink}>
        {token ? (
          <div className={styles.formButtons}>
            <button onClick={handleCuenta} className={styles.formButton}>
              Mi Cuenta
            </button>
            <button onClick={handleSubastas} className={styles.formButton}>
              Mis Subastas
            </button>
            <a />
            <button onClick={handlePujas} className={styles.formButton}>
              Mis Pujas
            </button>
            <a />
            <button onClick={handleLogout} className={styles.formButton}>
              Cerrar sesión
            </button>
            <a />
            <button onClick={handleCrear} className={styles.formButton}>
              +
            </button>
          </div>
        ) : (
          <>
            <button onClick={handleInicio} className={styles.formButton}>
              Iniciar sesión
            </button>
            <a />
            <button onClick={handleRegistro} className={styles.formButton}>
              Registrarse
            </button>
          </>
        )}
      </nav>
    </header>
  );
}