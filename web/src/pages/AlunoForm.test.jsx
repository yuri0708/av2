import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import AlunoForm from './AlunoForm';
import alunoService from '../services/alunoService';

vi.mock('../services/alunoService');

describe('AlunoForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar formulário de criação', () => {
    render(
      <BrowserRouter>
        <AlunoForm />
      </BrowserRouter>
    );

    expect(screen.getByText(/novo aluno/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/turma/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/curso/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/matrícula/i)).toBeInTheDocument();
  });

  it('deve preencher formulário e submeter', async () => {
    const user = userEvent.setup();
    alunoService.createAluno.mockResolvedValue({ id: 1 });

    render(
      <BrowserRouter>
        <AlunoForm />
      </BrowserRouter>
    );

    await user.type(screen.getByLabelText(/nome/i), 'João Silva');
    await user.type(screen.getByLabelText(/turma/i), '3A');
    await user.type(screen.getByLabelText(/curso/i), 'SI');
    await user.type(screen.getByLabelText(/matrícula/i), '2024001');

    const submitButton = screen.getByRole('button', { name: /criar/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(alunoService.createAluno).toHaveBeenCalledWith({
        nome: 'João Silva',
        turma: '3A',
        curso: 'SI',
        matricula: '2024001'
      });
    });
  });
});