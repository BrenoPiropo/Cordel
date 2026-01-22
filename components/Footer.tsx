// src/components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

// ------------------------------------------------------------------
// 📚 Dados para Links (Reutilizando a lógica do Header)
// ------------------------------------------------------------------
interface FooterLink {
  label: string;
  href: string;
}

const QUICK_LINKS: FooterLink[] = [
  { label: 'Juristas em Cordel', href: '/juristas' },
  { label: 'Memória Digital', href: '/memoria' },
  { label: 'Publicações', href: '/publicacoes' },
  { label: 'Políticas de Privacidade', href: '/privacidade' },
];

const Footer: React.FC = () => {
  const logoSize = 40;
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* COLUNA 1: Logo e Missão */}
        <div className={styles.col1}>
          <Link href="/" className={styles.logoWrapper}>
            <Image
              src="/CORDEL_ICON_WITHOUT_BG.png" 
              alt="Logo do Projeto Cordel"
              width={logoSize}
              height={logoSize}
              className={styles.logoIcon}
            />
            <span className={styles.logoText}>CORDEL</span>
          </Link>
          <p className={styles.mission}>
            Projeto de Pesquisa e Extensão do Curso de Direito da UESC.
          </p>
        </div>

        {/* COLUNA 2: Navegação Rápida */}
        <div className={styles.col2}>
          <h4 className={styles.columnTitle}>Links Úteis</h4>
          <ul className={styles.linkList}>
            {QUICK_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.footerLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* COLUNA 3: Contato e Social */}
        <div className={styles.col3}>
          <h4 className={styles.columnTitle}>Fale Conosco</h4>
          <p>
            E-mail: <a href="mailto:contato@cordel.org" className={styles.contactLink}>contato@cordel.org</a>
          </p>
          <div className={styles.socialIcons}>
            {/* Ícones de redes sociais (substituir por SVGs ou componentes de ícone) */}
            <p>[Ícone Instagram] [Ícone Lattes]</p>
          </div>
        </div>

      </div>

      {/* FOOTER INFERIOR (COPYRIGHT) */}
      <div className={styles.bottomBar}>
        <p>
          &copy; {currentYear} CORDEL - História & Direito. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;