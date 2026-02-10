import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './post.module.css';

const DADOS_POSTS = {
  "influencia-direito-familia": {
    titulo: "A Influência do Direito de Família no Sertão Baiano",
    data: "10 de Janeiro, 2026",
    autor: "Equipe Cordel",
    imagem: "/CORDEL_ICON_WITHOUT_BG.png",
    conteudo: [
      "O Direito de Família no sertão baiano sempre foi permeado por costumes locais que, muitas vezes, anteciparam discussões jurídicas contemporâneas.",
      "A religiosidade e o patriarcalismo são elementos fundamentais para entender como as sentenças eram proferidas naquela época.",
      "Concluímos que a memória jurídica da Bahia não está apenas nos grandes centros, mas espalhada em cada pequena cidade do nosso semiárido."
    ]
  },
  "descobertas-arquivo-publico": {
    titulo: "Novas Descobertas no Arquivo Público da Bahia",
    data: "05 de Janeiro, 2026",
    autor: "Equipe Cordel",
    imagem: "/CORDEL_ICON_WITHOUT_BG.png", // Teste sem imagem
    conteudo: [
      "Recentemente, nossa equipe localizou manuscritos inéditos que detalham a rotina de Filinto Bastos enquanto magistrado.",
      "Esses documentos revelam um lado humano e combativo do jurista que era pouco explorado nas biografias tradicionais.",
      "Este achado reforça a importância da preservação documental para a história do Direito brasileiro."
    ]
  },
  "cordel-educacao-juridica": {
    titulo: "O Papel da Literatura de Cordel na Educação Jurídica Popular",
    data: "02 de Janeiro, 2026",
    autor: "Equipe Cordel",
    imagem: "/CORDEL_ICON_WITHOUT_BG.png",
    conteudo: [
      "A métrica e a rima do cordel facilitam a memorização de conceitos complexos. No interior da Bahia, essa ferramenta tem sido vital.",
      "Estamos desenvolvendo folhetos que explicam direitos básicos de cidadania através da poesia popular.",
      "O resultado tem sido uma aproximação maior entre a academia e a comunidade."
    ]
  },
  "seminario-inscricoes": {
    titulo: "Seminário de Direito e Memória: Inscrições Abertas",
    data: "28 de Dezembro, 2025",
    autor: "Equipe Cordel",
    imagem: "/CORDEL_ICON_WITHOUT_BG.png",
    conteudo: [
      "O evento ocorrerá no próximo mês e contará com a presença de diversos pesquisadores da área de História do Direito.",
      "As vagas são limitadas e os certificados serão emitidos pela universidade parceira.",
      "Não perca a chance de discutir o legado de Nestor Duarte conosco."
    ]
  }
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = DADOS_POSTS[slug as keyof typeof DADOS_POSTS];

  if (!post) notFound();

  return (
    <main className={styles.container}>
      <Link href="/blog" className={styles.backLink}>← Voltar para o Blog</Link>

      <article className={styles.article}>
        <header className={styles.header}>
          <span className={styles.date}>{post.data} — por <strong>{post.autor}</strong></span>
          <h1 className={styles.title}>{post.titulo}</h1>
        </header>

        {post.imagem && (
          <div className={styles.mainImageWrapper}>
            <Image 
              src={post.imagem} 
              alt={post.titulo} 
              fill 
              priority
              className={styles.mainImage} 
            />
          </div>
        )}

        <section className={styles.content}>
          {post.conteudo.map((paragrafo, index) => (
            <p key={index}>{paragrafo}</p>
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