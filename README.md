<div align="center">
  <h1>PlotTale</h1>
  <p><strong>Onde Histórias Ganham Vida em Colaboração</strong></p>

  <!-- Badges de Tecnologia -->
  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
    <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS">
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma">
    <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  </p>
</div>

---

## 📚 Sobre o Projeto

**PlotTale** é uma plataforma web inovadora para a criação colaborativa de livros e histórias. O sistema permite que um usuário "Autor" inicie uma nova obra, cadastrando o título, a sinopse e o gênero. A partir daí, a comunidade de "Contribuidores" pode enviar suas próprias versões para o capítulo seguinte.

A principal funcionalidade do sistema é o seu processo democrático de seleção: através de um sistema de votação, os próprios leitores escolhem qual das contribuições enviadas dará continuidade à história. O capítulo mais votado é então oficializado pelo autor, e o ciclo se reinicia para o capítulo seguinte, criando uma narrativa dinâmica e imprevisível.

---

## ✨ Funcionalidades Principais

*   **Autenticação Segura:** Cadastro e Login com tokens JWT.
*   **Criação de Obras:** Autores podem iniciar novas histórias com título, sinopse e gênero.
*   **Escrita Colaborativa:** Qualquer usuário logado pode enviar uma proposta para o próximo capítulo de um livro.
*   **Sistema de Votação:** A comunidade vota em suas continuações favoritas. O sistema permite votar e desvotar.
*   **Curadoria do Autor:** O autor original tem o poder final de aceitar a contribuição mais votada, tornando-a um capítulo oficial.
*   **Exploração Dinâmica:** Página inicial com busca por título e filtro por gênero.
*   **Perfil do Usuário:** Um dashboard pessoal onde cada usuário pode ver os livros que criou e as contribuições que fez.

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com uma stack moderna e robusta, separando claramente as responsabilidades entre o frontend e o backend.

### **Frontend**
*   **Framework:** **React** com **Vite** para um desenvolvimento rápido e otimizado.
*   **Linguagem:** JavaScript (ES6+).
*   **Roteamento:** `react-router-dom`.
*   **Requisições HTTP:** `axios`.
*   **Gerenciamento de Estado:** React Context API para o estado de autenticação.
*   **Estilização:** CSS puro com foco em Flexbox, CSS Grid e design responsivo.

### **Backend**
*   **Framework:** **NestJS**, uma estrutura Node.js progressiva para construir aplicações eficientes e escaláveis.
*   **Linguagem:** TypeScript.
*   **ORM:** **Prisma** para uma interação type-safe e intuitiva com o banco de dados.
*   **Banco de Dados:** **MySQL**.
*   **Autenticação:** Tokens JWT com `passport-jwt`.
*   **Documentação da API:** Swagger (OpenAPI) para uma documentação interativa.

---

## ⚙️ Como Executar o Projeto

Para rodar o PlotTale em seu ambiente local, siga os passos abaixo.

### **Pré-requisitos**

*   [Node.js](https://nodejs.org/en/) (versão 16 ou superior)
*   [Git](https://git-scm.com)
*   Um servidor de banco de dados **MySQL** rodando localmente.

### **1. Clone o Repositório**
```bash
git clone https://github.com/SEU_USUARIO/PlotTale-Prog4.git
cd PlotTale-Prog4
```

### **2. Configuração do Backend**

```bash
# Navegue até a pasta do backend
cd backend

# Instale as dependências
npm install

# Crie um arquivo .env na raiz da pasta 'backend' e configure sua DATABASE_URL
# Exemplo de .env:
# DATABASE_URL="mysql://USUARIO:SENHA@localhost:3306/plottale_db"
# JWT_SECRET="SEU_SEGREDO_SUPER_SECRETO"

# Aplique as migrações do Prisma para criar as tabelas no banco
npx prisma migrate dev

# Inicie o servidor do backend (geralmente em http://localhost:3000)
npm run start:dev
```

### **3. Configuração do Frontend**

```bash
# Em um novo terminal, navegue até a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento do frontend (geralmente em http://localhost:5173)
npm run dev
```

Agora, basta abrir **`http://localhost:5173`** no seu navegador para ver o PlotTale em ação!

---

## 👥 Time de Desenvolvimento

Este projeto foi desenvolvido com paixão pelo time **DevFlow**.

*   **Lucas Abati Zanotto** - [*lucasabatizanotto@gmail.com*](mailto:lucasabatizanotto@gmail.com)

---

## 🎥 Video da aplicação em funcionamento

* [https://youtu.be/45FXGuCjhog](https://youtu.be/45FXGuCjhog)

<div align="center">
  <strong>Obrigado por visitar o nosso projeto!</strong>
</div>
