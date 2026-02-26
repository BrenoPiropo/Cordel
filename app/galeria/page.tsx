"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import styles from './galeria.module.css';
import axios from 'axios';

// Importando os estilos do Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Foto {
  id: number;
  url: string;
  legenda: string;
  tipo: 'EQUIPE' | 'CARROSSEL';
}

export default function GaleriaPage() {
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGaleria();
  }, []);

  const fetchGaleria = async () => {
    try {
      // Busca todas as fotos cadastradas no backend
      const res = await axios.get('http://localhost:3001/galeria');
      setFotos(res.data);
    } catch (error) {
      console.error("Erro ao carregar galeria:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filtramos os dados dinamicamente
  const fotosCarrossel = fotos.filter(f => f.tipo === 'CARROSSEL');
  const fotosEquipe = fotos.filter(f => f.tipo === 'EQUIPE');

  // URL base para as imagens do backend
  const API_URL = 'http://localhost:3001';

  if (loading) return <div className={styles.loading}>Carregando galeria...</div>;

  return (
    <main className={styles.container}>
      
      {/* 🎡 CARROSSEL DINÂMICO (BANNER) */}
      <section className={styles.carouselSection}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          className={styles.swiperContainer}
        >
          {fotosCarrossel.length > 0 ? (
            fotosCarrossel.map((foto) => (
              <SwiperSlide key={foto.id}>
                <div className={styles.slideWrapper}>
                  <Image
                    src={`${API_URL}${foto.url}`}
                    alt={foto.legenda || 'Imagem do carrossel'}
                    fill
                    className={styles.carouselImage}
                    priority
                    unoptimized
                  />
                  {foto.legenda && (
                    <div className={styles.slideOverlay}>
                      <span>{foto.legenda}</span>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))
          ) : (
            // Placeholder caso não existam fotos de carrossel no banco
            <SwiperSlide>
               <div className={styles.slideWrapper}>
                  <Image src="/cordel_imagem.jpg" alt="Banner Padrão" fill className={styles.carouselImage} priority />
               </div>
            </SwiperSlide>
          )}
        </Swiper>
      </section>

      {/* 🖼️ GRADE DA EQUIPE DINÂMICA (GRID) */}
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Nossa Equipe</h1>
        <p className={styles.description}>
          Conheça os rostos por trás do projeto cordel.
        </p>

        <div className={styles.galleryGrid}>
          {fotosEquipe.map((imagem) => (
            <div key={imagem.id} className={styles.galleryItem}>
              <div className={styles.imageContainer}>
                <Image
                  src={`${API_URL}${imagem.url}`}
                  alt={imagem.legenda}
                  width={400}
                  height={450}
                  className={styles.image}
                  loading="lazy"
                  unoptimized
                />
              </div>
              <p className={styles.caption}>{imagem.legenda}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}