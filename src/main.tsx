import App from "./App";
import "./index.css";

// Esegui in una funzione auto-invocata con error handling
(function startApp() {
  try {
    console.log("📦 Inizializzazione BoxSelector React App");
    
    // Controlla che l'elemento root esista
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      throw new Error("Elemento DOM #root non trovato");
    }
    
    // Supporta sia la versione importata che la versione globale di React
    // Questo è importante per StackBlitz dove React potrebbe essere caricato da CDN
    const reactDOM = window.ReactDOM || require("react-dom");
    const react = window.React || require("react");
    
    console.log(`Versione React: ${react?.version || 'non disponibile'}`);
    console.log(`Versione ReactDOM: ${reactDOM?.version || 'non disponibile'}`);
    
    // Usa ReactDOM.render per compatibilità con entrambi gli approcci
    if (reactDOM.createRoot) {
      // React 18+
      const root = reactDOM.createRoot(rootElement);
      root.render(react.createElement(App));
    } else if (reactDOM.render) {
      // React 17 e precedenti o versione CDN
      reactDOM.render(react.createElement(App), rootElement);
    } else {
      throw new Error("Metodi di rendering React non disponibili");
    }
    
    console.log("✅ BoxSelector React App renderizzata con successo");
  } catch (error) {
    console.error("❌ Errore durante l'inizializzazione dell'app React:", error);
    
    // Riporta l'errore nella pagina
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 20px; color: white; text-align: center;">
          <h2 style="color: #f87171;">Errore durante l'inizializzazione</h2>
          <p>${error instanceof Error ? error.message : String(error)}</p>
          <p style="margin-top: 20px;">
            <a href="/debug-stackblitz" style="color: #3b82f6; text-decoration: underline;">
              Vai alla pagina di diagnostica
            </a>
          </p>
        </div>
      `;
    }
  }
})();
