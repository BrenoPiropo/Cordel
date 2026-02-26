import axios from 'axios';

const api = axios.create({
  // Se estiver no Emulador Android, use: http://10.0.2.2:3000
  // Se estiver no iOS ou Web, use: http://localhost:3000
  baseURL: 'http://localhost:3001', 
});

// Exemplo de função para buscar os posts do blog
export const getBlogPosts = async () => {
  try {
    const response = await api.get('/blog');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    throw error;
  }
};

export default api;