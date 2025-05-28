import { Elysia } from "elysia";
import { apiRoutes } from "../../src/routes/api.routes";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { join } from "path";

/**
 * Creates an instance of the application for testing purposes
 * without starting the server.
 */
export function createTestApp(): Elysia {
  const app = new Elysia();
  
  // Use a temporary directory for uploads during tests
  const testUploadsPath = join(import.meta.dir, "..", "..", "test-uploads");
  
  app.use(
    staticPlugin({
      prefix: "/uploads",
      assets: testUploadsPath,
    })
  );

  app.use(cors());
  app.use(apiRoutes);

  return app;
}

/**
 * Helper function to make test HTTP requests
 */
export async function makeRequest(
  app: Elysia,
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = `http://localhost${path}`;
  const request = new Request(url, {
    method: 'GET',
    ...options,
  });
  
  return await app.handle(request);
}

/**
 * Helper function to make POST (or other method) requests with JSON body
 */
export async function makeJsonRequest(
  app: Elysia,
  path: string,
  data: any,
  method: string = 'POST'
): Promise<Response> {
  return makeRequest(app, path, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

/**
 * Helper function to parse a JSON response,
 * or return raw text if parsing fails
 */
export async function getJsonResponse(response: Response): Promise<any> {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}