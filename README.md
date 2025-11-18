# 📚 Estudo de Caso - Sistema de Gerenciamento de Alunos

Aplicação completa de gerenciamento de alunos com versões Web e Mobile, desenvolvida como estudo de caso para demonstrar o uso de rotas, consumo de API REST e testes automatizados.

## 🎯 Objetivo

Desenvolver uma aplicação dividida em duas partes:
- **Web**: React com Vite, React Router e testes com Vitest
- **Mobile**: React Native com Expo e Expo Router

Ambas as aplicações consomem a mesma API REST para gerenciar dados de alunos.

---

## 📁 Estrutura do Projeto

```
meu-estudo-caso/
├── web/                    # Aplicação Web (React + Vite)
│   ├── src/
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── services/      # Serviços de API
│   │   └── test/          # Configuração de testes
│   └── package.json
│
├── mobile/                 # Aplicação Mobile (Expo)
│   ├── app/
│   │   ├── aluno/         # Telas de aluno
│   │   ├── services/      # Serviços de API
│   │   └── index.tsx      # Tela principal
│   └── package.json
│
└── README.md              # Este arquivo
```

---

## 🌐 Parte 1: Aplicação Web

### 🛠️ Tecnologias Utilizadas

- **React** 18+ - Biblioteca para interfaces
- **Vite** - Build tool e dev server
- **React Router DOM** - Navegação entre páginas
- **Axios** - Cliente HTTP para consumo da API
- **React Bootstrap** - Componentes UI
- **Vitest** - Framework de testes
- **React Testing Library** - Testes de componentes

### ⚙️ Instalação e Execução (Web)

```bash
# Navegue até a pasta web
cd web

# Instale as dependências
npm install

# Execute o projeto em modo desenvolvimento
npm run dev

# Acesse no navegador
http://localhost:5173
```

### 🧪 Executar Testes (Web)

```bash
# Rodar todos os testes
npm test

# Rodar testes com interface gráfica
npm run test:ui

# Rodar testes com cobertura
npm run test:coverage
```

### 📦 Build para Produção (Web)

```bash
# Gerar build de produção
npm run build

# Preview do build
npm run preview
```

### 🛣️ Rotas da Aplicação Web

| Rota | Componente | Descrição |
|------|-----------|-----------|
| `/` | `AlunosList` | Lista todos os alunos |
| `/alunos/novo` | `AlunoForm` | Formulário para criar novo aluno |
| `/alunos/editar/:id` | `AlunoForm` | Formulário para editar aluno |
| `/alunos/:id` | `AlunoDetails` | Detalhes de um aluno específico |

### ✨ Funcionalidades Web

- ✅ Listagem de alunos com tabela responsiva
- ✅ Visualização de detalhes do aluno
- ✅ Criação de novo aluno
- ✅ Edição de aluno existente
- ✅ Exclusão de aluno com confirmação
- ✅ Loading states e tratamento de erros
- ✅ Testes automatizados completos

---

## 📱 Parte 2: Aplicação Mobile

### 🛠️ Tecnologias Utilizadas

- **React Native** - Framework mobile
- **Expo** - Plataforma de desenvolvimento
- **Expo Router** - Sistema de navegação baseado em arquivos
- **Axios** - Cliente HTTP para consumo da API
- **TypeScript** - Tipagem estática

### ⚙️ Instalação e Execução (Mobile)

```bash
# Navegue até a pasta mobile
cd mobile

# Instale as dependências
npm install

# Execute o projeto
npx expo start
```

### 📱 Executar em Dispositivo/Emulador

Após executar `npx expo start`, você verá um QR Code no terminal:

- **Android**: Pressione `a` ou escaneie o QR Code com o app Expo Go
- **iOS**: Pressione `i` ou escaneie o QR Code com a câmera do iPhone
- **Web**: Pressione `w` para abrir no navegador

### 🗺️ Estrutura de Rotas (Mobile)

| Arquivo | Rota | Descrição |
|---------|------|-----------|
| `app/index.tsx` | `/` | Lista de alunos |
| `app/aluno/[id].tsx` | `/aluno/:id` | Detalhes do aluno |
| `app/aluno/form.tsx` | `/aluno/form` | Formulário (criar/editar) |

### ✨ Funcionalidades Mobile

- ✅ Listagem de alunos com cards visuais
- ✅ Visualização de detalhes com avatar
- ✅ Criação de novo aluno
- ✅ Edição de aluno existente
- ✅ Exclusão de aluno com Alert nativo
- ✅ Pull to refresh na listagem
- ✅ Loading states e tratamento de erros
- ✅ Interface responsiva e nativa

---

## 🔌 API REST

### 📡 Endpoints Utilizados

**Base URL**: `https://proweb.leoproti.com.br`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/alunos` | Lista todos os alunos |
| `GET` | `/alunos/:id` | Busca um aluno por ID |
| `POST` | `/alunos` | Cria um novo aluno |
| `PUT` | `/alunos/:id` | Atualiza um aluno |
| `DELETE` | `/alunos/:id` | Deleta um aluno |

### 📄 Schema do Aluno

```json
{
  "id": 1,
  "nome": "João Silva",
  "turma": "3A",
  "curso": "Sistemas de Informação",
  "matricula": "2024001"
}
```

### 🔗 Documentação da API

Swagger: [https://proweb.leoproti.com.br/swagger-ui/index.html](https://proweb.leoproti.com.br/swagger-ui/index.html)

---

## 🚀 Deploy

### Deploy Web (Vercel)

1. Crie uma conta no [Vercel](https://vercel.com/)
2. Conecte seu repositório GitHub
3. Selecione a pasta `web/` como root directory
4. Configure o build command: `npm run build`
5. Configure o output directory: `dist`
6. Clique em Deploy

**Tutorial em vídeo**: [Como fazer deploy no Vercel](https://www.youtube.com/watch?v=e_92Fz99q18)

### Build Mobile (APK/IPA)

```bash
cd mobile

# Para Android (APK)
eas build --platform android

# Para iOS (requer conta Apple Developer)
eas build --platform ios
```

---

## 🧪 Testes

### Cobertura de Testes (Web)

- ✅ **alunoService.test.js** - Testes do serviço de API
  - Buscar todos os alunos
  - Buscar aluno por ID
  - Criar aluno
  - Atualizar aluno
  - Deletar aluno

- ✅ **AlunosList.test.jsx** - Testes da lista de alunos
  - Renderização com loading
  - Exibição de alunos
  - Tratamento de erros
  - Lista vazia

- ✅ **AlunoDetails.test.jsx** - Testes de detalhes
  - Exibição de informações
  - Tratamento de erros

- ✅ **AlunoForm.test.jsx** - Testes do formulário
  - Renderização de campos
  - Preenchimento e submit

---

## 📚 Recursos e Referências

### Documentação Oficial

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Vitest](https://vitest.dev/)

### Vídeos de Apoio

- [React Router DOM Tutorial](https://www.youtube.com/watch?v=AZyfp0tbGJ4&t=1288s)
- [React Navigation com Expo](https://www.youtube.com/watch?v=iNewmFYHjIw)
- [Deploy com Vercel](https://www.youtube.com/watch?v=e_92Fz99q18)
- [Testes com Vitest](https://www.youtube.com/watch?v=iLZHFDelYpQ)

---

## 🤝 Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais como estudo de caso.

---

## 👨‍💻 Autor

Desenvolvido como atividade prática de estudos sobre:
- Desenvolvimento Web com React
- Desenvolvimento Mobile com React Native
- Consumo de APIs REST
- Testes automatizados
- Deploy de aplicações

---

## 🐛 Problemas Conhecidos

- A API pode ter limitações de taxa de requisições
- Em ambientes de desenvolvimento, pode haver problemas de CORS (já tratados)
- Testes de integração requerem ambiente configurado

---