import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import "./BookPage.css";

const BookPage = () => {
  const { id: bookId } = useParams();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newContributionContent, setNewContributionContent] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [bookRes, chaptersRes, contributionsRes] = await Promise.all([
        api.get(`/books/${bookId}`),
        api.get(`/books/${bookId}/chapters`),
        api.get(`/books/${bookId}/contributions`),
      ]);

      setBook(bookRes.data);
      setChapters(chaptersRes.data);
      setContributions(contributionsRes.data);
    } catch (err) {
      setError("Não foi possível carregar os detalhes do livro.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [bookId]);

  const handleVote = async (contributionId) => {
    if (!user) {
      alert("Você precisa estar logado para votar!");
      return;
    }

    try {
      const response = await api.post(`/contributions/${contributionId}/votes`);
      const updatedContributions = contributions.map((contrib) => {
        if (contrib.id === contributionId) {
          return { ...contrib, _count: { votes: response.data.voteCount } };
        }
        return contrib;
      });
      setContributions(updatedContributions);
    } catch (error) {
      console.error("Erro ao votar:", error);
      alert("Não foi possível registrar seu voto.");
    }
  };

  const handleContributionSubmit = async (e) => {
    e.preventDefault();
    if (!newContributionContent.trim()) {
      alert("Sua contribuição não pode estar vazia.");
      return;
    }

    try {
      await api.post(`/books/${bookId}/contributions`, {
        content: newContributionContent,
      });
      setNewContributionContent("");
      fetchData();
    } catch (error) {
      console.error("Erro ao enviar contribuição:", error);
      alert("Não foi possível enviar sua contribuição.");
    }
  };

  const handleAcceptContribution = async (contributionId) => {
    if (
      !window.confirm(
        "Tem certeza de que deseja oficializar esta contribuição como o próximo capítulo? Esta ação não pode ser desfeita."
      )
    ) {
      return;
    }

    try {
      await api.post(`/contributions/${contributionId}/accept`);
      fetchData();
    } catch (error) {
      console.error("Erro ao aceitar contribuição:", error);
      alert("Não foi possível oficializar este capítulo.");
    }
  };

  if (loading) return <p>Carregando história...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!book) return <p>Livro não encontrado.</p>;

  const isAuthor = user && user.id === book.authorId;

  return (
    <div className="book-page-container">
      <header className="book-header">
        <h1 className="book-title">{book.title}</h1>
        <p className="book-meta">
          <span>
            por <strong>{book.author.name}</strong>
          </span>{" "}
          | <span>{book.genre}</span>
        </p>
        <p className="book-synopsis">{book.synopsis}</p>
      </header>

      <div className="book-content-layout">
        <section className="chapters-section">
          <h2>Capítulos</h2>
          {chapters.length > 0 ? (
            chapters.map((chapter) => (
              <article key={chapter.id} className="chapter-article">
                <h3 className="chapter-title">{chapter.title}</h3>
                <p className="chapter-author">
                  Escrito por: {chapter.author.name}
                </p>
                <p className="chapter-content">{chapter.content}</p>
              </article>
            ))
          ) : (
            <p>
              A história ainda não começou. O primeiro capítulo aguarda
              oficialização.
            </p>
          )}
        </section>

        <aside className="contributions-section">
          <h2>Propostas para o Próximo Capítulo</h2>
          {contributions.length > 0 ? (
            contributions.map((contrib) => (
              <div key={contrib.id} className="contribution-card">
                <p className="contribution-author">
                  Proposta por: {contrib.author.name}
                </p>
                <p className="contribution-content">{contrib.content}</p>
                <div className="contribution-actions">
                  <span className="vote-count">
                    Votos: {contrib._count.votes}
                  </span>
                  <div>
                    {user && (
                      <button
                        className="action-button"
                        onClick={() => handleVote(contrib.id)}
                      >
                        Votar
                      </button>
                    )}
                    {isAuthor && (
                      <button
                        className="action-button accept-button"
                        onClick={() => handleAcceptContribution(contrib.id)}
                        style={{ marginLeft: "0.5rem" }}
                      >
                        Aceitar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhuma proposta enviada ainda. Seja o primeiro!</p>
          )}
        </aside>
      </div>

      {user && (
        <section className="contribution-form-section">
          <h3>Envie sua proposta de continuação</h3>
          <form
            onSubmit={handleContributionSubmit}
            className="contribution-form"
          >
            <textarea
              value={newContributionContent}
              onChange={(e) => setNewContributionContent(e.target.value)}
              placeholder="Escreva sua continuação da história aqui..."
            />
            <button
              type="submit"
              className="action-button"
              style={{ marginTop: "1rem" }}
            >
              Enviar Contribuição
            </button>
          </form>
        </section>
      )}
    </div>
  );
};

export default BookPage;
