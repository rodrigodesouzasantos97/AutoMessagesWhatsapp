import { Worker } from "bullmq";

import { connection } from "../queues/connection.js";
import { messageQueue } from "../queues/messageQueue.js";

import Contact from "../models/Contact.js";
import FlowStep from "../models/FlowStep.js";
import FlowExecution from "../models/FlowExecution.js";
import Campaign from "../models/Campaign.js";

import { sendMessage } from "../services/sendMessage.js";

export const worker = new Worker(
  "messages",

  async (job) => {
    try {
      console.log("JOB RECEBIDO");

      const { type } = job.data;

      // campanha
      if (type === "campaign") {
        const { contactId, message } = job.data;

        const contact = await Contact.findById(contactId);

        if (!contact) {
          return;
        }

        await sendMessage(contact.phone, message);

        const campaign = await Campaign.findById(job.data.campaignId);

        if (campaign) {
          campaign.processedContacts += 1;

          // finaliza campanha
          if (campaign.processedContacts >= campaign.totalContacts) {
            campaign.status = "finished";

            console.log(`Campanha ${campaign.name} finalizada!`);
          }

          await campaign.save();
        }

        return;
      }

      // fluxo automático
      const { executionId, contactId, stepId } = job.data;

      // busca dados
      const contact = await Contact.findById(contactId);

      const step = await FlowStep.findById(stepId);

      const execution = await FlowExecution.findById(executionId);

      if (!contact || !step || !execution) {
        console.log("Dados não encontrados");

        return;
      }

      execution.status = "running";

      await execution.save();

      // envia mensagem
      await sendMessage(contact.phone, step.message);

      // procura próxima etapa
      const nextStep = await FlowStep.findOne({
        flowId: execution.flowId,

        order: step.order + 1,
      });

      // se não existir próxima etapa
      if (!nextStep) {
        execution.status = "finished";

        await execution.save();

        console.log(`Fluxo finalizado para ${contact.name}`);

        return;
      }

      // atualiza etapa atual
      execution.currentStep = nextStep.order;

      execution.status = "waiting";

      await execution.save();

      console.log(`Próxima etapa: ${nextStep.order}`);

      // agenda próxima mensagem
      await messageQueue.add(
        "send-flow-message",

        {
          executionId: execution._id,

          contactId: contact._id,

          stepId: nextStep._id,
        },

        {
          delay: nextStep.delayAfterPrevious * 1000,
        },
      );

      console.log(
        `Próxima mensagem agendada em ${nextStep.delayAfterPrevious} segundos`,
      );
    } catch (error) {
      console.log(error);

      const execution = await FlowExecution.findById(job.data.executionId);

      if (execution) {
        execution.status = "failed";

        await execution.save();
      }

      throw error;
    }
  },

  {
    connection,
  },
);
