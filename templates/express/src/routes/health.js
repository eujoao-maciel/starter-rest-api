import { Router } from "express";
import { health } from "../controllers/health.js";

export const healthRoute = Router();

healthRoute.get("/", health);
