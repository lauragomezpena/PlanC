"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import myImage from "@/public/logo.jpg";
import { getToken, removeToken, isAuthenticated } from '../utils/auth';
import styles from './componentes.module.css'

export default function Header() {
  const router = useRouter();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    removeToken();
    router.push('/');
  };
  const handleLogoClick = () => {
    router.push('/');  
  };

  return (
    <header className={styles.header}>
      <Image alt="Logo" src={myImage} className={styles.logo} width={100} height={150}  onClick={handleLogoClick}  />
      <nav className = {styles.navLink}>
        {authenticated ? (
          <>
            <Link className = {styles.navLink} href="/dashboard">Mi Cuenta</Link>
            <button onClick={handleLogout} className={styles.logoutButton}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link className = {styles.navLink} href="/login">Iniciar Sesión</Link>
            
            <Link href="/registro">Registrarse</Link>
          </>
        )}
      </nav>
    </header>
  );
}
