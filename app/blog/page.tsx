import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './blog.module.css';

// Dados expandidos para testar o comportamento do grid e da responsividade
const POSTS = [
  {
    id: 1,
    titulo: "A Influência do Direito de Família no Sertão Baiano",
    resumo: "Uma análise profunda sobre como as tradições locais moldaram as decisões jurídicas no século passado, focando em processos de herança e sucessão.",
    data: "10 Jan, 2026",
    imagem: "/CORDEL_ICON_WITHOUT_BG.png", 
    slug: "influencia-direito-familia"
  },
  {
    id: 2,
    titulo: "Novas Descobertas no Arquivo Público da Bahia: Documentos Inéditos",
    resumo: "Nossa equipe de pesquisadores encontrou documentos inéditos sobre a atuação de Filinto Bastos durante o período abolicionista.",
    data: "05 Jan, 2026",
    imagem: "/CORDEL_ICON_WITHOUT_BG.png", // Teste de post sem imagem (o conteúdo deve ocupar 100% da largura)
    slug: "descobertas-arquivo-publico"
  },
  {
    id: 3,
    titulo: "O Papel da Literatura de Cordel na Educação Jurídica Popular",
    resumo: "Como as rimas e a métrica do cordel ajudam na disseminação do conhecimento jurídico para comunidades tradicionais.",
    data: "02 Jan, 2026",
    imagem: "/CORDEL_ICON_WITHOUT_BG.png",
    slug: "cordel-educacao-juridica"
  },
  {
    id: 4,
    titulo: "Seminário de Direito e Memória: Inscrições Abertas",
    resumo: "Participe do nosso próximo seminário onde discutiremos o legado de Nestor Duarte e a Reforma Agrária na Bahia.",
    data: "28 Dez, 2025",
    imagem: "/CORDEL_ICON_WITHOUT_BG.png",
    slug: "seminario-inscricoes"
  },
  {
    id: 5,
    titulo: "A História Esquecida das Comarcas do Interior",
    resumo: "Explorando os porões dos fóruns antigos em busca de memórias que definiram o Direito baiano moderno.",
    data: "15 Dez, 2025",
    imagem: "/CORDEL_ICON_WITHOUT_BG.png",
    slug: "historia-esquecida"
  }
];

export default function BlogPage() {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Blog Cordel</h1>
        <p className={styles.subtitle}>Notícias, artigos e atualizações sobre a nossa pesquisa.</p>
      </header>

      <section className={styles.postsGrid}>
        {POSTS.map((post) => (
          <article key={post.id} className={styles.postCard}>
            {/* Se houver imagem, renderiza o wrapper. Se não, o CSS deve ajustar o postContent */}
            {post.imagem && (
              <div className={styles.imageWrapper}>
                <Image 
                  src={post.imagem} 
                  alt={post.titulo} 
                  fill 
                  className={styles.postImage}
                />
              </div>
            )}
            
            <div className={`${styles.postContent} ${!post.imagem ? styles.fullWidth : ''}`}>
              <span className={styles.date}>{post.data}</span>
              <h2 className={styles.postTitle}>{post.titulo}</h2>
              <p className={styles.resumo}>{post.resumo}</p>
              
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