import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { api } from "../services/api";

import "./Flows.css";

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

  const handleDeleteStep = (indexToDelete) => {
    const filteredSteps = steps.filter((_, index) => index !== indexToDelete);

    const updatedSteps = filteredSteps.map((step, index) => ({
      ...step,
      order: index + 1,
    }));

    setSteps(updatedSteps);
  };

  const handleChangeStep = (index, field, value) => {
    const updatedSteps = [...steps];

    updatedSteps[index][field] = value;

    setSteps(updatedSteps);
  };

  const handleCreateFlow = async () => {
    if(steps.length === 0) return;

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
    <div className="flows">
      <Link to="/" className="back-button">
        Voltar
      </Link>

      <div className="create-flow">
        <h1>Fluxos</h1>

        <input
          type="text"
          placeholder="Nome do fluxo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <h2>Etapas</h2>

        {steps.map((step, index) => (
          <div className="steps" key={index}>
            <button
              onClick={() => handleDeleteStep(index)}
              className="delete-button"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
            <p>Etapa {step.order}</p>

            <textarea
              placeholder="Mensagem"
              value={step.message}
              onChange={(e) =>
                handleChangeStep(index, "message", e.target.value)
              }
            />

            <label>
              <span>Delay após etapa anterior (segundos):</span>
              <input
                type="number"
                placeholder="Delay"
                value={step.delayAfterPrevious}
                onChange={(e) =>
                  handleChangeStep(index, "delayAfterPrevious", e.target.value)
                }
              />
            </label>
          </div>
        ))}

        <button onClick={handleAddStep}>Adicionar etapa</button>

        <button onClick={handleCreateFlow}>Criar fluxo</button>
      </div>

      <h2>Fluxos criados</h2>

      {flows.length === 0 && (
        <p>
          Você ainda não tem fluxos cadastrados{" "}
          <i className="fa-solid fa-face-frown"></i>
        </p>
      )}
      {flows.map((flow) => (
        <div className="created-flow" key={flow._id}>
          <h3>{flow.name}</h3>

          <h4>Selecionar contatos</h4>

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

          <button onClick={() => handleStartFlow(flow._id)}>
            Iniciar fluxo
          </button>
          <button className="edit-button">
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button className="delete-button">
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Flows;
