import { createInterface } from "node:readline/promises"
import { stdin as input, stdout as output } from "node:process"

const ESC = "\x1b["

const style = {
    reset: `${ESC}0m`,
    bold: `${ESC}1m`,
    dim: `${ESC}2m`,
    inverse: `${ESC}7m`,
}

const screen = {
    clear: `${ESC}H${ESC}2J`,
    open: `${ESC}?1049h${ESC}?25l`,
    close: `${ESC}?25h${ESC}?1049l`,
    mouseOn: `${ESC}?1000h${ESC}?1003h${ESC}?1006h`,
    mouseOff: `${ESC}?1000l${ESC}?1003l${ESC}?1006l`,
}

const KEYS = {
    up: [`${ESC}A`, "k"],
    down: [`${ESC}B`, "j"],
    enter: ["\r", "\n"],
    exit: "\x03",
}

const MOUSE = {
    pattern: /\x1b\[<(\d+);(\d+);(\d+)([Mm])/g,
    hover: 35,
    leftClick: 0,
}

const FIRST_OPTION_ROW = 3

const stacks = [
    {
        name: "Express",
        template: "starter-express",
        label: "Node + Express + Vitest + Swagger + Zod",
        color: `${ESC}32m`,
    },
    {
        name: "Fastify",
        template: "starter-fastify",
        label: "Node + Fastify + Vitest + Swagger + Schema",
        color: `${ESC}36m`,
    },
    {
        name: "FastAPI",
        template: "starter-fastapi",
        label: "Python + FastAPI + OpenAPI + Pytest + Pydantic",
        color: `${ESC}33m`,
    },
]

const toResult = ({ name, template }) => ({ name, template })

const moveIndex = (index, step) =>
    (index + step + stacks.length) % stacks.length

const parseMouseEvents = (data) =>
    [...data.matchAll(MOUSE.pattern)].map(([, button, , row, action]) => ({
        button: Number(button),
        index: Number(row) - FIRST_OPTION_ROW,
        released: action === "m",
    }))

const renderOption = (stack, isSelected) =>
    isSelected
        ? `${stack.color}${style.bold}${style.inverse} ❯ ${stack.label} ${style.reset}`
        : `${stack.color}   ${stack.label}${style.reset}`

const renderMenu = (selected) => {
    const lines = [
        `${style.bold}Qual stack deseja utilizar?${style.reset}`,
        `${style.dim}(↑/↓ ou mouse para navegar, Enter ou clique para escolher)${style.reset}`,
        ...stacks.map((stack, i) => renderOption(stack, i === selected)),
    ]

    return screen.clear + lines.join("\n") + "\n"
}

export const chooseStack = () =>
    new Promise((resolve) => {
        if (!input.isTTY) return resolve(toResult(stacks[0]))

        let selected = 0

        const draw = () => output.write(renderMenu(selected))

        const stop = () => {
            output.write(screen.mouseOff + screen.close)
            input.setRawMode(false)
            input.removeListener("data", handleInput)
            input.pause()
        }

        const confirm = (index) => {
            const stack = stacks[index]

            stop()
            console.log(
                `${stack.color}✔ Stack selecionada:${style.reset} ${stack.label}`,
            )
            resolve(toResult(stack))
        }

        const abort = () => {
            stop()
            process.exit(0)
        }

        const handleMouse = (data) => {
            for (const { button, index, released } of parseMouseEvents(data)) {
                if (!stacks[index]) continue

                if (button === MOUSE.hover) selected = index

                if (button === MOUSE.leftClick && !released) {
                    return confirm(index)
                }
            }
        }

        const handleInput = (buffer) => {
            const data = buffer.toString()

            if (data === KEYS.exit) return abort()
            if (KEYS.enter.includes(data)) return confirm(selected)

            if (KEYS.up.includes(data)) selected = moveIndex(selected, -1)
            if (KEYS.down.includes(data)) selected = moveIndex(selected, 1)

            if (handleMouse(data)) return

            draw()
        }

        output.write(screen.open + screen.mouseOn)
        input.setRawMode(true)
        input.resume()
        input.on("data", handleInput)
        draw()
    })

export const defineProjectName = async () => {
    const readline = createInterface({ input, output })

    try {
        const answer = await readline.question("Nome do projeto: ")
        return answer.trim() || "projeto"
    } finally {
        readline.close()
    }
}
