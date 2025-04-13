"use client";
import { subastas } from './constants';
import styles from './page.module.css';
import { useSearchParams } from 'next/navigation';
import AuctionCard from './(partials)/AuctionCard/AuctionCard';
import { handleAuction, createAuction } from './utils';

const Auctions = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  // Filtrado por búsqueda (en nombre, descripción o categoría)
  const filteredSubastas = subastas.filter((auction) =>
    auction.nombre.toLowerCase().includes(query) ||
    auction.descripcion.toLowerCase().includes(query) ||
    auction.categoria.toLowerCase().includes(query)
  );
  return (
      <>
      <h1 className={styles.title}>Subastas disponibles</h1>
      <div className={styles.section}>
        {filteredSubastas.length > 0 ? (
          filteredSubastas.map((auction) => (
          <AuctionCard 
          key= {auction.nombre}
          id = {auction.id}
          nombre= {auction.nombre}
          precio= {auction.precio}
          open= {auction.open}
          descripcion= {auction.descripcion}
          categoria= {auction.categoria}
          />
        ))
        ) : (
          <p>No se encontraron resultados </p> )}

    </div>
    </>
  );
}
export default Auctions;