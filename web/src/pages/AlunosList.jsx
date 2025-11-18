import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Spinner, Alert, Modal } from 'react-bootstrap';
import alunoService from '../services/alunoService';

function AlunosList() {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [alunoToDelete, setAlunoToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadAlunos();
  }, []);

  const loadAlunos = async () => {
    try {
      setLoading(true);
      const data = await alunoService.getAlunos();
      setAlunos(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar alunos. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/alunos/${id}`);
  };

  const handleCreate = () => {
    navigate('/alunos/novo');
  };

  const handleEdit = (id) => {
    navigate(`/alunos/editar/${id}`);
  };

  const handleDeleteClick = (aluno) => {
    setAlunoToDelete(aluno);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await alunoService.deleteAluno(alunoToDelete.id);
      setShowDeleteModal(false);
      setAlunoToDelete(null);
      loadAlunos(); // Recarrega a lista
    } catch (err) {
      setError('Erro ao deletar aluno.');
      console.error(err);
      setShowDeleteModal(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setAlunoToDelete(null);
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
        <Button onClick={loadAlunos}>Tentar Novamente</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Lista de Alunos</h1>
        <Button variant="success" onClick={handleCreate}>
          + Novo Aluno
        </Button>
      </div>
      
      {alunos.length === 0 ? (
        <Alert variant="info">Nenhum aluno cadastrado.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Turma</th>
              <th>Curso</th>
              <th>Matrícula</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.id}</td>
                <td>{aluno.nome}</td>
                <td>{aluno.turma}</td>
                <td>{aluno.curso}</td>
                <td>{aluno.matricula}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => handleViewDetails(aluno.id)}
                    >
                      Ver
                    </Button>
                    <Button 
                      variant="warning" 
                      size="sm"
                      onClick={() => handleEdit(aluno.id)}
                    >
                      Editar
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleDeleteClick(aluno)}
                    >
                      Deletar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir o aluno <strong>{alunoToDelete?.nome}</strong>?
          <br />
          Esta ação não pode ser desfeita.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AlunosList;