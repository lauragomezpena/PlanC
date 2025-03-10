// app/layout.js
'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuthProvider } from '../utils/auth';

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="es">
        <body>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
