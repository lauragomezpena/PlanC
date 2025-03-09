"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getToken, removeToken, isAuthenticated } from '../utils/auth';
import styles from './componentes.module.css'

export default function Header() {
  const router = useRouter();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    removeToken();
    router.push('/');
  };

  return (
    <header className={styles.header}>
      <h1>Plan C</h1>
      <nav>
        {authenticated ? (
          <>
            <Link href="/dashboard">Mi Cuenta</Link>
            <button onClick={handleLogout} className={styles.logoutButton}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link href="/login">Iniciar Sesión</Link>
            <Link href="/registro">Registrarse</Link>
          </>
        )}
      </nav>
    </header>
  );
}
