"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2, FiFileText, FiSearch, FiCalendar } from 'react-icons/fi';
import styles from './blogList.module.css';

interface Post {
  id: number;
  titulo: string;
  data_criacao: string;
  slug: string;
  capa_url?: string;
}

export default function GerenciarBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:3001/blog');
      setPosts(res.data);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, titulo: string) => {
    if (confirm(`Deseja realmente apagar o artigo: "${titulo}"?`)) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3001/blog/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPosts(posts.filter(p => p.id !== id));
      } catch (error) {
        alert("Erro ao eliminar o artigo.");
      }
    }
  };

  const filteredPosts = posts.filter(p => 
    p.titulo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Artigos do Blog</h1>
          <p>Escreva, edite e organize as publicações do portal.</p>
        </div>
        <Link href="/dashboard/blog/novo" className={styles.addBtn}>
          <FiPlus /> Novo Artigo
        </Link>
      </header>

      <div className={styles.tableCard}>
        <div className={styles.tableActions}>
          <div className={styles.searchBar}>
            <FiSearch />
            <input 
              type="text" 
              placeholder="Pesquisar por título..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className={styles.loading}>A aceder à base de dados...</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Título do Artigo</th>
                <th>Data de Publicação</th>
                <th>Link (Slug)</th>
                <th style={{ textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.length > 0 ? filteredPosts.map((p) => (
                <tr key={p.id}>
                  <td className={styles.nameCell}>
                    <div className={styles.postTitleArea}>
                      <div className={styles.postIcon}><FiFileText /></div>
                      <strong>{p.titulo}</strong>
                    </div>
                  </td>
                  <td>
                    <span className={styles.dateTag}>
                      <FiCalendar /> {new Date(p.data_criacao).toLocaleDateString('pt-PT')}
                    </span>
                  </td>
                  <td><code className={styles.slug}>/{p.slug}</code></td>
                  <td className={styles.actionsCell}>
                    <Link href={`/dashboard/blog/editar/${p.id}`} className={styles.editBtn} title="Editar">
                      <FiEdit2 />
                    </Link>
                    <button 
                      onClick={() => handleDelete(p.id, p.titulo)} 
                      className={styles.deleteBtn}
                      title="Apagar"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className={styles.emptyState}>Nenhum artigo encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}