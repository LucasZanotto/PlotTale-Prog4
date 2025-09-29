import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
      return;
    }
    try {
      await api.post("/auth/register", { name, email, password });
      navigate("/login", {
        state: { message: "Cadastro realizado com sucesso! Faça o login." },
      });
    } catch (err) {
      if (
        err.response &&
        (err.response.status === 409 ||
          err.response.data?.message?.includes("Duplicate entry"))
      ) {
        setError("Este email já está em uso.");
      } else {
        setError("Ocorreu um erro ao realizar o cadastro. Tente novamente.");
      }
      console.error("Falha no cadastro:", err);
    }
  };

  return (
    <div className="register-page-container">
      <div className="register-panel">
        <div className="register-showcase">
          <div>
            <div className="showcase-icon">✒️</div>
            <h1 className="showcase-title-register">
              Torne-se um Arquiteto de Mundos
            </h1>
            <p className="showcase-text-register">
              Sua assinatura aqui é o primeiro passo para criar e colaborar em
              histórias que cativarão milhares de leitores.
            </p>
          </div>
        </div>

        <div className="register-form-container">
          <h2>Crie sua Conta</h2>
          <p>É rápido e fácil. Vamos começar!</p>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit} className="register-form">
            <div className="input-group">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                required
              />
            </div>
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
                placeholder="Senha (mínimo 8 caracteres)"
                required
                minLength="8"
              />
            </div>
            <button type="submit" className="register-button">
              Criar Conta
            </button>
          </form>

          <div className="signin-link">
            <p>
              Já tem uma conta? <Link to="/login">Entre aqui</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
