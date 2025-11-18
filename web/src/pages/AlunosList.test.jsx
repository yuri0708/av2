import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AlunosList from './AlunosList';
import alunoService from '../services/alunoService';

vi.mock('../services/alunoService');

describe('AlunosList', () => {
  const mockAlunos = [
    { id: 1, nome: 'João Silva', turma: '3A', curso: 'SI', matricula: '2024001' },
    { id: 2, nome: 'Maria Santos', turma: '3B', curso: 'ES', matricula: '2024002' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve exibir loading inicialmente', () => {
    alunoService.getAlunos.mockImplementation(() => new Promise(() => {}));
    
    render(
      <BrowserRouter>
        <AlunosList />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });

  it('deve exibir lista de alunos após carregar', async () => {
    alunoService.getAlunos.mockResolvedValue(mockAlunos);

    render(
      <BrowserRouter>
        <AlunosList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument();
      expect(screen.getByText('Maria Santos')).toBeInTheDocument();
    });
  });

  it('deve exibir mensagem quando não houver alunos', async () => {
    alunoService.getAlunos.mockResolvedValue([]);

    render(
      <BrowserRouter>
        <AlunosList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/nenhum aluno cadastrado/i)).toBeInTheDocument();
    });
  });

  it('deve exibir erro quando falhar ao carregar', async () => {
    alunoService.getAlunos.mockRejectedValue(new Error('Erro'));

    render(
      <BrowserRouter>
        <AlunosList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/erro ao carregar alunos/i)).toBeInTheDocument();
    });
  });

  it('deve ter botão de novo aluno', async () => {
    alunoService.getAlunos.mockResolvedValue(mockAlunos);

    render(
      <BrowserRouter>
        <AlunosList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/novo aluno/i)).toBeInTheDocument();
    });
  });
});