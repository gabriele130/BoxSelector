import express, { type Request, type Response, type NextFunction } from "express";
import { createServer } from "http";
import path from "path";
import { registerRoutes } from "./routes";
import { log, setupVite, serveStatic } from "./vite";

async function main() {
  const app = express();
  const server = createServer(app);

  // built-in express body parsers
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // to serve attached_assets
  const assetsPath = path.resolve(process.cwd(), "attached_assets");
  app.use("/attached_assets", express.static(assetsPath));

  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
    // setup the static file serving
    serveStatic(app);
  } else {
    // setup the vite dev middleware
    await setupVite(app, server);
  }

  // setup the API routes
  await registerRoutes(app);

  // catch all errors
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    log(`Error: ${err.message}`);
    console.error(err.stack);
    res.status(500).json({ error: err.message });
  });

  const port = process.env.PORT || 3000;
  // Utilizziamo 0.0.0.0 come host per essere sicuri che funzioni anche su StackBlitz
  server.listen(port, '0.0.0.0', () => {
    log(`Server listening on port ${port}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});