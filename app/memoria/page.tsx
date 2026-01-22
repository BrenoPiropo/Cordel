"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // 1. Importamos o componente Link
import styles from './memoria.module.css';

interface Autor {
  id: number;
  nome: string;
  texto: string;
  imagem: string;
  slug: string; // 2. Adicionamos o slug para a URL amigável
}

const AUTORES: Autor[] = [
  {
    id: 1,
    nome: "Cristiano Chaves de Farias",
    texto: "Cristiano Chaves de Farias (1971-2023) foi um promotor de justiça e professor universitário. Nasceu na cidade de Salvador, no dia 10 de outubro de 1971, onde passou toda a sua vida e construiu sua jornada acadêmica.",
    imagem: "/Cristiano-Chaves-imagem.png",
    slug: "cristiano-chaves"
  },
  {
    id: 2,
    nome: "Filinto Justiniano Ferreira Bastos",
    texto: "Filinto Justiniano Ferreira Bastos (1856-1939) foi um proeminente jurista, magistrado, professor da Faculdade de Direito da Bahia e abolicionista baiano.",
    imagem: "/Filinto-Justiniano-imagem-683x1024.png",
    slug: "filinto-bastos"
  },
  {
    id: 3,
    nome: "Nestor Duarte Guimarães",
    texto: "Nestor Duarte Guimarães foi um importante jurista, romancista e político baiano, nascido em Caetité (BA) no dia 03 de dezembro de 1902.",
    imagem: "/Nestor-Duarte-imagem-683x1024.png",
    slug: "nestor-duarte"
  }
];

export default function MemoriaPage() {
  const [idExpandido, setIdExpandido] = useState<number | null>(null);

  const toggleAutor = (id: number) => {
    setIdExpandido(idExpandido === id ? null : id);
  };

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <Image 
          src="/memorial-de-e1747782698543.png" 
          alt="Logotipo Cordel Memória Digital" 
          width={600} 
          height={300} 
          priority
          className={styles.heroLogo}
        />
      </div>

      <section className={styles.intro}>
        <div className={styles.container}>
          <p>
            Clique nos nomes abaixo para conhecer a trajetória dos juristas que moldaram o Direito baiano.
          </p>
        </div>
      </section>

      <section className={styles.authorsSection}>
        <div className={styles.container}>
          <div className={styles.accordion}>
            {AUTORES.map((autor) => (
              <div key={autor.id} className={styles.accordionItem}>
                <button 
                  className={`${styles.itemHeader} ${idExpandido === autor.id ? styles.active : ''}`}
                  onClick={() => toggleAutor(autor.id)}
                >
                  <span className={styles.authorName}>{autor.nome}</span>
                  <span className={styles.icon}>{idExpandido === autor.id ? '−' : '+'}</span>
                </button>

                <div className={`${styles.itemContent} ${idExpandido === autor.id ? styles.show : ''}`}>
                  <div className={styles.contentInner}>
                    <div className={styles.authorImageWrapper}>
                      <Image 
                        src={autor.imagem} 
                        alt={autor.nome} 
                        width={150} 
                        height={150} 
                        className={styles.authorImage}
                      />
                    </div>
                    <div className={styles.authorInfo}>
                      <p>{autor.texto}</p>
                      
                      {/* 3. Transformamos o botão em um Link dinâmico */}
                      <Link 
                        href={`/memoria/${autor.slug}`} 
                        className={styles.readMoreBtn}
                      >
                        Leia a Biografia Completa
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}