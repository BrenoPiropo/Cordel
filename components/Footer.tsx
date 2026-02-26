import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiInstagram, FiMail, FiBook, FiLock } from 'react-icons/fi'; // Adicionei o ícone de cadeado
import styles from './Footer.module.css';

const QUICK_LINKS = [
  { label: 'Memorial Digital', href: '/memoria' },
  { label: 'Blog & Artigos', href: '/blog' },
  { label: 'Galeria', href: '/galeria' },
  { label: 'Acesso Restrito', href: '/login' }, // Novo link de login
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        <div className={styles.mainInfo}>
          <div className={styles.brand}>
            <Image
              src="/logo_cordel.jpg" 
              alt="Logo Cordel"
              width={250}
              height={80}
              className={styles.footerLogo}
            />
          </div>
          <p className={styles.description}>
            Projeto de Pesquisa e Extensão da Universidade Estadual de Santa Cruz (UESC). 
            Dedicado à preservação da memória jurídica baiana.
          </p>
        </div>

        <div className={styles.navGroup}>
          <h4 className={styles.title}>Navegação</h4>
          <ul className={styles.list}>
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={link.href === '/login' ? styles.loginLink : ''}>
                  {link.href === '/login' && <FiLock size={12} style={{ marginRight: '5px' }} />}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.contactGroup}>
          <h4 className={styles.title}>Contato</h4>
          <div className={styles.socials}>
            <a href="mailto:contato@cordel.org" title="E-mail"><FiMail /></a>
            <a href="#" title="Instagram"><FiInstagram /></a>
            <a href="#" title="Lattes"><FiBook /></a>
          </div>
          <p className={styles.email}>contato@cordel.org</p>
        </div>

      </div>

      <div className={styles.copyright}>
        <p>&copy; {currentYear} CORDEL — História & Direito. Desenvolvido por Breno Piropo.</p>
      </div>
    </footer>
  );
};

export default Footer;