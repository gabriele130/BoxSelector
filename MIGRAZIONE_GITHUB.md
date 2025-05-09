# Migrazione da Replit a GitHub

Questo documento contiene tutte le istruzioni necessarie per migrare il progetto da Replit a GitHub.

## Passo 1: Preparare i file

1. Rinominare i file:
   ```
   package.local.json → package.json
   vite.config.local.ts → vite.config.ts
   server/index.local.ts → server/index.ts
   server/vite.local.ts → server/vite.ts
   .gitignore.github → .gitignore
   ```

2. Rimuovere i file specifici di Replit:
   ```
   .replit
   .replit.nix
   .breakpoints (se presente)
   ```

3. Rimuovere i file non necessari:
   ```
   EXPORT_README.md
   package-lock.json (verrà ricreato dopo l'installazione)
   MIGRAZIONE_GITHUB.md (questo file, dopo averlo usato)
   ```

## Passo 2: Inizializzare il repository Git

1. Inizializza un repository git locale:
   ```
   git init
   ```

2. Aggiungere e committare i file:
   ```
   git add .
   git commit -m "Initial commit"
   ```

3. Collegare al repository GitHub:
   ```
   git remote add origin https://github.com/tuo-username/boxselector.git
   git push -u origin main
   ```

## Passo 3: Installazione e verifica locale

1. Installare le dipendenze:
   ```
   npm install
   ```

2. Avviare l'applicazione in modalità sviluppo:
   ```
   npm run dev
   ```

3. Assicurarsi che l'applicazione funzioni correttamente su http://localhost:3000

## Struttura del progetto

La struttura principale del progetto è la seguente:

```
/boxselector
  /client             # Codice frontend React
    /src              # Codice sorgente React
      /components     # Componenti React
      /pages          # Pagine dell'applicazione
      /contexts       # Context API React
      /hooks          # Custom hooks
      /assets         # Asset statici frontend
  /server             # Codice backend Express
  /shared             # Codice condiviso tra frontend e backend
  /attached_assets    # Immagini e asset per il progetto
```

## Script disponibili

- `npm run dev` - Avvia l'applicazione in modalità sviluppo
- `npm run build` - Compila l'applicazione per la produzione
- `npm run start` - Avvia l'applicazione in modalità produzione
- `npm run check` - Esegue il type-checking con TypeScript

## Note aggiuntive

- L'applicazione utilizza un database in memoria di default. Per implementare un database persistente, è necessario configurare PostgreSQL.
- Il design è ottimizzato per un tema scuro con accenti blu.