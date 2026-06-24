import { api } from "../services/api";

import { useParams, Link } from "react-router-dom";

import { useEffect, useState } from "react";

import "./UpdateFlow.css";

const UpdateFlow = () => {
  const { id } = useParams();

  const [name, setName] = useState();
  const [steps, setSteps] = useState([]);

  const getFlow = async () => {
    try {
      const response = await api.get(`/flows/${id}`);
      setName(response.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  const getSteps = async () => {
    try {
      const response = await api.get(`/flows/${id}/steps`);
      setSteps(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFlow();
    getSteps();
  }, []);

  const handleMessageChange = (index, value) => {
    const updatedSteps = [...steps];

    updatedSteps[index] = {
      ...updatedSteps[index],
      message: value,
    };

    setSteps(updatedSteps);
  };

  const handleDelayChange = (index, value) => {
    const updatedSteps = [...steps];

    updatedSteps[index] = {
      ...updatedSteps[index],
      delayAfterPrevious: value,
    };

    setSteps(updatedSteps);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div className="update-flow">
      <Link to="/flows" className="back-button">
        Voltar
      </Link>
      <h1>Atualizar Fluxo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Digite o nome do fluxo"
          required
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />

        {steps.lenght !== 0 &&
          steps.map((step, index) => (
            <div key={index} className="steps">
              <textarea
                key={step.order}
                value={step.message || ""}
                onChange={(e) => handleMessageChange(index, e.target.value)}
              ></textarea>

              <label>
                <span>Delay após etapa anterior (segundos):</span>
                <input
                  type="number"
                  name="delay"
                  placeholder="Delay"
                  value={step.delayAfterPrevious}
                  onChange={(e) => handleDelayChange(index, e.target.value)}
                />
              </label>
            </div>
          ))}

        <button>Atualizar</button>
      </form>
    </div>
  );
};

export default UpdateFlow;
