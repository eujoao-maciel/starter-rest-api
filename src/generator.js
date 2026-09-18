import { execFile } from "node:child_process"
import { promisify } from "node:util"

const execFileAsync = promisify(execFile)

const templates = {
    "starter-express": "https://github.com/eujoao-maciel/starter-express.git",

    "starter-fastify": "https://github.com/eujoao-maciel/starter-fastify.git",

    "starter-fastapi": "https://github.com/eujoao-maciel/starter-fastapi.git",
}

export const generateProject = async (stack, projectName) => {
    const repository = templates[stack.template]

    if (!repository) {
        throw new Error("Template não encontrado.")
    }

    console.log(`\nBaixando template ${stack.name}...`)

    await execFileAsync("git", [
        "clone",
        "--depth",
        "1",
        repository,
        projectName,
    ])

    console.log("Template baixado com sucesso!")
}
