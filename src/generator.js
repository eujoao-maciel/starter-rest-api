import { spawn } from "node:child_process"
import { platform } from "node:os"
import path from "node:path"

const templates = {
    "starter-express": {
        repo: "https://github.com/eujoao-maciel/starter-express.git",
        kind: "node",
    },
    "starter-fastify": {
        repo: "https://github.com/eujoao-maciel/starter-fastify.git",
        kind: "node",
    },
    "starter-fastapi": {
        repo: "https://github.com/eujoao-maciel/starter-fastapi.git",
        kind: "python",
    },
}

const isWindows = platform() === "win32"

const run = (command, args, options = {}) =>
    new Promise((resolve, reject) => {
        const child = spawn(command, args, {
            stdio: "inherit",
            ...options,
        })

        child.on("error", reject)
        child.on("close", (code) => {
            if (code === 0) return resolve()
            reject(
                new Error(
                    `"${command} ${args.join(" ")}" saiu com código ${code}`,
                ),
            )
        })
    })

export const generateProject = async (stack, projectName) => {
    const template = templates[stack.template]

    if (!template) {
        throw new Error("Template não encontrado.")
    }

    console.log(`\nBaixando template ${stack.name}...`)

    await run("git", ["clone", "--depth", "1", template.repo, projectName])

    console.log("Template baixado com sucesso!")

    const projectPath = path.resolve(projectName)

    try {
        console.log("\nInstalando dependências...")

        if (template.kind === "node") {
            await installNodeDependencies(projectPath)
        }

        if (template.kind === "python") {
            await installPythonDependencies(projectPath)
        }

        console.log("\nDependências instaladas com sucesso!")
    } catch (error) {
        console.warn(
            `\nNão foi possível instalar as dependências automaticamente (${error.message}).`,
        )
        console.warn(
            "Instale manualmente depois — veja os próximos passos abaixo.",
        )
    }

    printNextSteps(stack, projectName)
}

async function installNodeDependencies(cwd) {
    const npm = isWindows ? "npm.cmd" : "npm"
    await run(npm, ["install"], { cwd, shell: isWindows })
}

async function installPythonDependencies(cwd) {
    const python = isWindows ? "python" : "python3"

    await run(python, ["-m", "venv", ".venv"], { cwd })

    const venvPython = isWindows
        ? path.join(cwd, ".venv", "Scripts", "python.exe")
        : path.join(cwd, ".venv", "bin", "python")

    await run(venvPython, ["-m", "pip", "install", "--upgrade", "pip"], { cwd })
    await run(venvPython, ["-m", "pip", "install", "-e", ".[dev]"], { cwd })
}

function printNextSteps(stack, projectName) {
    console.log(`\nProjeto criado em ./${projectName}\n`)
    console.log("Próximos passos:")
    console.log(`  cd ${projectName}`)

    if (stack.template === "starter-fastapi") {
        console.log(
            isWindows
                ? "  .venv\\Scripts\\activate"
                : "  source .venv/bin/activate",
        )
        console.log("  python run.py")
    } else {
        console.log("  npm run dev")
    }
}
