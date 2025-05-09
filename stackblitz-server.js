// Questo file facilita l'avvio del progetto su StackBlitz
// StackBlitz ha bisogno di un punto di ingresso semplice per il server

// Per deployments che utilizzano build, decommenta questo blocco di codice
/*
import express from 'express';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Servi i file statici dalla directory di assets
app.use('/attached_assets', express.static(resolve(__dirname, 'attached_assets')));

// Servi il resto dell'applicazione
app.use(express.static(resolve(__dirname, 'dist')));

// Fallback per il client-side routing
app.get('*', (req, res) => {
  res.sendFile(resolve(__dirname, 'dist', 'index.html'));
});

// Crea il server HTTP
const server = createServer(app);

// Avvia il server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
*/

// Per sviluppo, importiamo direttamente il server
import './server/index.js';

// Questo file verrà utilizzato come punto di ingresso tramite il package.json
// con lo script "stackblitz:start": "node stackblitz-server.js"