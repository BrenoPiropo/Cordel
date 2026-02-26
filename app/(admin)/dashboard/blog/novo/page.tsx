"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
  FiSave, FiArrowLeft, FiImage, FiType, 
  FiAlignLeft, FiHash, FiTag, FiX, FiPlus 
} from 'react-icons/fi';
import styles from '../../memorial/novo/novoJurista.module.css'; // Reutilizando a base de estilo

export default function NovoPostBlog() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Estados do Post
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [capa, setCapa] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Estados para Tags
  const [tags, setTags] = useState<string[]>([]);
  const [novaTag, setNovaTag] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCapa(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const addTag = () => {
    if (novaTag.trim() && !tags.includes(novaTag.trim())) {
      setTags([...tags, novaTag.trim()]);
      setNovaTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('conteudo', conteudo);
    formData.append('tags', JSON.stringify(tags));
    if (capa) formData.append('capa', capa);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/blog', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` 
        }
      });
      alert('Artigo publicado com sucesso!');
      router.push('/dashboard/blog');
    } catch (error) {
      console.error(error);
      alert('Erro ao publicar artigo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => router.back()} className={styles.backBtn}>
          <FiArrowLeft /> Voltar
        </button>
        <h1>Escrever Novo Artigo</h1>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* TÍTULO E CAPA */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <FiType /> <h2>Cabeçalho do Post</h2>
          </div>
          <div className={styles.inputGroup}>
            <label>Título do Artigo</label>
            <input 
              type="text" 
              placeholder="Ex: A evolução do Direito Digital no Brasil" 
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              required 
            />
          </div>

          <div className={styles.fileBox} style={{ marginTop: '20px' }}>
            <label>Imagem de Capa (Vibrante)</label>
            {preview && <img src={preview} className={styles.previewImg} alt="Capa" style={{maxWidth: '100%', height: '200px', objectFit: 'cover'}} />}
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <small>Dê um impacto visual ao seu post.</small>
          </div>
        </div>

        {/* CONTEÚDO */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <FiAlignLeft /> <h2>Conteúdo do Artigo</h2>
          </div>
          <div className={styles.inputGroup}>
            <label>Corpo do Texto (Markdown ou Texto Simples)</label>
            <textarea 
              rows={15} 
              placeholder="Era uma vez..." 
              value={conteudo}
              onChange={e => setConteudo(e.target.value)}
              required 
            />
          </div>
        </div>

        {/* TAGS / CATEGORIAS */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <FiHash /> <h2>Categorias e Tags</h2>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.tagInputArea}>
              <input 
                type="text" 
                placeholder="Adicionar categoria (ex: Jurídico)" 
                value={novaTag}
                onChange={e => setNovaTag(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <button type="button" onClick={addTag} className={styles.miniAddBtn}><FiPlus /></button>
            </div>
            <div className={styles.tagList}>
              {tags.map(t => (
                <span key={t} className={styles.tagBadge}>
                  {t} <FiX onClick={() => removeTag(t)} />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.saveBtn} disabled={loading}>
            {loading ? 'Publicando...' : <><FiSave /> Publicar Artigo</>}
          </button>
        </div>
      </form>
    </div>
  );
}