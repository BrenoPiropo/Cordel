"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2, FiMapPin, FiSearch } from 'react-icons/fi';
import styles from './memorialList.module.css';

interface Jurista {
  id: number;
  nome: string;
  latitude: string;
  longitude: string;
  slug: string;
}

export default function GerenciarMemorial() {
  const [juristas, setJuristas] = useState<Jurista[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchJuristas();
  }, []);

  const fetchJuristas = async () => {
    try {
      const res = await axios.get('http://localhost:3001/memorial');
      setJuristas(res.data);
    } catch (error) {
      console.error("Erro ao buscar juristas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, nome: string) => {
    if (confirm(`Tem certeza que deseja excluir o jurista ${nome}?`)) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3001/memorial/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setJuristas(juristas.filter(j => j.id !== id));
      } catch (error) {
        alert("Erro ao excluir jurista.");
      }
    }
  };

  // Filtro de busca simples para o cliente
  const filteredJuristas = juristas.filter(j => 
    j.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Memorial Digital</h1>
          <p>Gerencie os juristas cadastrados no mapa e no portal.</p>
        </div>
        <Link href="/dashboard/memorial/novo" className={styles.addBtn}>
          <FiPlus /> Novo Jurista
        </Link>
      </header>

      <div className={styles.tableCard}>
        <div className={styles.tableActions}>
          <div className={styles.searchBar}>
            <FiSearch />
            <input 
              type="text" 
              placeholder="Buscar jurista por nome..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className={styles.loading}>Carregando dados do banco...</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome do Jurista</th>
                <th>Localização (Coordenadas)</th>
                <th>Slug / URL</th>
                <th style={{ textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredJuristas.map((j) => (
                <tr key={j.id}>
                  <td className={styles.nameCell}>
                    <strong>{j.nome}</strong>
                  </td>
                  <td>
                    <span className={styles.geoTag}>
                      <FiMapPin /> {j.latitude}, {j.longitude}
                    </span>
                  </td>
                  <td><code className={styles.slug}>{j.slug}</code></td>
                  <td className={styles.actionsCell}>
                    <Link href={`/dashboard/memorial/editar/${j.id}`} className={styles.editBtn}>
                      <FiEdit2 />
                    </Link>
                    <button 
                      onClick={() => handleDelete(j.id, j.nome)} 
                      className={styles.deleteBtn}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}