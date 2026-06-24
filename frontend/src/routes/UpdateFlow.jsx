import { api } from "../services/api";

import { useParams, Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import "./UpdateFlow.css";

const UpdateFlow = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [name, setName] = useState();
  const [steps, setSteps] = useState([]);
  const [previousSteps, setPreviousSteps] = useState([]);

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
      setPreviousSteps(response.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const filteredSteps = steps.filter(
      (step, index) =>
        step.delayAfterPrevious !== previousSteps[index].delayAfterPrevious ||
      step.message !== previousSteps[index].message,
    );
    
    if (filteredSteps.length === 0) return;
    
    try {
      await Promise.all(
        filteredSteps.map((step) => {
          api.patch(`/flows/steps/${step._id}`, {
            delayAfterPrevious: step.delayAfterPrevious,
            message: step.message,
          });
        }),
      );
    } catch (error) {
      console.log(error);
    }

    navigate("/flows");
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
