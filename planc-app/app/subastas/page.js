'use client';

import { useEffect, useState, Suspense } from 'react';
import styles from './page.module.css';
import { useSearchParams } from 'next/navigation';
import AuctionCard from './(partials)/AuctionCard/AuctionCard';
import { fetchAuctions } from './utils';

const Auctions = () => {
  
  const searchParams = useSearchParams();
  const filters = {
  search: searchParams.get('q')?.toLowerCase() || '',
  category: searchParams.get('category') || '',
  rating: searchParams.get('rating') || '',
  open: searchParams.get('open') || '', // o 'open' / 'closed'
};

  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const loadAuctions = async () => {
    const data = await fetchAuctions(filters);
    setAuctions(data);
    setLoading(false);
  };
  loadAuctions();
}, [searchParams.toString()]);

  return (
    <>
      <h1 className={styles.title}>Subastas disponibles</h1>
      <div className={styles.section}>
        {loading ? (
          <p>Cargando subastas...</p>
        ) : auctions.length > 0 ? (
          auctions.map((auction) => (
            <AuctionCard
              key={auction.id}
              id={auction.id}
              nombre={auction.title}
              precio={auction.starting_price}
              open={auction.isOpen}
              descripcion={auction.description}
              categoria={auction.category_name}
              imagen = {auction.image}
            />
          ))
        ) : (
          <p>No se encontraron resultados</p>
        )}
      </div>
    </>
  );
};

export default function AuctionsPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Auctions />
    </Suspense>
  );
}
