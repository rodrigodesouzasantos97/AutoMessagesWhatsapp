import { getClient } from "./wpp/wppClient.js";

const formatBrazilianNumber = (phone) => {
  let clean = phone.replace(/\D/g, "");

  if (clean.startsWith("55") && clean.length > 11) {
    clean = clean.substring(2);
  }

  if (clean.length === 11) {
    const ddd = clean.substring(0, 2);
    const numeroSemDDD = clean.substring(2);

    if (numeroSemDDD.startsWith("9")) {
      clean = ddd + numeroSemDDD.substring(1);
    }
  }

  return `55${clean}@c.us`;
};

export const sendMessage = async (phone, message) => {
  try {
    const client = getClient();

    if (!client) {
      throw new Error("Cliente WPP não iniciado");
    }

    // Aplica a formatação corrigindo o nono dígito
    const formattedPhone = formatBrazilianNumber(phone);

    console.log("Número formatado final:", formattedPhone);

    // Valida se o número possui WhatsApp
    const exists = await client.checkNumberStatus(formattedPhone);

    if (!exists || exists.status === 404) {
      throw new Error(
        `O número ${formattedPhone} não foi encontrado no WhatsApp.`,
      );
    }

    // Envia a mensagem direta
    const result = await client.sendText(formattedPhone, message);

    console.log("==============");
    console.log("MENSAGEM ENVIADA COM SUCESSO");
    console.log(`Telefone Original: ${phone}`);
    console.log(`Formatado Usado: ${formattedPhone}`);
    console.log("==============");

    return result;
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error.message || error);
    throw error;
  }
};
