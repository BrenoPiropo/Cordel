"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';
import { 
  FiMapPin, 
  FiFileText, 
  FiUsers, 
  FiPlus, 
  FiArrowRight, 
  FiActivity, 
  FiCamera,
  FiEdit3 // Novo ícone para Institucional
} from 'react-icons/fi';
import styles from './dashboard.module.css';

export default function DashboardPrincipal() {
  const [userName, setUserName] = useState("Administrador");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUserName(decoded.nome || "Administrador");
      } catch (e) {
        console.error("Erro ao decodificar dados do usuário");
      }
    }
  }, []);

  return (
    <div className={styles.container}>
      {/* SEÇÃO DE BOAS-VINDAS */}
      <header className={styles.welcomeSection}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Olá, {userName.split(' ')[0]}! 👋</h1>
          <p className={styles.subtitle}>
            Bem-vindo ao painel de controle do Portal Cordel. O que deseja gerenciar hoje?
          </p>
        </div>
      </header>

      {/* GRID DE MÓDULOS (Bento Grid Style) */}
      <div className={styles.bentoGrid}>
        
        {/* CARD MEMORIAL */}
        <div className={`${styles.card} ${styles.memorialCard}`}>
          <div className={styles.cardHeader}>
            <div className={styles.iconWrapper} style={{ backgroundColor: '#FFF4ED', color: '#EA580C' }}>
              <FiMapPin size={24} />
            </div>
            <span className={styles.badge}>Mapa Interativo</span>
          </div>
          <div className={styles.cardBody}>
            <h3>Memorial Digital</h3>
            <p>Gerencie as biografias e localizações dos juristas baianos no mapa.</p>
          </div>
          <div className={styles.cardFooter}>
            <Link href="/dashboard/memorial/novo" className={styles.btnAction}>
              <FiPlus /> Novo Jurista
            </Link>
            <Link href="/dashboard/memorial" className={styles.linkSimple}>
              Ver todos <FiArrowRight />
            </Link>
          </div>
        </div>

        {/* CARD BLOG */}
        <div className={`${styles.card} ${styles.blogCard}`}>
          <div className={styles.cardHeader}>
            <div className={styles.iconWrapper} style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}>
              <FiFileText size={24} />
            </div>
            <span className={styles.badge}>Artigos</span>
          </div>
          <div className={styles.cardBody}>
            <h3>Blog de Notícias</h3>
            <p>Publique novos artigos, informativos e textos jurídicos para o site.</p>
          </div>
          <div className={styles.cardFooter}>
            <Link href="/dashboard/blog/novo" className={styles.btnAction}>
              <FiPlus /> Novo Post
            </Link>
            <Link href="/dashboard/blog" className={styles.linkSimple}>
              Gerenciar <FiArrowRight />
            </Link>
          </div>
        </div>

        {/* NOVO CARD INSTITUCIONAL (Quem Somos / Valores) */}
        <div className={`${styles.card} ${styles.institutionalCard}`}>
          <div className={styles.cardHeader}>
            <div className={styles.iconWrapper} style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}>
              <FiEdit3 size={24} />
            </div>
            <span className={styles.badge}>Páginas</span>
          </div>
          <div className={styles.cardBody}>
            <h3>Institucional</h3>
            <p>Altere os textos de "Quem Somos" e a seção de "Valores" da página inicial.</p>
          </div>
          <div className={styles.cardFooter}>
            <Link href="/dashboard/institucional" className={styles.btnAction}>
              <FiEdit3 /> Editar Textos
            </Link>
          </div>
        </div>

        {/* CARD GALERIA */}
        <div className={`${styles.card} ${styles.galleryCard}`}>
          <div className={styles.cardHeader}>
            <div className={styles.iconWrapper} style={{ backgroundColor: '#F5F3FF', color: '#7C3AED' }}>
              <FiCamera size={24} />
            </div>
            <span className={styles.badge}>Mídia</span>
          </div>
          <div className={styles.cardBody}>
            <h3>Galeria & Equipe</h3>
            <p>Atualize as fotos do carrossel inicial e os membros da equipe de pesquisa.</p>
          </div>
          <div className={styles.cardFooter}>
            <Link href="/dashboard/galeria/novo" className={styles.btnAction}>
              <FiPlus /> Nova Foto
            </Link>
            <Link href="/dashboard/galeria" className={styles.linkSimple}>
              Gerenciar <FiArrowRight />
            </Link>
          </div>
        </div>

        {/* CARD USUÁRIOS (Gestão de Admin) */}
        <div className={`${styles.card} ${styles.userCard}`}>
          <div className={styles.cardHeader}>
            <div className={styles.iconWrapper} style={{ backgroundColor: '#F0FDF4', color: '#16A34A' }}>
              <FiUsers size={24} />
            </div>
            <span className={styles.badge}>Equipe</span>
          </div>
          <div className={styles.cardBody}>
            <h3>Administradores</h3>
            <p>Adicione novos membros à equipe ou remova acessos ao painel.</p>
          </div>
          <div className={styles.cardFooter}>
            <Link href="/dashboard/usuarios" className={styles.btnOutline}>
              Gerenciar Acessos
            </Link>
          </div>
        </div>

        {/* CARD INFORMATIVO / STATUS */}
        <div className={`${styles.card} ${styles.statusCard}`}>
          <div className={styles.statusInfo}>
            <FiActivity className={styles.pulseIcon} />
            <div>
              <strong>Sistema Ativo</strong>
              <span>Conectado ao Banco de Dados</span>
            </div>
          </div>
          <p className={styles.tipText}>
            <strong>Dica:</strong> O conteúdo institucional é o que define a identidade do site. Mantenha-o sempre atualizado.
          </p>
        </div>

      </div>
    </div>
  );
}