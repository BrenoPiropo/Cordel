"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiUserPlus, FiTrash2, FiShield, FiCheck, FiLock, FiUser, FiMail } from 'react-icons/fi';
import styles from './usuarios.module.css';

export default function GerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [novoUser, setNovoUser] = useState({ nome: '', email: '', senha: '' });

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:3001/auth/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsuarios(res.data);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/auth/register', novoUser, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowModal(false);
      fetchUsers();
      alert("Usuário criado!");
    } catch (err) { alert("Erro ao criar usuário."); }
  };

const handleDelete = async (id: number) => {
  if(confirm("Remover este administrador?")) {
    const token = localStorage.getItem('token');
    const url = `http://localhost:3001/auth/users/${id}`;
    
    console.log("Tentando deletar em:", url); // Veja se o ID está vindo correto
    
    try {
      await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Erro ao remover: Verifique se a rota existe no Back-end.");
    }
  }
};
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Administradores</h1>
        <button onClick={() => setShowModal(true)} className={styles.addBtn}>
          <FiUserPlus /> Novo Admin
        </button>
      </header>

      <div className={styles.userGrid}>
        {usuarios.map((user: any) => (
          <div key={user.id} className={styles.userCard}>
            <div className={styles.userAvatar}><FiShield /></div>
            <div className={styles.userInfo}>
              <strong>{user.nome}</strong>
              <span>{user.email}</span>
            </div>
            <button onClick={() => handleDelete(user.id)} className={styles.deleteBtn}>
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>

{/* 🎭 Modal de Cadastro Premium */}
{showModal && (
  <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
    <div className={styles.modal} onClick={e => e.stopPropagation()}>
      <div className={styles.modalHeader}>
        <h2>Cadastrar Novo Administrador</h2>
        <p>Preencha os dados abaixo para criar um novo acesso ao painel.</p>
      </div>

      <form onSubmit={handleCreate} className={styles.modalForm}>
        <div className={styles.inputGroup}>
          <label>Nome Completo</label>
          <div className={styles.inputWrapper}>
            <FiUser className={styles.inputIcon} />
            <input 
              placeholder="Ex: João Silva" 
              onChange={e => setNovoUser({...novoUser, nome: e.target.value})} 
              required 
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>E-mail Profissional</label>
          <div className={styles.inputWrapper}>
            <FiMail className={styles.inputIcon} />
            <input 
              type="email" 
              placeholder="email@cordel.com" 
              onChange={e => setNovoUser({...novoUser, email: e.target.value})} 
              required 
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>Senha de Acesso</label>
          <div className={styles.inputWrapper}>
            <FiLock className={styles.inputIcon} />
            <input 
              type="password" 
              placeholder="••••••••" 
              onChange={e => setNovoUser({...novoUser, senha: e.target.value})} 
              required 
            />
          </div>
        </div>

        <div className={styles.modalActions}>
          <button 
            type="button" 
            className={styles.cancelBtn} 
            onClick={() => setShowModal(false)}
          >
            Cancelar
          </button>
          <button type="submit" className={styles.saveBtn}>
            <FiCheck /> Criar Administrador
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
}