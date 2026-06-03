import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { api } from "../services/api";

import "./Contacts.css";
import { formToJSON } from "axios";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  const [file, setFile] = useState(null);

  const getContacts = async () => {
    try {
      const response = await api.get("/contacts");

      setContacts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        return;
      }

      const formData = new FormData();

      formData.append("file", file);

      await api.post("/contacts/import", formData);

      alert("CSV importado!");

      getContacts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/contacts/${id}`);

      getContacts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className="contacts">
      <Link to="/" className="back-button">
        Voltar
      </Link>

      <div className="upload">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={handleUpload}>Upload CSV</button>
      </div>

      <h1>Contatos</h1>

      {contacts.length === 0 && (
        <p>
          Você ainda não tem contatos cadastrados{" "}
          <i className="fa-solid fa-face-frown"></i>
        </p>
      )}
      {contacts.map((contact) => (
        <div className="infos" key={contact._id}>
          <p>{contact.name}</p>
          <p>{contact.phone}</p>
          <button className="edit-button">
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            onClick={() => handleDelete(contact._id)}
            className="delete-button"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
