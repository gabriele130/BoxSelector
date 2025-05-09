# Guida per StackBlitz - BoxSelector

## Come avviare il progetto su StackBlitz

1. Importa il progetto su StackBlitz (da GitHub o caricando i file)
2. Rinomina `stackblitz-package.json` in `package.json` (sostituendo quello esistente)
3. StackBlitz installerà automaticamente le dipendenze
4. Il server verrà avviato automaticamente grazie al file `.stackblitzrc`
5. L'applicazione sarà visibile nella finestra preview

## Script disponibili nel package.json per StackBlitz

```json
"scripts": {
  "dev": "NODE_ENV=development tsx server/index.ts",
  "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
  "start": "NODE_ENV=production node dist/index.js",
  "check": "tsc",
  "db:push": "drizzle-kit push",
  "stackblitz:dev": "tsx server/index.ts"
}
```

## Note importanti per StackBlitz

- StackBlitz esegue l'applicazione in un ambiente virtualizzato
- Il server e il client vengono eseguiti sulla stessa origine, quindi non ci saranno problemi di CORS
- I file statici vengono serviti correttamente dal server Express
- Il database in memoria funziona senza problemi su StackBlitz

## Possibili problemi e soluzioni

### Problema: Il server non si avvia automaticamente

**Soluzione**: 
- Clicca sul Terminal in basso
- Esegui manualmente `npm run dev`

### Problema: Errori di importazione

**Soluzione**:
- Se vedi errori relativi a importazioni, potrebbe essere necessario modificare i percorsi delle importazioni da `@/...` a percorsi relativi
- In alternativa, verifica che gli alias in `vite.config.ts` siano configurati correttamente

### Problema: Porta in uso o non accessibile

**Soluzione**:
- Modifica il file `server/index.ts` per utilizzare la porta fornita da StackBlitz:
  ```typescript
  const port = process.env.PORT || 3000;
  server.listen(port, '0.0.0.0', () => {
    log(`Server listening on port ${port}`);
  });
  ```

## Flusso dell'applicazione

1. **Home**: Selezione dei tipi di rifiuti
2. **Popup Rifiuti Pesanti**: Se selezionati rifiuti da costruzione o giardino
3. **Popup Cartongesso**: Gestione dei rifiuti di cartongesso
4. **Selezione Skip**: Visualizzazione e scelta delle dimensioni dello skip

## Struttura del progetto

```
/boxselector
  /client             # Frontend React
    /src              
      /components     # Componenti UI 
      /contexts       # Context API
      /hooks          # Custom hooks
      /pages          # Pagine 
  /server             # Backend Express
  /shared             # Codice condiviso
  /attached_assets    # Immagini e asset
```