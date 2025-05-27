import { Elysia } from "elysia";
import { apiRoutes } from "./routes/api.routes";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { join } from "path";

const app = new Elysia();

const uploadsPath = join(import.meta.dir, "..", "uploads");

app.use(
  staticPlugin({
    prefix: "/uploads",
    assets: uploadsPath,
  })
);

app.use(cors());
app.use(apiRoutes);

app.listen({
  port: 3000,
  hostname: "0.0.0.0",
});

console.log("🚀 Server listening on http://localhost:3000");
console.log(`📂 Serving static files from: ${uploadsPath}`);
