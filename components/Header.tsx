import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import styles from './Header.module.css';

interface NavItem {
  label: string; 
  href: string;  
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Memória Digital do Direito', href: '/memoria' },
  { label: 'Mapa Interativo', href: '/mapa' },
  { label: 'Blog', href: '/blog' },
  { label: 'Galeria', href: '/galeria' },
];

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        
        <Link href="/" className={styles.logoWrapper}>
          <Image
            src="/logo_cordel.jpg" // Certifique-se que o nome do arquivo está correto
            alt="Logo do Projeto Cordel"
            width={220} // Largura maior para destacar a logo horizontal
            height={70}
            priority={true} 
            className={styles.logoIcon}
          />
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
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