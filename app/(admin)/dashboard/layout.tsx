"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  FiGrid, 
  FiMapPin, 
  FiFileText, 
  FiLogOut, 
  FiExternalLink,
  FiUser,
  FiCamera,
  FiUsers
} from 'react-icons/fi';
import styles from './layoutAdmin.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push('/login');
  };

  // Itens de menu atualizados com Galeria e Usuários
  const menuItems = [
    { name: 'Dashboard', icon: <FiGrid />, path: '/dashboard' },
    { name: 'Memorial', icon: <FiMapPin />, path: '/dashboard/memorial' },
    { name: 'Blog', icon: <FiFileText />, path: '/dashboard/blog' },
    { name: 'Galeria', icon: <FiCamera />, path: '/dashboard/galeria' },
    { name: 'Administradores', icon: <FiUsers />, path: '/dashboard/usuarios' },
  ];

  return (
    <div className={styles.adminWrapper}>
      {/* SIDEBAR FIXA */}
      <aside className={styles.sidebar}>
        <div className={styles.logoArea}>
          <div className={styles.logoIcon}>C</div>
          <div className={styles.logoText}>
            <strong>Cordel</strong>
            <span>Admin v1.0</span>
          </div>
        </div>

        <nav className={styles.navigation}>
          <p className={styles.navLabel}>Gerenciamento</p>
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              // Lógica de active melhorada para sub-rotas (ex: /blog/novo continua ativo em /blog)
              className={`${styles.navLink} ${pathname.startsWith(item.path) && (item.path !== '/dashboard' || pathname === '/dashboard') ? styles.active : ''}`}
            >
              <span className={styles.icon}>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <Link href="/" className={styles.viewSiteBtn} target="_blank">
            <FiExternalLink /> Ver Site Público
          </Link>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <FiLogOut /> Sair
          </button>
        </div>
      </aside>

      {/* ÁREA DE CONTEÚDO */}
      <div className={styles.mainContainer}>
        <header className={styles.topHeader}>
          <div className={styles.breadcrumb}>
            Painel / <span>{pathname.split('/').filter(Boolean).pop() || 'Dashboard'}</span>
          </div>
          <div className={styles.userProfile}>
            <div className={styles.userInfo}>
              <span>Administrador</span>
            </div>
            <div className={styles.avatar}>
              <FiUser />
            </div>
          </div>
        </header>
        
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}