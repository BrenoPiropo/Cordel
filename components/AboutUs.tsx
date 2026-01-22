// src/components/AboutUs.tsx (APENAS MUDANDO A IMAGEM)

import React from 'react';
import Image from 'next/image'; 
import styles from './AboutUs.module.css';

const AboutUs: React.FC = () => {
  return (
    <section className={styles.aboutSection}>
      
      <div className={styles.sectionTitleWrapper}>
        <h2 className={styles.sectionTitle}>Quem Somos ? </h2>
      </div>

      <div className={styles.contentGrid}> 
        
        {/* COLUNA 1: TEXTO (Esta deve ser a primeira no código para o UX) */}
        <div className={styles.textContainer}>
          
          <p className={styles.paragraph}>
            Somos um Projeto de Pesquisa e Extensão do curso de Direito da UESC que está aqui para abrir as portas do conhecimento e da interação entre a academia e a sociedade.
          </p>
          
          <p className={`${styles.paragraph} ${styles.highlight}`}>
            Nosso objetivo é estimular e promover a pesquisa científica em Direito, explorando as conexões entre o passado, o presente e o futuro. Queremos desvendar os mistérios da história jurídica e preservar sua memória, enquanto nos engajamos ativamente com a comunidade acadêmica e além.
          </p>
        </div>
        
    {/* COLUNA 2: IMAGEM/LOGO */}
        <div className={styles.imageContainer}>
          {/* Usando o ícone, agora maior */}
          <Image
            src="/CORDEL_ICON_WITHOUT_BG.png" 
            alt="Ícone Representativo do Projeto Cordel"
            width={350} // <-- Aumentamos significativamente a largura
            height={350} // <-- Aumentamos significativamente a altura
            priority={true} 
            className={styles.aboutImage}
            style={{ 
              width: '350px', // O CSS em linha ajuda o Next/Image a definir o layout
              height: '350px', 
              borderRadius: '50%' 
            }}
          />
        </div>

      </div>
    </section>
  );
};

export default AboutUs;