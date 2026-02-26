"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FiSave, FiArrowLeft, FiCamera, FiTag } from 'react-icons/fi';
import styles from '../../memorial/novo/novoJurista.module.css';

export default function NovaFotoGaleria() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [legenda, setLegenda] = useState('');
  const [tipo, setTipo] = useState('EQUIPE');
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!foto) return alert("Selecione uma imagem!");
    
    setLoading(true);
    const formData = new FormData();
    formData.append('file', foto); // 'file' deve bater com o interceptor do NestJS
    formData.append('legenda', legenda);
    formData.append('tipo', tipo);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/galeria', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` 
        }
      });
      router.push('/dashboard/galeria');
    } catch (error) {
      alert("Erro ao subir imagem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => router.back()} className={styles.backBtn}><FiArrowLeft /> Voltar</button>
        <h1>Nova Imagem</h1>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <div className={styles.inputGroup}>
            <label>Onde esta foto deve aparecer?</label>
            <select value={tipo} onChange={e => setTipo(e.target.value)} className={styles.select}>
              <option value="EQUIPE">Grade da Equipe (Membros)</option>
              <option value="CARROSSEL">Carrossel Principal (Banner)</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Legenda ou Nome do Membro</label>
            <input type="text" value={legenda} onChange={e => setLegenda(e.target.value)} required />
          </div>

          <div className={styles.fileBox}>
            <label>Arquivo da Foto</label>
            {preview && <img src={preview} alt="Preview" style={{ width: '200px', marginBottom: '10px' }} />}
            <input type="file" accept="image/*" onChange={handleImage} required />
          </div>
        </div>

        <button type="submit" className={styles.saveBtn} disabled={loading}>
          {loading ? 'Enviando...' : <><FiSave /> Salvar na Galeria</>}
        </button>
      </form>
    </div>
  );
}