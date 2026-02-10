import React from 'react';
import Image from 'next/image'; 
import styles from './AboutUs.module.css';

const AboutUs: React.FC = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        
        <div className={styles.contentGrid}> 
          
          {/* COLUNA 1: TEXTO */}
          <div className={styles.textContainer}>
            <h2 className={styles.sectionTitle}>Quem Somos?</h2>
            <div className={styles.divider}></div>
            
            <p className={styles.paragraph}>
              Somos um Projeto de Pesquisa e Extensão do curso de Direito da <strong>UESC</strong> que está aqui para abrir as portas do conhecimento e da interação entre a academia e a sociedade.
            </p>
            
            <p className={`${styles.paragraph} ${styles.highlight}`}>
              Nosso objetivo é estimular e promover a pesquisa científica em Direito, explorando as conexões entre o passado, o presente e o futuro. Queremos preservar a memória jurídica enquanto nos engajamos ativamente com a comunidade.
            </p>
          </div>
          
          {/* COLUNA 2: IMAGEM COM UX AVANÇADO */}
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
            {/* Elemento decorativo de fundo para dar profundidade */}
            <div className={styles.decorativeShape}></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;