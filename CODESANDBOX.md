# Guida per CodeSandbox - BoxSelector

## Panoramica del progetto

BoxSelector è un'applicazione per la prenotazione di skip (contenitori per rifiuti) con un'interfaccia wizard che guida l'utente attraverso il processo di prenotazione, dalla selezione del tipo di rifiuto alla conferma dell'ordine.

## Come eseguire il progetto su CodeSandbox

1. Importa il progetto su CodeSandbox da GitHub o carica i file
2. CodeSandbox installerà automaticamente le dipendenze (npm install)
3. Il server di sviluppo verrà avviato automaticamente grazie al file di configurazione `.codesandbox/tasks.json`
4. L'applicazione sarà visibile nella finestra del browser all'interno di CodeSandbox

## Struttura del progetto

```
/boxselector
  /client             # Frontend React
    /src              
      /components     # Componenti UI riutilizzabili
      /contexts       # React Context API (gestione dello stato)
      /hooks          # Custom React hooks
      /pages          # Pagine dell'applicazione
      /services       # Servizi per le chiamate API
  /server             # Backend Express
  /shared             # Codice condiviso tra frontend e backend
  /attached_assets    # Immagini e altri asset
```

## Flusso dell'applicazione

1. **Home**: Selezione dei tipi di rifiuti
2. **Modale Rifiuti Pesanti**: Se selezionati rifiuti da costruzione o giardino
3. **Modale Cartongesso**: Gestione dei rifiuti di cartongesso
4. **Selezione Skip**: Visualizzazione e scelta delle dimensioni dello skip
5. **Date di consegna**: Selezione della data di consegna (non ancora implementato)
6. **Contatti e pagamento**: Inserimento dati personali e pagamento (non ancora implementato) 

## Note importanti per CodeSandbox

- L'applicazione utilizza Express.js come server e React come frontend
- Il backend utilizza un database in memoria (MemStorage)
- Le immagini sono caricate dalla cartella `attached_assets`
- Non sono necessarie API key o configurazioni esterne
- Il progetto è stato ottimizzato per funzionare in un ambiente sandbox

### Modifiche necessarie al package.json

Per garantire il corretto funzionamento in CodeSandbox, aggiorna lo script di build nel package.json:

```json
"scripts": {
  "dev": "NODE_ENV=development tsx server/index.ts",
  "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
  "start": "NODE_ENV=production node dist/index.js",
  "check": "tsc",
  "db:push": "drizzle-kit push"
}
```

Nota: Rimuovi il riferimento a `--config vite.config.local.ts` dato che abbiamo rinominato il file in `vite.config.ts`.

## Funzionalità principali

- Interfaccia utente moderna con tema scuro e accenti blu
- Sistema di selezione multi-step con popup modali
- Visualizzazione grafica dei tipi di rifiuti e percentuali
- Layout responsive
- Navigazione fluida tra le diverse fasi del processo di prenotazione