import { Link } from "react-router-dom";

import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <i class="fa-brands fa-whatsapp"></i>
      <h2>Mensagens automáticas</h2>
      <ul className="links">
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
    </div>
  );
};

export default Home;
