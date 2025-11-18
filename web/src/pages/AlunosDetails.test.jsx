import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AlunoDetails from './AlunoDetails';
import alunoService from '../services/alunoService';

vi.mock('../services/alunoService');

describe('AlunoDetails', () => {
  const mockAluno = {
    id: 1,
    nome: 'João Silva',
    turma: '3A',
    curso: 'Sistemas de Informação',
    matricula: '2024001'
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve exibir detalhes do aluno', async () => {
    alunoService.getAlunoById.mockResolvedValue(mockAluno);

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AlunoDetails />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument();
      expect(screen.getByText(/3A/)).toBeInTheDocument();
      expect(screen.getByText(/Sistemas de Informação/)).toBeInTheDocument();
    });
  });

  it('deve exibir erro quando aluno não for encontrado', async () => {
    alunoService.getAlunoById.mockRejectedValue(new Error('Não encontrado'));

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AlunoDetails />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/erro ao carregar/i)).toBeInTheDocument();
    });
  });
});