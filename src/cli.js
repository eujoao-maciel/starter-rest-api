import { chooseStack } from "./prompts.js";
import { generateProject } from "./generator.js"

const stack = await chooseStack();

await generateProject(stack)
