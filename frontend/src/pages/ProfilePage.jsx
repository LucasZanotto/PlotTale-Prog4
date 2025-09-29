import { useAuth } from "../context/AuthContext";
import BookCard from "../components/BookCard";
import ContributionCard from "../components/ContributionCard";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Carregando perfil...</p>;
  }

  const getInitials = (name) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  const acceptedContributions =
    user.contributions?.filter((c) => c.status === "ACCEPTED").length || 0;

  return (
    <div className="profile-page-container">
      <div className="profile-card">
        <div className="profile-avatar">{getInitials(user.name)}</div>
        <div className="profile-info">
          <h1 className="profile-name">{user.name}</h1>
          <p className="profile-email">{user.email}</p>
          <p className="profile-about">
            {user.about || "Este autor ainda não compartilhou nada sobre si."}
          </p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-item">
          <p className="stat-number">{user.books?.length || 0}</p>
          <p className="stat-label">Livros Criados</p>
        </div>
        <div className="stat-item">
          <p className="stat-number">{user.contributions?.length || 0}</p>
          <p className="stat-label">Contribuições Enviadas</p>
        </div>
        <div className="stat-item">
          <p className="stat-number">{acceptedContributions}</p>
          <p className="stat-label">Capítulos Oficializados</p>
        </div>
      </div>

      <hr
        style={{
          margin: "3rem 0",
          border: "none",
          borderTop: "1px solid var(--border-color)",
        }}
      />

      <section className="content-section">
        <h2 className="section-title">Meus Livros</h2>
        {user.books && user.books.length > 0 ? (
          <div className="content-grid">
            {user.books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <p className="no-content-message">
            Você ainda não criou nenhum livro. Que tal começar uma nova saga?
          </p>
        )}
      </section>

      <section className="content-section">
        <h2 className="section-title">Minhas Contribuições</h2>
        {user.contributions && user.contributions.length > 0 ? (
          <div className="content-grid">
            {user.contributions.map((contrib) => (
              <ContributionCard key={contrib.id} contribution={contrib} />
            ))}
          </div>
        ) : (
          <p className="no-content-message">
            Você ainda não contribuiu com nenhuma história. Explore os livros e
            deixe sua marca!
          </p>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
