# Risoluzione problema "client/index.html not found"

Se riscontri errori simili a questi:

```
Error: ENOENT: no such file or directory, open '/path/to/BoxSelector/client/index.html'
```

Significa che il server Express sta cercando un file che non esiste nella tua directory.

## Soluzione Rapida

Esegui questi comandi nella root del progetto:

```bash
# Crea la cartella client
mkdir -p client

# Crea il file index.html
cat > client/index.html << EOF
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    <title>BoxSelector - Gestione Rifiuti</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF
```

## Spiegazione

Il server Express configurato in questo progetto cerca il file `index.html` in due posizioni:

1. Nella directory `client` (in sviluppo)
2. Nella directory del progetto (produzione)

Per evitare questo errore, entrambi i file devono esistere. Il file nella root del progetto viene compilato durante il build, mentre in fase di sviluppo viene utilizzato il file nella cartella `client`.

## Verifica

Dopo aver creato il file, prova a riavviare il server:

```bash
npm run dev
```

L'errore non dovrebbe più apparire e l'applicazione dovrebbe avviarsi normalmente.