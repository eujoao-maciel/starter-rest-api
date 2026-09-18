import { createInterface } from "node:readline/promises"
import { stdin as input, stdout as output } from "node:process"

const stacks = {
    1: {
        name: "Express",
        template: "starter-express",
    },
    2: {
        name: "Fastify",
        template: "starter-fastify",
    },
    3: {
        name: "FastAPI",
        template: "starter-fastapi",
    },
}

export const chooseStack = async () => {
    const readline = createInterface({
        input,
        output,
    })

    try {
        console.log("Qual stack deseja utilizar?")
        console.log("1. Node + Express + Vitest + Swagger + Zod")
        console.log("2. Node + Fastify + Vitest + Swagger + Schema")
        console.log("3. Python + FastAPI + OpenAPI + Pytest + Pydantic")

        const answer = await readline.question("Escolha uma opção: ")
        const stack = stacks[answer.trim()]

        if (!stack) {
            throw new Error("Opção inválida.")
        }

        return stack
    } finally {
        readline.close()
    }
}

export const defineProjectName = async () => {
    const readline = createInterface({
        input,
        output,
    })

    try {
        const projectName = await readline.question("Nome do projeto: ")

        if (!projectName) {
            projectName = "projeto"
        }

        return projectName
    } finally {
        readline.close()
    }
}
