import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { FaUserCircle, FaSignOutAlt, FaFeatherAlt } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate("/");
  };

  const navbarClasses = `navbar ${isScrolled ? "scrolled" : ""}`;

  return (
    <nav className={navbarClasses}>
      <Link to="/">
        <img src={logo} alt="PlotTale Logo" className="navbar-logo" />
      </Link>

      <div className="navbar-actions">
        {user ? (
          <>
            <Link to="/books/new" className="create-book-link">
              <FaFeatherAlt style={{ marginRight: "0.5rem" }} /> Criar Livro
            </Link>

            <div className="profile-menu">
              <button
                className="profile-button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                title="Meu Perfil"
              >
                <FaUserCircle />
              </button>

              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/profile" onClick={() => setIsDropdownOpen(false)}>
                    <FaUserCircle /> Meu Perfil
                  </Link>
                  <button onClick={handleLogout}>
                    <FaSignOutAlt /> Sair
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="auth-link login">
              Login
            </Link>
            <Link to="/register" className="auth-link register">
              Cadastro
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
