// Asegúrate de que este archivo sea un componente de cliente
'use client';

import styles from "./componentes.module.css";
import Image from "next/image";  
import myImage from "@/public/logo.jpg";
import { useRouter } from 'next/navigation';  // Importar useRouter desde 'next/router'

export default function Header() {
  const router = useRouter();  // Inicializamos el hook router

  // Función para redirigir al inicio
  const handleLoginRedirect = () => {
    router.push('/inicio');  // Redirige a la página de inicio
  };

  return (
    <header className={styles.header}>
      <Image alt="Logo" src={myImage} className={styles.logo} width={100} height={150} />

      <button type="button" onClick={handleLoginRedirect}>
        Mi Cuenta
      </button>
    </header>
  );
}
