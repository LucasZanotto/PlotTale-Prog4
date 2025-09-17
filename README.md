# PlotTale

## 📚 Descrição

PlotTale é uma plataforma web para a criação colaborativa de livros e histórias. O sistema permite que um usuário "Autor" inicie uma nova obra, e a comunidade de "Contribuidores" pode enviar suas próprias versões para o capítulo seguinte, que são escolhidas de forma democrática através de um sistema de votação.

---

## ✨ Funcionalidades

*   Criação de novos livros com título, sinopse e primeiro capítulo.
*   Contribuição da comunidade com propostas para os próximos capítulos.
*   Sistema de votação para escolher a continuação da história.
*   Filtro de obras por gênero e título.
*   Perfis de usuário com obras criadas e contribuições.

---

## 💻 Time

*   **DevFlow**
    *   Lucas Abati Zanotto - lucasabatizanotto@gmail.com

---

## 🚀 Tecnologias Utilizadas

*   **Frontend:** React com Vite, JavaScript
*   **Backend:** AdonisJS, Node.js
*   **Banco de Dados:** MySQL
*   **ORM:** Lucid

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
*   [Git](https://git-scm.com)
*   [Node.js](https://nodejs.org/en/)
*   [NPM](https://www.npmjs.com/)
*   Um gerenciador de banco de dados MySQL.

### Rodando o Backend (Servidor)

```bash
# Clone este repositório
$ git clone https://github.com/seu-usuario/PlotTale.git

# Acesse a pasta do backend
$ cd PlotTale/backend

# Instale as dependências
$ npm install

# Execute as migrations
$ node ace migration:run

# Inicie o servidor de desenvolvimento
$ node ace serve --watch
```

### Rodando o Frontend (Web)

```bash
# Acesse a pasta do frontend em um novo terminal
$ cd PlotTale/frontend

# Instale as dependências
$ npm install

# Execute a aplicação
$ npm run dev
```
---