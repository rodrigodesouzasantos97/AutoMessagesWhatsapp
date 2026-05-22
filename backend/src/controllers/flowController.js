import Flow from "../models/Flow.js";
import FlowStep from "../models/FlowStep.js";

export const createFlow = async (req, res) => {
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
      delayAfterPrevious:
        step.delayAfterPrevious,
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