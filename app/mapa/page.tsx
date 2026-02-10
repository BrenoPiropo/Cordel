"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import styles from './mapa.module.css';

// Carregamento dinâmico do componente do mapa para evitar erro de SSR
const MapaInterativo = dynamic(() => import('@/components/MapaInterativo'), { 
  ssr: false,
  loading: () => <p className={styles.loading}>Carregando mapa interativo...</p>
});

export default function MapaPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Geografia do Direito Baiano</h1>
      <p className={styles.description}>
        Explore as cidades de origem dos grandes juristas que compõem nosso memorial.
      </p>
      
      <div className={styles.mapContainer}>
        <MapaInterativo />
      </div>
    </main>
  );
}