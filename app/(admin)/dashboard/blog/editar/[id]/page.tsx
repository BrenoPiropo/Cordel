"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { 
  FiSave, FiArrowLeft, FiImage, FiType, 
  FiAlignLeft, FiHash, FiX, FiPlus, FiRefreshCw 
} from 'react-icons/fi';
import styles from '../../../memorial/novo/novoJurista.module.css';

export default function EditarPostBlog() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Estados do Post
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [capaAtual, setCapaAtual] = useState<string | null>(null);
  const [novaCapa, setNovaCapa] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Estados para Tags
  const [tags, setTags] = useState<string[]>([]);
  const [novaTag, setNovaTag] = useState('');

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/blog/${id}`);
      const data = res.data;
      
      setTitulo(data.titulo);
      setConteudo(data.conteudo);
      setCapaAtual(data.imagem_url); // Lembre-se que sua Entity usa imagem_url

      // Mapeia tags se houver relação no banco
      if (data.tags) {
        setTags(data.tags.map((t: any) => t.termo || t)); 
      }
    } catch (error) {
      alert("Erro ao carregar artigo.");
      router.push('/dashboard/blog');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNovaCapa(file);
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
    setSaving(true);

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('conteudo', conteudo);
    formData.append('tags', JSON.stringify(tags));
    
    if (novaCapa) {
      formData.append('capa', novaCapa);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:3001/blog/${id}`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` 
        }
      });
      alert('Artigo atualizado com sucesso!');
      router.push('/dashboard/blog');
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar artigo.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className={styles.container}>Carregando dados do artigo...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => router.back()} className={styles.backBtn}>
          <FiArrowLeft /> Voltar
        </button>
        <h1>Editar Artigo</h1>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* TÍTULO E CAPA */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <FiType /> <h2>Cabeçalho</h2>
          </div>
          <div className={styles.inputGroup}>
            <label>Título do Artigo</label>
            <input 
              type="text" 
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              required 
            />
          </div>

          <div className={styles.fileBox} style={{ marginTop: '20px' }}>
            <label>Capa do Artigo</label>
            
            {/* Preview da imagem atual ou da nova selecionada */}
            <div style={{ marginBottom: '15px' }}>
              {preview ? (
                <img src={preview} className={styles.previewImg} alt="Nova Capa" style={{height: '180px'}} />
              ) : capaAtual ? (
                <img src={`http://localhost:3001${capaAtual}`} className={styles.previewImg} alt="Capa Atual" style={{height: '180px'}} />
              ) : null}
            </div>

            <input type="file" accept="image/*" onChange={handleImageChange} />
            <small>Selecione um novo arquivo apenas se desejar trocar a capa.</small>
          </div>
        </div>

        {/* CONTEÚDO */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <FiAlignLeft /> <h2>Conteúdo</h2>
          </div>
          <div className={styles.inputGroup}>
            <textarea 
              rows={15} 
              value={conteudo}
              onChange={e => setConteudo(e.target.value)}
              required 
            />
          </div>
        </div>

        {/* TAGS */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <FiHash /> <h2>Categorias</h2>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.tagInputArea}>
              <input 
                type="text" 
                placeholder="Adicionar nova tag..." 
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
          <button type="submit" className={styles.saveBtn} disabled={saving}>
            {saving ? 'A guardar...' : <><FiRefreshCw /> Atualizar Artigo</>}
          </button>
        </div>
      </form>
    </div>
  );
}