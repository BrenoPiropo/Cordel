"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image'; 
import axios from 'axios';
import styles from './AboutUs.module.css';

const AboutUs: React.FC = () => {
  const [dados, setDados] = useState({
    titulo: 'Quem Somos?',
    conteudo: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstitucional = async () => {
      try {
        const res = await axios.get('http://localhost:3001/institucional');
        if (res.data) {
          setDados({
            titulo: res.data.about_titulo,
            conteudo: res.data.about_conteudo
          });
        }
      } catch (error) {
        console.error("Erro ao carregar dados do Quem Somos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitucional();
  }, []);

  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        
        <div className={styles.contentGrid}> 
          
          {/* COLUNA 1: TEXTO DINÂMICO */}
          <div className={styles.textContainer}>
            <h2 className={styles.sectionTitle}>
              {loading ? 'Carregando...' : dados.titulo}
            </h2>
            <div className={styles.divider}></div>
            
            {loading ? (
              <div className={styles.skeletonText}></div>
            ) : (
              // Usamos white-space: pre-wrap no CSS para respeitar as quebras de linha do textarea
              <p className={styles.paragraph}>
                {dados.conteudo}
              </p>
            )}
            
            {/* Mantemos a identidade visual de impacto se não houver conteúdo */}
            {!loading && !dados.conteudo && (
              <p className={styles.paragraph}>
                Seja bem-vindo ao Projeto Cordel. Explore nossa história através do menu.
              </p>
            )}
          </div>
          
          {/* COLUNA 2: IMAGEM (Mantida Estática conforme seu design) */}
          <div className={styles.imageWrapper}>
            <div className={styles.woodcutFrame}>
              <Image
                src="/cordel_imagem.jpg" 
                alt="Ilustração do Projeto Cordel"
                width={450}
                height={450}
                priority={true} 
                className={styles.aboutImage}
              />
            </div>
            <div className={styles.decorativeShape}></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;