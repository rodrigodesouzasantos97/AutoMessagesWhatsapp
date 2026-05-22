import Flow from "../models/Flow.js";
import FlowStep from "../models/FlowStep.js";
import FlowExecution from "../models/FlowExecution.js";

import { messageQueue } from "../queues/messageQueue.js";

const getFlows = async (req, res) => {
  try {
    const flows = await Flow.find();

    res.status(200).json(flows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Ocorreu um erro!" });
  }
};

const createFlow = async (req, res) => {
  try {
    const { name, steps } = req.body;

    if (!name || !steps?.length) {
      return res.status(400).json({
        msg: "Nome e etapas são obrigatórios",
      });
    }

    // cria fluxo
    const flow = await Flow.create({
      name,
    });

    // cria etapas
    const formattedSteps = steps.map((step) => ({
      flowId: flow._id,
      order: step.order,
      delayAfterPrevious: step.delayAfterPrevious,
      message: step.message,
    }));

    await FlowStep.insertMany(formattedSteps);

    return res.status(201).json({
      msg: "Fluxo criado com sucesso!",
      flow,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Erro ao criar fluxo",
    });
  }
};

const startFlow = async (req, res) => {
  try {
    const { flowId } = req.params;

    const { contactIds } = req.body;

    const firstStep = await FlowStep.findOne({
      flowId,
      order: 1,
    });

    if (!firstStep) {
      return res.status(404).json({
        msg: "Fluxo sem primeira etapa",
      });
    }

    for (const contactId of contactIds) {
      // cria execução individual
      const execution = await FlowExecution.create({
        contactId,
        flowId,
      });

      // cria job
      await messageQueue.add(
        "send-flow-message",

        {
          executionId: execution._id,

          contactId,

          stepId: firstStep._id,
        },

        {
          delay: 0,
        },
      );
    }

    return res.status(200).json({
      msg: "Fluxo iniciado!",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Erro ao iniciar fluxo",
    });
  }
};

export { startFlow, createFlow, getFlows };
