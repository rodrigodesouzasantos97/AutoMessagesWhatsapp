import Campaign from "../models/Campaign.js";

import { messageQueue } from "../queues/messageQueue.js";

import { randomDelay } from "../utils/randomDelay.js";

const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();

    res.status(200).json(campaigns);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Ocorreu um erro!" });
  }
};

const createCampaign = async (req, res) => {
  try {
    const { name, message, minDelay, maxDelay, contactIds } = req.body;

    // cria campanha
    const campaign = await Campaign.create({
      name,
      message,
      minDelay,
      maxDelay,
      totalContacts: contactIds.length,
      processedContacts: 0,
      status: "running",
    });

    // cria jobs
    for (const contactId of contactIds) {
      const delay = randomDelay(minDelay, maxDelay);

      await messageQueue.add(
        "campaign-message",

        {
          type: "campaign",
          campaignId: campaign._id,
          contactId,
          message,
        },

        {
          delay: delay * 1000,
        },
      );

      console.log(`Mensagem agendada em ${delay} segundos`);
    }

    return res.status(201).json({
      msg: "Campanha criada!",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Erro ao criar campanha",
    });
  }
};

export { createCampaign, getCampaigns };
