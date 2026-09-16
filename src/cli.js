import { chooseStack } from "./prompts.js";

const stack = await chooseStack();
console.log(`Stack selecionada: ${stack}`);
