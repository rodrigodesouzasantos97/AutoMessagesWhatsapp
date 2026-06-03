import { api } from "../services/api";

import { useParams, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import "./UpdateContact.css"

const UpdateContact = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const getContact = async () => {
      try {
        const res = await api.get(`/contacts/${id}`);

        setName(res.data.name);
        setPhone(res.data.phone);
      } catch (error) {
        console.log(error);
      }
    };

    getContact();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !phone) return;

    try {
      const contact = {
        name,
        phone,
      };

      const res = await api.patch(`/contacts/${id}`, contact);

      navigate("/contacts");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="update-contact">
      <h1>Atualizar contato</h1>
      <form className="update-contact-form" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="name"
          placeholder="Digite um nome"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          name="phone"
          placeholder="Digite um número de telefone"
          value={phone || ""}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button>Atualizar</button>
      </form>
    </div>
  );
};

export default UpdateContact;
