"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiSave, FiInfo, FiShield, FiPlus, FiTrash2 } from 'react-icons/fi';
import styles from './institucional.module.css';

interface ValorItem {
  titulo: string;
  texto: string;
}

export default function GerenciarInstitucional() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Estados do AboutUs
  const [aboutTitulo, setAboutTitulo] = useState('');
  const [aboutConteudo, setAboutConteudo] = useState('');

  // Estados dos Valores (Inicia como array vazio)
  const [valores, setValores] = useState<ValorItem[]>([]);

  useEffect(() => {
    fetchDados();
  }, []);

  const fetchDados = async () => {
    try {
      const res = await axios.get('http://localhost:3001/institucional');
      if (res.data) {
        setAboutTitulo(res.data.about_titulo);
        setAboutConteudo(res.data.about_conteudo);
        setValores(JSON.parse(res.data.valores_json || '[]'));
      }
    } catch (e) {
      console.error("Erro ao buscar dados");
    } finally {
      setLoading(false);
    }
  };

  const handleAddValor = () => {
    setValores([...valores, { titulo: '', texto: '' }]);
  };

  const handleRemoveValor = (index: number) => {
    setValores(valores.filter((_, i) => i !== index));
  };

  const handleUpdateValor = (index: number, campo: keyof ValorItem, valor: string) => {
    const novosValores = [...valores];
    novosValores[index][campo] = valor;
    setValores(novosValores);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      about_titulo: aboutTitulo,
      about_conteudo: aboutConteudo,
      valores_json: JSON.stringify(valores)
    };

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/institucional', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Conteúdo institucional atualizado!");
    } catch (e) {
      alert("Erro ao salvar dados.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className={styles.loading}>Carregando configurações...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Configurações Institucionais</h1>
        <p>Ajuste as informações principais que definem o projeto Cordel.</p>
      </header>

      <form onSubmit={handleSave} className={styles.form}>
        
        {/* SEÇÃO SOBRE NÓS */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <FiInfo size={20} />
            <h2>Quem Somos (About Us)</h2>
          </div>
          <div className={styles.inputGroup}>
            <label>Título da Seção</label>
            <input 
              type="text" 
              value={aboutTitulo} 
              onChange={e => setAboutTitulo(e.target.value)} 
              placeholder="Ex: Nossa História"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Texto Descritivo</label>
            <textarea 
              rows={10} 
              value={aboutConteudo} 
              onChange={e => setAboutConteudo(e.target.value)} 
              placeholder="Conte a trajetória do projeto..."
              required
            />
          </div>
        </section>

        {/* SEÇÃO VALORES */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <FiShield size={20} />
            <h2>Nossos Valores</h2>
            <button type="button" onClick={handleAddValor} className={styles.addBtn}>
              <FiPlus /> Adicionar Valor
            </button>
          </div>
          
          <div className={styles.valoresList}>
            {valores.map((v, index) => (
              <div key={index} className={styles.valorItem}>
                <div className={styles.valorHeader}>
                  <span>Valor #{index + 1}</span>
                  <button type="button" onClick={() => handleRemoveValor(index)} className={styles.removeBtn}>
                    <FiTrash2 />
                  </button>
                </div>
                <input 
                  placeholder="Título (Ex: Ética)" 
                  value={v.titulo} 
                  onChange={e => handleUpdateValor(index, 'titulo', e.target.value)}
                  required
                />
                <textarea 
                  placeholder="Descrição do valor..." 
                  value={v.texto} 
                  onChange={e => handleUpdateValor(index, 'texto', e.target.value)}
                  required
                />
              </div>
            ))}
          </div>
        </section>

        <div className={styles.actions}>
          <button type="submit" className={styles.saveBtn} disabled={saving}>
            {saving ? 'Salvando alterações...' : <><FiSave /> Salvar Tudo</>}
          </button>
        </div>
      </form>
    </div>
  );
}