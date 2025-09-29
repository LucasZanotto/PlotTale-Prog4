import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Email ou senha inválidos. Por favor, tente novamente.");
      console.error("Falha no login:", err);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-panel">
        <div className="login-showcase">
          <div>
            <h1 className="showcase-title">Sua História Aguarda.</h1>
            <p className="showcase-text">
              Entre em um universo de narrativas sem fim, moldadas por uma
              comunidade de criadores como você.
            </p>
          </div>
        </div>
        <div className="login-form-container">
          <h2>Bem-vindo de Volta</h2>
          <p>Faça o login para continuar.</p>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                required
              />
            </div>
            <button type="submit" className="login-button">
              Entrar
            </button>
          </form>

          <div className="signup-link">
            <p>
              Não tem uma conta? <Link to="/register">Cadastre-se</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
