"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:3001/auth/login', { email, senha });
    const token = response.data.access_token;

    // 1. Salva no localStorage (para o Axios usar no Dashboard)
    localStorage.setItem('token', token);

    // 2. Salva no Cookie (para o Middleware proteger a rota)
    // 'path=/' faz o cookie valer para todo o site
    // 'max-age=86400' faz o login durar 24 horas
    document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;

    router.push('/dashboard');
  } catch (error) {
    alert('Erro no login. Verifique suas credenciais.');
  }
};

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <form onSubmit={handleLogin} style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '350px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Acesso Restrito</h2>
        
        <input 
          type="email" 
          placeholder="E-mail" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #ccc' }}
          required
        />
        
        <input 
          type="password" 
          placeholder="Senha" 
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '1.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          required
        />
        
        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#2c3e50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Entrar no Painel
        </button>
      </form>
    </div>
  );
}