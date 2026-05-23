import { useEffect, useState } from "react";

import { api } from "../services/api";

const Flows = () => {
  const [name, setName] = useState("");

  const [flows, setFlows] = useState([]);

  const [contacts, setContacts] = useState([]);

  const [selectedContacts, setSelectedContacts] = useState([]);

  const [steps, setSteps] = useState([
    {
      order: 1,
      message: "",
      delayAfterPrevious: 0,
    },
  ]);

  const getFlows = async () => {
    try {
      const response = await api.get("/flows");

      setFlows(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getContacts = async () => {
    try {
      const response = await api.get("/contacts");

      setContacts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFlows();

    getContacts();
  }, []);

  const handleAddStep = () => {
    setSteps([
      ...steps,

      {
        order: steps.length + 1,
        message: "",
        delayAfterPrevious: 0,
      },
    ]);
  };

  const handleChangeStep = (index, field, value) => {
    const updatedSteps = [...steps];

    updatedSteps[index][field] = value;

    setSteps(updatedSteps);
  };

  const handleCreateFlow = async () => {
    try {
      await api.post("/flows", {
        name,
        steps,
      });

      alert("Fluxo criado!");

      setName("");

      setSteps([
        {
          order: 1,
          message: "",
          delayAfterPrevious: 0,
        },
      ]);

      getFlows();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectContact = (contactId) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter((id) => id !== contactId));

      return;
    }

    setSelectedContacts([...selectedContacts, contactId]);
  };

  const handleStartFlow = async (flowId) => {
    try {
      await api.post(`/flows/${flowId}/start`, {
        contactIds: selectedContacts,
      });

      alert("Fluxo iniciado!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Fluxos</h1>

      <input
        type="text"
        placeholder="Nome do fluxo"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <hr />

      <h2>Etapas</h2>

      {steps.map((step, index) => (
        <div key={index}>
          <p>Etapa {step.order}</p>

          <textarea
            placeholder="Mensagem"
            value={step.message}
            onChange={(e) => handleChangeStep(index, "message", e.target.value)}
          />

          <br />

          <input
            type="number"
            placeholder="Delay"
            value={step.delayAfterPrevious}
            onChange={(e) =>
              handleChangeStep(index, "delayAfterPrevious", e.target.value)
            }
          />

          <p>Delay após etapa anterior (segundos)</p>

          <hr />
        </div>
      ))}

      <button onClick={handleAddStep}>Adicionar etapa</button>

      <br />
      <br />

      <button onClick={handleCreateFlow}>Criar fluxo</button>

      <hr />

      <h2>Fluxos criados</h2>

      {flows.map((flow) => (
        <div key={flow._id}>
          <h3>{flow.name}</h3>

          <h4>Selecionar contatos</h4>

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

          <button onClick={() => handleStartFlow(flow._id)}>
            Iniciar fluxo
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default Flows;
