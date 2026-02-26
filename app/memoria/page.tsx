"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import styles from './memoria.module.css';

// Interface baseada na sua tabela de Memorial/Autores
interface Autor {
  id: number;
  nome: string;
  biografia: string; // Verifique se no banco é 'texto' ou 'biografia'
  foto_url: string | null;
  slug: string;
}

export default function MemoriaPage() {
  const [autores, setAutores] = useState<Autor[]>([]);
  const [idExpandido, setIdExpandido] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Busca os autores do Back-end
  useEffect(() => {
    axios.get('http://localhost:3001/memorial') // Verifique se sua rota é /memorial ou /autores
      .then(response => {
        setAutores(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao carregar memorial:", err);
        setLoading(false);
      });
  }, []);

  const toggleAutor = (id: number) => {
    setIdExpandido(idExpandido === id ? null : id);
  };

  if (loading) return <div className={styles.main}><p>Carregando Memorial...</p></div>;

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
            {autores.map((autor) => (
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
                        // Lógica para carregar imagem do back-end ou placeholder
                        src={autor.foto_url?.startsWith('http') 
                          ? autor.foto_url 
                          : autor.foto_url 
                            ? `http://localhost:3001${autor.foto_url}` 
                            : "/CORDEL_ICON_WITHOUT_BG.png"
                        } 
                        alt={autor.nome} 
                        width={150} 
                        height={150} 
                        className={styles.authorImage}
                      />
                    </div>
                    <div className={styles.authorInfo}>
                      {/* Mostra um resumo da biografia no acordeão */}
                      <p>
                        {autor.biografia.length > 200 
                          ? autor.biografia.substring(0, 200) + '...' 
                          : autor.biografia}
                      </p>
                      
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