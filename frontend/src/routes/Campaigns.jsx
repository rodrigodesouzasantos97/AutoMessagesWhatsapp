import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { api } from "../services/api";

import "./Campaigns.css";

const Campaigns = () => {
  const [contacts, setContacts] = useState([]);

  const [name, setName] = useState("");

  const [message, setMessage] = useState("");

  const [minDelay, setMinDelay] = useState(1);

  const [maxDelay, setMaxDelay] = useState(5);

  const [selectedContacts, setSelectedContacts] = useState([]);

  const [campaigns, setCampaigns] = useState([]);

  const getContacts = async () => {
    try {
      const response = await api.get("/contacts");

      setContacts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCampaigns = async () => {
    try {
      const response = await api.get("/campaigns");

      setCampaigns(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContacts();

    getCampaigns();
  }, []);

  const handleSelectContact = (contactId) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter((id) => id !== contactId));

      return;
    }

    setSelectedContacts([...selectedContacts, contactId]);
  };

  const handleCreateCampaign = async () => {
    try {
      await api.post("/campaigns", {
        name,
        message,

        minDelay,
        maxDelay,

        contactIds: selectedContacts,
      });

      alert("Campanha criada!");

      getCampaigns();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="campaigns">
      <Link to="/" className="back-button">Voltar</Link>

      <div className="create-campaign">
        <input
          type="text"
          placeholder="Nome da campanha"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="delay">
          <label>
            <span>Delay mínimo:</span>
            <input
              type="number"
              placeholder="Delay mínimo"
              value={minDelay}
              onChange={(e) => setMinDelay(e.target.value)}
            />
          </label>

          <label>
            <span>Delay máximo:</span>
            <input
              type="number"
              placeholder="Delay máximo"
              value={maxDelay}
              onChange={(e) => setMaxDelay(e.target.value)}
            />
          </label>
        </div>

        <h3>Selecionar contatos</h3>

        <div className="contacts-container">
          {contacts.map((contact) => (
            <div className="contact-checkbox" key={contact._id}>
              <input
                type="checkbox"
                onChange={() => handleSelectContact(contact._id)}
              />

              {contact.name}
            </div>
          ))}
        </div>

        <button onClick={handleCreateCampaign}>Criar campanha</button>
      </div>

      <h2>Campanhas</h2>

      <div className="created-campaigns">
        {campaigns.map((campaign) => (
          <div className="created-campaign" key={campaign._id}>
            <p>Nome: {campaign.name}</p>
            <p>Status: {campaign.status}</p>
            <p>Mensagem: {campaign.message}</p>
            <p>
              Processados: {campaign.processedContacts}/{campaign.totalContacts}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
