import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "./CreateBookPage.css";

const GENRES = [
  "Fantasia",
  "Ficção Científica",
  "Terror",
  "Aventura",
  "Romance",
  "Mistério",
];

const CreateBookPage = () => {
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [genre, setGenre] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!genre) {
      setError("Por favor, selecione um gênero para o livro.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await api.post("/books", { title, synopsis, genre });
      const newBookId = response.data.id;
      navigate(`/books/${newBookId}`);
    } catch (err) {
      setError("Ocorreu um erro ao criar o livro. Tente novamente.");
      console.error("Falha ao criar livro:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-book-container">
      <div className="form-column">
        <div className="form-header">
          <h2>Inicie uma Nova História</h2>
          <p>
            Preencha os detalhes fundamentais da sua obra. O primeiro capítulo
            virá depois.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-step">
            <label htmlFor="title">1. Qual o título do seu livro?</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: A Saga do Manuscrito Perdido"
              required
            />
          </div>

          <div className="form-step">
            <label>2. Em qual gênero ele se encaixa?</label>
            <div className="genre-selection">
              {GENRES.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGenre(g)}
                  className={`genre-button-create ${
                    genre === g ? "active" : ""
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="form-step">
            <label htmlFor="synopsis">3. Descreva a sinopse</label>
            <textarea
              id="synopsis"
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              rows="6"
              placeholder="Uma breve descrição que irá cativar seus leitores..."
              required
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Criando..." : "Dar Vida à História"}
          </button>

          {error && <p className="error-message-create">{error}</p>}
        </form>
      </div>
      <aside className="preview-column">
        <h3>Sua Próxima Grande Aventura Começa Agora</h3>
        <p>
          Lembre-se: cada grande livro começou com uma única ideia. Ao clicar em
          "Dar Vida à História", você não está apenas criando um livro, mas
          abrindo as portas para uma comunidade de colaboradores que ajudarão a
          moldar seu universo.
        </p>
        <p style={{ marginTop: "1rem" }}>
          <strong>Boa escrita!</strong>
        </p>
      </aside>
    </div>
  );
};

export default CreateBookPage;
