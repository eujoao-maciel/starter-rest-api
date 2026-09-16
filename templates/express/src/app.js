import express from 'express'
import cors from 'cors'
import { healthRoute } from './routes/health.js' 
import swaggerUI from "swagger-ui-express"
import swaggerDocs from "../swagger.json" with { type: "json" }

export const app = express()

app.use(express.json())
app.use(cors())
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.use("/health", healthRoute)



