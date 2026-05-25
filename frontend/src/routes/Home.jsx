import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <i class="fa-brands fa-whatsapp"></i>
      <h2>Auto Messages</h2>
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
    </div>
  );
};

export default Home;
