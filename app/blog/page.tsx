'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './blog.module.css';
import axios from 'axios';

// 1. AJUSTE NA INTERFACE: Mude imagem_capa para imagem_url (conforme sua Entity)
interface BlogPost {
  id: number;
  titulo: string;
  conteudo: string; 
  imagem_url: string | null; // <--- Nome exato que vem do banco agora
  slug: string;
  data_criada: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/blog')
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao carregar o blog:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className={styles.container}><p>Carregando as memórias do Cordel...</p></div>;

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Blog Cordel</h1>
        <p className={styles.subtitle}>Notícias, artigos e atualizações sobre a nossa pesquisa.</p>
      </header>

      <section className={styles.postsGrid}>
        {posts.map((post) => (
          <article key={post.id} className={styles.postCard}>
            
            <div className={styles.imageWrapper}>
              {/* 2. AJUSTE NO SRC: Use post.imagem_url */}
              <Image 
                src={post.imagem_url?.startsWith('http') 
                  ? post.imagem_url 
                  : post.imagem_url 
                    ? `http://localhost:3001${post.imagem_url}` 
                    : "/CORDEL_ICON_WITHOUT_BG.png"
                } 
                alt={post.titulo} 
                fill 
                className={styles.postImage}
                unoptimized // Evita erros de otimização em localhost
              />
            </div>
            
            {/* 3. AJUSTE NA CLASSE: Use post.imagem_url */}
            <div className={`${styles.postContent} ${!post.imagem_url ? styles.fullWidth : ''}`}>
              <span className={styles.date}>
                {new Date(post.data_criada).toLocaleDateString('pt-BR')}
              </span>
              <h2 className={styles.postTitle}>{post.titulo}</h2>
              
              <p className={styles.resumo}>
                {post.conteudo && post.conteudo.length > 150 
                  ? post.conteudo.substring(0, 150) + '...' 
                  : post.conteudo}
              </p>
              
              <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                Ler artigo completo →
              </Link>
            </div>
          </article>
        ))}
      </section>

      <footer className={styles.blogFooter}>
        <p>Acompanhe nossas pesquisas semanais.</p>
      </footer>
    </main>
  );
}