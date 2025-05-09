#!/bin/bash
# Script per risolvere automaticamente i problemi dopo il download del progetto

# Colori per output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Iniziando la risoluzione automatica dei problemi...${NC}"

# Controlla se esiste vite.config.local.ts, altrimenti crea un symlink
if [ ! -f "vite.config.local.ts" ]; then
    echo -e "${YELLOW}Creazione del link simbolico per vite.config.local.ts...${NC}"
    ln -s vite.config.ts vite.config.local.ts
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Link simbolico creato con successo!${NC}"
    else
        echo -e "${RED}Errore nella creazione del link simbolico. Verificare i permessi.${NC}"
    fi
else
    echo -e "${YELLOW}Il file vite.config.local.ts esiste già.${NC}"
fi

# Verifica il package.json e notifica all'utente cosa fare
echo -e "${YELLOW}Controllo del file package.json...${NC}"
if grep -q "stackblitz:dev" package.json; then
    echo -e "${RED}Il file package.json potrebbe contenere errori.${NC}"
    echo -e "${YELLOW}Si consiglia di sostituirlo con la versione corretta da FIXES_DOPO_DOWNLOAD.md${NC}"
else
    echo -e "${GREEN}Il file package.json sembra essere corretto.${NC}"
fi

# Installa le dipendenze
echo -e "${YELLOW}Installazione delle dipendenze...${NC}"
npm install

echo -e "${GREEN}Operazioni completate!${NC}"
echo -e "${YELLOW}Per avviare l'applicazione, esegui: npm run dev${NC}"