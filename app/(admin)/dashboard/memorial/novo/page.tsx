"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
  FiSave, FiArrowLeft, FiCamera, FiFileText, 
  FiMapPin, FiInfo, FiTag, FiLink, FiX, FiPlus 
} from 'react-icons/fi';
import styles from './novoJurista.module.css';

export default function NovoJurista() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Estados básicos
  const [nome, setNome] = useState('');
  const [biografia, setBiografia] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [autoras, setAutoras] = useState('');
  const [revisao, setRevisao] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);

  // ESTADOS PARA OS NOVOS CAMPOS DINÂMICOS
  const [palavrasChave, setPalavrasChave] = useState<string[]>([]);
  const [novaTag, setNovaTag] = useState('');

  const [referencias, setReferencias] = useState<string[]>([]);
  const [novaRef, setNovaRef] = useState('');

  // Funções para manipular Palavras-Chave
  const addTag = () => {
    if (novaTag.trim() && !palavrasChave.includes(novaTag.trim())) {
      setPalavrasChave([...palavrasChave, novaTag.trim()]);
      setNovaTag('');
    }
  };

  const removeTag = (tag: string) => {
    setPalavrasChave(palavrasChave.filter(t => t !== tag));
  };

  // Funções para manipular Referências
  const addRef = () => {
    if (novaRef.trim()) {
      setReferencias([...referencias, novaRef.trim()]);
      setNovaRef('');
    }
  };

  const removeRef = (ref: string) => {
    setReferencias(referencias.filter(r => r !== ref));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('biografia', biografia);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('autoras', autoras);
    formData.append('revisao', revisao);

    // CONVERSÃO PARA O FORMATO QUE O BACK-END ESPERA (JSON String)
    const tagsFormatadas = palavrasChave.map(t => ({ termo: t }));
    const refsFormatadas = referencias.map(r => ({ nome_referencia: r }));

    formData.append('palavras_chave', JSON.stringify(tagsFormatadas));
    formData.append('referencias_citadas', JSON.stringify(refsFormatadas));

    if (foto) formData.append('foto', foto);
    if (pdf) formData.append('pdf', pdf);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/memorial', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` 
        }
      });
      alert('Jurista cadastrado com sucesso!');
      router.push('/dashboard/memorial');
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar jurista.');
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
        <h1>Adicionar Novo Jurista</h1>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        
        {/* SEÇÃO 1: DADOS PRINCIPAIS */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}><FiInfo /> <h2>Dados Principais</h2></div>
          <div className={styles.inputGroup}>
            <label>Nome Completo</label>
            <input type="text" value={nome} onChange={e => setNome(e.target.value)} required />
          </div>
          <div className={styles.inputGroup}>
            <label>Biografia</label>
            <textarea rows={6} value={biografia} onChange={e => setBiografia(e.target.value)} required />
          </div>
        </div>

        {/* SEÇÃO 2: PALAVRAS-CHAVE E REFERÊNCIAS (NOVO) */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}><FiTag /> <h2>Palavras-Chave e Referências</h2></div>
          
          {/* Tags de Pesquisa */}
          <div className={styles.inputGroup}>
            <label>Palavras-Chave (Tags)</label>
            <div className={styles.tagInputArea}>
              <input 
                type="text" 
                placeholder="Digite e clique em +" 
                value={novaTag} 
                onChange={e => setNovaTag(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <button type="button" onClick={addTag} className={styles.miniAddBtn}><FiPlus /></button>
            </div>
            <div className={styles.tagList}>
              {palavrasChave.map(t => (
                <span key={t} className={styles.tagBadge}>
                  {t} <FiX onClick={() => removeTag(t)} />
                </span>
              ))}
            </div>
          </div>

          {/* Referências Bibliográficas */}
          <div className={styles.inputGroup}>
            <label>Principais Referências Citadas</label>
            <div className={styles.tagInputArea}>
              <input 
                type="text" 
                placeholder="Ex: SILVA, João. Título do Livro, 2024." 
                value={novaRef} 
                onChange={e => setNovaRef(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addRef())}
              />
              <button type="button" onClick={addRef} className={styles.miniAddBtn}><FiPlus /></button>
            </div>
            <ul className={styles.refList}>
              {referencias.map((r, i) => (
                <li key={i}>{r} <FiX onClick={() => removeRef(r)} /></li>
              ))}
            </ul>
          </div>
        </div>

        {/* SEÇÃO 3: LOCALIZAÇÃO */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}><FiMapPin /> <h2>Geolocalização</h2></div>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Latitude</label>
              <input type="text" value={latitude} onChange={e => setLatitude(e.target.value)} required />
            </div>
            <div className={styles.inputGroup}>
              <label>Longitude</label>
              <input type="text" value={longitude} onChange={e => setLongitude(e.target.value)} required />
            </div>
          </div>
        </div>

        {/* SEÇÃO 4: CRÉDITOS */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}><FiFileText /> <h2>Créditos</h2></div>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Autoras</label>
              <input type="text" value={autoras} onChange={e => setAutoras(e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
              <label>Revisão</label>
              <input type="text" value={revisao} onChange={e => setRevisao(e.target.value)} />
            </div>
          </div>
        </div>

        {/* SEÇÃO 5: UPLOADS */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}><FiCamera /> <h2>Arquivos</h2></div>
          <div className={styles.uploadGrid}>
            <div className={styles.fileBox}>
              <label>Foto do Jurista</label>
              <input type="file" accept="image/*" onChange={e => setFoto(e.target.files?.[0] || null)} />
            </div>
            <div className={styles.fileBox}>
              <label>Trabalho (PDF)</label>
              <input type="file" accept=".pdf" onChange={e => setPdf(e.target.files?.[0] || null)} />
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.saveBtn} disabled={loading}>
            {loading ? 'Salvando...' : <><FiSave /> Publicar no Memorial</>}
          </button>
        </div>
      </form>
    </div>
  );
}