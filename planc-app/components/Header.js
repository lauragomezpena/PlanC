'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '../utils/auth'; // Asegúrate de que la ruta sea correcta
import styles from './componentes.module.css';
import myImage from '@/public/logo.jpg';

export default function Header() {
  const router = useRouter();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <header className={styles.header}>
      <Image
        alt="Logo"
        src={myImage}
        className={styles.logo}
        width={100}
        height={150}
        onClick={handleLogoClick}
      />
      <nav className={styles.navLink}>
        {currentUser ? (
          <>
            <Link className={styles.navLink} href="/informacion">
              Mi Cuenta
            </Link>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link className={styles.navLink} href="/inicio">
              Iniciar Sesión
            </Link>
            <Link href="/registro">Registrarse</Link>
          </>
        )}
      </nav>
    </header>
  );
}
