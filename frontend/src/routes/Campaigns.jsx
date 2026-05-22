import { useEffect, useState } from "react";

import { api } from "../services/api";

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
    <div>
      <h1>Campanhas</h1>

      <input
        type="text"
        placeholder="Nome da campanha"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Mensagem"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Delay mínimo"
        value={minDelay}
        onChange={(e) => setMinDelay(e.target.value)}
      />

      <input
        type="number"
        placeholder="Delay máximo"
        value={maxDelay}
        onChange={(e) => setMaxDelay(e.target.value)}
      />

      <hr />

      <h3>Selecionar contatos</h3>

      {contacts.map((contact) => (
        <div key={contact._id}>
          <input
            type="checkbox"
            onChange={() => handleSelectContact(contact._id)}
          />

          {contact.name}
        </div>
      ))}

      <br />

      <button onClick={handleCreateCampaign}>Criar campanha</button>

      <hr />

      <h2>Campanhas</h2>

      {campaigns.map((campaign) => (
        <div key={campaign._id}>
          <p>Nome: {campaign.name}</p>

          <p>Status: {campaign.status}</p>

          <p>Mensagem: {campaign.message}</p>

          <p>
            Processados: {campaign.processedContacts}/{campaign.totalContacts}
          </p>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default Campaigns;
