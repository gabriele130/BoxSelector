import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

try {
  const root = createRoot(document.getElementById("root")!);
  root.render(<App />);
} catch (error) {
  console.error("Errore durante l'inizializzazione:", error);
  
  // Mostra errore nella pagina
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; color: white; text-align: center;">
        <h2 style="color: #f87171;">Errore durante l'inizializzazione</h2>
        <p>${error instanceof Error ? error.message : String(error)}</p>
      </div>
    `;
  }
}
