// src/components/Header.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import styles from './Header.module.css';

// ------------------------------------------------------------------
// 📚 Estrutura de Dados e Tipagem
// ------------------------------------------------------------------
interface NavItem {
  label: string; 
  href: string;  
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Memória Digital do Direito', href: '/memoria' },
  { label: 'Publicações', href: '/publicacoes' },
  { label: 'Blog', href: '/blog' },
];

const Header: React.FC = () => {
  const logoSize = 180; 
  
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        
        {/* LOGO: Link para a Landing Page (/) com Imagem Otimizada */}
        <Link href="/" className={styles.logoWrapper}>
          <Image
            src="/CORDEL_ICON_WITHOUT_BG.png" 
            alt="Logo do Projeto Cordel"
            width={logoSize}
            height={logoSize}
            priority={true} 
            className={styles.logoIcon}
          />
        </Link>

        {/* Navegação Principal */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className={styles.navItem}>
                <Link href={item.href} className={styles.navLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;