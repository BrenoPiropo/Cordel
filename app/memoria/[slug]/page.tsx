import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './autor.module.css';
import axios from 'axios';
import { 
  FiFileText, FiArrowLeft, FiTag, FiBookOpen, 
  FiCalendar, FiUser, FiInfo, FiLayers, FiExternalLink 
} from 'react-icons/fi';

interface Autor {
  id: number;
  nome: string;
  biografia: string;
  foto_url: string | null;
  pdf_url: string | null;
  slug: string;
  data_publicacao: string;
  escrito_por?: string;
  autoras: string;
  revisao: string;
  admin?: { nome: string };
  palavras_chave: Array<{ id: number; termo: string }>;
  referencias_citadas: Array<{ id: number; nome_referencia: string }>;
}

export default async function PaginaAutor({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let autor: Autor | null = null;

  try {
    const response = await axios.get(`http://localhost:3001/memorial/slug/${slug}`);
    autor = response.data;
  } catch (error) {
    console.error("Erro ao buscar jurista:", error);
    notFound();
  }

  if (!autor) notFound();

  const imageSrc = autor.foto_url?.startsWith('http')
    ? autor.foto_url
    : autor.foto_url ? `http://localhost:3001${autor.foto_url}` : "/placeholder.png";

  return (
    <main className={styles.container}>
      {/* Navegação Estruturada */}
      <nav className={styles.topNav}>
        <Link href="/memoria" className={styles.backLink}>
          <FiArrowLeft /> <span>MEMORIAL DIGITAL</span>
        </Link>
      </nav>

      <article className={styles.article}>
        {/* Hero Section: Nome e Foto */}
        <header className={styles.hero}>
          <div className={styles.imageWrapper}>
            <Image 
              src={imageSrc} 
              alt={autor.nome} 
              width={320} 
              height={420} 
              priority
              className={styles.mainImage}
              unoptimized
            />
            <div className={styles.imageDecoration}></div>
          </div>

          <div className={styles.heroContent}>
            <span className={styles.badge}>Doutrina e História</span>
            <h1 className={styles.authorTitle}>{autor.nome}</h1>
            
            <div className={styles.metaGrid}>
              <div className={styles.metaItem}>
                <FiCalendar className={styles.iconGold} />
                <span>{new Date(autor.data_publicacao).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' })}</span>
              </div>
              <div className={styles.metaItem}>
                <FiUser className={styles.iconGold} />
                <span>Curadoria: <strong>{autor.admin?.nome || 'Equipe Cordel'}</strong></span>
              </div>
            </div>
          </div>
        </header>

        {/* Layout de Leitura Focada */}
        <div className={styles.contentLayout}>
          <div className={styles.mainContent}>
            <section className={styles.biography}>
              <div className={styles.sectionHeader}>
                <FiInfo /> <h2>Sobre o Jurista</h2>
              </div>
              <div className={styles.textBody}>
                {autor.biografia?.split('\n').map((paragrafo, index) => (
                  paragrafo.trim() !== "" && <p key={index}>{paragrafo}</p>
                )) || <p>Biografia em fase de catalogação.</p>}
              </div>
            </section>
          </div>

          <aside className={styles.sidebar}>
            {/* Tags / Palavras-Chave */}
            <section className={styles.sideBlock}>
              <div className={styles.sideHeader}><FiTag /> <h3>Indexação</h3></div>
              <div className={styles.tagsContainer}>
                {autor.palavras_chave.map((p) => (
                  <span key={p.id} className={styles.tagBadge}>{p.termo}</span>
                ))}
              </div>
            </section>

            {/* Créditos da Obra */}
            <section className={styles.sideBlock}>
              <div className={styles.sideHeader}><FiLayers /> <h3>Expediente</h3></div>
              <div className={styles.creditCard}>
                 <p><strong>Pesquisa:</strong> {autor.autoras}</p>
                 <hr className={styles.miniHr} />
                 <p><strong>Revisão:</strong> {autor.revisao}</p>
              </div>
            </section>

            {/* CTA PDF */}
            {autor.pdf_url && (
              <a 
                href={autor.pdf_url.startsWith('http') ? autor.pdf_url : `http://localhost:3001${autor.pdf_url}`}
                target="_blank" 
                className={styles.pdfButton}
              >
                <FiFileText />
                <span>Ver PDF Completo</span>
                <FiExternalLink size={14} />
              </a>
            )}
          </aside>
        </div>

        {/* Rodapé Acadêmico: Referências */}
        {autor.referencias_citadas && autor.referencias_citadas.length > 0 && (
          <footer className={styles.referencesArea}>
            <div className={styles.sectionHeader}>
              <FiBookOpen /> <h2>Fontes Consultadas</h2>
            </div>
            <ul className={styles.refList}>
              {autor.referencias_citadas.map((ref) => (
                <li key={ref.id}>{ref.nome_referencia}</li>
              ))}
            </ul>
          </footer>
        )}
      </article>
    </main>
  );
}