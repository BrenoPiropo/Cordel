import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './post.module.css';
import axios from 'axios';

// Interface para tipar os dados que vêm do NestJS
interface BlogPost {
  id: number;
  titulo: string;
  conteudo: string; // Coluna 'texto' no banco
  imagem_url: string | null; // <--- Nome exato que vem do banco agora  slug: string;
  data_criada: string;
  admin: {
    nome: string;
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post: BlogPost | null = null;

  try {

    // Criamos essa rota no NestJS anteriormente: GET /blog/slug/:slug
    const response = await axios.get(`http://localhost:3001/blog/slug/${slug}`);
    post = response.data;
  } catch (error) {
    console.error("Erro ao buscar post:", error);
    notFound();
  }

  if (!post) notFound();

  // Formatação da URL da imagem
  const imageSrc = post.imagem_url?.startsWith('http')
    ? post.imagem_url
    : post.imagem_url
    ? `http://localhost:3001${post.imagem_url}`
    : "/CORDEL_ICON_WITHOUT_BG.png";

  return (
    <main className={styles.container}>
      <Link href="/blog" className={styles.backLink}>← Voltar para o Blog</Link>

      <article className={styles.article}>
        <header className={styles.header}>
          <span className={styles.date}>
            {new Date(post.data_criada).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            })} — por <strong>{post.admin?.nome || 'Equipe Cordel'}</strong>
          </span>
          <h1 className={styles.title}>{post.titulo}</h1>
        </header>

        <div className={styles.mainImageWrapper}>
          <Image 
            src={imageSrc} 
            alt={post.titulo} 
            fill 
            priority
            className={styles.mainImage} 
          />
        </div>

        <section className={styles.content}>
          {/* O conteúdo do banco vem como uma string única. 
              Separamos por quebras de linha para gerar os parágrafos */}
          {post.conteudo.split('\n').map((paragrafo, index) => (
            paragrafo.trim() !== "" && <p key={index}>{paragrafo}</p>
          ))}
        </section>

        <footer className={styles.footer}>
          <div className={styles.shareSection}>
            <p>Gostou deste conteúdo? Compartilhe com outros pesquisadores.</p>
            <div className={styles.divider}></div>
          </div>
        </footer>
      </article>
    </main>
  );
}