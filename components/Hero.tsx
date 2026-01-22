// src/components/Hero.tsx
"use client"; // Marca como Cliente Component se usarmos hooks, mas aqui é só para prática

import React from 'react';
import styles from './Hero.module.css';
import Link from 'next/link';


interface HeroProps {

  title?: string;
  subtitle?: string;
}

// O componente é tipado com React.FC (Function Component) recebendo HeroProps
const Hero: React.FC<HeroProps> = () => {
  return (
    // Usa o nome da classe do CSS Module
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        {/* Título (Headline Principal) */}
        <h1 className={styles.headline}>
          CORDEL: História & Direito. Memória Jurídica Acessível.
        </h1>

        {/* Subtítulo (Proposta de Valor) */}
        <p className={styles.subtitle}>
          Acesse biografias de grandes juristas brasileiros em formato cordel e artigos acadêmicos relevantes.
        </p>
        
        {/* CTA Principal */}
        <Link href="/juristas" className={styles.ctaButton}>
          Conheça os Juristas
        </Link>
      </div>

      {/* Placeholder para Imagem de Xilogravura */}
      <div className={styles.heroImagePlaceholder}>
        {/* Aqui usaremos 'Next/Image' futuramente para otimização */}
        <p>[Visual: Xilogravura ou Imagem Marcante]</p>
      </div>
    </section>
  );
};

export default Hero;