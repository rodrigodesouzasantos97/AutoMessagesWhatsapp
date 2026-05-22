import { Worker } from "bullmq";

import { connection } from "../queues/connection.js";
import { messageQueue } from "../queues/messageQueue.js";

import Contact from "../models/Contact.js";
import FlowStep from "../models/FlowStep.js";
import FlowExecution from "../models/FlowExecution.js";

import { sendMessage } from "../services/sendMessage.js";

export const worker = new Worker(
  "messages",

  async (job) => {
    console.log("JOB RECEBIDO");

    const {
      executionId,
      contactId,
      stepId,
    } = job.data;

    // busca dados
    const contact =
      await Contact.findById(contactId);

    const step =
      await FlowStep.findById(stepId);

    const execution =
      await FlowExecution.findById(
        executionId
      );

    if (
      !contact ||
      !step ||
      !execution
    ) {
      console.log("Dados não encontrados");

      return;
    }

    // envia mensagem
    await sendMessage(
      contact.phone,
      step.message
    );

    // procura próxima etapa
    const nextStep =
      await FlowStep.findOne({
        flowId: execution.flowId,

        order: step.order + 1,
      });

    // se não existir próxima etapa
    if (!nextStep) {
      execution.status = "finished";

      await execution.save();

      console.log(
        `Fluxo finalizado para ${contact.name}`
      );

      return;
    }

    // atualiza etapa atual
    execution.currentStep =
      nextStep.order;

    await execution.save();

    console.log(
      `Próxima etapa: ${nextStep.order}`
    );

    // agenda próxima mensagem
    await messageQueue.add(
      "send-flow-message",

      {
        executionId: execution._id,

        contactId: contact._id,

        stepId: nextStep._id,
      },

      {
        delay:
          nextStep.delayAfterPrevious *
          1000,
      }
    );

    console.log(
      `Próxima mensagem agendada em ${nextStep.delayAfterPrevious} segundos`
    );
  },

  {
    connection,
  }
);
