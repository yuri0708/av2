import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import alunoService, { Aluno } from '../services/alunoService';

export default function AlunoDetails() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAlunoDetails();
  }, [params.id]);

  const loadAlunoDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await alunoService.getAlunoById(Number(params.id));
      setAluno(data);
    } catch (err) {
      setError('Erro ao carregar detalhes do aluno.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Carregando detalhes...</Text>
      </View>
    );
  }

  if (error || !aluno) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || 'Aluno não encontrado'}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadAlunoDetails}>
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.retryButton, styles.backButton]}
          onPress={() => router.back()}
        >
          <Text style={styles.retryButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Detalhes do Aluno</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {aluno.nome.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.nomeCompleto}>{aluno.nome}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoContainer}>
          <InfoRow label="ID" value={`#${aluno.id}`} />
          <InfoRow label="Nome" value={aluno.nome} />
          <InfoRow label="Turma" value={aluno.turma} />
          <InfoRow label="Curso" value={aluno.curso} />
          <InfoRow label="Matrícula" value={aluno.matricula} />
        </View>
      </View>

      <TouchableOpacity
        style={styles.backButtonBottom}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>← Voltar para Lista</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },
  nomeCompleto: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  infoContainer: {
    gap: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
    textAlign: 'right',
    flex: 1,
    marginLeft: 10,
  },
  backButtonBottom: {
    margin: 15,
    backgroundColor: '#6c757d',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
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
    marginTop: 10,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#6c757d',
  },
});