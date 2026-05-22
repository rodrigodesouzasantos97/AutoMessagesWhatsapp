import fs from "fs";

import csv from "csv-parser";

import Contact from "../models/Contact.js";

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();

    res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Ocorreu um erro!" });
  }
};

const importContacts = async (req, res) => {
  try {
    const contacts = [];

    fs.createReadStream(req.file.path)

      .pipe(csv())

      .on("data", (row) => {
        contacts.push({
          name: row.nome,
          phone: row.telefone,
        });
      })

      .on("end", async () => {
        await Contact.insertMany(contacts);

        return res.status(200).json({
          msg: "Contatos importados!",
          total: contacts.length,
        });
      });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Erro ao importar contatos",
    });
  }
};

export { getContacts, importContacts };
