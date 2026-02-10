import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './autor.module.css';

const DADOS_AUTORES = {
  "cristiano-chaves": {
    nome: "Cristiano Chaves de Farias",
    dataPostagem: "maio 21, 2025",
    escritoPor: "Estêvão Vieira",
    categoria: "Memorial",
    textoDescritivo: "Cristiano Chaves de Farias foi um Promotor de Justiça do Ministério Público da Bahia e Professor de Direito Civil da Faculdade Baiana de Direito. Durante sua vida, se dedicou ao estudo do Direito de Família e Sucessões e se tornou referência sobre o assunto no campo jurídico contemporâneo. O objetivo desta nota biográfica é apresentar sua trajetória pessoal, suas principais ideias e conceitos, além de contextualizar sua importância no cenário intelectual e social contemporâneo. A metodologia deste trabalho baseia-se em uma abordagem de pesquisa qualitativa, com pesquisa bibliográfica (biografias, entrevistas, artigos acadêmicos e obras do próprio autor) e entrevistas realizadas com colegas de trabalho e com a viúva de Cristiano Farias. Assim, temos como resultados esperados a compreensão da relevância do trabalho do autor para o direito da atualidade e conhecimento da sua história pessoal.",
    palavrasChave: "Cristiano Chaves de Farias; Direito de Família; Biografia;",
    autoras: "RAMOS, Jaslayne Santos; SANTOS, Maria Beatriz Mendes Mattos; SOUSA, Maria Eduarda Martins Chagas",
    revisao: "MERCÊS, Sandy Stely dos Santos.",
    imagem: "/Cristiano-Chaves-imagem.png",
    linkPDF: "/pdfs/CRISTIANO-CHAVES-DE-FARIAS.docx.pdf"
  },
  "filinto-bastos": {
    nome: "Filinto Justiniano Ferreira Bastos",
    dataPostagem: "maio 22, 2025",
    escritoPor: "Estêvão Vieira",
    categoria: "Memorial",
    textoDescritivo: "O presente trabalho consiste em uma nota biográfica sobre a vida de Filinto Justiniano Ferreira Bastos, um jurista baiano de notável influência na abolição da escravatura. Filinto nasceu em Feira de Santana em 1856, e faleceu em Salvador em 1939. O objetivo da produção dessa pesquisa foi aproximar-se e condensar informações que pudessem contribuir para a biografia de Filinto Bastos, além do desenvolvimento de uma perspectiva crítica entre os autores-discentes para além da dogmática que geralmente assenta-se nos cursos de Direito. A metodologia utilizada foi, principalmente, de caráter qualitativo, com o contato externo bem sucedido realizado com descendentes de Filinto Bastos. A estruturação divide-se em: descrição do processo elaborativo, vida pessoal, vida acadêmica e sintetização dos dois últimos tópicos por meio de uma descrição do legado de Bastos no mundo jurídico e para o contexto baiano.",
    palavrasChave: "Direito; Filinto Bastos; Nota Biográfica.",
    autoras: "CERQUEIRA, Isla Gabrielly Santos, JESUS, Luís Cauã Araújo e ANDRADE, Pedro Felipe Menezes.",
    revisao: "MERCÊS, Sandy Stely dos Santos",
    imagem: "/Filinto-Justiniano-imagem-683x1024.png",
    linkPDF: "/pdfs/FILINTO-JUSTINIANO-FERREIRA-BASTOS.pdf"
  },
  "nestor-duarte": {
    nome: "Nestor Duarte Guimarães",
    dataPostagem: "maio 22, 2025",
    escritoPor: "Estêvão Vieira",
    categoria: "Memorial",
    textoDescritivo: "O presente trabalho consiste em uma nota biográfica sobre o jurista baiano Nestor Duarte Guimarães, detalhando sua trajetória de vida e suas contribuições para as searas jurídica e política. Além disso, realiza uma análise de documentos de domínio público que mencionam ou fazem parte da jornada do autor. Buscou-se reconhecê-lo enquanto importante deputado, romancista e jurista, além de reforçar a sua frente militante e observar a importância da vida de Duarte, dissertando sobre seu brilhante legado, como, por exemplo, suas contribuições como pioneiro do projeto da Reforma Agrária, para, então, fazer-se uma correta história do Direito através das narrativas sobre os integrantes ativos do Direito. ",
    palavrasChave: "Nestor Duarte, Reforma Agrária, Direito, Deputado Federal, Bahia, Jurista.",
    autoras: "FARIAS, Beatriz Gomes, BERNARDES, Lorenzza Grecco SOUZA, Maria Clara Vieira de Moraes",
    revisao: "MERCÊS, Sandy Stely dos Santos",
    imagem: "/Nestor-Duarte-imagem-683x1024.png",
    linkPDF: "/pdfs/NESTOR-DUARTE-GUIMARAES-.pdf"
  }
};

export default async function PaginaAutor({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const autor = DADOS_AUTORES[slug as keyof typeof DADOS_AUTORES];

  if (!autor) notFound();

  return (
    <main className={styles.container}>
      <Link href="/memoria" className={styles.backLink}>Voltar</Link>

      <article className={styles.article}>
        <div className={styles.imageSection}>
          <Image 
            src={autor.imagem} 
            alt={autor.nome} 
            width={400} 
            height={500} 
            priority
            className={styles.mainImage}
          />
        </div>

        <h1 className={styles.authorTitle}>{autor.nome}</h1>

        <div className={styles.metaData}>
          <span>{autor.dataPostagem}</span>
          <span className={styles.divider}>—</span>
          <span>por <strong>{autor.escritoPor}</strong></span>
          <span className={styles.divider}>em</span>
          <span className={styles.category}>{autor.categoria}</span>
        </div>

        <section className={styles.descriptionText}>
          <p>{autor.textoDescritivo}</p>
        </section>

        <section className={styles.keywordsSection}>
          <h3>PALAVRAS-CHAVE:</h3>
          <p>{autor.palavrasChave}</p>
        </section>

        <footer className={styles.creditsSection}>
          <p><strong>Autoras:</strong> {autor.autoras}</p>
          <p><strong>Revisão:</strong> {autor.revisao}</p>
        </footer>

        {/* Botão para o Trabalho Acadêmico */}
        <div className={styles.pdfContainer}>
          <a 
            href={autor.linkPDF} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.pdfButton}
          >
            Leia o trabalho completo
          </a>
        </div>
      </article>
    </main>
  );
}