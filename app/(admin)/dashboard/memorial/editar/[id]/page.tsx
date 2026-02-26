"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { 
  FiSave, FiArrowLeft, FiCamera, FiFileText, 
  FiMapPin, FiInfo, FiRefreshCw, FiTag, FiX, FiPlus 
} from 'react-icons/fi';
import styles from '../../novo/novoJurista.module.css';

export default function EditarJurista() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Estados dos campos básicos
  const [nome, setNome] = useState('');
  const [biografia, setBiografia] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [autoras, setAutoras] = useState('');
  const [revisao, setRevisao] = useState('');
  
  // Mídia atual e novos arquivos
  const [fotoAtual, setFotoAtual] = useState('');
  const [pdfAtual, setPdfAtual] = useState('');
  const [novaFoto, setNovaFoto] = useState<File | null>(null);
  const [novoPdf, setNovoPdf] = useState<File | null>(null);

  // ESTADOS PARA OS CAMPOS DINÂMICOS
  const [palavrasChave, setPalavrasChave] = useState<string[]>([]);
  const [novaTag, setNovaTag] = useState('');
  const [referencias, setReferencias] = useState<string[]>([]);
  const [novaRef, setNovaRef] = useState('');

  useEffect(() => {
    fetchJurista();
  }, [id]);

  const fetchJurista = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/memorial/${id}`);
      const data = res.data;
      
      setNome(data.nome);
      setBiografia(data.biografia);
      setLatitude(data.latitude.toString());
      setLongitude(data.longitude.toString());
      setAutoras(data.autoras || '');
      setRevisao(data.revisao || '');
      setFotoAtual(data.foto_url || '');
      setPdfAtual(data.pdf_url || '');

      if (data.palavras_chave) {
        setPalavrasChave(data.palavras_chave.map((p: any) => p.termo));
      }
      if (data.referencias_citadas) {
        setReferencias(data.referencias_citadas.map((r: any) => r.nome_referencia));
      }

    } catch (error) {
      alert("Erro ao carregar dados do jurista.");
      router.push('/dashboard/memorial');
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (novaTag.trim() && !palavrasChave.includes(novaTag.trim())) {
      setPalavrasChave([...palavrasChave, novaTag.trim()]);
      setNovaTag('');
    }
  };

  const addRef = () => {
    if (novaRef.trim()) {
      setReferencias([...referencias, novaRef.trim()]);
      setNovaRef('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('biografia', biografia);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('autoras', autoras);
    formData.append('revisao', revisao);
    
    const tagsFormatadas = palavrasChave.map(t => ({ termo: t }));
    const refsFormatadas = referencias.map(r => ({ nome_referencia: r }));
    formData.append('palavras_chave', JSON.stringify(tagsFormatadas));
    formData.append('referencias_citadas', JSON.stringify(refsFormatadas));

    if (novaFoto) formData.append('foto', novaFoto);
    if (novoPdf) formData.append('pdf', novoPdf);

    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:3001/memorial/${id}`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` 
        }
      });
      alert('Jurista atualizado com sucesso!');
      router.push('/dashboard/memorial');
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar jurista.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className={styles.container}>Carregando...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => router.back()} className={styles.backBtn}>
          <FiArrowLeft /> Voltar
        </button>
        <h1>Editar: {nome}</h1>
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
            <textarea rows={8} value={biografia} onChange={e => setBiografia(e.target.value)} required />
          </div>
        </div>

        {/* SEÇÃO 2: PALAVRAS-CHAVE E REFERÊNCIAS */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}><FiTag /> <h2>Palavras-Chave e Referências</h2></div>
          
          <div className={styles.inputGroup}>
            <label>Palavras-Chave (Tags)</label>
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
              {palavrasChave.map(t => (
                <span key={t} className={styles.tagBadge}>
                  {t} <FiX onClick={() => setPalavrasChave(palavrasChave.filter(item => item !== t))} />
                </span>
              ))}
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Referências Citadas</label>
            <div className={styles.tagInputArea}>
              <input 
                type="text" 
                placeholder="Adicionar referência..." 
                value={novaRef} 
                onChange={e => setNovaRef(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addRef())}
              />
              <button type="button" onClick={addRef} className={styles.miniAddBtn}><FiPlus /></button>
            </div>
            <ul className={styles.refList}>
              {referencias.map((r, i) => (
                <li key={i}>{r} <FiX onClick={() => setReferencias(referencias.filter((_, index) => index !== i))} /></li>
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

        {/* SEÇÃO 4: CRÉDITOS (RESTAURADO) */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}><FiFileText /> <h2>Créditos da Pesquisa</h2></div>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Autoras (Pesquisadoras)</label>
              <input 
                type="text" 
                placeholder="Nomes das pesquisadoras" 
                value={autoras} 
                onChange={e => setAutoras(e.target.value)} 
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Revisão</label>
              <input 
                type="text" 
                placeholder="Nome do revisor" 
                value={revisao} 
                onChange={e => setRevisao(e.target.value)} 
              />
            </div>
          </div>
        </div>

        {/* SEÇÃO 5: ARQUIVOS */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}><FiCamera /> <h2>Arquivos e Mídia</h2></div>
          <div className={styles.uploadGrid}>
            <div className={styles.fileBox}>
              <label>Foto Atual</label>
              {fotoAtual && <img src={`http://localhost:3001${fotoAtual}`} className={styles.previewImg} alt="Preview" />}
              <input type="file" accept="image/*" onChange={e => setNovaFoto(e.target.files?.[0] || null)} />
              <small>Selecione apenas se desejar trocar a foto.</small>
            </div>
            <div className={styles.fileBox}>
              <label>PDF Atual</label>
              {pdfAtual && <div className={styles.pdfBadge}><FiFileText /> Arquivo salvo</div>}
              <input type="file" accept=".pdf" onChange={e => setNovoPdf(e.target.files?.[0] || null)} />
              <small>Selecione apenas se desejar trocar o PDF.</small>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.saveBtn} disabled={saving}>
            {saving ? 'Atualizando...' : <><FiRefreshCw /> Atualizar Registro</>}
          </button>
        </div>
      </form>
    </div>
  );
}