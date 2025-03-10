// app/layout.js
'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from "./page.module.css";
import { AuthProvider } from '../utils/auth';

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="es">
        <body className={styles.container}>
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
