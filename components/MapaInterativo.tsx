"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import styles from './MapaInterativo.module.css';

const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const PONTOS_AUTORES = [
  {
    id: 1,
    nome: "Cristiano Chaves de Farias",
    cidade: "Salvador - BA",
    coords: [-12.9714, -38.5014] as [number, number],
    slug: "cristiano-chaves",
    imagem: "/Cristiano-Chaves-imagem.png"
  },
  {
    id: 2,
    nome: "Filinto Justiniano Ferreira Bastos",
    cidade: "Feira de Santana - BA",
    coords: [-12.2575, -38.9597] as [number, number],
    slug: "filinto-bastos",
    imagem: "/Filinto-Justiniano-imagem-683x1024.png"
  },
  {
    id: 3,
    nome: "Nestor Duarte Guimarães",
    cidade: "Caetité - BA",
    coords: [-14.0694, -42.4842] as [number, number],
    slug: "nestor-duarte",
    imagem: "/Nestor-Duarte-imagem-683x1024.png"
  }
];

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, 9, { animate: true });
  return null;
}

export default function MapaInterativo() {
  const [foco, setFoco] = useState<[number, number]>([-12.5, -40.0]);
  const [autorSelecionado, setAutorSelecionado] = useState<number | null>(null);

  const selecionarAutor = (autor: typeof PONTOS_AUTORES[0]) => {
    setFoco(autor.coords);
    setAutorSelecionado(autor.id);
  };

  return (
    <div className={styles.wrapper}>
      {/* 📜 LISTA LATERAL */}
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Juristas por Região</h2>
        <div className={styles.list}>
          {PONTOS_AUTORES.map((autor) => (
            <div 
              key={autor.id} 
              className={`${styles.authorCard} ${autorSelecionado === autor.id ? styles.activeCard : ''}`}
              onMouseEnter={() => setFoco(autor.coords)}
              onClick={() => selecionarAutor(autor)}
            >
              <div className={styles.cardMainContent}>
                <div className={styles.avatarWrapper}>
                  <Image src={autor.imagem} alt={autor.nome} width={60} height={60} className={styles.avatar} />
                </div>
                <div className={styles.info}>
                  <p className={styles.name}>{autor.nome}</p>
                  <span className={styles.city}>{autor.cidade}</span>
                </div>
              </div>

              {/* ✨ BOTÃO DINÂMICO: Aparece apenas se o autor estiver selecionado */}
              {autorSelecionado === autor.id && (
                <div className={styles.actionWrapper}>
                  <Link href={`/memoria/${autor.slug}`} className={styles.bioButton}>
                    Ver Biografia Completa →
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* 🗺️ MAPA */}
      <div className={styles.mapBox}>
        <MapContainer center={foco} zoom={6} className={styles.mapInstance}>
          <ChangeView center={foco} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap'
          />
          {PONTOS_AUTORES.map((ponto) => (
            <Marker key={ponto.id} position={ponto.coords} icon={customIcon}>
              <Popup>
                <strong>{ponto.nome}</strong><br/>
                {ponto.cidade}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}