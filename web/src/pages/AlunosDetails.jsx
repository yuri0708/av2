import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Spinner, Alert } from 'react-bootstrap';
import alunoService from '../services/alunoService';

function AlunoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aluno, setAluno] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAluno();
  }, [id]);

  const loadAluno = async () => {
    try {
      setLoading(true);
      const data = await alunoService.getAlunoById(id);
      setAluno(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar detalhes do aluno. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
        <Button onClick={loadAluno}>Tentar Novamente</Button>
        <Button variant="secondary" className="ms-2" onClick={handleBack}>
          Voltar
        </Button>
      </Container>
    );
  }

  if (!aluno) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">Aluno não encontrado.</Alert>
        <Button onClick={handleBack}>Voltar</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Button variant="secondary" className="mb-3" onClick={handleBack}>
        ← Voltar
      </Button>
      
      <Card>
        <Card.Header as="h2">
          Detalhes do Aluno
        </Card.Header>
        <Card.Body>
          <Card.Title>{aluno.nome}</Card.Title>
          <hr />
          <div className="mb-3">
            <strong>ID:</strong> {aluno.id}
          </div>
          <div className="mb-3">
            <strong>Nome:</strong> {aluno.nome}
          </div>
          <div className="mb-3">
            <strong>Turma:</strong> {aluno.turma}
          </div>
          <div className="mb-3">
            <strong>Curso:</strong> {aluno.curso}
          </div>
          <div className="mb-3">
            <strong>Matrícula:</strong> {aluno.matricula}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AlunoDetails;