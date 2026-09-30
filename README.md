# starter-rest-api

[![npm version](https://img.shields.io/npm/v/starter-rest-api.svg)](https://www.npmjs.com/package/starter-rest-api)
[![npm downloads](https://img.shields.io/npm/dm/starter-rest-api.svg)](https://www.npmjs.com/package/starter-rest-api)
[![node](https://img.shields.io/node/v/starter-rest-api.svg)](https://nodejs.org)

CLI interativo para criar uma API REST pronta para uso, com Node (Express ou Fastify) ou Python (FastAPI).

Para começar, rode:

```bash
npx starter-rest-api
```

Depois é só seguir as instruções na tela.

> **Compatibilidade:** requer Node.js 18 ou superior e Git. A stack FastAPI também precisa de Python 3.

## É só um template?

Quase. Cada stack é um repositório de template separado (veja a [tabela abaixo](#stacks-disponíveis)). O `starter-rest-api` automatiza o que você faria à mão: escolher a stack, baixar o template, instalar as dependências e mostrar como rodar o projeto.

## Como funciona

```text
Qual stack deseja utilizar?
(↑/↓ ou mouse para navegar, Enter ou clique para escolher)

 ❯ Node + Express + Vitest + Swagger + Zod
   Node + Fastify + Vitest + Swagger + Schema
   Python + FastAPI + OpenAPI + Pytest + Pydantic
```

1. Você escolhe a stack em um menu interativo, com uma cor para cada opção.
2. Informa o nome do projeto (se deixar em branco, usa `projeto`).
3. O CLI clona o template, instala as dependências e mostra os próximos passos.

## Uso

Não precisa instalar nada. Execute direto com o `npx`:

```bash
npx starter-rest-api
```

Se o `npx` usar uma versão antiga em cache, force a mais recente:

```bash
npx starter-rest-api@latest
```

Também dá para instalar globalmente:

```bash
npm install -g starter-rest-api
starter-rest-api
```

## Stacks disponíveis

| Stack | Tecnologias | Template |
| --- | --- | --- |
| Express | Node, Express, Vitest, Swagger, Zod | [starter-express](https://github.com/eujoao-maciel/starter-express) |
| Fastify | Node, Fastify, Vitest, Swagger, Schema | [starter-fastify](https://github.com/eujoao-maciel/starter-fastify) |
| FastAPI | Python, FastAPI, OpenAPI, Pytest, Pydantic | [starter-fastapi](https://github.com/eujoao-maciel/starter-fastapi) |

## Requisitos

| Ferramenta | Versão | Necessária para |
| --- | --- | --- |
| [Node.js](https://nodejs.org) | 18 ou superior | Rodar o CLI e as stacks Express e Fastify |
| [Git](https://git-scm.com) | Qualquer recente | Baixar o template |
| [Python](https://www.python.org) | 3.x com `venv` e `pip` | Apenas a stack FastAPI |

## O que acontece depois de escolher

**Express e Fastify**

1. Clona o template em uma pasta com o nome do projeto.
2. Roda `npm install`.

```bash
cd meu-projeto
npm run dev
```

**FastAPI**

1. Clona o template.
2. Cria o ambiente virtual em `.venv`.
3. Atualiza o `pip` e instala o projeto com `pip install -e ".[dev]"`.

```bash
cd meu-projeto

# Windows
.venv\Scripts\activate

# Linux e macOS
source .venv/bin/activate

python run.py
```

Se a instalação das dependências falhar (sem internet, Python ausente, etc.), o projeto continua criado. O CLI avisa o que aconteceu e você instala manualmente depois.

## Desenvolvimento

```bash
git clone https://github.com/eujoao-maciel/starter-rest-api.git
cd starter-rest-api
node src/cli.js
```

Estrutura:

```text
src/
├── cli.js         ponto de entrada
├── prompts.js     menu de stack e nome do projeto
└── generator.js   clone do template e instalação das dependências
```

## Licença

MIT
