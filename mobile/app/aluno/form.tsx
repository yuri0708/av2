import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import alunoService, { Aluno } from '../services/alunoService';

export default function AlunoForm() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const isEdit = !!params.id;

  const [formData, setFormData] = useState<Aluno>({
    nome: (params.nome as string) || '',
    turma: (params.turma as string) || '',
    curso: (params.curso as string) || '',
    matricula: (params.matricula as string) || '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof Aluno, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // Validação
    if (!formData.nome || !formData.turma || !formData.curso || !formData.matricula) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    try {
      setLoading(true);

      if (isEdit) {
        await alunoService.updateAluno(Number(params.id), formData);
        Alert.alert('Sucesso', 'Aluno atualizado com sucesso!', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      } else {
        await alunoService.createAluno(formData);
        Alert.alert('Sucesso', 'Aluno criado com sucesso!', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      }
    } catch (err) {
      Alert.alert('Erro', isEdit ? 'Erro ao atualizar aluno.' : 'Erro ao criar aluno.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {isEdit ? 'Editar Aluno' : 'Novo Aluno'}
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome Completo *</Text>
          <TextInput
            style={styles.input}
            value={formData.nome}
            onChangeText={(text) => handleChange('nome', text)}
            placeholder="Digite o nome completo"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Turma *</Text>
          <TextInput
            style={styles.input}
            value={formData.turma}
            onChangeText={(text) => handleChange('turma', text)}
            placeholder="Ex: 3A"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Curso *</Text>
          <TextInput
            style={styles.input}
            value={formData.curso}
            onChangeText={(text) => handleChange('curso', text)}
            placeholder="Ex: Engenharia de Software"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Matrícula *</Text>
          <TextInput
            style={styles.input}
            value={formData.matricula}
            onChangeText={(text) => handleChange('matricula', text)}
            placeholder="Ex: 2024001"
            placeholderTextColor="#999"
            keyboardType="default"
          />
        </View>

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>
              {isEdit ? '✓ Atualizar' : '✓ Criar'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
          disabled={loading}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});