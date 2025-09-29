import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import api from "../api/api";
import "./HomePage.css";

const GENRES = [
  "Todos",
  "Fantasia",
  "Ficção Científica",
  "Terror",
  "Aventura",
  "Romance",
  "Mistério",
];

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Todos");

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const params = {
          title: searchTerm,
          genre: selectedGenre === "Todos" ? undefined : selectedGenre,
        };
        const response = await api.get("/books", { params });
        setBooks(response.data);
      } catch (err) {
        setError("Não foi possível carregar os livros.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchBooks();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedGenre]);

  return (
    <div className="homepage-container">
      <section className="hero-section">
        <h1 className="hero-title">Onde Histórias Ganham Vida</h1>
        <p className="hero-subtitle">
          Explore mundos criados em colaboração ou inicie sua própria saga. Cada
          capítulo é uma nova aventura decidida pela comunidade.
        </p>
      </section>

      <main className="main-content">
        <div className="filters-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar pelo título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="genre-filters">
            {GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`genre-button ${
                  selectedGenre === genre ? "active" : ""
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="loading-text">Carregando livros...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <div className="books-grid">
            {books.length > 0 ? (
              books.map((book, index) => (
                <div
                  key={book.id}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <BookCard book={book} />
                </div>
              ))
            ) : (
              <p className="no-books-text">
                Nenhum livro encontrado com os filtros aplicados.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
