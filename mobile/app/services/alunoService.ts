import axios from 'axios';

const API_URL = 'https://proweb.leoproti.com.br';

export interface Aluno {
  id?: number;
  nome: string;
  turma: string;
  curso: string;
  matricula: string;
}

const alunoService = {
  getAlunos: async (): Promise<Aluno[]> => {
    try {
      const response = await axios.get(`${API_URL}/alunos`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      throw error;
    }
  },

  getAlunoById: async (id: number): Promise<Aluno> => {
    try {
      const response = await axios.get(`${API_URL}/alunos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar aluno ${id}:`, error);
      throw error;
    }
  },

  createAluno: async (aluno: Aluno): Promise<Aluno> => {
    try {
      const response = await axios.post(`${API_URL}/alunos`, aluno);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar aluno:', error);
      throw error;
    }
  },

  updateAluno: async (id: number, aluno: Aluno): Promise<Aluno> => {
    try {
      const response = await axios.put(`${API_URL}/alunos/${id}`, aluno);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar aluno ${id}:`, error);
      throw error;
    }
  },

  deleteAluno: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/alunos/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar aluno ${id}:`, error);
      throw error;
    }
  }
};

export default alunoService;