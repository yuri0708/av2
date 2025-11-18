import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AlunosList from './pages/AlunosList';
import AlunoDetails from './pages/AlunosDetails';
import AlunoForm from './pages/AlunoForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AlunosList />} />
        <Route path="/alunos/novo" element={<AlunoForm />} />
        <Route path="/alunos/editar/:id" element={<AlunoForm />} />
        <Route path="/alunos/:id" element={<AlunoDetails />} />
      </Routes>
    </Router>
  );
}

export default App;