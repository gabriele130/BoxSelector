# Correzioni per StackBlitz

Questo documento descrive le modifiche necessarie per far funzionare correttamente l'applicazione in ambiente StackBlitz.

## Problema di importazione delle immagini

Il problema principale in StackBlitz è legato all'importazione diretta dei file immagine tramite importazioni ES Module, che causa errori MIME type.

### Soluzione implementata

1. Creato file `src/assets/image-paths.ts` che definisce i percorsi statici alle immagini invece che importazioni dirette
2. Modificato il componente `HeavyWasteModal.tsx` per utilizzare i percorsi statici con un fallback SVG
3. Aggiunto handler `onError` alle immagini per visualizzare un SVG fallback generato dinamicamente in caso di errore di caricamento

### Come verificare il funzionamento

Le immagini ora vengono caricate in due modi:
1. Prima tentano di caricare da percorsi statici (es. `/attached_assets/heavywaste-up-to-5.png`)
2. Se il caricamento fallisce, mostrano automaticamente un SVG generato sul momento

## Problema di caricamento dei componenti React

L'altro problema potrebbe essere legato alla struttura dell'applicazione React in StackBlitz.

### Struttura minima necessaria

Questi sono i file essenziali per il funzionamento dell'applicazione:

- `src/main.tsx` - Entry point React
- `src/App.tsx` - Componente root dell'applicazione
- `src/index.css` - Stili globali (Tailwind CSS)
- `src/lib/utils.ts` - Utilità condivise
- `src/contexts/BookingContext.tsx` - Context API per la gestione dello stato
- `src/components/ui/*` - Componenti UI di base
- `src/components/*.tsx` - Componenti specifici dell'applicazione

### Pagine di debug

Sono state aggiunte diverse pagine di debug per verificare il funzionamento:

- `/test` - Pagina HTML semplice senza React
- `/minimal` - Pagina React minimale che usa CDN
- `/debug` - Pagina di diagnostica con informazioni sul browser

## Modifiche per il deploy

Per il deploy su StackBlitz, assicurarsi che:

1. Il package.json sia valido
2. Le versioni delle dipendenze siano compatibili
3. Il server sia configurato per ascoltare su `0.0.0.0` invece di `localhost`
4. Siano aggiunte le immagini nella cartella pubblica o `attached_assets`