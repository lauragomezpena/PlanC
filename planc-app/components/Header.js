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
  const handleCuenta = () => {
    logout();
    router.push('/informacion');
  };

  const handleLogoClick = () => {
    router.push('/');
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
        {currentUser ? (
          <div className={styles.formButtons}>
            <button  onClick={handleCuenta} className={styles.formButton}>
            Mi Cuenta
            </button>
            
            <button onClick={handleLogout} className={styles.formButton}>
              Cerrar sesión
            </button>
          </div>
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
