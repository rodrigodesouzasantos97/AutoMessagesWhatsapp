import { useEffect, useState } from "react";

import { api } from "../services/api";

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

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div>
      <h1>Contatos</h1>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>Upload CSV</button>

      <hr />

      {contacts.map((contact) => (
        <div key={contact._id}>
          <p>{contact.name}</p>

          <p>{contact.phone}</p>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default Contacts;
