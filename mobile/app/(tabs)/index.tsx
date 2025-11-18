import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import alunoService, { Aluno } from '../services/alunoService';

export default function Index() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadAlunos();
  }, []);

  const loadAlunos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await alunoService.getAlunos();
      setAlunos(data);
    } catch (err) {
      setError('Erro ao carregar alunos. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAlunoPress = (aluno: Aluno) => {
    router.push({
      pathname: '/aluno/[id]',
      params: { id: aluno.id!.toString() }
    });
  };

  const handleEdit = (aluno: Aluno) => {
    router.push({
      pathname: '//aluno/form',
      params: {
        id: aluno.id!.toString(),
        nome: aluno.nome,
        turma: aluno.turma,
        curso: aluno.curso,
        matricula: aluno.matricula
      }
    });
  };

  const handleDelete = (aluno: Aluno) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja excluir ${aluno.nome}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: async () => {
            try {
              await alunoService.deleteAluno(aluno.id!);
              loadAlunos();
              Alert.alert('Sucesso', 'Aluno deletado com sucesso!');
            } catch (err) {
              Alert.alert('Erro', 'Não foi possível deletar o aluno.');
            }
          }
        }
      ]
    );
  };

  const handleCreate = () => {
    router.push('/aluno/form');
  };

  const renderAluno = ({ item }: { item: Aluno }) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => handleAlunoPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.alunoNome}>{item.nome}</Text>
          <Text style={styles.alunoId}>#{item.id}</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.infoText}>📚 Turma: {item.turma}</Text>
          <Text style={styles.infoText}>🎓 Curso: {item.curso}</Text>
          <Text style={styles.infoText}>🎫 Matrícula: {item.matricula}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEdit(item)}
        >
          <Text style={styles.actionButtonText}>✏️ Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDelete(item)}
        >
          <Text style={styles.actionButtonText}>🗑️ Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Carregando alunos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadAlunos}>
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Alunos</Text>
        <Text style={styles.subtitle}>
          {alunos.length} {alunos.length === 1 ? 'aluno' : 'alunos'}
        </Text>
      </View>

      <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
        <Text style={styles.createButtonText}>+ Novo Aluno</Text>
      </TouchableOpacity>

      {alunos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum aluno cadastrado</Text>
        </View>
      ) : (
        <FlatList
          data={alunos}
          keyExtractor={(item) => item.id!.toString()}
          renderItem={renderAluno}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  createButton: {
    backgroundColor: '#28a745',
    margin: 15,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  alunoNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  alunoId: {
    fontSize: 14,
    color: '#999',
    fontWeight: '600',
  },
  cardBody: {
    gap: 5,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#ffc107',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#ff3b30',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});