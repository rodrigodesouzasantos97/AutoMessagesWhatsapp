import wppconnect from "@wppconnect-team/wppconnect";

let client = null;

export const startWPP = async () => {
  client = await wppconnect.create({
    session: "whatsapp-session",
    headless: true,
    autoClose: 0,
  });

  console.log("WPPConnect conectado!");
};

export const getClient = () => {
  return client;
};
