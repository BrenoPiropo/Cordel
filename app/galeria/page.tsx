"use client";

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import styles from './galeria.module.css';

// Importando os estilos do Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FOTOS_CARROSSEL = [
  { id: 1, src: '/cordel_imagem.jpg', alt: 'Equipe Cordel reunida 1' },
  { id: 2, src: '/Cordel.png', alt: 'Equipe Cordel reunida 2' },
  { id: 3, src: '/CORDEL_ICON_WITHOUT_BG.png', alt: 'Equipe Cordel reunida 3' },
];

const IMAGENS_EQUIPE = [
  { id: 1, src: '/CORDEL_ICON_WITHOUT_BG.png', legenda: 'João Silva - Coordenador' },
  { id: 2, src: '/CORDEL_ICON_WITHOUT_BG.png', legenda: 'Maria Souza - Pesquisadora' },
  { id: 3, src: '/CORDEL_ICON_WITHOUT_BG.png', legenda: 'Carlos Mendes - Desenvolvedor' },
  { id: 4, src: '/CORDEL_ICON_WITHOUT_BG.png', legenda: 'Ana Lúcia - Designer' },
  { id: 5, src: '/CORDEL_ICON_WITHOUT_BG.png', legenda: 'Rafael Costa - Editor' },
  { id: 6, src: '/CORDEL_ICON_WITHOUT_BG.png', legenda: 'Beatriz Lima - Conteúdo' },
];

export default function GaleriaPage() {
  return (
    <main className={styles.container}>
      {/* 🎡 CARROSSEL DE EQUIPE (BANNER) */}
      <section className={styles.carouselSection}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          className={styles.swiperContainer}
        >
          {FOTOS_CARROSSEL.map((foto) => (
            <SwiperSlide key={foto.id}>
              <div className={styles.slideWrapper}>
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  className={styles.carouselImage}
                  priority
                />
                <div className={styles.slideOverlay}>
                  <span>{foto.alt}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 🖼️ CONTEÚDO DA GALERIA (GRID) */}
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Nossa Equipe</h1>
        <p className={styles.description}>
          Conheça os rostos por trás do projeto Memória Digital.
        </p>

        <div className={styles.galleryGrid}>
          {IMAGENS_EQUIPE.map((imagem) => (
            <div key={imagem.id} className={styles.galleryItem}>
              <Image
                src={imagem.src}
                alt={imagem.legenda}
                width={400}
                height={300}
                className={styles.image}
                loading="lazy"
              />
              <p className={styles.caption}>{imagem.legenda}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}