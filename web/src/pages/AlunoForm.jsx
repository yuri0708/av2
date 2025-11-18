import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import alunoService from '../services/alunoService';

function AlunoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    nome: '',
    turma: '',
    curso: '',
    matricula: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isEdit) {
      loadAluno();
    }
  }, [id]);

  const loadAluno = async () => {
    try {
      setLoading(true);
      const data = await alunoService.getAlunoById(id);
      setFormData({
        nome: data.nome,
        turma: data.turma,
        curso: data.curso,
        matricula: data.matricula
      });
    } catch (err) {
      setError('Erro ao carregar dados do aluno.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      setLoading(true);
      
      if (isEdit) {
        await alunoService.updateAluno(id, formData);
        setSuccess(true);
        setTimeout(() => navigate('/'), 1500);
      } else {
        await alunoService.createAluno(formData);
        setSuccess(true);
        setTimeout(() => navigate('/'), 1500);
      }
    } catch (err) {
      setError(isEdit ? 'Erro ao atualizar aluno.' : 'Erro ao criar aluno.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading && isEdit) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h1 className="mb-4">{isEdit ? 'Editar Aluno' : 'Novo Aluno'}</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success">
          {isEdit ? 'Aluno atualizado com sucesso!' : 'Aluno criado com sucesso!'}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome *</Form.Label>
          <Form.Control
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            placeholder="Digite o nome completo"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Turma *</Form.Label>
          <Form.Control
            type="text"
            name="turma"
            value={formData.turma}
            onChange={handleChange}
            required
            placeholder="Ex: 3A"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Curso *</Form.Label>
          <Form.Control
            type="text"
            name="curso"
            value={formData.curso}
            onChange={handleChange}
            required
            placeholder="Ex: Engenharia de Software"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Matrícula *</Form.Label>
          <Form.Control
            type="text"
            name="matricula"
            value={formData.matricula}
            onChange={handleChange}
            required
            placeholder="Ex: 2024001"
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Salvando...' : isEdit ? 'Atualizar' : 'Criar'}
          </Button>
          <Button variant="secondary" onClick={handleCancel} disabled={loading}>
            Cancelar
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default AlunoForm;