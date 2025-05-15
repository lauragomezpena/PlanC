'use client';

import React, { useEffect, useState } from 'react';  
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './styles.module.css';
import myImage from '@/public/logo.jpg';
import Button from "../Button/button";

export default function Header() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    
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
  const handleComentarios = () =>{
    router.push('/misComentarios');
  };
  const handleRatings = () =>{
    router.push('/misRatings');
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
 
            <Button
            label="Mi cuenta"
            type="submit"
            onClick={handleCuenta} 
            />
            
            <Button label = "Mis Subastas" onClick={handleSubastas}/>
            <a />
            <Button label = "Mis Pujas" onClick={handlePujas}/>
            <a />
            <Button label = "Mis Comentarios" onClick={handleComentarios}/>
            <a />
            <Button label = "Mis Ratings" onClick={handleRatings}/>
            <a />
            <Button label = "Cerrar sesión" onClick={handleLogout} />
            <a />
            <Button label = "+" onClick={handleCrear} />
          </div>
        ) : (
          <>
            <Button label = "Iniciar sesión" onClick={handleInicio}/>
            <a />
            <Button label ="Registrarse" onClick={handleRegistro}/>
          </>
        )}
      </nav>
    </header>
  );
}