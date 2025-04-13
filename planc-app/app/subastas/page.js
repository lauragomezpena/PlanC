'use client';

import { useEffect, useState, Suspense } from 'react';
import styles from './page.module.css';
import { useSearchParams } from 'next/navigation';
import AuctionCard from './(partials)/AuctionCard/AuctionCard';
import { fetchAuctions } from './utils';

const Auctions = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuctions = async () => {
      const data = await fetchAuctions();
      setAuctions(data);
      setLoading(false);
    };
    loadAuctions();
  }, []);

  const filteredAuctions = auctions.filter((auction) =>
    auction.title.toLowerCase().includes(query) ||
    auction.description.toLowerCase().includes(query) ||
    auction.category_name.toLowerCase().includes(query)
  );

  return (
    <>
      <h1 className={styles.title}>Subastas disponibles</h1>
      <div className={styles.section}>
        {loading ? (
          <p>Cargando subastas...</p>
        ) : filteredAuctions.length > 0 ? (
          filteredAuctions.map((auction) => (
            <AuctionCard
              key={auction.id}
              id={auction.id}
              nombre={auction.title}
              precio={auction.starting_price}
              open={auction.isOpen}
              descripcion={auction.description}
              categoria={auction.category_name}
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
