"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MapaInterativo.module.css';

// Configuração do Ícone do Leaflet
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Interface baseada na sua Entity Memorial
interface AutorPonto {
  id: number;
  nome: string;
  latitude: string; // O MySQL Decimal costuma vir como string no JSON
  longitude: string;
  slug: string;
  foto_url: string | null;
  biografia: string;
}

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, map.getZoom(), { animate: true });
  return null;
}

export default function MapaInterativo() {
  const [autores, setAutores] = useState<AutorPonto[]>([]);
  const [foco, setFoco] = useState<[number, number]>([-12.5, -40.0]);
  const [autorSelecionado, setAutorSelecionado] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Busca os dados reais do Back-end
  useEffect(() => {
    axios.get('http://localhost:3001/memorial')
      .then(res => {
        setAutores(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao carregar mapa:", err);
        setLoading(false);
      });
  }, []);

  const selecionarAutor = (autor: AutorPonto) => {
    const coords: [number, number] = [Number(autor.latitude), Number(autor.longitude)];
    setFoco(coords);
    setAutorSelecionado(autor.id);
  };

  if (loading) return <p>Carregando coordenadas dos juristas...</p>;

  return (
    <div className={styles.wrapper}>
      {/* 📜 LISTA LATERAL DINÂMICA */}
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Juristas por Região</h2>
        <div className={styles.list}>
          {autores.map((autor) => {
            const coords: [number, number] = [Number(autor.latitude), Number(autor.longitude)];
            return (
              <div 
                key={autor.id} 
                className={`${styles.authorCard} ${autorSelecionado === autor.id ? styles.activeCard : ''}`}
                onMouseEnter={() => setFoco(coords)}
                onClick={() => selecionarAutor(autor)}
              >
                <div className={styles.cardMainContent}>
                  <div className={styles.avatarWrapper}>
                    <Image 
                      src={autor.foto_url?.startsWith('http') 
                        ? autor.foto_url 
                        : autor.foto_url 
                          ? `http://localhost:3001${autor.foto_url}` 
                          : "/CORDEL_ICON_WITHOUT_BG.png"
                      } 
                      alt={autor.nome} 
                      width={60} 
                      height={60} 
                      className={styles.avatar} 
                    />
                  </div>
                  <div className={styles.info}>
                    <p className={styles.name}>{autor.nome}</p>
                    <span className={styles.city}>Ver no mapa</span>
                  </div>
                </div>

                {autorSelecionado === autor.id && (
                  <div className={styles.actionWrapper}>
                    <Link href={`/memoria/${autor.slug}`} className={styles.bioButton}>
                      Ver Biografia Completa →
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* 🗺️ MAPA DINÂMICO */}
      <div className={styles.mapBox}>
        <MapContainer center={foco} zoom={6} className={styles.mapInstance}>
          <ChangeView center={foco} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap'
          />
          
          {autores.map((ponto) => (
            <Marker 
              key={ponto.id} 
              position={[Number(ponto.latitude), Number(ponto.longitude)]} 
              icon={customIcon}
            >
              <Popup>
                <div style={{ textAlign: 'center' }}>
                  <strong>{ponto.nome}</strong><br/>
                  <Link href={`/memoria/${ponto.slug}`} style={{ fontSize: '12px', color: '#8b4513' }}>
                    Ver biografia
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}