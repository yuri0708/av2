import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import alunoService from './alunoService';

// Mock do axios
vi.mock('axios');

describe('alunoService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAlunos', () => {
    it('deve retornar lista de alunos com sucesso', async () => {
      const mockAlunos = [
        { id: 1, nome: 'João Silva', turma: '3A', curso: 'SI', matricula: '2024001' },
        { id: 2, nome: 'Maria Santos', turma: '3B', curso: 'ES', matricula: '2024002' }
      ];

      axios.get.mockResolvedValue({ data: mockAlunos });

      const result = await alunoService.getAlunos();

      expect(axios.get).toHaveBeenCalledWith('https://proweb.leoproti.com.br/alunos');
      expect(result).toEqual(mockAlunos);
    });

    it('deve lançar erro ao falhar na busca', async () => {
      axios.get.mockRejectedValue(new Error('Erro de rede'));

      await expect(alunoService.getAlunos()).rejects.toThrow();
    });
  });

  describe('getAlunoById', () => {
    it('deve retornar um aluno específico', async () => {
      const mockAluno = { id: 1, nome: 'João Silva', turma: '3A', curso: 'SI', matricula: '2024001' };

      axios.get.mockResolvedValue({ data: mockAluno });

      const result = await alunoService.getAlunoById(1);

      expect(axios.get).toHaveBeenCalledWith('https://proweb.leoproti.com.br/alunos/1');
      expect(result).toEqual(mockAluno);
    });
  });

  describe('createAluno', () => {
    it('deve criar um novo aluno', async () => {
      const novoAluno = { nome: 'Pedro Costa', turma: '3C', curso: 'CC', matricula: '2024003' };
      const mockResponse = { id: 3, ...novoAluno };

      axios.post.mockResolvedValue({ data: mockResponse });

      const result = await alunoService.createAluno(novoAluno);

      expect(axios.post).toHaveBeenCalledWith('https://proweb.leoproti.com.br/alunos', novoAluno);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateAluno', () => {
    it('deve atualizar um aluno existente', async () => {
      const alunoAtualizado = { nome: 'João Silva Atualizado', turma: '4A', curso: 'SI', matricula: '2024001' };
      const mockResponse = { id: 1, ...alunoAtualizado };

      axios.put.mockResolvedValue({ data: mockResponse });

      const result = await alunoService.updateAluno(1, alunoAtualizado);

      expect(axios.put).toHaveBeenCalledWith('https://proweb.leoproti.com.br/alunos/1', alunoAtualizado);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteAluno', () => {
    it('deve deletar um aluno', async () => {
      axios.delete.mockResolvedValue({});

      await alunoService.deleteAluno(1);

      expect(axios.delete).toHaveBeenCalledWith('https://proweb.leoproti.com.br/alunos/1');
    });
  });
});