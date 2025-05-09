import { createRoot } from "react-dom/client";
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
    
    // Creiamo e rendiamo l'applicazione con error handling
    const root = createRoot(rootElement);
    root.render(<App />);
    
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
