"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { FiPlus, FiTrash2, FiImage, FiCamera } from 'react-icons/fi';
import styles from '../blog/blogList.module.css'; // Reutilizando a estrutura de lista

interface Foto {
  id: number;
  url: string;
  legenda: string;
  tipo: 'EQUIPE' | 'CARROSSEL';
}

export default function GerenciarGaleria() {
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFotos();
  }, []);

  const fetchFotos = async () => {
    try {
      const res = await axios.get('http://localhost:3001/galeria');
      setFotos(res.data);
    } catch (error) {
      console.error("Erro ao buscar fotos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Deseja remover esta foto da galeria?")) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3001/galeria/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFotos(fotos.filter(f => f.id !== id));
      } catch (error) {
        alert("Erro ao remover a foto.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Gerenciar Galeria</h1>
          <p>Adicione fotos da equipe ou imagens para o carrossel principal.</p>
        </div>
        <Link href="/dashboard/galeria/novo" className={styles.addBtn}>
          <FiPlus /> Adicionar Foto
        </Link>
      </header>

      {loading ? (
        <div className={styles.loading}>Carregando galeria...</div>
      ) : (
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Legenda</th>
                <th>Localização</th>
                <th style={{ textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {fotos.map((foto) => (
                <tr key={foto.id}>
                  <td>
                    <img 
                      src={`http://localhost:3001${foto.url}`} 
                      alt={foto.legenda} 
                      style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                  </td>
                  <td><strong>{foto.legenda}</strong></td>
                  <td>
                    <span className={foto.tipo === 'CARROSSEL' ? styles.badgeCarrossel : styles.badgeEquipe}>
                      {foto.tipo}
                    </span>
                  </td>
                  <td className={styles.actionsCell}>
                    <button onClick={() => handleDelete(foto.id)} className={styles.deleteBtn}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}