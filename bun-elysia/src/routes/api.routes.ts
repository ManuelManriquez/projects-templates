import { Elysia } from "elysia";
import { getExternalData } from "../controllers/api.controllers";

export const apiRoutes = new Elysia({ prefix: "" })
  .get("/external", getExternalData)
  .get("/", () => "Hello Elysia")
  .get("/ping", () => "Pong");