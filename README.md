# Skip Waste Management Platform

## Descrizione del Progetto

Skip Waste Management Platform è un'applicazione web progettata per semplificare il processo di prenotazione dei servizi di smaltimento rifiuti attraverso un'interfaccia utente intuitiva e guidata. Il progetto utilizza un approccio a "wizard" multi-step che guida l'utente attraverso l'intero processo di prenotazione di uno skip (cassone per rifiuti), dalla selezione del tipo di rifiuto fino alla conferma della prenotazione.

### Approccio di Design e Sviluppo

L'applicazione è stata sviluppata seguendo questi principi:

1. **Esperienza Utente Semplificata**: Un'interfaccia step-by-step che guida l'utente attraverso ogni fase del processo di prenotazione con indicazioni chiare.

2. **Design Visivo Moderno**: Un tema scuro con accenti blu per un'esperienza visiva moderna e coerente, con particolare attenzione all'accessibilità e leggibilità.

3. **Architettura Component-Based**: L'applicazione è strutturata in componenti riutilizzabili, mantenendo una chiara separazione tra UI, logica di business e gestione dello stato.

4. **Feedback Visivo**: Rappresentazioni grafiche interattive dei tipi di rifiuti e delle percentuali per aiutare gli utenti a comprendere meglio le loro scelte.

5. **Flusso Sequenziale Intuitivo**: I popup sequenziali per tipi di rifiuti specifici (rifiuti pesanti, cartongesso) aiutano l'utente a fornire informazioni dettagliate in modo incrementale.

## Tecnologie Utilizzate

### Frontend
- **React.js**: Framework UI per la costruzione dell'interfaccia a componenti
- **TypeScript**: Per il type-checking statico e la robustezza del codice
- **Tailwind CSS**: Per lo styling responsive e coerente
- **Shadcn/UI**: Componenti UI accessibili e personalizzabili
- **React Hook Form**: Per la gestione dei form e la validazione
- **Zod**: Per la validazione dei dati e il type-checking runtime
- **Wouter**: Per la gestione del routing lato client
- **TanStack Query**: Per la gestione delle richieste API e la cache

### Backend
- **Express.js**: Framework Node.js per il server API
- **Drizzle ORM**: Per l'interazione con il database e la generazione di query
- **JSON Schema**: Per la validazione dei dati in ingresso
- **Memory Storage**: Per l'archiviazione temporanea dei dati durante lo sviluppo

### Tooling e Build
- **Vite**: Per lo sviluppo rapido e la build ottimizzata
- **ESBuild**: Per la compilazione rapida del backend
- **TypeScript**: Per il type-checking e la documentazione del codice

### Deployment
- **Node.js Runtime**: Per l'esecuzione del server
- **Express Static Serving**: Per servire l'applicazione frontend come file statici