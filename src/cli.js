import { chooseStack } from "./prompts.js";
import { defineProjectName } from "./prompts.js";
import { generateProject } from "./generator.js"

const stack = await chooseStack();
const projectName = await defineProjectName()

await generateProject(stack, projectName)
