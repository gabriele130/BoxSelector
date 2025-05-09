# Correzione Errore Importazione Vite Config

È stato rilevato un errore durante l'avvio del server:
```
Error: Cannot find module '/home/gabriele130/BoxSelector/vite.config.local' imported from /home/gabriele130/BoxSelector/server/vite.ts
```

## Soluzione

1. Apri il file `server/vite.ts`
2. Modifica l'importazione del file di configurazione vite, cambiando:

```typescript
import viteConfig from "../vite.config.local";
```

in:

```typescript
import viteConfig from "../vite.config";
```

3. Salva il file e riavvia l'applicazione con `npm run dev`

### Spiegazione

Il file `vite.config.local.ts` era una versione modificata del file di configurazione Vite creata per l'ambiente Replit. Su GitHub/locale, usiamo solo `vite.config.ts`, quindi dobbiamo aggiornare il riferimento nel server di sviluppo.