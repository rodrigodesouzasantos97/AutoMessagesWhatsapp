import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>
        <Link to="/">Auto Messages</Link>
      </h2>
      <ul>
        <li>
          <Link to="/contacts">Contatos</Link>
        </li>
        <li>
          <Link to="/campaigns">Campanhas</Link>
        </li>
        <li>
          <Link to="/flows">Fluxos</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
