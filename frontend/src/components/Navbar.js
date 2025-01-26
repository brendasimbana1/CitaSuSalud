import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false); // Actualizar el estado a no autenticado
    navigate('/');
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <Link to="/">Home</Link>
        </li>

        {!isAuthenticated ? (
          <li>
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/Cita">Citas</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
