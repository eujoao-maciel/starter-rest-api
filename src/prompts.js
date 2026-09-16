import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const stacks = {
  1: "Express",
  2: "Fastify",
  3: "FastAPI",
};

export const chooseStack = async () => {
  const readline = createInterface({
    input,
    output,
  });

  try {
    console.log("Qual stack deseja utilizar?");
    console.log("1. Node + Express + Vitest + Swagger + Zod");
    console.log("2. Node + Fastify + Vitest + Swagger + Schema");
    console.log("3. Python + FastAPI + OpenAPI + Pytest + Pydantic");

    const answer = await readline.question("Escolha uma opção: ");
    const stack = stacks[answer.trim()];

    if (!stack) {
      throw new Error("Opção inválida.");
    }

    return stack;
  } finally {
    readline.close();
  }
};
