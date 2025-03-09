'use client';

import styles from "./componentes.module.css";
import Image from "next/image";  
import myImage from "@/public/logo.jpg";
import { useRouter } from 'next/navigation';  

export default function Header() {
  const router = useRouter();  

  const handleLoginRedirect = () => {
    router.push('/inicio');  
  };

  const handleLogoClick = () => {
    router.push('/');  
  };

  return (
    <header className={styles.header}>
      <Image alt="Logo" src={myImage} className={styles.logo} width={100} height={150}  onClick={handleLogoClick} />

      <button type="button" onClick={handleLoginRedirect}>
        Mi Cuenta
      </button>
    </header>
  );
}
